import { debug } from '@blackhole/debug';
import { isEmpty } from '@fullstacksjs/toolbox';

import type { CustomKeyboardEvent } from './Chord';
import { Chord } from './Chord';
import type { Keybinding } from './Keybinding';
import { Mode } from './keyMapper';

type Subscriber = (e: CustomKeyboardEvent, x: { mode: Mode }) => void;

interface Action {
  mode: Mode;
  subscribers: Subscriber[];
}

class Context<TAction extends string> {
  #actions = new Map<TAction, Action>();

  constructor(
    private keyflow: KeyFlow<TAction>,
    actions: Record<TAction, Subscriber>,
  ) {
    // @ts-expect-error - TS doesn't understand that Object.keys
    Object.keys(actions).forEach((action: TAction) => {
      const { mode } = this.keyflow.actions.get(action)!;
      this.#actions.set(action, { mode, subscribers: [actions[action]] });
    });
  }

  public keyHandler = <T extends CustomKeyboardEvent>(event: T) => {
    return this.keyflow.getKeyHandler(event, this.#actions);
  };
}

export class KeyFlow<TAction extends string> {
  #prevKey: string = '';
  #actions = new Map<TAction, Action>();
  #chords = new Map<string, Record<number, TAction>>();

  #mode: Mode = Mode.Normal;
  #modeSubscribers = new Set<(mode: Mode) => void>();

  public get actions() {
    return this.#actions;
  }

  public get mode() {
    return this.#mode;
  }

  public set mode(value: Mode) {
    this.#mode = value;
    this.#modeSubscribers.forEach(subscriber => subscriber(value));
  }

  constructor(actions: Record<TAction, Keybinding>) {
    // @ts-expect-error - TS doesn't understand that Object.keys
    Object.keys(actions).forEach((action: TAction) => {
      const { key: keys, mode } = actions[action];

      this.#actions.set(action, { mode, subscribers: [] });

      keys.forEach(key => {
        const chord = key
          .split(',')
          .map(k => Chord.fromString(k).hash)
          .reduce((a, b) => `${a},${b}`);

        const currentChord = this.#chords.get(chord);
        if (!currentChord) this.#chords.set(chord, { [mode]: action });
        else currentChord[mode] = action;
      });
    });
  }

  public createContext(actions: Record<TAction, Subscriber>) {
    return new Context(this, actions);
  }

  public subscribeOnModeChange(callback: (mode: Mode) => void) {
    this.#modeSubscribers.add(callback);
    return () => void this.#modeSubscribers.delete(callback);
  }

  public subscribe(name: TAction, command: Subscriber) {
    const action = this.#actions.get(name);
    if (!action) throw new Error(`Action "${name}" not found`);

    action.subscribers.push(command);

    return () => {
      const index = action.subscribers.indexOf(command);
      if (index !== -1) action.subscribers.splice(index, 1);
    };
  }

  public getKeyHandler(
    event: CustomKeyboardEvent,
    actions: Map<TAction, Action>,
  ) {
    const chord = Chord.fromKeyboardEvent(event).hash;
    const actionDict =
      this.#chords.get(`${this.#prevKey},${chord}`) ?? this.#chords.get(chord);

    if (!actionDict) {
      this.#prevKey = chord;
      return;
    }

    const selectedActions = Object.keys(actionDict)
      .filter(k => Number(k) & this.#mode)
      .map(k => ({
        mode: k,
        action: actions.get(actionDict[k as unknown as number]!),
      }));

    debug.trace('KeybindingManager', {
      mode: this.#mode,
      chord,
      actionDict,
      actions: selectedActions,
    });

    if (isEmpty(selectedActions)) {
      this.#prevKey = chord;
      return;
    }

    this.#prevKey = '';

    event.preventDefault();
    selectedActions.forEach(subscriber =>
      subscriber.action?.subscribers.forEach(s =>
        s(event, { mode: this.#mode }),
      ),
    );
  }

  public keyHandler = (event: CustomKeyboardEvent) => {
    return this.getKeyHandler(event, this.#actions);
  };

  public register(document: Document) {
    document.addEventListener('keydown', this.keyHandler);
    return () => document.removeEventListener('keydown', this.keyHandler);
  }
}

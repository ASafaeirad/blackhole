import { debug } from '@blackhole/debug';
import { isEmpty } from '@fullstacksjs/toolbox';

import { Chord } from './Chord';
import type { Keybinding } from './Keybinding';
import type { WithMode } from './keyMapper';
import { Mode } from './keyMapper';

type Subscriber = (x: { mode: Mode }) => void;

interface Action {
  mode: Mode;
  subscribers: Subscriber[];
}

export class KeybindingManager<TAction extends string> {
  #prevKey: string = '';
  #actions = new Map<TAction, Action>();
  #chords = new Map<string, Record<number, TAction>>();

  #mode: Mode = Mode.Normal;
  #modeSubscribers = new Set<(mode: Mode) => void>();

  public get mode() {
    return this.#mode;
  }

  public set mode(value: Mode) {
    this.#mode = value;
    this.#modeSubscribers.forEach(subscriber => subscriber(value));
  }

  constructor(actions: Record<TAction, WithMode<Keybinding[]>>) {
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

  public register(document: Document) {
    const handleEvent = (event: KeyboardEvent) => {
      const chord = Chord.fromKeyboardEvent(event).hash;
      const actionDict =
        this.#chords.get(`${this.#prevKey},${chord}`) ??
        this.#chords.get(chord);

      if (!actionDict) {
        this.#prevKey = chord;
        return;
      }

      const actions = Object.keys(actionDict)
        .filter(k => Number(k) & this.#mode)
        .map(k => ({
          mode: k,
          action: this.#actions.get(actionDict[k as unknown as number]!),
        }));

      debug.trace('KeybindingManager', {
        mode: this.#mode,
        chord,
        actionDict,
        actions,
      });

      if (isEmpty(actions)) {
        this.#prevKey = chord;
        return;
      }

      this.#prevKey = '';
      event.preventDefault();
      actions.forEach(subscriber =>
        subscriber.action?.subscribers.forEach(s => s({ mode: this.#mode })),
      );
    };

    document.addEventListener('keydown', handleEvent);

    return () => document.removeEventListener('keydown', handleEvent);
  }
}

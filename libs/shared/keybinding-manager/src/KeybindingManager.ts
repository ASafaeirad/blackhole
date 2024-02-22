import { debug } from '@blackhole/debug';

import { Chord } from './Chord';
import type { Keybinding } from './Keybinding';
import type { WithMode } from './keyMapper';
import { Mode } from './keyMapper';

interface Action {
  chord?: string;
  subscribers: VoidFunction[];
}

export class KeybindingManager<TAction extends string> {
  #actions = new Map<TAction, Action>();
  #chords = {
    [Mode.Normal]: new Map<string, TAction>(),
    [Mode.Insert]: new Map<string, TAction>(),
  };

  #mode: Mode = Mode.Normal;

  public get mode() {
    return this.#mode;
  }

  public set mode(value: Mode) {
    this.#mode = value;
  }

  constructor(actions: Record<TAction, WithMode<Keybinding>>) {
    // @ts-expect-error - TS doesn't understand that Object.keys
    Object.keys(actions).forEach((k: TAction) => {
      const { key, mode } = actions[k];
      const chord = Chord.fromString(key).hash;

      this.#chords[mode].set(chord, k);
      this.#actions.set(k, { subscribers: [], chord });
    });
  }

  public subscribe(name: TAction, command: VoidFunction) {
    const action = this.#actions.get(name);
    if (!action) throw new Error(`Action "${name}" not found`);

    action.subscribers.push(command);

    return () => {
      const index = action.subscribers.indexOf(command);
      if (index !== -1) action.subscribers.splice(index, 1);
    };
  }

  public bind(name: TAction, { key, mode }: WithMode<Keybinding>) {
    const chord = Chord.fromString(key).hash;
    const action = this.#actions.get(name)!;
    this.#chords[mode].set(chord, name);
    action.chord = chord;
  }

  public register(document: Document) {
    const handleEvent = (event: KeyboardEvent) => {
      const chord = Chord.fromKeyboardEvent(event).hash;
      const actionName = this.#chords[this.#mode].get(chord);
      debug.trace('KeybindingManager', { chord, actionName });

      if (!actionName) return;
      const action = this.#actions.get(actionName);
      if (!action) return;
      event.preventDefault();
      action.subscribers.forEach(subscriber => subscriber());
    };

    document.addEventListener('keydown', handleEvent);

    return () => document.removeEventListener('keydown', handleEvent);
  }
}

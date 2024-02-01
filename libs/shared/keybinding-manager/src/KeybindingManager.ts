import { Chord } from './Chord';
import type { Keybinding } from './Keybinding';

interface Action {
  chord?: string;
  subscribers: VoidFunction[];
}

export class KeybindingManager<TAction extends string> {
  private actions = new Map<TAction, Action>();
  private chords = new Map<string, TAction>();

  constructor(actions: Record<TAction, Keybinding>) {
    Object.keys(actions).forEach(key => {
      const chord = Chord.fromString(actions[key as TAction]).hash;

      this.chords.set(chord, key as TAction);
      this.actions.set(key as TAction, { subscribers: [], chord });
    });
  }

  public subscribe(name: TAction, command: VoidFunction) {
    const action = this.actions.get(name)!;
    action.subscribers.push(command);

    return () => {
      const index = action.subscribers.indexOf(command);
      if (index !== -1) action.subscribers.splice(index, 1);
    };
  }

  public bind(name: TAction, keys: Keybinding) {
    const chord = Chord.fromString(keys).hash;
    const action = this.actions.get(name)!;
    this.chords.set(chord, name);
    action.chord = chord;
  }

  public register(document: Document) {
    const handleEvent = (event: KeyboardEvent) => {
      const chord = Chord.fromKeyboardEvent(event).hash;
      const actionName = this.chords.get(chord);

      if (!actionName) return;
      const action = this.actions.get(actionName);
      if (!action) return;
      event.preventDefault();
      action.subscribers.forEach(subscriber => subscriber());
    };

    document.addEventListener('keydown', handleEvent);

    return () => document.removeEventListener('keydown', handleEvent);
  }
}

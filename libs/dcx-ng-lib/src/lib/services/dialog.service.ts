import { Injectable, signal } from '@angular/core';

export interface DialogState<T = unknown> {
  visible: boolean;
  data?: T;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private _states = new Map<string, ReturnType<typeof signal<DialogState>>>();

  getState<T = unknown>(id: string) {
    if (!this._states.has(id)) {
      this._states.set(id, signal<DialogState<T>>({ visible: false }));
    }
    return this._states.get(id)! as ReturnType<typeof signal<DialogState<T>>>;
  }

  readOnly<T = unknown>(id: string) {
    return this.getState<T>(id).asReadonly();
  }

  open<T = unknown>(id: string, data?: T) {
    const s = this.getState<T>(id);
    s.set({ visible: true, data });
  }

  close(id: string) {
    const s = this.getState(id);
    s.set({ visible: false, data: undefined });
  }
}

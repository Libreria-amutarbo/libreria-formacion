import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private _dialogState = signal<{ visible: boolean; data?: unknown }>({
    visible: false,
  });
  dialogState = this._dialogState.asReadonly();

  openDialog(data?: any): void {
    this._dialogState.set({ visible: true, data });
  }

  closeDialog(): void {
    this._dialogState.set({ visible: false, data: undefined });
  }
}

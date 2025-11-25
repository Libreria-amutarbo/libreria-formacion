import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialogState = new BehaviorSubject<{ visible: boolean; data?: any }>({
    visible: false,
  });
  dialogState$ = this.dialogState.asObservable();

  openDialog(data?: any): void {
    this.dialogState.next({ visible: true, data });
  }

  closeDialog(): void {
    this.dialogState.next({ visible: false });
  }
}

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DcxToastPosition } from '../../core/interfaces';
import { DcxNgToastService } from '../dcx-ng-toast-component/dcx-ng-toast.service';
import { DcxNgToastComponent } from '../dcx-ng-toast-component/dcx-ng-toast.component';

@Component({
  selector: 'dcx-ng-toast-outlet',
  standalone: true,
  imports: [DcxNgToastComponent],
  templateUrl: './dcx-ng-toast-outlet.component.html',
  styleUrl: './dcx-ng-toast-outlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgToastOutletComponent {
  private readonly toastService = inject(DcxNgToastService);

  readonly position = input<DcxToastPosition>('top-right');
  readonly toasts = this.toastService.toasts;

  onDismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgChipComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-chip',
  standalone: true,
  imports: [DcxNgChipComponent],
  templateUrl: './dcx-ng-page-chip.component.html',
  styleUrl: './dcx-ng-page-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageChipComponent {
  onChipRemove(label: string) {
    console.log(`Chip removido: ${label}`);
  }
}

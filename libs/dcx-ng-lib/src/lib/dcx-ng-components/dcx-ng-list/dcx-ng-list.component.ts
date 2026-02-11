import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { DcxListItem, DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-list',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-list.component.html',
  styleUrls: ['./dcx-ng-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgListComponent {
  items = input.required<DcxListItem[]>();
  selectable = input<boolean>(false);
  multiSelect = input<boolean>(false);

  itemSelected = output<{ item: DcxListItem; index: number }>();

  selectedIndices = signal<number[]>([]);

  onItemClick(item: DcxListItem, index: number): void {
    if (this.multiSelect()) {
      const currentIndices = this.selectedIndices();

      if (this.isSelected(index)) {
        this.selectedIndices.set(currentIndices.filter(i => i !== index));
      } else {
        this.selectedIndices.set([...currentIndices, index]);
        this.itemSelected.emit({ item, index });
      }
    } else {
      if (!this.isSelected(index)) {
        this.selectedIndices.set([index]);
        this.itemSelected.emit({ item, index });
      }
    }
  }

  isSelected(index: number): boolean {
    if (!this.selectable()) return false;
    return this.selectedIndices().includes(index);
  }
}

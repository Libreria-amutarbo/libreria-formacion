import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
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
  showChildrenIndicator = input<boolean>(false);
  renderChildren = input<boolean>(true);

  itemSelected = output<{ item: DcxListItem; index: number }>();
  itemDeselected = output<{ item: DcxListItem; index: number }>();
  selectionChanged = output<{ item: DcxListItem; index: number }[]>();

  selectedIndices = signal<number[]>([]);
  selectedItems = computed(() =>
    this.selectedIndices().map(i => ({ item: this.items()[i], index: i })),
  );

  onItemClick(item: DcxListItem, index: number): void {
    if (item.disabled || item.divider) return;
    if (this.multiSelect()) {
      this._handleMultiSelect(item, index);
    } else {
      this._handleSingleSelect(item, index);
    }
  }

  isSelected(index: number): boolean {
    if (!this.selectable()) return false;
    return this.selectedIndices().includes(index);
  }

  private _handleMultiSelect(item: DcxListItem, index: number): void {
    const current = this.selectedIndices();
    if (this.isSelected(index)) {
      this.selectedIndices.set(current.filter(i => i !== index));
      this.itemDeselected.emit({ item, index });
    } else {
      this.selectedIndices.set([...current, index]);
      this.itemSelected.emit({ item, index });
    }
    this.selectionChanged.emit(this.selectedItems());
  }

  private _handleSingleSelect(item: DcxListItem, index: number): void {
    if (this.isSelected(index)) {
      this.selectedIndices.set([]);
      this.itemDeselected.emit({ item, index });
    } else {
      this.selectedIndices.set([index]);
      this.itemSelected.emit({ item, index });
    }
    this.selectionChanged.emit(this.selectedItems());
  }
}

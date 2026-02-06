import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { DcxListItem, DcxListItemType } from '@dcx-ng-components/dcx-ng-lib';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  selector: 'dcx-ng-list',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-list.component.html',
  styleUrls: ['./dcx-ng-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgListComponent {
  items = input.required<DcxListItemType[]>();
  selectable = input<boolean>(false);

  itemSelected = output<{ item: DcxListItemType; index: number }>();

  selectedIndex = signal<number | null>(null);

  isObject(item: DcxListItemType): item is DcxListItem {
    return typeof item === 'object';
  }

  onItemClick(item: DcxListItemType, index: number): void {
    if (this.selectable()) {
      this.selectedIndex.set(index);
      this.itemSelected.emit({ item, index });
    }
  }

  isSelected(index: number): boolean {
    return this.selectedIndex() === index;
  }
}

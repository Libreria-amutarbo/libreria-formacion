import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { DcxListItemType } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-list.component.html',
  styleUrls: ['./dcx-ng-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgListComponent {
  items = input.required<DcxListItemType[]>();
  selectable = input<boolean>(false);

  itemSelected = output<{ item: DcxListItemType; index: number }>();

  selectedIndex = signal<number | null>(null);

  getItemText(item: DcxListItemType): string {
    return typeof item === 'object' ? item.text : String(item);
  }

  getItemIcon(item: DcxListItemType): string | undefined {
    return typeof item === 'object' ? item.icon : undefined;
  }

  getItemChildren(item: DcxListItemType): DcxListItemType[] | undefined {
    return typeof item === 'object' ? item.children : undefined;
  }

  hasChildren(item: DcxListItemType): boolean {
    return typeof item === 'object' && !!item.children && item.children.length > 0;
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

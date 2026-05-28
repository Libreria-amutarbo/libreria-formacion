import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DcxListItem } from '../../core/interfaces';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  selector: 'dcx-ng-list',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    DcxNgIconComponent,
    DcxNgListComponent,
  ],
  templateUrl: './dcx-ng-list.component.html',
  styleUrls: ['./dcx-ng-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgListComponent<T extends DcxListItem = DcxListItem> {
  items = input.required<T[]>();
  selectable = input<boolean>(false);
  multiSelect = input<boolean>(false);
  showChildrenIndicator = input<boolean>(false);
  renderChildren = input<boolean>(true);

  id = input<string | null>(null);
  listRole = input<string>('list');
  itemRole = input<string>('listitem');
  itemTemplate =
    input<TemplateRef<{ $implicit: T; index: number; selected: boolean }>>();
  externalSelection = input<boolean>(false);

  cdkDropList = input<boolean>(false);
  cdkDropListData = input<T[]>([]);
  cdkDropListConnectedTo = input<string | string[] | null>(null);
  cdkDropListDisabled = input<boolean>(false);
  dragEnabled = input<boolean>(false);
  cdkDragDisabled = input<(item: T) => boolean>(() => false);

  itemSelected = output<{ item: T; index: number }>();
  itemDeselected = output<{ item: T; index: number }>();
  cdkDropListDropped = output<CdkDragDrop<T[]>>();

  selectedIndices = signal<number[]>([]);

  onItemClick(item: T, index: number): void {
    if (!this.selectable() || item.disabled || item.divider) {
      return;
    }

    if (this.externalSelection()) {
      this.itemSelected.emit({ item, index });
      return;
    }

    if (this.multiSelect()) {
      const currentIndices = this.selectedIndices();

      if (this.isSelected(index)) {
        this.selectedIndices.set(currentIndices.filter(i => i !== index));
        this.itemDeselected.emit({ item, index });
      } else {
        this.selectedIndices.set([...currentIndices, index]);
        this.itemSelected.emit({ item, index });
      }
    } else {
      if (this.isSelected(index)) {
        this.selectedIndices.set([]);
        this.itemDeselected.emit({ item, index });
      } else {
        this.selectedIndices.set([index]);
        this.itemSelected.emit({ item, index });
      }
    }
  }

  isSelected(index: number): boolean {
    if (!this.selectable()) return false;
    return this.selectedIndices().includes(index);
  }

  onDropped(event: CdkDragDrop<T[]>): void {
    this.cdkDropListDropped.emit(event);
  }

  getChildren(item: T): T[] {
    return (item.children as T[]) || [];
  }
}

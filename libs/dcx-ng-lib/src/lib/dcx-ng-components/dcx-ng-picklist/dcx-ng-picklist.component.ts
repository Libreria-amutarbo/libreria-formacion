import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  untracked,
} from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {
  DcxInputType,
  DcxListItem,
  DcxPickListFilterEvent,
  DcxPickListItem,
  DcxPickListItemTemplateContext,
  DcxPickListMoveEvent,
  DcxPickListReorderEvent,
  DcxPickListSelectionEvent,
  DcxPickListSide,
} from '../../core/interfaces';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';
import { DcxNgListComponent } from '../dcx-ng-list/dcx-ng-list.component';

@Component({
  selector: 'dcx-ng-picklist',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    DcxNgButtonComponent,
    DcxNgIconComponent,
    DcxNgInputComponent,
    DcxNgListComponent,
  ],
  templateUrl: './dcx-ng-picklist.component.html',
  styleUrl: './dcx-ng-picklist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPickListComponent {
  private static nextId = 0;
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly DcxInputType = DcxInputType;

  readonly instanceId = `dcx-picklist-${DcxNgPickListComponent.nextId++}`;
  readonly sourceHeadingId = `${this.instanceId}-source-heading`;
  readonly targetHeadingId = `${this.instanceId}-target-heading`;
  readonly sourceListId = `${this.instanceId}-source-list`;
  readonly targetListId = `${this.instanceId}-target-list`;

  readonly source = input<DcxPickListItem[]>([]);
  readonly target = input<DcxPickListItem[]>([]);
  readonly sourceHeader = input<string>('Disponibles');
  readonly targetHeader = input<string>('Seleccionados');
  readonly filterBy = input<string>('');
  readonly showSourceFilter = input(false, { transform: booleanAttribute });
  readonly showTargetFilter = input(false, { transform: booleanAttribute });
  readonly sourceFilterPlaceholder = input<string>('Filtrar disponibles');
  readonly targetFilterPlaceholder = input<string>('Filtrar seleccionados');
  readonly scrollHeight = input<string>('14rem');
  readonly dragdrop = input(false, { transform: booleanAttribute });
  readonly responsive = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly showSourceControls = input(true, { transform: booleanAttribute });
  readonly showTargetControls = input(true, { transform: booleanAttribute });
  readonly keepSelection = input(false, { transform: booleanAttribute });

  readonly sourceChange = output<DcxPickListItem[]>();
  readonly targetChange = output<DcxPickListItem[]>();
  readonly moveToTarget = output<DcxPickListMoveEvent>();
  readonly moveAllToTarget = output<DcxPickListMoveEvent>();
  readonly moveToSource = output<DcxPickListMoveEvent>();
  readonly moveAllToSource = output<DcxPickListMoveEvent>();
  readonly sourceReorder = output<DcxPickListReorderEvent>();
  readonly targetReorder = output<DcxPickListReorderEvent>();
  readonly sourceSelect = output<DcxPickListSelectionEvent>();
  readonly targetSelect = output<DcxPickListSelectionEvent>();
  readonly sourceFilter = output<DcxPickListFilterEvent>();
  readonly targetFilter = output<DcxPickListFilterEvent>();

  @ContentChild('item')
  readonly itemTemplate?: TemplateRef<DcxPickListItemTemplateContext>;

  readonly sourceItems = signal<DcxPickListItem[]>([]);
  readonly targetItems = signal<DcxPickListItem[]>([]);
  readonly sourceQuery = signal('');
  readonly targetQuery = signal('');
  readonly selectedSourceIds = signal<Array<string | number>>([]);
  readonly selectedTargetIds = signal<Array<string | number>>([]);
  readonly focusedSourceIndex = signal(0);
  readonly focusedTargetIndex = signal(0);

  // Predicados de selección por lado, con referencia estable, para que
  // dcx-ng-list refleje aria-selected en el <li role="option"> (selección externa).
  readonly isSourceItemSelected = (item: DcxPickListItem): boolean =>
    this.isSelected(item, 'source');
  readonly isTargetItemSelected = (item: DcxPickListItem): boolean =>
    this.isSelected(item, 'target');

  readonly pickListClasses = computed(() => {
    const base = 'dcx-picklist';

    return [
      base,
      this.responsive() ? `${base}--responsive` : '',
      this.disabled() ? `${base}--disabled` : '',
      this.dragdrop() ? `${base}--dragdrop` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly visibleSourceItems = computed(() =>
    this.filterItems(this.sourceItems(), this.sourceQuery()),
  );

  readonly visibleTargetItems = computed(() =>
    this.filterItems(this.targetItems(), this.targetQuery()),
  );

  readonly hasSelectedSource = computed(() =>
    this.sourceItems().some(item => this.isSelected(item, 'source')),
  );

  readonly hasSelectedTarget = computed(() =>
    this.targetItems().some(item => this.isSelected(item, 'target')),
  );

  readonly canMoveAllToTarget = computed(() =>
    this.sourceItems().some(item => !this.isItemDisabled(item)),
  );

  readonly canMoveAllToSource = computed(() =>
    this.targetItems().some(item => !this.isItemDisabled(item)),
  );

  private readonly syncSource = effect(() => {
    const source = [...this.source()];
    this.sourceItems.set(source);
    untracked(() => this.pruneSelection('source', source));
  });

  private readonly syncTarget = effect(() => {
    const target = [...this.target()];
    this.targetItems.set(target);
    untracked(() => this.pruneSelection('target', target));
  });

  onFilterChange(side: DcxPickListSide, value: string | number | null): void {
    const query = `${value ?? ''}`;

    if (side === 'source') {
      this.sourceQuery.set(query);
      this.sourceFilter.emit({
        query,
        value: this.visibleSourceItems(),
        side,
      });
      return;
    }

    this.targetQuery.set(query);
    this.targetFilter.emit({
      query,
      value: this.visibleTargetItems(),
      side,
    });
  }

  toggleItem(
    item: DcxListItem,
    side: DcxPickListSide,
    originalEvent?: Event,
  ): void {
    if (this.disabled() || this.isItemDisabled(item) || !item.id) {
      return;
    }

    const selectedIds =
      side === 'source' ? this.selectedSourceIds : this.selectedTargetIds;
    const ids = selectedIds();

    if (ids.includes(item.id)) {
      selectedIds.set(ids.filter(id => id !== item.id));
    } else {
      selectedIds.set([...ids, item.id]);
    }

    this.emitSelection(side, originalEvent);
  }

  onItemKeydown(
    event: KeyboardEvent,
    item: DcxListItem,
    side: DcxPickListSide,
    visibleIndex: number,
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleItem(item, side, event);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusVisibleItem(side, visibleIndex + 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusVisibleItem(side, visibleIndex - 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusVisibleItem(side, 0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusVisibleItem(side, this.getVisibleItems(side).length - 1);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      this.selectAllVisible(side, event);
    }
  }

  moveSelectedToTarget(): void {
    this.transferSelected('source');
  }

  moveSelectedToSource(): void {
    this.transferSelected('target');
  }

  moveEveryItemToTarget(): void {
    this.transferAll('source');
  }

  moveEveryItemToSource(): void {
    this.transferAll('target');
  }

  moveUp(side: DcxPickListSide): void {
    this.reorderSelected(side, 'up');
  }

  moveDown(side: DcxPickListSide): void {
    this.reorderSelected(side, 'down');
  }

  moveTop(side: DcxPickListSide): void {
    this.reorderSelected(side, 'top');
  }

  moveBottom(side: DcxPickListSide): void {
    this.reorderSelected(side, 'bottom');
  }

  onDrop<T extends DcxPickListItem = DcxPickListItem>(
    event: CdkDragDrop<T[]>,
    side: DcxPickListSide,
  ): void {
    if (this.disabled() || !this.dragdrop()) {
      return;
    }

    const isReorder = event.previousContainer === event.container;
    const previousSide: DcxPickListSide = isReorder
      ? side
      : side === 'source'
        ? 'target'
        : 'source';

    const sourceList = this.getList(previousSide);
    const targetList = this.getList(side);

    const previousData = event.previousContainer.data as T[];
    const draggedItem = previousData[event.previousIndex];

    if (!draggedItem || this.isItemDisabled(draggedItem)) {
      return;
    }

    if (isReorder) {
      const nextList = this.reorderVisibleDrop(
        sourceList,
        previousData as DcxPickListItem[],
        draggedItem as DcxPickListItem,
        event.currentIndex,
      );
      this.setList(side, nextList);
      this.emitChanges();
      this.emitReorder(side);
      return;
    }

    const nextSource = sourceList.filter(item => item.id !== draggedItem.id);
    const nextTarget = this.insertVisibleDrop(
      targetList,
      event.container.data as DcxPickListItem[],
      draggedItem as DcxPickListItem,
      event.currentIndex,
    );

    this.setList(previousSide, nextSource);
    this.setList(side, nextTarget);
    this.emitChanges();
    this.emitMove(previousSide, [draggedItem as DcxPickListItem], false);
  }

  getReorderControlLabel(
    side: DcxPickListSide,
    direction: 'top' | 'up' | 'down' | 'bottom',
  ): string {
    const panel = this.getPanelLabel(side);
    const directionLabel: Record<'top' | 'up' | 'down' | 'bottom', string> = {
      top: 'al inicio',
      up: 'arriba',
      down: 'abajo',
      bottom: 'al final',
    };

    return `Mover seleccionados de ${panel} ${directionLabel[direction]}`;
  }

  getMoveSelectedLabel(from: DcxPickListSide): string {
    const to: DcxPickListSide = from === 'source' ? 'target' : 'source';
    return `Mover seleccionados de ${this.getPanelLabel(from)} a ${this.getPanelLabel(to)}`;
  }

  getMoveAllLabel(from: DcxPickListSide): string {
    const to: DcxPickListSide = from === 'source' ? 'target' : 'source';
    return `Mover todos de ${this.getPanelLabel(from)} a ${this.getPanelLabel(to)}`;
  }

  getItemClasses(item: DcxListItem, side: DcxPickListSide): string {
    const base = 'dcx-picklist__item';

    return [
      base,
      this.isSelected(item, side) ? `${base}--selected` : '',
      this.isItemDisabled(item) ? `${base}--disabled` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  isSelected(item: DcxListItem, side: DcxPickListSide): boolean {
    if (!item.id) return false;
    const selectedIds =
      side === 'source' ? this.selectedSourceIds() : this.selectedTargetIds();
    return selectedIds.includes(item.id);
  }

  isFocused(index: number, side: DcxPickListSide): boolean {
    return side === 'source'
      ? this.focusedSourceIndex() === index
      : this.focusedTargetIndex() === index;
  }

  isItemDisabled(item: DcxListItem): boolean {
    return this.disabled() || item.disabled === true;
  }

  asPickListItem(item: DcxListItem): DcxPickListItem {
    return item as DcxPickListItem;
  }

  getTemplateContext(
    item: DcxPickListItem,
    index: number,
    side: DcxPickListSide,
  ): DcxPickListItemTemplateContext {
    return {
      $implicit: item,
      item,
      index,
      selected: this.isSelected(item, side),
      side,
    };
  }

  private transferSelected(from: DcxPickListSide): void {
    if (this.disabled()) {
      return;
    }

    const selectedIds =
      from === 'source' ? this.selectedSourceIds() : this.selectedTargetIds();
    const movingItems = this.getList(from).filter(
      item => selectedIds.includes(item.id) && !this.isItemDisabled(item),
    );

    if (movingItems.length === 0) {
      return;
    }

    this.applyTransfer(from, movingItems);
    this.emitMove(from, movingItems, false);
  }

  private transferAll(from: DcxPickListSide): void {
    if (this.disabled()) {
      return;
    }

    const movingItems = this.getList(from).filter(
      item => !this.isItemDisabled(item),
    );

    if (movingItems.length === 0) {
      return;
    }

    this.applyTransfer(from, movingItems);
    this.emitMove(from, movingItems, true);
  }

  private applyTransfer(
    from: DcxPickListSide,
    movingItems: DcxPickListItem[],
  ): void {
    const movingIds = movingItems.map(item => item.id);
    const to: DcxPickListSide = from === 'source' ? 'target' : 'source';
    const nextFrom = this.getList(from).filter(
      item => !movingIds.includes(item.id),
    );
    const nextTo = [...this.getList(to), ...movingItems];

    this.setList(from, nextFrom);
    this.setList(to, nextTo);

    if (!this.keepSelection()) {
      if (from === 'source') {
        this.selectedSourceIds.set([]);
      } else {
        this.selectedTargetIds.set([]);
      }
    }

    this.emitChanges();
  }

  private reorderSelected(
    side: DcxPickListSide,
    direction: 'up' | 'down' | 'top' | 'bottom',
  ): void {
    if (this.disabled()) {
      return;
    }

    const list = this.getList(side);
    const selectedIds =
      side === 'source' ? this.selectedSourceIds() : this.selectedTargetIds();
    const movableIds = new Set<string | number>(
      selectedIds.filter((id: string | number) => {
        const item = list.find(listItem => listItem.id === id);
        return item ? !this.isItemDisabled(item) : false;
      }),
    );

    if (movableIds.size === 0) {
      return;
    }

    const selectedItems = list.filter(item => movableIds.has(item.id));
    const unselectedItems = list.filter(item => !movableIds.has(item.id));
    let nextList = [...list];

    if (direction === 'top') {
      nextList = [...selectedItems, ...unselectedItems];
    }

    if (direction === 'bottom') {
      nextList = [...unselectedItems, ...selectedItems];
    }

    if (direction === 'up') {
      nextList = this.moveSelectionByOne(list, movableIds, -1);
    }

    if (direction === 'down') {
      nextList = this.moveSelectionByOne(list, movableIds, 1);
    }

    this.setList(side, nextList);
    this.emitChanges();
    this.emitReorder(side);
  }

  private moveSelectionByOne(
    list: DcxPickListItem[],
    selectedIds: Set<string | number>,
    direction: 1 | -1,
  ): DcxPickListItem[] {
    const nextList = [...list];
    const indexes = list
      .map((item, index) => (selectedIds.has(item.id) ? index : -1))
      .filter(index => index >= 0);
    const orderedIndexes = direction === 1 ? [...indexes].reverse() : indexes;

    for (const index of orderedIndexes) {
      const targetIndex = index + direction;

      if (
        targetIndex < 0 ||
        targetIndex >= nextList.length ||
        selectedIds.has(nextList[targetIndex].id)
      ) {
        continue;
      }

      const item = nextList[index];
      nextList[index] = nextList[targetIndex];
      nextList[targetIndex] = item;
    }

    return nextList;
  }

  private reorderVisibleDrop(
    list: DcxPickListItem[],
    visibleItems: DcxPickListItem[],
    draggedItem: DcxPickListItem,
    visibleIndex: number,
  ): DcxPickListItem[] {
    const nextList = list.filter(item => item.id !== draggedItem.id);
    const visibleWithoutDragged = visibleItems.filter(
      item => item.id !== draggedItem.id,
    );

    const insertIndex = this.resolveFullInsertIndex(
      nextList,
      visibleWithoutDragged,
      visibleIndex,
    );

    nextList.splice(insertIndex, 0, draggedItem);
    return nextList;
  }

  private insertVisibleDrop(
    list: DcxPickListItem[],
    visibleItems: DcxPickListItem[],
    item: DcxPickListItem,
    visibleIndex: number,
  ): DcxPickListItem[] {
    const insertIndex = this.resolveFullInsertIndex(
      list,
      visibleItems,
      visibleIndex,
    );
    const nextList = [...list];
    nextList.splice(insertIndex, 0, item);
    return nextList;
  }

  private resolveFullInsertIndex(
    list: DcxPickListItem[],
    visibleItems: DcxPickListItem[],
    visibleIndex: number,
  ): number {
    const normalizedIndex = Math.max(
      0,
      Math.min(visibleIndex, visibleItems.length),
    );

    if (normalizedIndex < visibleItems.length) {
      const nextVisibleItem = visibleItems[normalizedIndex];
      const index = this.findItemIndex(list, nextVisibleItem);
      return index !== -1 ? index : list.length;
    }

    if (visibleItems.length > 0) {
      const lastVisibleItem = visibleItems[visibleItems.length - 1];
      const index = this.findItemIndex(list, lastVisibleItem);
      return index !== -1 ? index + 1 : list.length;
    }

    return list.length;
  }

  private findItemIndex(
    list: DcxPickListItem[],
    item: DcxPickListItem,
  ): number {
    return list.findIndex(listItem => listItem.id === item.id);
  }

  private filterItems(
    items: DcxPickListItem[],
    query: string,
  ): DcxPickListItem[] {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    const fields = this.filterFields();

    return items.filter(item =>
      fields.some(field =>
        this.getFilterValue(item, field)
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      ),
    );
  }

  private getFilterValue(item: DcxPickListItem, field: string): string {
    const value = (item as unknown as Record<string, unknown>)[field];
    return String(value ?? '');
  }

  private filterFields(): string[] {
    const fields = this.filterBy()
      .split(',')
      .map(field => field.trim())
      .filter(Boolean);

    return fields.length > 0 ? fields : ['label', 'description'];
  }

  private selectAllVisible(side: DcxPickListSide, originalEvent?: Event): void {
    const ids = this.getVisibleItems(side)
      .filter(item => !this.isItemDisabled(item))
      .map(item => item.id);

    if (side === 'source') {
      this.selectedSourceIds.set(ids);
    } else {
      this.selectedTargetIds.set(ids);
    }

    this.emitSelection(side, originalEvent);
  }

  private focusVisibleItem(side: DcxPickListSide, nextIndex: number): void {
    const total = this.getVisibleItems(side).length;

    if (total === 0) {
      return;
    }

    const normalizedIndex = Math.max(0, Math.min(nextIndex, total - 1));

    if (side === 'source') {
      this.focusedSourceIndex.set(normalizedIndex);
      this.focusOption(side, normalizedIndex);
      return;
    }

    this.focusedTargetIndex.set(normalizedIndex);
    this.focusOption(side, normalizedIndex);
  }

  private focusOption(side: DcxPickListSide, index: number): void {
    const listId = side === 'source' ? this.sourceListId : this.targetListId;
    const options = this.host.nativeElement.querySelectorAll(
      `#${listId} [role="option"]`,
    ) as NodeListOf<HTMLElement>;

    options[index]?.focus();
  }

  private getPanelLabel(side: DcxPickListSide): string {
    return side === 'source' ? this.sourceHeader() : this.targetHeader();
  }

  private pruneSelection(
    side: DcxPickListSide,
    items: DcxPickListItem[],
  ): void {
    const availableIds = new Set(items.map(item => item.id));

    if (side === 'source') {
      this.selectedSourceIds.set(
        this.selectedSourceIds().filter(id => availableIds.has(id)),
      );
      return;
    }

    this.selectedTargetIds.set(
      this.selectedTargetIds().filter(id => availableIds.has(id)),
    );
  }

  private emitSelection(side: DcxPickListSide, originalEvent?: Event): void {
    const event: DcxPickListSelectionEvent = {
      originalEvent,
      side,
      items: this.getList(side).filter(item => this.isSelected(item, side)),
    };

    if (side === 'source') {
      this.sourceSelect.emit(event);
      return;
    }

    this.targetSelect.emit(event);
  }

  private emitMove(
    from: DcxPickListSide,
    items: DcxPickListItem[],
    all: boolean,
  ): void {
    const event = {
      items,
      source: this.sourceItems(),
      target: this.targetItems(),
    };

    if (from === 'source') {
      if (all) {
        this.moveAllToTarget.emit(event);
      } else {
        this.moveToTarget.emit(event);
      }
      return;
    }

    if (all) {
      this.moveAllToSource.emit(event);
    } else {
      this.moveToSource.emit(event);
    }
  }

  private emitReorder(side: DcxPickListSide): void {
    const event = {
      side,
      items: this.getList(side),
    };

    if (side === 'source') {
      this.sourceReorder.emit(event);
      return;
    }

    this.targetReorder.emit(event);
  }

  private emitChanges(): void {
    this.sourceChange.emit(this.sourceItems());
    this.targetChange.emit(this.targetItems());
  }

  private getVisibleItems(side: DcxPickListSide): DcxPickListItem[] {
    return side === 'source'
      ? this.visibleSourceItems()
      : this.visibleTargetItems();
  }

  private getList(side: DcxPickListSide): DcxPickListItem[] {
    return side === 'source' ? this.sourceItems() : this.targetItems();
  }

  private setList(side: DcxPickListSide, items: DcxPickListItem[]): void {
    if (side === 'source') {
      this.sourceItems.set(items);
      return;
    }

    this.targetItems.set(items);
  }
}

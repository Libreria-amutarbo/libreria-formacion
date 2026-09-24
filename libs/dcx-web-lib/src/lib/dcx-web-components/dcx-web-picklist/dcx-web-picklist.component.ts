import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { template } from './dcx-web-picklist.component.html';
import { styles } from './dcx-web-picklist.component.styles';

import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';
import '../dcx-web-input/dcx-web-input.component';
import '../dcx-web-list/dcx-web-list.component';

import type {
  DcxPickListItem,
  DcxPickListSide,
  DcxPickListSelectionEvent,
  DcxPickListMoveEvent,
  DcxPickListReorderEvent,
} from '../../core/interfaces/picklist';

@customElement('dcx-web-picklist')
export class DcxWebPicklist extends LitElement {
  static override styles = styles;

  private static nextId = 0;

  readonly instanceId = `dcx-picklist-${DcxWebPicklist.nextId++}`;
  readonly sourceHeadingId = `${this.instanceId}-source-heading`;
  readonly targetHeadingId = `${this.instanceId}-target-heading`;
  readonly sourceListId = `${this.instanceId}-source-list`;
  readonly targetListId = `${this.instanceId}-target-list`;

  @property({ attribute: false })
  accessor source: DcxPickListItem[] = [];

  @property({ attribute: false })
  accessor target: DcxPickListItem[] = [];

  @property({ type: String })
  accessor sourceHeader = 'Disponibles';

  @property({ type: String })
  accessor targetHeader = 'Seleccionados';

  @property({ type: String })
  accessor filterBy = '';

  @property({ type: Boolean, attribute: 'show-source-filter' })
  accessor showSourceFilter = false;

  @property({ type: Boolean, attribute: 'show-target-filter' })
  accessor showTargetFilter = false;

  @property({ type: String })
  accessor sourceFilterPlaceholder = 'Filtrar disponibles';

  @property({ type: String })
  accessor targetFilterPlaceholder = 'Filtrar seleccionados';

  @property({ type: Boolean })
  accessor dragdrop = false;

  @property({ attribute: false })
  accessor itemTemplate:
    | ((context: {
        item: DcxPickListItem;
        index: number;
        selected: boolean;
        side: DcxPickListSide;
      }) => unknown)
    | null = null;

  @property({ type: String, attribute: 'scroll-height' })
  accessor listScrollHeight = '14rem';

  @property({ type: Boolean })
  accessor responsive = true;

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: Boolean })
  accessor showSourceControls = true;

  @property({ type: Boolean })
  accessor showTargetControls = true;

  @property({ type: Boolean })
  accessor keepSelection = false;

  @state()
  accessor sourceItems: DcxPickListItem[] = [];

  @state()
  accessor targetItems: DcxPickListItem[] = [];

  @state()
  accessor sourceQuery = '';

  @state()
  accessor targetQuery = '';

  @state()
  accessor selectedSourceIds: Array<string | number> = [];

  @state()
  accessor selectedTargetIds: Array<string | number> = [];

  @state()
  accessor focusedSourceIndex = 0;

  @state()
  accessor focusedTargetIndex = 0;

  constructor() {
    super();
    this.sourceItems = [...this.source];
    this.targetItems = [...this.target];
  }

  override connectedCallback() {
    super.connectedCallback();
    this.syncListsFromProperties();
  }

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('source')) {
      this.sourceItems = [...this.source];
    }
    if (changedProperties.has('target')) {
      this.targetItems = [...this.target];
    }
  }

  private syncListsFromProperties() {
    this.sourceItems = [...this.source];
    this.targetItems = [...this.target];
  }

  emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true }),
    );
  }

  private filterItems(items: DcxPickListItem[], query: string) {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return items;
    const fields = this.filterBy
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);
    const searchFields = fields.length ? fields : ['label', 'description'];
    return items.filter(item =>
      searchFields.some(f =>
        String(item[f as keyof DcxPickListItem] ?? '')
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      ),
    );
  }

  get visibleSourceItems() {
    return this.filterItems(this.sourceItems, this.sourceQuery);
  }

  get visibleTargetItems() {
    return this.filterItems(this.targetItems, this.targetQuery);
  }

  private isSelected(item: DcxPickListItem, side: DcxPickListSide) {
    if (item.id == null) return false;
    return side === 'source'
      ? this.selectedSourceIds.includes(item.id)
      : this.selectedTargetIds.includes(item.id);
  }

  private isItemDisabled(item: DcxPickListItem) {
    return this.disabled || item.disabled === true;
  }

  onWebListSelect(e: CustomEvent, side: DcxPickListSide) {
    const { item } = e.detail;
    this.toggleItem(item, side, e);
  }

  onWebListDeselect(e: CustomEvent, side: DcxPickListSide) {
    const { item } = e.detail;
    this.toggleItem(item, side, e);
  }

  onWebListDrop(
    e: CustomEvent<{
      previousContainer: { id: string; data: DcxPickListItem[] };
      container: { id: string; data: DcxPickListItem[] };
      previousIndex: number;
      currentIndex: number;
    }>,
    side: DcxPickListSide,
  ) {
    const ev = e.detail;
    const prevId = ev.previousContainer?.id;
    const prevSide: DcxPickListSide =
      prevId === this.targetListId ? 'target' : 'source';
    const isReorder = ev.previousContainer?.id === ev.container?.id;

    if (isReorder) {
      const list = this.getList(side);
      const draggedItem = (ev.previousContainer?.data || [])[ev.previousIndex];
      if (!draggedItem) return;
      const nextList = this.reorderVisibleDrop(
        list,
        ev.previousContainer?.data || [],
        draggedItem,
        ev.currentIndex,
      );
      this.setList(side, nextList);
      this.emitReorder(side);
      this.emitChanges();
      return;
    }

    const previousData = ev.previousContainer?.data || [];
    const draggedItem = previousData[ev.previousIndex];
    if (!draggedItem || this.isItemDisabled(draggedItem)) return;

    const previousSide: DcxPickListSide = prevSide;
    const nextSource = this.getList(previousSide).filter(
      it => it.id !== draggedItem.id,
    );
    const nextTarget = this.insertVisibleDrop(
      this.getList(side),
      ev.container?.data || [],
      draggedItem,
      ev.currentIndex,
    );

    this.setList(previousSide, nextSource);
    this.setList(side, nextTarget);
    this.emitMove(previousSide, [draggedItem], false);
    this.emitChanges();
  }

  toggleItem(
    item: DcxPickListItem,
    side: DcxPickListSide,
    originalEvent?: Event,
  ) {
    if (this.disabled || this.isItemDisabled(item) || item.id == null) {
      return;
    }
    const selectedIds =
      side === 'source' ? this.selectedSourceIds : this.selectedTargetIds;
    const exists = selectedIds.includes(item.id);
    if (exists) {
      const next = selectedIds.filter(id => id !== item.id);
      if (side === 'source') this.selectedSourceIds = next;
      else this.selectedTargetIds = next;
    } else {
      const next = [...selectedIds, item.id];
      if (side === 'source') this.selectedSourceIds = next;
      else this.selectedTargetIds = next;
    }

    this.emitSelection(side, originalEvent);
  }

  private reorderVisibleDrop(
    list: DcxPickListItem[],
    visibleItems: DcxPickListItem[],
    draggedItem: DcxPickListItem,
    visibleIndex: number,
  ) {
    const nextList = list.filter(i => i.id !== draggedItem.id);
    const visibleWithoutDragged = visibleItems.filter(
      i => i.id !== draggedItem.id,
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
  ) {
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
  ) {
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

  private findItemIndex(list: DcxPickListItem[], item: DcxPickListItem) {
    return list.findIndex(i => i.id === item.id);
  }

  moveSelectedToTarget() {
    this.transferSelected('source');
  }
  moveSelectedToSource() {
    this.transferSelected('target');
  }
  moveEveryItemToTarget() {
    this.transferAll('source');
  }
  moveEveryItemToSource() {
    this.transferAll('target');
  }
  moveUp(side: DcxPickListSide) {
    this.reorderSelected(side, 'up');
  }
  moveDown(side: DcxPickListSide) {
    this.reorderSelected(side, 'down');
  }
  moveTop(side: DcxPickListSide) {
    this.reorderSelected(side, 'top');
  }
  moveBottom(side: DcxPickListSide) {
    this.reorderSelected(side, 'bottom');
  }

  private transferSelected(from: DcxPickListSide) {
    if (this.disabled) return;
    const selectedIds =
      from === 'source' ? this.selectedSourceIds : this.selectedTargetIds;
    const movingItems = this.getList(from).filter(
      item => selectedIds.includes(item.id) && !this.isItemDisabled(item),
    );
    if (!movingItems.length) return;
    this.applyTransfer(from, movingItems);
    this.emitMove(from, movingItems, false);
  }

  private transferAll(from: DcxPickListSide) {
    if (this.disabled) return;
    const movingItems = this.getList(from).filter(
      item => !this.isItemDisabled(item),
    );
    if (!movingItems.length) return;
    this.applyTransfer(from, movingItems);
    this.emitMove(from, movingItems, true);
  }

  private applyTransfer(from: DcxPickListSide, movingItems: DcxPickListItem[]) {
    const movingIds = movingItems.map(i => i.id);
    const to: DcxPickListSide = from === 'source' ? 'target' : 'source';
    const nextFrom = this.getList(from).filter(i => !movingIds.includes(i.id));
    const nextTo = [...this.getList(to), ...movingItems];
    this.setList(from, nextFrom);
    this.setList(to, nextTo);
    if (!this.keepSelection) {
      if (from === 'source') this.selectedSourceIds = [];
      else this.selectedTargetIds = [];
    }
    this.emitChanges();
  }

  private reorderSelected(
    side: DcxPickListSide,
    direction: 'up' | 'down' | 'top' | 'bottom',
  ) {
    if (this.disabled) return;
    const list = this.getList(side);
    const selectedIds =
      side === 'source' ? this.selectedSourceIds : this.selectedTargetIds;
    const movableIds = new Set(
      selectedIds.filter(id => {
        const item = list.find(li => li.id === id);
        return item ? !this.isItemDisabled(item) : false;
      }),
    );
    if (movableIds.size === 0) return;
    const selectedItems = list.filter(i => movableIds.has(i.id));
    const unselectedItems = list.filter(i => !movableIds.has(i.id));
    let nextList = [...list];
    if (direction === 'top') nextList = [...selectedItems, ...unselectedItems];
    else if (direction === 'bottom')
      nextList = [...unselectedItems, ...selectedItems];
    else if (direction === 'up')
      nextList = this.moveSelectionByOne(list, movableIds, -1);
    else if (direction === 'down')
      nextList = this.moveSelectionByOne(list, movableIds, 1);
    this.setList(side, nextList);
    this.emitReorder(side);
    this.emitChanges();
  }

  private moveSelectionByOne(
    list: DcxPickListItem[],
    selectedIds: Set<string | number>,
    direction: 1 | -1,
  ) {
    const nextList = [...list];
    const indexes = list
      .map((item, idx) => (selectedIds.has(item.id) ? idx : -1))
      .filter(i => i >= 0);
    const orderedIndexes = direction === 1 ? [...indexes].reverse() : indexes;
    for (const index of orderedIndexes) {
      const targetIndex = index + direction;
      if (
        targetIndex < 0 ||
        targetIndex >= nextList.length ||
        selectedIds.has(nextList[targetIndex].id)
      )
        continue;
      const item = nextList[index];
      nextList[index] = nextList[targetIndex];
      nextList[targetIndex] = item;
    }
    return nextList;
  }

  private emitSelection(side: DcxPickListSide, originalEvent?: Event) {
    const event: DcxPickListSelectionEvent = {
      originalEvent,
      side,
      items: this.getList(side).filter(i => this.isSelected(i, side)),
    };
    if (side === 'source') this.emit('sourceSelect', event);
    else this.emit('targetSelect', event);
  }

  private emitMove(
    from: DcxPickListSide,
    items: DcxPickListItem[],
    all: boolean,
  ) {
    const event: DcxPickListMoveEvent = {
      items,
      source: this.sourceItems,
      target: this.targetItems,
    };
    if (from === 'source') {
      if (all) this.emit('moveAllToTarget', event);
      else this.emit('moveToTarget', event);
    } else {
      if (all) this.emit('moveAllToSource', event);
      else this.emit('moveToSource', event);
    }
  }

  private emitReorder(side: DcxPickListSide) {
    const event: DcxPickListReorderEvent = { side, items: this.getList(side) };
    if (side === 'source') this.emit('sourceReorder', event);
    else this.emit('targetReorder', event);
  }

  private emitChanges() {
    this.emit('sourceChange', this.sourceItems);
    this.emit('targetChange', this.targetItems);
  }

  private getList(side: DcxPickListSide) {
    return side === 'source' ? this.sourceItems : this.targetItems;
  }
  private setList(side: DcxPickListSide, items: DcxPickListItem[]) {
    if (side === 'source') this.sourceItems = items;
    else this.targetItems = items;
  }

  onFilterChange(side: DcxPickListSide, value: string | null) {
    const query = `${value ?? ''}`;
    if (side === 'source') {
      this.sourceQuery = query;
      this.emit('sourceFilter', {
        query,
        value: this.visibleSourceItems,
        side,
      });
      return;
    }
    this.targetQuery = query;
    this.emit('targetFilter', { query, value: this.visibleTargetItems, side });
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-picklist': DcxWebPicklist;
  }
}

import { LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { template } from './dcx-web-list.component.html';
import { styles } from './dcx-web-list.component.styles';

import '../dcx-web-icon/dcx-web-icon.component';

import type { DcxListItem } from '../../core/interfaces/list';

@customElement('dcx-web-list')
export class DcxWebList extends LitElement {
  @property({ attribute: false })
  accessor items: DcxListItem[] = [];

  @property({ type: Boolean })
  accessor selectable = false;

  @property({ type: Boolean })
  accessor multiSelect = false;

  @property({ type: Boolean })
  accessor showChildrenIndicator = false;

  @property({ type: Boolean })
  accessor renderChildren = true;

  @property({ attribute: false })
  accessor itemTemplate:
    | ((context: {
        item: DcxListItem;
        index: number;
        selected: boolean;
      }) => TemplateResult)
    | null = null;

  @property({ type: String })
  override accessor id = '';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel = 'Lista de elementos';

  @property({ type: String })
  accessor listRole = 'list';

  @property({ type: String })
  accessor itemRole = 'listitem';

  @property({ attribute: false })
  accessor multiselectable: boolean | null = null;

  @property({ type: Boolean })
  accessor externalSelection = false;

  @property({ attribute: false })
  accessor isItemSelected:
    | ((item: DcxListItem, index: number) => boolean)
    | null = null;

  @property({ type: Boolean })
  accessor dropList = false;

  @property({ attribute: false })
  accessor dropListData: DcxListItem[] = [];

  @property({ attribute: false })
  accessor dropListConnectedTo: string | string[] | null = null;

  @property({ type: Boolean })
  accessor dropListDisabled = false;

  @property({ type: Boolean })
  accessor dragEnabled = false;

  @property({ attribute: false })
  accessor dragDisabled = (_item: DcxListItem) => false;

  @state()
  accessor selectedIndices: number[] = [];

  static override styles = styles;

  private _dragPayload: {
    id: string | number;
    side?: string;
    index: number;
    sourceListId?: string;
    sourceData?: DcxListItem[];
  } | null = null;
  private _listId = '';

  emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _ensureListId() {
    if (!this._listId) {
      this._listId =
        this.id || `dcx-web-list-${Math.random().toString(36).slice(2, 9)}`;
    }
    return this._listId;
  }

  _onDragStart(e: DragEvent, item: DcxListItem, index: number) {
    if (!e.dataTransfer) return;
    this._ensureListId();
    const payload = {
      id: item.id ?? index,
      index,
      sourceListId: this._listId,
      sourceData: [...this.items],
    };
    this._dragPayload = payload;
    try {
      e.dataTransfer.setData(
        'application/dcx-list-item',
        JSON.stringify({ id: item.id ?? index }),
      );
      e.dataTransfer.setData('application/dcx-list-source', this._listId);
      e.dataTransfer.setData(
        'application/dcx-list-payload',
        JSON.stringify(payload),
      );
    } catch {
      // Ignore errors if dataTransfer.setData fails in constrained environments
    }
    e.dataTransfer.effectAllowed = 'move';
    this.emit('dragStart', { item, index, listId: this._listId });
  }

  _onDragOver(e: DragEvent) {
    if (!e.dataTransfer) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  _onDrop(e: DragEvent) {
    if (!e.dataTransfer) return;
    e.preventDefault();
    const listId = this._ensureListId();
    const path = e.composedPath();
    const li = path.find(
      n =>
        (n as HTMLElement)?.hasAttribute &&
        (n as HTMLElement).hasAttribute('data-index'),
    ) as HTMLElement | undefined;
    const currentIndex = li
      ? Number(li.getAttribute('data-index'))
      : this.items.length;

    let payload = this._dragPayload;
    if (!payload) {
      const rawPayload = e.dataTransfer.getData('application/dcx-list-payload');
      if (rawPayload) {
        try {
          payload = JSON.parse(rawPayload);
        } catch {
          payload = null;
        }
      }
    }
    if (!payload) return;

    const previousContainer = {
      id:
        payload.sourceListId ||
        e.dataTransfer.getData('application/dcx-list-source') ||
        this._listId,
      data: payload.sourceData ?? [...this.items],
    };
    const container = { id: listId, data: [...this.items] };

    const event = {
      previousContainer,
      container,
      previousIndex: payload.index,
      currentIndex,
    };

    this.emit('dropListDropped', event);
    this._dragPayload = null;
  }

  _onDragEnd() {
    this._dragPayload = null;
    this.emit('dragEnd');
  }

  getChildren(item: DcxListItem): DcxListItem[] {
    return item.children ?? [];
  }

  isSelected(index: number): boolean {
    if (!this.selectable) return false;
    return this.selectedIndices.includes(index);
  }

  resolveAriaSelected(item: DcxListItem, index: number): boolean | null {
    if (this.isItemSelected) {
      return this.isItemSelected(item, index);
    }

    return this.selectable && !this.externalSelection
      ? this.isSelected(index)
      : null;
  }

  onItemClick(item: DcxListItem, index: number) {
    if (!this.selectable || item.disabled || item.divider) {
      return;
    }

    if (this.externalSelection) {
      this.emit('itemSelected', { item, index });
      return;
    }

    if (this.multiSelect) {
      if (this.isSelected(index)) {
        this.selectedIndices = this.selectedIndices.filter(i => i !== index);

        this.emit('itemDeselected', {
          item,
          index,
        });
      } else {
        this.selectedIndices = [...this.selectedIndices, index];

        this.emit('itemSelected', {
          item,
          index,
        });
      }

      return;
    }

    if (this.isSelected(index)) {
      this.selectedIndices = [];

      this.emit('itemDeselected', {
        item,
        index,
      });

      return;
    }

    this.selectedIndices = [index];

    this.emit('itemSelected', {
      item,
      index,
    });
  }

  onKeydown(event: KeyboardEvent, item: DcxListItem, index: number) {
    const children = this.getChildren(item);

    if ((event.key === 'Enter' || event.key === ' ') && !item.disabled) {
      event.preventDefault();
      this.onItemClick(item, index);
    }

    if (event.key === 'ArrowRight' && children.length) {
      event.preventDefault();

      const li = event.currentTarget as HTMLElement;

      const firstChild = li.querySelector<HTMLElement>(
        '.dcx-list-nested [tabindex="0"]',
      );

      firstChild?.focus();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();

      const li = event.currentTarget as HTMLElement;

      const parent = li.closest('.dcx-list-nested')?.closest<HTMLElement>('li');

      parent?.focus();
    }
  }

  getItemClasses(item: DcxListItem, index: number) {
    const classes = ['dcx-list-item'];
    const selected = this.isItemSelected
      ? this.isItemSelected(item, index)
      : this.isSelected(index);

    if (this.selectable) classes.push('selectable');

    if (selected) classes.push('selected');

    if (item.disabled) classes.push('disabled');

    if (item.children && item.children.length) {
      classes.push('has-children');
    }

    if (item.variant === 'danger') {
      classes.push('danger');
    }

    return classes.join(' ');
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-list': DcxWebList;
  }
}

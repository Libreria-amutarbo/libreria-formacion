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
  accessor cdkDropList = false;

  @property({ attribute: false })
  accessor cdkDropListData: DcxListItem[] = [];

  @property({ attribute: false })
  accessor cdkDropListConnectedTo: string | string[] | null =
    null;

  @property({ type: Boolean })
  accessor cdkDropListDisabled = false;

  @property({ type: Boolean })
  accessor dragEnabled = false;

  @property({ attribute: false })
  accessor cdkDragDisabled = (_item: DcxListItem) =>
    false;

  @state()
  accessor selectedIndices: number[] = [];

  static override styles = styles;

  emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  getChildren(item: DcxListItem): DcxListItem[] {
    return item.children ?? [];
  }

  isSelected(index: number): boolean {
    if (!this.selectable) return false;
    return this.selectedIndices.includes(index);
  }

  resolveAriaSelected(
    item: DcxListItem,
    index: number,
  ): boolean | null {
    if (this.isItemSelected) {
      return this.isItemSelected(item, index);
    }

    return this.selectable && !this.externalSelection
      ? this.isSelected(index)
      : null;
  }

  onItemClick(item: DcxListItem, index: number) {
    if (
      !this.selectable ||
      item.disabled ||
      item.divider
    ) {
      return;
    }

    if (this.externalSelection) {
      this.emit('itemSelected', { item, index });
      return;
    }

    if (this.multiSelect) {
      if (this.isSelected(index)) {
        this.selectedIndices =
          this.selectedIndices.filter(i => i !== index);

        this.emit('itemDeselected', {
          item,
          index,
        });
      } else {
        this.selectedIndices = [
          ...this.selectedIndices,
          index,
        ];

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

  onKeydown(
    event: KeyboardEvent,
    item: DcxListItem,
    index: number,
  ) {
    const children = this.getChildren(item);

    if (
      (event.key === 'Enter' ||
        event.key === ' ') &&
      !item.disabled
    ) {
      event.preventDefault();
      this.onItemClick(item, index);
    }

    if (
      event.key === 'ArrowRight' &&
      children.length
    ) {
      event.preventDefault();

      const li = event.currentTarget as HTMLElement;

      const firstChild =
        li.querySelector<HTMLElement>(
          '.dcx-list-nested [tabindex="0"]',
        );

      firstChild?.focus();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();

      const li = event.currentTarget as HTMLElement;

      const parent =
        li
          .closest('.dcx-list-nested')
          ?.closest<HTMLElement>('li');

      parent?.focus();
    }
  }

  getItemClasses(
    item: DcxListItem,
    index: number,
  ) {
    const classes = ['dcx-list-item'];

    if (this.selectable)
      classes.push('selectable');

    if (this.isSelected(index))
      classes.push('selected');

    if (item.disabled)
      classes.push('disabled');

    if (
      item.children &&
      item.children.length
    ) {
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
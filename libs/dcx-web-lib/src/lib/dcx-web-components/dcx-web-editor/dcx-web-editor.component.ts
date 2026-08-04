import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './dcx-web-editor.component.styles';
import { template } from './dcx-web-editor.component.html';
import '../dcx-web-button/dcx-web-button.component';
import type {
  DcxEditorToolbarAction,
  DcxEditorToolbarItem,
} from '../../core/interfaces';
import {
  EDITOR_DEFAULT_ARIA_DESCRIBEDBY,
  EDITOR_DEFAULT_ARIA_LABEL,
  EDITOR_DEFAULT_DISABLED,
  EDITOR_DEFAULT_ERROR_MESSAGE,
  EDITOR_DEFAULT_INVALID,
  EDITOR_DEFAULT_LABEL,
  EDITOR_DEFAULT_MIN_HEIGHT,
  EDITOR_DEFAULT_PLACEHOLDER,
  EDITOR_DEFAULT_READONLY,
  EDITOR_DEFAULT_REQUIRED,
  EDITOR_DEFAULT_TOOLBAR_ACTIONS,
  EDITOR_DEFAULT_VALUE,
} from '../../core/defaults';

@customElement('dcx-web-editor')
export class DcxWebEditor extends LitElement {
  static override styles = styles;

  @property({ type: String })
  override accessor id = `dcx-editor-${Math.random().toString(36).substring(2, 9)}`;

  @property({ type: String })
  accessor value = EDITOR_DEFAULT_VALUE;

  @property({ type: String })
  accessor label = EDITOR_DEFAULT_LABEL;

  @property({ type: String })
  accessor placeholder = EDITOR_DEFAULT_PLACEHOLDER;

  @property({ type: Boolean })
  accessor disabled = EDITOR_DEFAULT_DISABLED;

  @property({ type: Boolean })
  accessor readonly = EDITOR_DEFAULT_READONLY;

  @property({ type: Boolean })
  accessor required = EDITOR_DEFAULT_REQUIRED;

  @property({ type: Boolean, attribute: 'is-invalid' })
  accessor isInvalid = EDITOR_DEFAULT_INVALID;

  @property({ type: String, attribute: 'error-message' })
  accessor errorMessage = EDITOR_DEFAULT_ERROR_MESSAGE;

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel: string | null = EDITOR_DEFAULT_ARIA_LABEL;

  @property({ type: String, attribute: 'aria-describedby' })
  accessor ariaDescribedBy: string | null = EDITOR_DEFAULT_ARIA_DESCRIBEDBY;

  @property({ type: String, attribute: 'min-height' })
  accessor minHeight = EDITOR_DEFAULT_MIN_HEIGHT;

  @property({ attribute: false })
  accessor toolbarActions: DcxEditorToolbarAction[] =
    EDITOR_DEFAULT_TOOLBAR_ACTIONS;

  @state() accessor focused = false;
  @state() accessor activeToolbarActions = new Set<DcxEditorToolbarAction>();
  @state() private accessor _pendingToolbarActions =
    new Set<DcxEditorToolbarAction>();

  private _viewReady = false;
  private _savedRange: Range | null = null;
  private readonly _onDocumentSelectionChange = (): void => {
    if (this.selectionBelongsToEditor()) {
      this.onEditorSelectionChange();
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('selectionchange', this._onDocumentSelectionChange);
  }

  override disconnectedCallback(): void {
    document.removeEventListener(
      'selectionchange',
      this._onDocumentSelectionChange,
    );
    super.disconnectedCallback();
  }

  protected override firstUpdated(): void {
    this._viewReady = true;
    this.renderValue(this.value);
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('value') && !this.isEditorFocused()) {
      this.renderValue(this.value);
    }
  }

  get editorEl(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>('.dcx-editor__content') ?? null;
  }

  get errorId(): string {
    return `${this.id}-error`;
  }

  get describedBy(): string | null {
    const ids = [this.ariaDescribedBy, this.isInvalid ? this.errorId : null]
      .filter(Boolean)
      .join(' ')
      .trim();
    return ids.length ? ids : null;
  }

  get isDisabled(): boolean {
    return this.disabled;
  }

  get editorClasses(): string {
    const classes = ['dcx-editor__content'];
    if (this.isDisabled) classes.push('is-disabled');
    if (this.readonly) classes.push('is-readonly');
    if (this.isInvalid) classes.push('is-invalid');
    if (this.focused) classes.push('is-focused');
    return classes.join(' ');
  }

  get toolbarItems(): DcxEditorToolbarItem[] {
    const itemMap: Record<DcxEditorToolbarAction, DcxEditorToolbarItem> = {
      bold: { action: 'bold', icon: 'type-bold', ariaLabel: 'Negrita' },
      italic: { action: 'italic', icon: 'type-italic', ariaLabel: 'Cursiva' },
      underline: {
        action: 'underline',
        icon: 'type-underline',
        ariaLabel: 'Subrayado',
      },
      orderedList: {
        action: 'orderedList',
        icon: 'list-ol',
        ariaLabel: 'Lista numerada',
      },
      unorderedList: {
        action: 'unorderedList',
        icon: 'list-ul',
        ariaLabel: 'Lista con viñetas',
      },
      removeFormat: {
        action: 'removeFormat',
        icon: 'eraser',
        ariaLabel: 'Quitar formato',
      },
    };

    return this.toolbarActions.map(action => itemMap[action]);
  }

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true }),
    );
  }

  onInput(): void {
    if (this.isDisabled || this.readonly) return;
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.updateValueFromEditor();
  }

  onFocus(): void {
    this.focused = true;
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.emit('focusEvent');
  }

  onBlur(): void {
    this.focused = false;
    this.activeToolbarActions = new Set();
    this.emit('blurEvent');
  }

  applyCommand(item: DcxEditorToolbarItem): void {
    if (this.isDisabled || this.readonly) return;
    this.restoreSelection();
    this.applyToolbarAction(item.action);
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.updateValueFromEditor();
  }

  onToolbarMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  onToolbarButtonClick(item: DcxEditorToolbarItem): void {
    this.applyCommand(item);
  }

  onEditorSelectionChange(): void {
    this.saveSelection();
    this.updateActiveToolbarActions();
  }

  onBeforeInput(event: InputEvent): void {
    if (this.isDisabled || this.readonly) return;
    if (event.inputType !== 'insertText' || !event.data) return;
    // Spaces are handled natively by the browser, which uses &nbsp; where needed
    // to prevent HTML whitespace collapsing (leading, trailing, consecutive spaces).
    if (event.data === ' ') return;

    event.preventDefault();
    this.restoreSelection();
    this.insertTextWithToolbarState(event.data);
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.updateValueFromEditor();
  }

  isToolbarActionActive(action: DcxEditorToolbarAction): boolean {
    return this.activeToolbarActions.has(action);
  }

  saveSelection(): void {
    const editor = this.editorEl;
    const selection = this.getActiveSelection();
    if (!editor || !selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (
      editor.contains(range.commonAncestorContainer) ||
      editor === range.commonAncestorContainer
    ) {
      this._savedRange = range.cloneRange();
    }
  }

  private getActiveSelection(): Selection | null {
    const root = this.shadowRoot as
      | (ShadowRoot & { getSelection?: () => Selection | null })
      | null;
    if (root?.getSelection) return root.getSelection();
    return window.getSelection();
  }

  private restoreSelection(): void {
    const editor = this.editorEl;
    if (!editor) return;

    editor.focus();
    const selection = this.getActiveSelection();
    if (!selection) return;

    selection.removeAllRanges();
    if (this._savedRange) {
      selection.addRange(this._savedRange);
    }
  }

  private applyToolbarAction(action: DcxEditorToolbarAction): void {
    const range = this.getEditableRange();
    if (range?.collapsed) {
      if (action === 'removeFormat') {
        this._pendingToolbarActions = new Set();
        (['italic', 'underline', 'bold'] as DcxEditorToolbarAction[]).forEach(
          a => {
            if (this.isInlineActionActive(a)) this.escapeInlineFormat(a);
          },
        );
        return;
      }
      this.togglePendingToolbarAction(action);
      return;
    }

    const handlers: Record<DcxEditorToolbarAction, () => void> = {
      bold: () => this.wrapSelection('strong'),
      italic: () => this.wrapSelection('em'),
      underline: () => this.wrapSelection('u'),
      orderedList: () => this.wrapSelectionWithList('ol'),
      unorderedList: () => this.wrapSelectionWithList('ul'),
      removeFormat: () => this.replaceSelectionWithPlainText(),
    };

    handlers[action]();
    this._pendingToolbarActions = new Set();
  }

  private wrapSelection(tagName: string): void {
    const range = this.getEditableRange();
    if (!range || range.collapsed) return;

    const wrapper = document.createElement(tagName);
    wrapper.append(range.extractContents());
    range.insertNode(wrapper);
    this.moveSelectionAfter(wrapper);
  }

  private wrapSelectionWithList(tagName: 'ol' | 'ul'): void {
    const range = this.getEditableRange();
    if (!range || range.collapsed) return;

    const list = document.createElement(tagName);
    const item = document.createElement('li');
    item.append(range.extractContents());
    list.append(item);
    range.insertNode(list);
    this.moveSelectionAfter(list);
  }

  private replaceSelectionWithPlainText(): void {
    const range = this.getEditableRange();
    if (!range || range.collapsed) return;

    const temp = document.createElement('div');
    temp.append(range.cloneContents());
    const lines = this.getPlainText(temp).split(/\r?\n/);

    range.deleteContents();
    this.cleanupFormattingAtRange(range);

    const fragment = document.createDocumentFragment();
    lines.forEach((l, i) => {
      if (i === lines.length - 1 && !l && i > 0) return;
      if (i > 0) fragment.append(document.createElement('br'));
      fragment.append(l);
    });

    const last = fragment.lastChild;
    if (last) {
      range.insertNode(fragment);
      this.moveSelectionAfter(last);
    }
  }

  private cleanupFormattingAtRange(range: Range): void {
    const editor = this.editorEl;
    const tags = [
      'STRONG',
      'B',
      'EM',
      'I',
      'U',
      'LI',
      'UL',
      'OL',
      'SPAN',
      'P',
      'DIV',
    ];
    let a;
    while (
      editor &&
      (a = this.getClosestAncestorTag(range.startContainer, tags)) &&
      a !== editor
    ) {
      if (this.isNodeEmpty(a)) {
        range.setStartBefore(a);
        range.collapse(true);
        a.remove();
      } else {
        const r = range.cloneRange();
        r.setEndAfter(a);
        a.after(r.extractContents());
        range.setStartAfter(a);
        range.collapse(true);
        if (this.isNodeEmpty(a)) a.remove();
      }
    }
  }

  private getPlainText(el: HTMLElement): string {
    const clone = el.cloneNode(true) as HTMLElement;
    const M = '\ue000';
    clone.querySelectorAll('br').forEach(b => b.replaceWith(M));
    clone.querySelectorAll('div, p, li').forEach(e => {
      e.prepend('\n');
      e.append('\n');
    });
    return (clone.textContent || '')
      .replace(/\n+/g, '\n')
      .split(M)
      .join('\n')
      .replace(/^\n|\n$/g, '');
  }

  private getEditableRange(): Range | null {
    const editor = this.editorEl;
    const selection = this.getActiveSelection();
    if (!editor || !selection || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    if (
      editor.contains(range.commonAncestorContainer) ||
      editor === range.commonAncestorContainer
    ) {
      return range;
    }

    return null;
  }

  private moveSelectionAfter(node: Node): void {
    const selection = this.getActiveSelection();
    if (!selection) return;

    const range = document.createRange();
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    this._savedRange = range.cloneRange();
  }

  private moveSelectionToEnd(node: Node): void {
    const selection = this.getActiveSelection();
    if (!selection) return;

    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    this._savedRange = range.cloneRange();
  }

  private togglePendingToolbarAction(action: DcxEditorToolbarAction): void {
    const pendingActions = new Set(this._pendingToolbarActions);
    const handlers: Partial<Record<DcxEditorToolbarAction, () => void>> = {
      removeFormat: () => pendingActions.clear(),
      orderedList: () => this.togglePendingListAction(pendingActions, action),
      unorderedList: () => this.togglePendingListAction(pendingActions, action),
    };

    const handler =
      handlers[action] ??
      (() => this.togglePendingInlineAction(pendingActions, action));
    handler();

    this._pendingToolbarActions = pendingActions;
  }

  private togglePendingListAction(
    pendingActions: Set<DcxEditorToolbarAction>,
    action: DcxEditorToolbarAction,
  ): void {
    const oppositeAction =
      action === 'orderedList' ? 'unorderedList' : 'orderedList';
    pendingActions.delete(oppositeAction);
    this.toggleSetValue(pendingActions, action);
  }

  private togglePendingInlineAction(
    pendingActions: Set<DcxEditorToolbarAction>,
    action: DcxEditorToolbarAction,
  ): void {
    if (!this.isInlineActionActive(action)) {
      this.toggleSetValue(pendingActions, action);
      return;
    }

    pendingActions.delete(action);
    this.escapeInlineFormat(action);
  }

  private toggleSetValue(
    values: Set<DcxEditorToolbarAction>,
    value: DcxEditorToolbarAction,
  ): void {
    const operation = values.has(value) ? 'delete' : 'add';
    values[operation](value);
  }

  private insertTextWithToolbarState(text: string): void {
    const range = this.getEditableRange();
    if (!range) return;

    const pendingActions = this._pendingToolbarActions;
    const textNode = document.createTextNode(text);
    const formattedNode = this.wrapTextNodeWithPendingInlineFormats(textNode);
    const listAction = this.getPendingListAction(pendingActions);

    range.deleteContents();

    if (!listAction) {
      this.insertNodeAtRange(range, formattedNode);
      return;
    }

    this.insertNodeInList(range, formattedNode, listAction);
  }

  private getPendingListAction(
    pendingActions: Set<DcxEditorToolbarAction>,
  ): DcxEditorToolbarAction | null {
    const listActions: DcxEditorToolbarAction[] = [
      'orderedList',
      'unorderedList',
    ];
    return listActions.find(action => pendingActions.has(action)) ?? null;
  }

  private insertNodeAtRange(range: Range, node: Node): void {
    range.insertNode(node);
    this.moveSelectionAfter(node);
  }

  private insertNodeInList(
    range: Range,
    node: Node,
    action: DcxEditorToolbarAction,
  ): void {
    const listItem = this.getCurrentListItem(range);
    if (listItem) {
      this.insertNodeAtRange(range, node);
      return;
    }

    const list = document.createElement(action === 'orderedList' ? 'ol' : 'ul');
    const item = document.createElement('li');
    item.append(node);
    list.append(item);
    range.insertNode(list);
    this.moveSelectionToEnd(item);
  }

  private wrapTextNodeWithPendingInlineFormats(textNode: Text): Node {
    let node: Node = textNode;
    const pendingActions = this._pendingToolbarActions;

    [
      ['underline', 'u'],
      ['italic', 'em'],
      ['bold', 'strong'],
    ].forEach(([action, tagName]) => {
      if (!pendingActions.has(action as DcxEditorToolbarAction)) return;

      const wrapper = document.createElement(tagName);
      wrapper.append(node);
      node = wrapper;
    });

    return node;
  }

  private getCurrentListItem(range: Range): HTMLLIElement | null {
    let current: Node | null =
      range.startContainer.nodeType === Node.ELEMENT_NODE
        ? range.startContainer
        : range.startContainer.parentElement;

    while (current && current !== this.editorEl) {
      if (
        current.nodeType === Node.ELEMENT_NODE &&
        (current as HTMLElement).tagName === 'LI'
      ) {
        return current as HTMLLIElement;
      }

      current = current.parentElement;
    }

    return null;
  }

  private escapeInlineFormat(action: DcxEditorToolbarAction): void {
    const range = this.getEditableRange();
    if (!range || !range.collapsed) return;

    const wrapper = this.getClosestInlineFormatWrapper(
      range.startContainer,
      action,
    );
    const parent = wrapper?.parentNode;
    if (!wrapper || !parent) return;

    const afterRange = document.createRange();
    afterRange.setStart(range.startContainer, range.startOffset);
    afterRange.setEnd(wrapper, wrapper.childNodes.length);
    const afterContents = afterRange.extractContents();
    const caretNode = document.createTextNode('');

    if (this.isNodeEmpty(wrapper)) {
      parent.insertBefore(caretNode, wrapper);
      wrapper.remove();
    } else {
      parent.insertBefore(caretNode, wrapper.nextSibling);
    }

    if (!this.isNodeEmpty(afterContents)) {
      const afterWrapper = wrapper.cloneNode(false) as HTMLElement;
      afterWrapper.appendChild(afterContents);
      parent.insertBefore(afterWrapper, caretNode.nextSibling);
    }

    this.moveSelectionToEnd(caretNode);
  }

  private isInlineActionActive(action: DcxEditorToolbarAction): boolean {
    const node = this.getSelectionContextNode();
    return !!node && !!this.getClosestInlineFormatWrapper(node, action);
  }

  private getClosestInlineFormatWrapper(
    node: Node,
    action: DcxEditorToolbarAction,
  ): HTMLElement | null {
    const tagsByAction: Partial<Record<DcxEditorToolbarAction, string[]>> = {
      bold: ['B', 'STRONG'],
      italic: ['I', 'EM'],
      underline: ['U'],
    };
    const tagNames = tagsByAction[action];
    if (!tagNames) return null;

    return this.getClosestAncestorTag(node, tagNames);
  }

  private updateActiveToolbarActions(): void {
    const activeActions = new Set<DcxEditorToolbarAction>(
      this._pendingToolbarActions,
    );
    const node = this.getSelectionContextNode();
    if (!node) {
      this.activeToolbarActions = activeActions;
      return;
    }

    const actionTags: Array<[DcxEditorToolbarAction, string[]]> = [
      ['bold', ['B', 'STRONG']],
      ['italic', ['I', 'EM']],
      ['underline', ['U']],
      ['orderedList', ['OL']],
      ['unorderedList', ['UL']],
    ];
    actionTags
      .filter(([, tagNames]) => this.hasAncestorTag(node, tagNames))
      .forEach(([action]) => activeActions.add(action));

    this.activeToolbarActions = activeActions;
  }

  private getSelectionContextNode(): Node | null {
    const editor = this.editorEl;
    const selection = this.getActiveSelection();
    if (!editor || !selection || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    const node = range.startContainer;
    return editor.contains(node) || editor === node ? node : null;
  }

  private hasAncestorTag(node: Node, tagNames: string[]): boolean {
    return !!this.getClosestAncestorTag(node, tagNames);
  }

  private getClosestAncestorTag(
    node: Node,
    tagNames: string[],
  ): HTMLElement | null {
    const editor = this.editorEl;
    let current: Node | null =
      node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

    while (current && current !== editor) {
      if (
        current.nodeType === Node.ELEMENT_NODE &&
        tagNames.includes((current as HTMLElement).tagName)
      ) {
        return current as HTMLElement;
      }

      current = current.parentElement;
    }

    return null;
  }

  private isNodeEmpty(node: Node): boolean {
    if (node.nodeType === Node.TEXT_NODE) {
      const content = node.textContent || '';
      // Strip zero-width chars and newlines (browser artifacts) but preserve spaces
      return content.replace(/[\u200B-\u200D\uFEFF\r\n]/g, '').length === 0;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.tagName === 'BR') return true;
      if (el.childNodes.length === 0) {
        const content = el.textContent || '';
        return content.replace(/[\u200B-\u200D\uFEFF]/g, '').trim().length === 0;
      }
    }

    return Array.from(node.childNodes).every(child => this.isNodeEmpty(child));
  }

  private selectionBelongsToEditor(): boolean {
    return !!this.getSelectionContextNode();
  }

  private updateValueFromEditor(): void {
    const editor = this.editorEl;
    if (!editor) return;

    if (this.isNodeEmpty(editor)) {
      if (editor.innerHTML !== '') {
        editor.innerHTML = '';
      }
    }

    const nextValue = this.sanitizeHtml(editor.innerHTML);
    this.value = nextValue;
    this.emit('valueChange', nextValue);
  }

  private isEditorFocused(): boolean {
    return this.shadowRoot?.activeElement === this.editorEl;
  }

  private renderValue(value: string): void {
    if (!this._viewReady) return;
    const editor = this.editorEl;
    if (!editor) return;

    const sanitizedValue = this.sanitizeHtml(value);
    if (editor.innerHTML !== sanitizedValue) {
      editor.innerHTML = sanitizedValue;
    }
  }

  private sanitizeHtml(value: string): string {
    const tpl = document.createElement('template');
    tpl.innerHTML = value ?? '';

    tpl.content
      .querySelectorAll('script, style, iframe, object, embed, link, meta')
      .forEach(el => el.remove());

    tpl.content.querySelectorAll('*').forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        const name = attr.name.toLowerCase();
        const isUrlAttr =
          name === 'href' || name === 'src' || name === 'xlink:href';
        if (name.startsWith('on')) {
          el.removeAttribute(attr.name);
        } else if (isUrlAttr && /^\s*javascript:/i.test(attr.value)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    const container = document.createElement('div');
    container.append(tpl.content.cloneNode(true));
    return container.innerHTML;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-editor': DcxWebEditor;
  }
}

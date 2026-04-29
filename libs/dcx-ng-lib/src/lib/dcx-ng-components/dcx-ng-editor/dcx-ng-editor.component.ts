import {
  AfterViewInit,
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  model,
  output,
  signal,
  SecurityContext,
  ViewChild,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
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
} from '../../core/mock';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';

let uuid = 0;

@Component({
  selector: 'dcx-ng-editor',
  standalone: true,
  imports: [CommonModule, DcxNgButtonComponent],
  templateUrl: './dcx-ng-editor.component.html',
  styleUrls: ['./dcx-ng-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgEditorComponent),
      multi: true,
    },
  ],
})
export class DcxNgEditorComponent implements AfterViewInit {
  @ViewChild('editor') editorRef?: ElementRef<HTMLElement>;

  id = input<string>(`dcx-editor-${++uuid}`);
  value = model<string>(EDITOR_DEFAULT_VALUE);
  label = input<string>(EDITOR_DEFAULT_LABEL);
  placeholder = input<string>(EDITOR_DEFAULT_PLACEHOLDER);
  disabled = input(EDITOR_DEFAULT_DISABLED, {
    transform: booleanAttribute,
  });
  readonly = input(EDITOR_DEFAULT_READONLY, {
    transform: booleanAttribute,
  });
  required = input(EDITOR_DEFAULT_REQUIRED, {
    transform: booleanAttribute,
  });
  isInvalid = input(EDITOR_DEFAULT_INVALID, {
    transform: booleanAttribute,
  });
  errorMessage = input<string>(EDITOR_DEFAULT_ERROR_MESSAGE);
  ariaLabel = input<string | null>(EDITOR_DEFAULT_ARIA_LABEL);
  ariaDescribedBy = input<string | null>(EDITOR_DEFAULT_ARIA_DESCRIBEDBY);
  minHeight = input<string>(EDITOR_DEFAULT_MIN_HEIGHT);
  toolbarActions = input<DcxEditorToolbarAction[]>(
    EDITOR_DEFAULT_TOOLBAR_ACTIONS,
  );

  valueChange = output<string>();
  blurEvent = output<void>();
  focusEvent = output<void>();

  focused = signal(false);
  activeToolbarActions = signal<Set<DcxEditorToolbarAction>>(new Set());
  private pendingToolbarActions = signal<Set<DcxEditorToolbarAction>>(new Set());

  private onChange: (value: string) => void = () => null;
  private onTouched: () => void = () => null;
  private viewReady = false;
  private cvaDisabled = signal(false);
  private savedRange: Range | null = null;

  readonly errorId = computed(() => `${this.id()}-error`);

  readonly describedBy = computed(() => {
    const ids = [
      this.ariaDescribedBy(),
      this.isInvalid() ? this.errorId() : null,
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
    return ids.length ? ids : null;
  });

  readonly editorClasses = computed(() => {
    const classes = ['dcx-ng-editor__content'];
    if (this.isDisabled()) classes.push('is-disabled');
    if (this.readonly()) classes.push('is-readonly');
    if (this.isInvalid()) classes.push('is-invalid');
    if (this.focused()) classes.push('is-focused');
    return classes.join(' ');
  });

  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly toolbarItems = computed<DcxEditorToolbarItem[]>(() => {
    const itemMap: Record<DcxEditorToolbarAction, DcxEditorToolbarItem> = {
      bold: {
        action: 'bold',
        icon: 'type-bold',
        ariaLabel: 'Negrita',
      },
      italic: {
        action: 'italic',
        icon: 'type-italic',
        ariaLabel: 'Cursiva',
      },
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

    return this.toolbarActions().map(action => itemMap[action]);
  });

  constructor(private readonly sanitizer: DomSanitizer) {
    effect(() => {
      const value = this.value();
      untracked(() => {
        if (!this.isEditorFocused()) {
          this.renderValue(value);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderValue(this.value());
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  onInput(): void {
    if (this.isDisabled() || this.readonly()) return;
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.updateValueFromEditor();
  }

  onFocus(): void {
    this.focused.set(true);
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.focusEvent.emit();
  }

  onBlur(): void {
    this.focused.set(false);
    this.activeToolbarActions.set(new Set());
    this.onTouched();
    this.blurEvent.emit();
  }

  applyCommand(item: DcxEditorToolbarItem): void {
    if (this.isDisabled() || this.readonly()) return;
    this.restoreSelection();
    this.applyToolbarAction(item.action);
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.updateValueFromEditor();
  }

  onToolbarMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  onToolbarPointerDown(event: PointerEvent, item: DcxEditorToolbarItem): void {
    event.preventDefault();
    this.applyCommand(item);
  }

  onEditorSelectionChange(): void {
    this.saveSelection();
    this.updateActiveToolbarActions();
  }

  onBeforeInput(event: InputEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    if (event.inputType !== 'insertText' || !event.data) return;

    event.preventDefault();
    this.restoreSelection();
    this.insertTextWithToolbarState(event.data);
    this.saveSelection();
    this.updateActiveToolbarActions();
    this.updateValueFromEditor();
  }

  isToolbarActionActive(action: DcxEditorToolbarAction): boolean {
    return this.activeToolbarActions().has(action);
  }

  @HostListener('document:selectionchange')
  onDocumentSelectionChange(): void {
    if (this.selectionBelongsToEditor()) {
      this.onEditorSelectionChange();
    }
  }

  saveSelection(): void {
    const editor = this.editorRef?.nativeElement;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (
      editor.contains(range.commonAncestorContainer) ||
      editor === range.commonAncestorContainer
    ) {
      this.savedRange = range.cloneRange();
    }
  }

  private restoreSelection(): void {
    const editor = this.editorRef?.nativeElement;
    if (!editor) return;

    editor.focus();
    const selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    if (this.savedRange) {
      selection.addRange(this.savedRange);
    }
  }

  private applyToolbarAction(action: DcxEditorToolbarAction): void {
    const range = this.getEditableRange();
    if (range?.collapsed) {
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
    this.pendingToolbarActions.set(new Set());
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

    const textNode = document.createTextNode(range.toString());
    range.deleteContents();
    range.insertNode(textNode);
    this.moveSelectionAfter(textNode);
  }

  private getEditableRange(): Range | null {
    const editor = this.editorRef?.nativeElement;
    const selection = window.getSelection();
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
    const selection = window.getSelection();
    if (!selection) return;

    const range = document.createRange();
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    this.savedRange = range.cloneRange();
  }

  private moveSelectionToEnd(node: Node): void {
    const selection = window.getSelection();
    if (!selection) return;

    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    this.savedRange = range.cloneRange();
  }

  private togglePendingToolbarAction(action: DcxEditorToolbarAction): void {
    const pendingActions = new Set(this.pendingToolbarActions());

    if (action === 'removeFormat') {
      pendingActions.clear();
    } else if (action === 'orderedList' || action === 'unorderedList') {
      const oppositeAction =
        action === 'orderedList' ? 'unorderedList' : 'orderedList';
      pendingActions.delete(oppositeAction);
      this.toggleSetValue(pendingActions, action);
    } else if (this.isInlineActionActive(action)) {
      pendingActions.delete(action);
      this.escapeInlineFormat(action);
    } else {
      this.toggleSetValue(pendingActions, action);
    }

    this.pendingToolbarActions.set(pendingActions);
  }

  private toggleSetValue(
    values: Set<DcxEditorToolbarAction>,
    value: DcxEditorToolbarAction,
  ): void {
    if (values.has(value)) {
      values.delete(value);
    } else {
      values.add(value);
    }
  }

  private insertTextWithToolbarState(text: string): void {
    const range = this.getEditableRange();
    if (!range) return;

    const pendingActions = this.pendingToolbarActions();
    const textNode = document.createTextNode(text);
    const formattedNode = this.wrapTextNodeWithPendingInlineFormats(textNode);
    const listAction = pendingActions.has('orderedList')
      ? 'orderedList'
      : pendingActions.has('unorderedList')
        ? 'unorderedList'
        : null;

    range.deleteContents();

    if (listAction) {
      const listItem = this.getCurrentListItem(range);
      if (listItem) {
        range.insertNode(formattedNode);
        this.moveSelectionAfter(formattedNode);
        return;
      }

      const list = document.createElement(
        listAction === 'orderedList' ? 'ol' : 'ul',
      );
      const item = document.createElement('li');
      item.append(formattedNode);
      list.append(item);
      range.insertNode(list);
      this.moveSelectionToEnd(item);
      return;
    }

    range.insertNode(formattedNode);
    this.moveSelectionAfter(formattedNode);
  }

  private wrapTextNodeWithPendingInlineFormats(textNode: Text): Node {
    let node: Node = textNode;
    const pendingActions = this.pendingToolbarActions();

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

    while (current && current !== this.editorRef?.nativeElement) {
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
      this.pendingToolbarActions(),
    );
    const node = this.getSelectionContextNode();

    if (node) {
      if (this.hasAncestorTag(node, ['B', 'STRONG'])) activeActions.add('bold');
      if (this.hasAncestorTag(node, ['I', 'EM'])) activeActions.add('italic');
      if (this.hasAncestorTag(node, ['U'])) activeActions.add('underline');
      if (this.hasAncestorTag(node, ['OL'])) activeActions.add('orderedList');
      if (this.hasAncestorTag(node, ['UL'])) activeActions.add('unorderedList');
    }

    this.activeToolbarActions.set(activeActions);
  }

  private getSelectionContextNode(): Node | null {
    const editor = this.editorRef?.nativeElement;
    const selection = window.getSelection();
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
    const editor = this.editorRef?.nativeElement;
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
      return !node.textContent;
    }

    if (!node.childNodes.length) {
      return !node.textContent;
    }

    return Array.from(node.childNodes).every(child => this.isNodeEmpty(child));
  }

  private selectionBelongsToEditor(): boolean {
    return !!this.getSelectionContextNode();
  }

  private updateValueFromEditor(): void {
    const nextValue = this.editorRef?.nativeElement.innerHTML ?? '';
    this.value.set(nextValue);
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  private isEditorFocused(): boolean {
    return document.activeElement === this.editorRef?.nativeElement;
  }

  private renderValue(value: string): void {
    if (!this.viewReady || !this.editorRef) return;
    const sanitizedValue =
      this.sanitizer.sanitize(SecurityContext.HTML, value) ?? '';
    const element = this.editorRef.nativeElement;
    if (element.innerHTML !== sanitizedValue) {
      element.innerHTML = sanitizedValue;
    }
  }
}

import {
  AfterViewInit,
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
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
    this.updateValueFromEditor();
  }

  onFocus(): void {
    this.focused.set(true);
    this.saveSelection();
    this.focusEvent.emit();
  }

  onBlur(): void {
    this.focused.set(false);
    this.onTouched();
    this.blurEvent.emit();
  }

  applyCommand(item: DcxEditorToolbarItem): void {
    if (this.isDisabled() || this.readonly()) return;
    this.restoreSelection();
    this.applyToolbarAction(item.action);
    this.saveSelection();
    this.updateValueFromEditor();
  }

  onToolbarMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  onToolbarPointerDown(event: PointerEvent, item: DcxEditorToolbarItem): void {
    event.preventDefault();
    this.applyCommand(item);
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
    const handlers: Record<DcxEditorToolbarAction, () => void> = {
      bold: () => this.wrapSelection('strong'),
      italic: () => this.wrapSelection('em'),
      underline: () => this.wrapSelection('u'),
      orderedList: () => this.wrapSelectionWithList('ol'),
      unorderedList: () => this.wrapSelectionWithList('ul'),
      removeFormat: () => this.replaceSelectionWithPlainText(),
    };

    handlers[action]();
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

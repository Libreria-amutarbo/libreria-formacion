import { LitElement } from 'lit';
import {
  customElement,
  property,
  state,
} from 'lit/decorators.js';

import { renderDcxWebSelectTemplate } from './dcx-web-select.component.html';
import { dcxWebSelectStyles } from './dcx-web-select.component.styles';

import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';
import '../dcx-web-input/dcx-web-input.component';

import type { DcxSpacing } from '../../core/interfaces';

import type { DcxSelectOptions } from '../../core/interfaces/select';

import {
  PLACEHOLDER,
  SEARCHABLE,
  CLEARABLE,
  REQUIRED,
  ISINVALID,
  VALUEINPUT,
  ERRORMESSAGE,
  ERRORICON,
  SPACING_DEFAULT,
} from '../../core/defaults';

type DcxSelectValue =
  | string
  | number
  | null;

type MoveDirection =
  | 'next'
  | 'prev'
  | 'first'
  | 'last';

@customElement('dcx-web-select')
export class DcxWebSelect extends LitElement {
  @property({ type: String })
  accessor label = '';

  @property({ attribute: false })
  accessor options: DcxSelectOptions[] =
    [];

  @property({ type: String })
  accessor placeholder =
    PLACEHOLDER;

  @property({
    type: String,
    attribute: 'aria-label',
  })
  override accessor ariaLabel:
    | string
    | null = null;

  @property({ type: Boolean })
  accessor searchable =
    SEARCHABLE;

  @property({ type: Boolean })
  accessor clearable =
    CLEARABLE;

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: Boolean })
  accessor required =
    REQUIRED;

  @property({ type: Boolean })
  accessor isInvalid =
    ISINVALID;

  @property({ type: String })
  accessor errorMessage =
    ERRORMESSAGE;

  @property({ type: String })
  accessor errorIcon =
    ERRORICON;

  @property({ attribute: false })
  accessor valueInput:
    | string
    | number
    | null = VALUEINPUT;

  @property({ type: String })
  accessor spacing: DcxSpacing = 'm';

  @state()
  accessor value: DcxSelectValue =
    null;

  @state()
  accessor isOpen = false;

  @state()
  accessor search = '';

  @state()
  accessor activeIndex = -1;

  @state()
  accessor receivedFromExternal =
    false;

  static override styles =
    dcxWebSelectStyles;

  override id = `dcx-select-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  get selectId() {
    return this.id;
  }

  get labelId() {
    return `${this.id}-label`;
  }

  private controlElement:
    | HTMLElement
    | null = null;

  override connectedCallback() {
    super.connectedCallback();

    document.addEventListener(
      'click',
      this.handleDocumentClick,
      true,
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(
      'click',
      this.handleDocumentClick,
      true,
    );
  }

  protected override updated(
    changed: Map<string, unknown>,
  ) {
    if (
      changed.has('valueInput') &&
      !this.receivedFromExternal
    ) {
      this.value =
        this.valueInput;
    }
  }

  get filtered() {
    const term =
      this.search.toLowerCase();

    return this.options.filter(
      option =>
        option.label
          .toLowerCase()
          .includes(term),
    );
  }

  get selectedLabel() {
    const value = this.value;

    if (value === null) {
      return this.placeholder;
    }

    const option =
      this.options.find(
        option =>
          option.value ===
          value,
      );

    return (
      option?.label ??
      this.placeholder
    );
  }

  get activeDescendant() {
    if (
      !this.isOpen ||
      this.activeIndex < 0
    ) {
      return null;
    }

    return `${this.selectId}-opt-${this.activeIndex}`;
  }

  getControlClasses() {
    const classes: string[] = ['dcx-select__control'];

    if (this.isOpen) {
      classes.push('is-open');
    }

    if (this.disabled) {
      classes.push('is-disabled');
    }

    if (this.isInvalid) {
      classes.push('is-invalid');
    }

    if (this.spacing) {
      classes.push(`dcx-select--spacing-${this.spacing}`);
    }

    return classes.join(' ');
  }

  emit(
    name: string,
    detail?: unknown,
  ) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  toggle = () => {
    if (this.disabled) {
      return;
    }

    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  private open() {
    const options =
      this.filtered;

    const currentIndex =
      options.findIndex(
        option =>
          option.value ===
          this.value,
      );

    this.activeIndex =
      currentIndex >= 0
        ? currentIndex
        : 0;

    this.isOpen = true;

    queueMicrotask(() => {
      const active =
        this.renderRoot.querySelector(
          `#${this.selectId}-opt-${this.activeIndex}`,
        );

      active?.scrollIntoView({
        block: 'nearest',
      });
    });
  }

  private close() {
    this.isOpen = false;
    this.activeIndex = -1;
  }

  selectOption(
    option: DcxSelectOptions,
  ) {
    if (option.disabled) {
      return;
    }

    this.value = option.value;

    this.emit(
      'valueChange',
      option.value,
    );

    this.close();
  }

  clearValue = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    if (this.disabled) {
      return;
    }

    this.search = '';
    this.value = null;

    this.close();

    this.emit('clear');
  };

  onSearchEvent = (
    event: CustomEvent,
  ) => {
    this.search =
      event.detail === null
        ? ''
        : String(
          event.detail,
        );

    this.activeIndex =
      this.filtered.length > 0
        ? 0
        : -1;
  };

  private handleDocumentClick =
    (event: Event) => {
      const path =
        event.composedPath();

      if (
        !path.includes(this) &&
        this.isOpen
      ) {
        this.close();
      }
    };

  private moveActive(
    direction: MoveDirection,
  ) {
    const enabledIndices =
      this.filtered
        .map((option, index) =>
          option.disabled
            ? -1
            : index,
        )
        .filter(
          index => index >= 0,
        );

    if (
      !enabledIndices.length
    ) {
      return;
    }

    const currentPosition =
      enabledIndices.indexOf(
        this.activeIndex,
      );

    let nextPosition =
      0;

    switch (direction) {
      case 'next':
        nextPosition =
          currentPosition < 0
            ? 0
            : (currentPosition +
              1) %
            enabledIndices.length;
        break;

      case 'prev':
        nextPosition =
          currentPosition < 0
            ? enabledIndices.length -
            1
            : (currentPosition -
              1 +
              enabledIndices.length) %
            enabledIndices.length;
        break;

      case 'first':
        nextPosition = 0;
        break;

      case 'last':
        nextPosition =
          enabledIndices.length -
          1;
        break;
    }

    this.activeIndex =
      enabledIndices[
      nextPosition
      ];
  }

  private confirmActive() {
    const option =
      this.filtered[
      this.activeIndex
      ];

    if (
      option &&
      !option.disabled
    ) {
      this.selectOption(
        option,
      );
    }
  }

  onKey = (
    event: KeyboardEvent,
  ) => {
    if (!this.isOpen) {
      if (
        event.key ===
        'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
        this.open();
      }

      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(
          'next',
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(
          'prev',
        );
        break;

      case 'Home':
        event.preventDefault();
        this.moveActive(
          'first',
        );
        break;

      case 'End':
        event.preventDefault();
        this.moveActive(
          'last',
        );
        break;

      case 'Enter':
        event.preventDefault();
        this.confirmActive();
        break;

      case 'Escape':
        event.preventDefault();

        this.close();

        this.controlElement?.focus();

        break;
    }
  };

  registerControlElement(
    element: HTMLElement,
  ) {
    this.controlElement =
      element;
  }

  override render() {
    return renderDcxWebSelectTemplate(
      this,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-select': DcxWebSelect;
  }
}
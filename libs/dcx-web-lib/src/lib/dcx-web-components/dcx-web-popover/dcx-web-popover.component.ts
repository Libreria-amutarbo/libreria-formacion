import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { template } from './dcx-web-popover.component.html';
import { styles } from './dcx-web-popover.component.styles';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export type DcxPopoverToggleEvent = Event | { clicked: boolean } | null;

@customElement('dcx-web-popover')
export class DcxWebPopover extends LitElement {
  private static nextId = 0;

  @query('.dcx-popover')
  accessor container!: HTMLElement | null;

  @property({ type: String })
  override accessor role = 'dialog';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel = '';

  @property({
    type: String,
    attribute: 'aria-labelledby',
  })
  accessor ariaLabelledby: string | null = null;

  @property({ type: Boolean })
  accessor autoFocus = true;

  @property({ type: Boolean })
  accessor returnFocus = true;

  @property({ type: String })
  accessor panelId = `dcx-popover-${DcxWebPopover.nextId++}`;

  @state()
  accessor isOpen = false;

  @state()
  accessor isPositioned = false;

  @state()
  accessor top = '-9999px';

  @state()
  accessor left = '-9999px';

  @state()
  accessor placement: 'bottom' | 'top' = 'bottom';

  @state()
  accessor arrowLeft = 24;

  private target: HTMLElement | null = null;

  private ignoreNextClick = false;

  private positionTimeout: ReturnType<typeof setTimeout> | null = null;

  static override styles = styles;

  override connectedCallback(): void {
    super.connectedCallback();

    document.addEventListener('click', this.onDocumentClick);
    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('keydown', this.onDocumentKeydown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    document.removeEventListener('click', this.onDocumentClick);
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('keydown', this.onDocumentKeydown);

    this.clearPositionTimeout();
  }

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  public toggle(
    event: DcxPopoverToggleEvent,
    targetElement?: HTMLElement,
  ): void {
    if (this.isOpen) {
      this.hide();
      return;
    }

    this.show(event, targetElement);
  }

  public show(
    event?: DcxPopoverToggleEvent,
    targetElement?: HTMLElement,
  ): void {
    const eventTarget =
      event && 'currentTarget' in event
        ? (event.currentTarget as HTMLElement | null)
        : null;

    const newTarget = targetElement || eventTarget;

    if (!newTarget || !(newTarget instanceof HTMLElement)) {
      return;
    }

    this.target = newTarget;
    this.ignoreNextClick = true;

    this.isOpen = true;

    this.emit('opened');

    this.clearPositionTimeout();

    this.positionTimeout = setTimeout(async () => {
      await this.updateComplete;

      if (!this.isOpen || !this.target || !this.target.isConnected) {
        return;
      }

      this.calculatePosition();

      if (this.autoFocus) {
        this.focusPanel();
      }
    });
  }

  public hide(
    options: {
      returnFocus?: boolean;
    } = {},
  ): void {
    if (!this.isOpen) {
      return;
    }

    const shouldReturnFocus = (options.returnFocus ?? true) && this.returnFocus;

    const trigger = this.target;

    this.isOpen = false;
    this.isPositioned = false;
    this.ignoreNextClick = false;

    this.clearPositionTimeout();

    this.target = null;

    this.emit('closed');

    if (shouldReturnFocus && trigger && trigger.isConnected) {
      trigger.focus({
        preventScroll: true,
      });
    }
  }

  private focusPanel(): void {
    if (!this.container) {
      return;
    }

    const focusable =
      this.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
      this.container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

    (focusable ?? this.container).focus({
      preventScroll: true,
    });
  }

  private clearPositionTimeout(): void {
    if (this.positionTimeout !== null) {
      clearTimeout(this.positionTimeout);
      this.positionTimeout = null;
    }
  }

  private calculatePosition(): void {
    if (!this.target || !this.target.isConnected || !this.container) {
      return;
    }

    const targetRect = this.target.getBoundingClientRect();
    const popoverRect = this.container.getBoundingClientRect();

    const gap = 8;

    const offsetParent =
      (this.container.offsetParent as HTMLElement) || document.documentElement;

    const parentRect = offsetParent.getBoundingClientRect();

    let topPosition = targetRect.bottom - parentRect.top + gap;
    let leftPosition = targetRect.left - parentRect.left;

    if (targetRect.left + popoverRect.width > window.innerWidth - 10) {
      leftPosition =
        window.innerWidth - 10 - popoverRect.width - parentRect.left;

      if (leftPosition < 0) {
        leftPosition = 0;
      }
    }

    const wouldGoBelow =
      targetRect.bottom + gap + popoverRect.height > window.innerHeight;

    const topIfFlipped =
      targetRect.top - parentRect.top - popoverRect.height - gap;

    const flipped = wouldGoBelow && topIfFlipped >= 0;

    if (flipped) {
      topPosition = topIfFlipped;
    }

    const panelLeftViewport = leftPosition + parentRect.left;
    const triggerCenter = targetRect.left + targetRect.width / 2;
    const rawArrow = triggerCenter - panelLeftViewport;

    const arrowLeft = Math.max(16, Math.min(rawArrow, popoverRect.width - 16));

    this.left = `${leftPosition}px`;
    this.top = `${topPosition}px`;
    this.arrowLeft = arrowLeft;
    this.placement = flipped ? 'top' : 'bottom';
    this.isPositioned = true;
  }

  private onDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.hide();
    }
  };

  private onDocumentClick = (event: Event) => {
    if (this.ignoreNextClick) {
      this.ignoreNextClick = false;
      return;
    }

    if (!this.isOpen || !this.target || !this.container) {
      return;
    }

    const path = event.composedPath ? event.composedPath() : [];
    const clickTarget = event.target as Node;

    if (
      clickTarget &&
      !document.contains(clickTarget) &&
      !path.includes(document)
    ) {
      return;
    }

    const isInsideTarget = Boolean(
      (this.target && path.includes(this.target)) ||
      (this.target && clickTarget && this.target.contains(clickTarget)),
    );

    const isInsidePopover = Boolean(
      (this.container && path.includes(this.container)) ||
      (this.container && clickTarget && this.container.contains(clickTarget)) ||
      path.includes(this),
    );

    if (!isInsideTarget && !isInsidePopover) {
      this.hide({ returnFocus: false });
    }
  };

  private onWindowResize = () => {
    if (this.isOpen && this.target && this.target.isConnected) {
      this.calculatePosition();
    }
  };

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-popover': DcxWebPopover;
  }
}

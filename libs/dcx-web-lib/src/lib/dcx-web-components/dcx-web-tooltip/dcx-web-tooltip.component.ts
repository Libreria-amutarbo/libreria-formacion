import { LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { styles } from './dcx-web-tooltip.component.styles';
import { template } from './dcx-web-tooltip.component.html';

import type {
  TooltipArrowAlignment,
  TooltipVariant,
  DcxPosition,
} from '../../core/interfaces';

import { DCX_TOOLTIP_INTERACTIVE_TAGS } from '../../core/defaults/tooltip';

@customElement('dcx-web-tooltip')
export class DcxWebTooltip extends LitElement {
  @property({ type: String })
  accessor position: DcxPosition = 'top';

  @property({ type: String })
  accessor arrowAlignment: TooltipArrowAlignment = 'center';

  @property({ type: Boolean })
  accessor hideTooltipOnClick = false;

  @property({ type: String })
  accessor content = '';

  @property({ type: String })
  accessor contentHtml = '';

  @property({ type: String })
  accessor variant: TooltipVariant = 'default';

  @state()
  accessor visible = false;

  @state()
  accessor actualPosition: DcxPosition = 'top';

  readonly tooltipId = `dcx-tooltip-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  static override styles = styles;

  get tooltipClasses() {
    const baseClass = 'dcx-ng-tooltip';

    return [
      baseClass,
      `${baseClass}--${this.actualPosition}`,
      `${baseClass}--arrow-${this.arrowAlignment}`,
      this.variant === 'primary' ? `${baseClass}--primary` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get sanitizedHtml(): string {
    return this.sanitizeContent(this.contentHtml);
  }

  override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    if (changedProperties.has('position')) {
      this.actualPosition = this.position;
    }
  }

  override firstUpdated() {
    this.actualPosition = this.position;
    this.linkTriggerToTooltip();
  }

  private linkTriggerToTooltip() {
    const slot = this.shadowRoot?.querySelector('slot');

    const nodes =
      slot?.assignedElements({
        flatten: true,
      }) ?? [];

    const trigger = nodes[0] as HTMLElement;

    if (trigger) {
      trigger.setAttribute('aria-describedby', this.tooltipId);
    }
  }

  private sanitizeContent(html: string): string {
    if (!html) {
      return '';
    }

    const doc = new DOMParser().parseFromString(html, 'text/html');

    DCX_TOOLTIP_INTERACTIVE_TAGS.forEach(tag => {
      doc.body.querySelectorAll(tag).forEach(element => {
        element.replaceWith(...Array.from(element.childNodes));
      });
    });

    return doc.body.innerHTML;
  }

  public show() {
    if (this.visible || (!this.content && !this.contentHtml)) {
      return;
    }

    this.visible = true;
  }

  public hide() {
    if (!this.visible) {
      return;
    }

    this.visible = false;
  }

  public onMouseEnter() {
    this.show();
  }

  public onMouseLeave() {
    this.hide();
  }

  public onFocusIn() {
    this.show();
  }

  public onFocusOut() {
    this.hide();
  }

  public onEscape() {
    this.hide();
  }

  public onClick() {
    if (this.hideTooltipOnClick) {
      this.hide();
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this.addEventListener('mouseenter', this.onMouseEnter);

    this.addEventListener('mouseleave', this.onMouseLeave);

    this.addEventListener('focusin', this.onFocusIn);

    this.addEventListener('focusout', this.onFocusOut);

    this.addEventListener('click', this.onClick);

    this.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.onEscape();
      }
    });
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-tooltip': DcxWebTooltip;
  }
}

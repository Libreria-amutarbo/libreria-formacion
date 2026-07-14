import { html, nothing } from 'lit';
import type { DcxWebSlider } from './dcx-web-slider.component';

export const template = (context: DcxWebSlider) => html`
  ${context.showLabel
    ? html`
        <div
          class="dcx-slider__value-label ${context.disabled
            ? 'is-disabled'
            : ''}"
        >
          <span class="dcx-slider__label">${context.textLabel}</span>
          <span class="dcx-slider__value">${context.displayValue}</span>
        </div>
      `
    : nothing}

  <dcx-web-input
    class="dcx-slider__control"
    .type="${'range'}"
    .value="${context.valueInput}"
    .min="${context.min}"
    .max="${context.max}"
    .step="${context.step}"
    ?disabled="${context.disabled}"
    .ariaLabel="${context.effectiveAriaLabel}"
    style="width: ${context.vertical ? '100px' : '100%'};"
    .orientation="${context.vertical ? 'vertical' : 'horizontal'}"
    @valueChange="${context.onInput}"
  ></dcx-web-input>
`;

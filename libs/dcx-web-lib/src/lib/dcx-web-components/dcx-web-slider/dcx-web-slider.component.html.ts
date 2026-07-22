import { html, nothing } from 'lit';
import type { DcxWebSlider } from './dcx-web-slider.component';

export const template = (host: DcxWebSlider) => html`
  ${host.showLabel
    ? html`
        <div
          class="dcx-slider__value-label ${host.disabled
            ? 'is-disabled'
            : ''}"
        >
          <span class="dcx-slider__label">${host.textLabel}</span>
          <span class="dcx-slider__value">${host.displayValue}</span>
        </div>
      `
    : nothing}

  <dcx-web-input
    class="dcx-slider__control"
    .type="${'range'}"
    .value="${host.valueInput}"
    .min="${host.min}"
    .max="${host.max}"
    .step="${host.step}"
    ?disabled="${host.disabled}"
    .ariaLabel="${host.effectiveAriaLabel}"
    style="width: ${host.vertical ? '100px' : '100%'};"
    .orientation="${host.vertical ? 'vertical' : 'horizontal'}"
    @valueChange="${host.onInput}"
  ></dcx-web-input>
`;

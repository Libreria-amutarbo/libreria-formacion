import { html, nothing } from 'lit';
import type { DcxWebRadio } from './dcx-web-radio.component';

export const template = (host: DcxWebRadio) => {
  return html`
    <fieldset
      class="dcx-radio-group"
      aria-label="${!host.label && host.ariaLabel ? host.ariaLabel : nothing}"
      aria-describedby="${host.describedBy ? host.describedBy : nothing}"
    >
      ${host.label
        ? html`<legend class="dcx-radio-group__legend">${host.label}</legend>`
        : ''}

      <div class="dcx-radio-group__options">
        ${host.options.map(
          option => html`
            <label class="${host.radioClasses(option)}">
              <input
                class="dcx-radio__native"
                type="radio"
                name="${host.name}"
                .value="${option.value}"
                .checked="${host.isChecked(option.value)}"
                ?disabled="${host.isOptionDisabled(option)}"
                aria-invalid="${host.error ? 'true' : nothing}"
                @change="${() => host.onOptionChange(option)}"
                @blur="${host.onBlur}"
              />

              <span class="dcx-radio__control" aria-hidden="true"></span>

              <span class="dcx-radio__label">${option.label}</span>
            </label>
          `
        )}
      </div>

      ${host.showError
        ? html`
            <div class="dcx-radio-group__error" role="alert" id="${host.errorId}">
              ${host.errorMessage}
            </div>
          `
        : ''}

      ${host.showHint
        ? html`
            <div class="dcx-radio-group__hint" id="${host.hintId}">
              ${host.hint}
            </div>
          `
        : ''}
    </fieldset>
  `;
};

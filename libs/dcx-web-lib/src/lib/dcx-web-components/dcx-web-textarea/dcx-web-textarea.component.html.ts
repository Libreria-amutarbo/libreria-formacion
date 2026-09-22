import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { DcxWebTextarea } from './dcx-web-textarea.component';

export const template = (host: DcxWebTextarea) => html`
  <div class="${host.getWrapperClasses()}">
    ${
      host.label
        ? html`
          <label
            class="dcx-textarea__label
            ${host.invalid ? 'dcx-textarea__label--invalid' : ''}
            ${host.disabled ? 'dcx-textarea__label--disabled' : ''}"
            for="${host.id}"
          >
            ${host.label}
            ${
              host.required
                ? html`
                  <span
                    class="dcx-textarea__required"
                  >
                    *
                  </span>
                `
                : nothing
            }
          </label>
        `
        : nothing
    }

    <textarea
      id="${host.id}"
      class="${host.getTextareaClasses()}"
      rows="${host.rows}"
      cols="${host.cols}"
      .value=${host.value}
      placeholder=${host.placeholder}
      ?disabled=${host.disabled}
      ?readonly=${host.readonly}
      style=${styleMap({
        resize: host.computedResize,
        height: host._autoHeight || '',
      })}
      maxlength=${host.maxLength ?? nothing}
      aria-label=${!host.label ? (host.ariaLabel ?? nothing) : nothing}
      aria-invalid=${host.invalid ? 'true' : nothing}
      aria-required=${host.required ? 'true' : nothing}
      aria-describedby=${host.describedBy ?? nothing}
      @input=${host.onInput}
      @focus=${host.onFocus}
      @blur=${host.onBlur}
    ></textarea>
  </div>

  ${
    host.showError
      ? html`
        <div
          class="dcx-textarea__error"
          role="alert"
          id="${host.errorId}"
        >
          ${host.errorMessage}
        </div>
      `
      : nothing
  }

  ${
    host.showHint
      ? html`
        <div
          class="dcx-textarea__hint"
          id="${host.hintId}"
        >
          ${host.hint}
        </div>
      `
      : nothing
  }
`;

import { html, nothing } from 'lit';
import type { DcxWebInput } from './dcx-web-input.component';

export function renderDcxWebInputTemplate(input: DcxWebInput) {
  return html`
    ${input.label
      ? html`
          <label
            class="dcx-input__label ${input.isInvalid
              ? 'dcx-input__label--invalid'
              : ''}"
            for="${input.id}"
            id="${input.labelId}"
          >
            ${input.label}
            ${input.required
              ? html`<span class="dcx-input__required">*</span>`
              : nothing}
          </label>
        `
      : nothing}

    <div class="dcx-input__wrapper">
      <div class="dcx-input__field">
        ${input.getInputIcon
          ? html`
              <dcx-web-icon
                class="dcx-input__leading-icon"
                name="${input.getInputIcon}"
              ></dcx-web-icon>
            `
          : nothing}

        <input
          class="${input.getInputClasses()}"
          id="${input.id}"
          name="${input.name}"
          type="${input.displayType}"
          .value="${String(input.value ?? '')}"
          placeholder="${input.placeholder}"
          inputmode="${input.inputMode}"
          autocomplete="${input.autocomplete}"
          ?readonly="${input.readonly}"
          ?disabled="${input.disabled}"
          ?required="${input.required}"
          ?checked="${input.checked}"
          ?multiple="${input.isFileType ? input.multiple : false}"
          min="${input.min}"
          max="${input.max}"
          step="${input.step}"
          aria-label="${!input.label ? input.ariaLabel ?? '' : ''}"
          aria-required="${input.required ? 'true' : 'false'}"
          aria-invalid="${String(input.isInvalid)}"
          aria-describedby="${input.describedBy ?? ''}"
          @input="${input.onInputChange}"
          @change="${input.onChangeEvent}"
          @focus="${input.onFocusEvent}"
          @blur="${input.onBlurEvent}"
          @keydown="${(e: KeyboardEvent) =>
            e.key === 'Enter' ? input.emit('enterPressed') : null}"
        />

        ${input.showActionIcon && !input.isRangeType
          ? html`
              <dcx-web-button
                class="dcx-input__action-button"
                variant="icon-only"
                size="s"
                .icon="${true}"
                iconSize="l"
                .iconName="${input.getActionButtonIcon}"
                .ariaLabel="${input.getActionButtonAriaLabel}"
                ?disabled="${input.disabled}"
                @buttonClick="${input.onActionButtonClick}"
              ></dcx-web-button>
            `
          : nothing}
      </div>

      ${input.hint && !input.isInvalid
        ? html`
            <div class="dcx-input__hint" id="${input.hintId}">
              ${input.hint}
            </div>
          `
        : nothing}

      ${input.showRequiredWarning
        ? html`
            <div class="dcx-input__error" role="alert" id="${input.errorId}">
              <span>
                ${input.requiredMessage ?? 'Este campo es requerido'}
              </span>
            </div>
          `
        : nothing}

      ${input.isInvalid && (input.errorMessage || input.errorMessages.length > 0)
        ? html`
            <div class="dcx-input__error" role="alert" id="${input.errorId}">
              <dcx-web-icon
                .name="${input.errorIcon}"
                color="var(--color-error, #dc2626)";
              ></dcx-web-icon>

              <div>
                ${input.errorMessage
                  ? html`
                      <span>
                        ${input.errorMessage}
                      </span>
                    `
                  : nothing}

                ${input.errorMessages.length
                  ? html`
                      <ul class="dcx-input__error-list">
                        ${input.errorMessages.map(
                          error => html`
                            <li>
                              ${error.message}
                            </li>
                          `,
                        )}
                      </ul>
                    `
                  : nothing}
              </div>
            </div>
          `
        : nothing}
    </div>
  `;
}

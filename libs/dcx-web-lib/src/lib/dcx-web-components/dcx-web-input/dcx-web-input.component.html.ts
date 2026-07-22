import { html, nothing } from 'lit';
import type { DcxWebInput } from './dcx-web-input.component';

export const template = (host: DcxWebInput) => {
  return html`
    ${host.label
      ? html`
          <label
            class="dcx-input__label ${host.isInvalid
              ? 'dcx-input__label--invalid'
              : ''}"
            for="${host.id}"
            id="${host.labelId}"
          >
            ${host.label}
            ${host.required
              ? html`<span class="dcx-input__required">*</span>`
              : nothing}
          </label>
        `
      : nothing}

    <div class="dcx-input__wrapper">
      <div class="dcx-input__field">
        ${host.getInputIcon
          ? html`
              <dcx-web-icon
                class="dcx-input__leading-icon"
                name="${host.getInputIcon}"
              ></dcx-web-icon>
            `
          : nothing}

        <input
          class="${host.getInputClasses()}"
          id="${host.id}"
          name="${host.name}"
          type="${host.displayType}"
          .value="${String(host.value ?? '')}"
          placeholder="${host.placeholder}"
          inputmode="${host.inputMode}"
          autocomplete="${host.autocomplete}"
          ?readonly="${host.readonly}"
          ?disabled="${host.disabled}"
          ?required="${host.required}"
          ?checked="${host.checked}"
          ?multiple="${host.isFileType ? host.multiple : false}"
          min="${host.min}"
          max="${host.max}"
          step="${host.step}"
          aria-label="${!host.label ? host.ariaLabel ?? '' : ''}"
          aria-required="${host.required ? 'true' : 'false'}"
          aria-invalid="${String(host.isInvalid)}"
          aria-describedby="${host.describedBy ?? ''}"
          @input="${host.onInputChange}"
          @change="${host.onChangeEvent}"
          @focus="${host.onFocusEvent}"
          @blur="${host.onBlurEvent}"
          @keydown="${(e: KeyboardEvent) =>
            e.key === 'Enter' ? host.emit('enterPressed') : null}"
        />

        ${host.showActionIcon && !host.isRangeType
          ? html`
              <dcx-web-button
                class="dcx-input__action-button"
                variant="icon-only"
                size="s"
                .icon="${true}"
                iconSize="l"
                .iconName="${host.getActionButtonIcon}"
                .ariaLabel="${host.getActionButtonAriaLabel}"
                ?disabled="${host.disabled}"
                @buttonClick="${host.onActionButtonClick}"
              ></dcx-web-button>
            `
          : nothing}
      </div>

      ${host.hint && !host.isInvalid
        ? html`
            <div class="dcx-input__hint" id="${host.hintId}">
              ${host.hint}
            </div>
          `
        : nothing}

      ${host.showRequiredWarning
        ? html`
            <div class="dcx-input__error" role="alert" id="${host.errorId}">
              <span>
                ${host.requiredMessage ?? 'Este campo es requerido'}
              </span>
            </div>
          `
        : nothing}

      ${host.isInvalid && (host.errorMessage || host.errorMessages.length > 0)
        ? html`
            <div class="dcx-input__error" role="alert" id="${host.errorId}">
              <dcx-web-icon
                .name="${host.errorIcon}"
                color="var(--color-error, #dc2626)";
              ></dcx-web-icon>

              <div>
                ${host.errorMessage
                  ? html`
                      <span>
                        ${host.errorMessage}
                      </span>
                    `
                  : nothing}

                ${host.errorMessages.length
                  ? html`
                      <ul class="dcx-input__error-list">
                        ${host.errorMessages.map(
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

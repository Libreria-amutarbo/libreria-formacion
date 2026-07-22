import { html } from 'lit';
import type { DcxWebCheckbox } from './dcx-web-checkbox.component';

export const template = (host: DcxWebCheckbox) => {
  return html`
    <div class="dcx-checkbox-group">
      <div class="dcx-checkbox-group__options">
        ${host.options.map(option => {
          const iconName = host.getIconName(option);

          return html`
            <label
              class="dcx-checkbox-label
                ${option.disabled ? 'disabled' : ''}
                ${option.labelPosition === 'left'
                  ? 'label-left'
                  : ''}"
            >
              ${(option.labelPosition === 'left' ||
                option.labelPosition === undefined)
                ? host.renderLabel(option)
                : ''}

              <dcx-web-button
                variant="${host.getVariant(option)}"
                ?icon=${iconName !== ''}
                is-checkbox
                ?disabled=${option.disabled ?? false}
                ?checkbox-error=${option.error ?? false}
                icon-name="${iconName}"
                icon-size="xl"
                aria-label="${option.label ?? 'Checkbox'}"
                aria-checked="${host.getAriaChecked(option)}"
                aria-disabled="${option.disabled || null}"
                aria-describedby="${option.error &&
                option.errorMessage
                  ? `checkbox-error-${option.id}`
                  : ''}"
                @buttonClick=${() =>
                  host.changeValue(option.id)}
              >
              </dcx-web-button>

              ${option.labelPosition === 'right'
                ? host.renderLabel(option)
                : ''}
            </label>

            ${option.error &&
            option.errorMessage !== ''
              ? html`
                  <div
                    class="dcx-checkbox__error"
                    id="checkbox-error-${option.id}"
                    role="alert"
                  >
                    <dcx-web-icon
                      name="${host.errorIcon}"
                      aria-label="Error"
                      color="var(--color-error, #dc2626)"
                    >
                    </dcx-web-icon>

                    <span>${option.errorMessage}</span>
                  </div>
                `
              : ''}
          `;
        })}
      </div>
    </div>
  `;
};

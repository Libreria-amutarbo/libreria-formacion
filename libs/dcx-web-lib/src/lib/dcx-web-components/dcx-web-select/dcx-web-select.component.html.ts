import {
  html,
  nothing,
} from 'lit';

import type { DcxWebSelect } from './dcx-web-select.component';

export const template = (host: DcxWebSelect) => {
  return html`
    ${host.label
      ? html`
          <label
            class="dcx-select__label"
            for="${host.selectId}"
            id="${host.labelId}"
          >
            ${host.label}

            ${host.required
          ? html`
                  <span class="dcx-select__required">
                    *
                  </span>
                `
          : nothing}
          </label>
        `
      : nothing}

    <div class="dcx-select__wrapper">
      <div
        ${(
        element:
          | Element
          | undefined,
      ) => {
      if (
        element instanceof
        HTMLElement
      ) {
        host.registerControlElement(
          element,
        );
      }
    }}
        class="${host.getControlClasses()}"
        role="combobox"
        tabindex="${host.disabled
      ? -1
      : 0}"
        id="${host.selectId}"
        aria-expanded="${String(
        host.isOpen,
      )}"
        aria-labelledby="${host.label
      ? host.labelId
      : nothing}"
        aria-label="${!host.label
      ? (host.ariaLabel ??
        '')
      : nothing}"
        aria-haspopup="listbox"
        aria-controls="${host.selectId}-panel"
        aria-activedescendant="${host.activeDescendant ??
    nothing}"
        aria-disabled="${host.disabled
      ? 'true'
      : 'false'}"
        @click="${host.toggle}"
        @keydown="${host.onKey}"
      >
        <span class="dcx-select__selected-value">
          ${host.selectedLabel}
        </span>

        <div class="dcx-select__buttons">
          ${host.clearable &&
      host.value !== null
      ? html`
                <dcx-web-button
                  class="dcx-select__clear-btn"
                  variant="icon-only"
                  size="s"
                  .icon="${true}"
                  icon-name="x"
                  icon-size="l"
                  aria-label="Borrar selección"
                  @click="${(e: Event) => e.stopPropagation()}"
                  @buttonClick="${host.clearValue}"
                >
                </dcx-web-button>
              `
      : nothing}

          <dcx-web-icon
            class="dcx-select__chevron"
            name="chevron-down"
            aria-hidden="true"
          >
          </dcx-web-icon>
        </div>
      </div>

      ${host.isInvalid &&
      host.errorMessage
      ? html`
            <div
              class="dcx-select__error"
              role="alert"
            >
              <dcx-web-icon
                name="${host.errorIcon}"
                color="var(--color-error, #dc2626)"
                aria-hidden="true"
              >
              </dcx-web-icon>

              <span>
                ${host.errorMessage}
              </span>
            </div>
          `
      : nothing}

      ${host.isOpen
      ? html`
            <div
              class="dcx-select__panel"
              role="listbox"
              id="${host.selectId}-panel"
              aria-labelledby="${host.labelId}"
            >
              ${host.searchable
          ? html`
                    <dcx-web-input
                      placeholder="Buscar..."
                      .value="${host.search}"
                      type="text"
                      aria-label="Buscar opciones"
                      @valueChange="${host.onSearchEvent}"
                    >
                    </dcx-web-input>
                  `
          : nothing}

              <div class="dcx-select__options">
                ${host.filtered.map(
            (
              option,
              index,
            ) => html`
                    <div
                      class="
                        dcx-select__option
                        ${option.disabled
                ? 'is-disabled'
                : ''}
                        ${option.value ===
                host.value
                ? 'is-selected'
                : ''}
                        ${index ===
                host.activeIndex
                ? 'is-active'
                : ''}
                      "
                      role="option"
                      aria-selected="${String(
                  option.value ===
                  host.value,
                )}"
                      aria-disabled="${option.disabled
                ? 'true'
                : nothing}"
                      id="${host.selectId}-opt-${index}"
                      @click="${() =>
                host.selectOption(
                  option,
                )}"
                    >
                      ${option.label}
                    </div>
                  `,
          )}
              </div>
            </div>
          `
      : nothing}
    </div>
  `;
}
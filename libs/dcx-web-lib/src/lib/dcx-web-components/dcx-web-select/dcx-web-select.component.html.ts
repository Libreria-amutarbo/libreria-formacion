import {
  html,
  nothing,
} from 'lit';

import type { DcxWebSelect } from './dcx-web-select.component';

export function renderDcxWebSelectTemplate(
  select: DcxWebSelect,
) {
  return html`
    ${select.label
      ? html`
          <label
            class="dcx-select__label"
            for="${select.selectId}"
            id="${select.labelId}"
          >
            ${select.label}

            ${select.required
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
        select.registerControlElement(
          element,
        );
      }
    }}
        class="${select.getControlClasses()}"
        role="combobox"
        tabindex="${select.disabled
      ? -1
      : 0}"
        id="${select.selectId}"
        aria-expanded="${String(
        select.isOpen,
      )}"
        aria-labelledby="${select.label
      ? select.labelId
      : nothing}"
        aria-label="${!select.label
      ? (select.ariaLabel ??
        '')
      : nothing}"
        aria-haspopup="listbox"
        aria-controls="${select.selectId}-panel"
        aria-activedescendant="${select.activeDescendant ??
    nothing}"
        aria-disabled="${select.disabled
      ? 'true'
      : 'false'}"
        @click="${select.toggle}"
        @keydown="${select.onKey}"
      >
        <span class="dcx-select__selected-value">
          ${select.selectedLabel}
        </span>

        <div class="dcx-select__buttons">
          ${select.clearable &&
      select.value !== null
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
                  @buttonClick="${select.clearValue}"
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

      ${select.isInvalid &&
      select.errorMessage
      ? html`
            <div
              class="dcx-select__error"
              role="alert"
            >
              <dcx-web-icon
                name="${select.errorIcon}"
                color="var(--color-error, #dc2626)"
                aria-hidden="true"
              >
              </dcx-web-icon>

              <span>
                ${select.errorMessage}
              </span>
            </div>
          `
      : nothing}

      ${select.isOpen
      ? html`
            <div
              class="dcx-select__panel"
              role="listbox"
              id="${select.selectId}-panel"
              aria-labelledby="${select.labelId}"
            >
              ${select.searchable
          ? html`
                    <dcx-web-input
                      placeholder="Buscar..."
                      .value="${select.search}"
                      type="text"
                      aria-label="Buscar opciones"
                      @valueChange="${select.onSearchEvent}"
                    >
                    </dcx-web-input>
                  `
          : nothing}

              <div class="dcx-select__options">
                ${select.filtered.map(
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
                select.value
                ? 'is-selected'
                : ''}
                        ${index ===
                select.activeIndex
                ? 'is-active'
                : ''}
                      "
                      role="option"
                      aria-selected="${String(
                  option.value ===
                  select.value,
                )}"
                      aria-disabled="${option.disabled
                ? 'true'
                : nothing}"
                      id="${select.selectId}-opt-${index}"
                      @click="${() =>
                select.selectOption(
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
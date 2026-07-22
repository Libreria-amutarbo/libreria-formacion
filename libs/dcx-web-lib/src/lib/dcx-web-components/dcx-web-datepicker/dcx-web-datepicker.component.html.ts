import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { DcxWebDatePicker } from './dcx-web-datepicker.component';

export const template = (host: DcxWebDatePicker) => {
  const inputWrapperClasses = {
    'dcx-datepicker__input-wrapper': true,
    'dcx-datepicker__input-wrapper--disabled': host.disabled,
    'dcx-datepicker__input-wrapper--open': host.isOpen,
  };

  return html`
    <div class="dcx-datepicker">
      <div
        class="${classMap(inputWrapperClasses)}"
        role="button"
        tabindex="0"
        aria-expanded="${host.isOpen}"
        aria-haspopup="dialog"
        aria-label="Seleccionar fecha"
        aria-disabled="${host.disabled ? 'true' : nothing}"
        @click="${host.toggleCalendar}"
        @keydown="${host.onTriggerKeydown}"
      >
        <input
          class="dcx-datepicker__input"
          placeholder="${host.placeholder || 'dd/mm/yyyy'}"
          ?disabled="${host.disabled}"
          type="text"
          .value="${host.formattedSelectedDate}"
          readonly
        />
      </div>

      ${host.isOpen
        ? html`
            <div
              class="dcx-datepicker__popover"
              role="dialog"
              aria-modal="true"
              aria-label="Calendario"
            >
              <div class="dcx-datepicker__calendar">
                <div class="dcx-datepicker__header" aria-live="polite" aria-atomic="true">
                  <dcx-web-button
                    class="dcx-datepicker__nav"
                    ?icon="${true}"
                    icon-position="right"
                    icon-name="chevron-left"
                    aria-label="${host.labels.previous}"
                    @buttonClick="${host.previousMonth}"
                  ></dcx-web-button>

                  <span class="dcx-datepicker__month-year">
                    <dcx-web-button
                      class="dcx-datepicker__month"
                      variant="terciary"
                      size="s"
                      aria-label="Seleccionar mes: ${host.monthName}"
                      label="${host.monthName}"
                      ?disabled="${host.isMonthMode}"
                      @buttonClick="${host.openMonthSelector}"
                    ></dcx-web-button>
                    <span aria-hidden="true">&nbsp;</span>
                    <dcx-web-button
                      class="dcx-datepicker__year"
                      variant="terciary"
                      size="s"
                      aria-label="Seleccionar año: ${host.yearNumber}"
                      label="${host.yearNumber}"
                      ?disabled="${host.isYearMode}"
                      @buttonClick="${host.openYearSelector}"
                    ></dcx-web-button>
                  </span>

                  <dcx-web-button
                    class="dcx-datepicker__nav"
                    ?icon="${true}"
                    icon-position="right"
                    icon-name="chevron-right"
                    aria-label="${host.labels.next}"
                    @buttonClick="${host.nextMonth}"
                  ></dcx-web-button>
                </div>

                ${host.isMonthMode
                  ? html`
                      <div
                        class="dcx-datepicker__select-list dcx-datepicker__select-list--months"
                        role="listbox"
                        aria-label="Seleccionar mes"
                      >
                        ${host.monthsIndexes.map(
                          (idx) => html`
                            <dcx-web-button
                              class="dcx-datepicker__select-item"
                              label="${host.monthsList[idx]}"
                              variant="terciary"
                              size="s"
                              aria-label="${host.monthsList[idx]}"
                              @buttonClick="${() => host.selectMonth(idx)}"
                            ></dcx-web-button>
                          `
                        )}
                      </div>
                    `
                  : nothing}

                ${host.isYearMode
                  ? html`
                      <div
                        class="dcx-datepicker__select-list dcx-datepicker__select-list--years"
                        role="listbox"
                        aria-label="Seleccionar año"
                      >
                        ${host.yearsList.map(
                          (year) => html`
                            <dcx-web-button
                              class="dcx-datepicker__select-item"
                              label="${year.toString()}"
                              variant="terciary"
                              size="s"
                              aria-label="${year.toString()}"
                              @buttonClick="${() => host.selectYear(year)}"
                            ></dcx-web-button>
                          `
                        )}
                      </div>
                    `
                  : nothing}

                ${host.isCalendarMode
                  ? html`
                      <div class="dcx-datepicker__grid-wrapper">
                        <table
                          class="dcx-datepicker__grid"
                          role="grid"
                          aria-label="${host.gridAriaLabel}"
                        >
                          <thead>
                            <tr role="row">
                              ${host.weekDays.map(
                                (wd) => html`
                                  <th scope="col" class="dcx-datepicker__weekday" abbr="${wd}">
                                    ${wd}
                                  </th>
                                `
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            ${host.calendarWeeks.map(
                              (week) => html`
                                <tr role="row">
                                  ${week.map((day) => {
                                    const dayClasses = {
                                      'dcx-datepicker__day': true,
                                      'dcx-datepicker__day--other-month': !day.isCurrentMonth,
                                      'dcx-datepicker__day--today': day.isToday,
                                      'dcx-datepicker__day--selected': day.isSelected,
                                      'dcx-datepicker__day--in-range': day.isInRange || false,
                                    };
                                    return html`
                                      <td
                                        role="gridcell"
                                        aria-selected="${day.isSelected ? 'true' : nothing}"
                                        aria-disabled="${day.isDisabled ? 'true' : nothing}"
                                        aria-current="${day.isToday ? 'date' : nothing}"
                                      >
                                        <dcx-web-button
                                          class="${classMap(dayClasses)}"
                                          variant="terciary"
                                          size="s"
                                          .label="${day.date.getDate().toString()}"
                                          ?disabled="${day.isDisabled}"
                                          tabindex="${host.isFocusedDay(day) ? 0 : -1}"
                                          aria-label="${day.date.getDate()} ${host.monthName} ${host.yearNumber}"
                                          @buttonClick="${() => host.selectDate(day)}"
                                          @keydown="${(e: KeyboardEvent) =>
                                            host.onGridKeydown(e, day)}"
                                        ></dcx-web-button>
                                      </td>
                                    `;
                                  })}
                                </tr>
                              `
                            )}
                          </tbody>
                        </table>
                      </div>
                    `
                  : nothing}

                <div class="dcx-datepicker__footer">
                  ${host.showClearButton
                    ? html`
                        <dcx-web-button
                          class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--ghost dcx-datepicker__clear"
                          variant="secondary"
                          size="s"
                          aria-label="${host.labels.clearDate}"
                          label="${host.labels.clearDate}"
                          @buttonClick="${host.clearDate}"
                        ></dcx-web-button>
                      `
                    : nothing}
                  <dcx-web-button
                    class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--secondary"
                    variant="secondary"
                    size="s"
                    ?icon="${true}"
                    icon-name="calendar-fill"
                    aria-label="${host.labels.goToToday}"
                    label="${host.labels.today}"
                    @buttonClick="${host.goToToday}"
                  ></dcx-web-button>
                  <dcx-web-button
                    class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--primary"
                    label="Aplicar"
                    variant="primary"
                    size="s"
                    @buttonClick="${host.applyDate}"
                  ></dcx-web-button>
                </div>
              </div>
            </div>
          `
        : nothing}
    </div>
  `;
};

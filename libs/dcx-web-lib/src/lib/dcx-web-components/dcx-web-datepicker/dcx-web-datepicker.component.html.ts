import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { DcxWebDatePicker } from './dcx-web-datepicker.component';

export const template = (context: DcxWebDatePicker) => {
  const inputWrapperClasses = {
    'dcx-datepicker__input-wrapper': true,
    'dcx-datepicker__input-wrapper--disabled': context.disabled,
    'dcx-datepicker__input-wrapper--open': context.isOpen,
  };

  return html`
    <div class="dcx-datepicker">
      <div
        class="${classMap(inputWrapperClasses)}"
        role="button"
        tabindex="0"
        aria-expanded="${context.isOpen}"
        aria-haspopup="dialog"
        aria-label="Seleccionar fecha"
        aria-disabled="${context.disabled ? 'true' : nothing}"
        @click="${context.toggleCalendar}"
        @keydown="${context.onTriggerKeydown}"
      >
        <input
          class="dcx-datepicker__input"
          placeholder="${context.placeholder || 'dd/mm/yyyy'}"
          ?disabled="${context.disabled}"
          type="text"
          .value="${context.formattedSelectedDate}"
          readonly
        />
      </div>

      ${context.isOpen
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
                    aria-label="${context.labels.previous}"
                    @buttonClick="${context.previousMonth}"
                  ></dcx-web-button>

                  <span class="dcx-datepicker__month-year">
                    <dcx-web-button
                      class="dcx-datepicker__month"
                      variant="terciary"
                      size="s"
                      aria-label="Seleccionar mes: ${context.monthName}"
                      label="${context.monthName}"
                      ?disabled="${context.isMonthMode}"
                      @buttonClick="${context.openMonthSelector}"
                    ></dcx-web-button>
                    <span aria-hidden="true">&nbsp;</span>
                    <dcx-web-button
                      class="dcx-datepicker__year"
                      variant="terciary"
                      size="s"
                      aria-label="Seleccionar año: ${context.yearNumber}"
                      label="${context.yearNumber}"
                      ?disabled="${context.isYearMode}"
                      @buttonClick="${context.openYearSelector}"
                    ></dcx-web-button>
                  </span>

                  <dcx-web-button
                    class="dcx-datepicker__nav"
                    ?icon="${true}"
                    icon-position="right"
                    icon-name="chevron-right"
                    aria-label="${context.labels.next}"
                    @buttonClick="${context.nextMonth}"
                  ></dcx-web-button>
                </div>

                ${context.isMonthMode
                  ? html`
                      <div
                        class="dcx-datepicker__select-list dcx-datepicker__select-list--months"
                        role="listbox"
                        aria-label="Seleccionar mes"
                      >
                        ${context.monthsIndexes.map(
                          (idx) => html`
                            <dcx-web-button
                              class="dcx-datepicker__select-item"
                              label="${context.monthsList[idx]}"
                              variant="terciary"
                              size="s"
                              aria-label="${context.monthsList[idx]}"
                              @buttonClick="${() => context.selectMonth(idx)}"
                            ></dcx-web-button>
                          `
                        )}
                      </div>
                    `
                  : nothing}

                ${context.isYearMode
                  ? html`
                      <div
                        class="dcx-datepicker__select-list dcx-datepicker__select-list--years"
                        role="listbox"
                        aria-label="Seleccionar año"
                      >
                        ${context.yearsList.map(
                          (year) => html`
                            <dcx-web-button
                              class="dcx-datepicker__select-item"
                              label="${year.toString()}"
                              variant="terciary"
                              size="s"
                              aria-label="${year.toString()}"
                              @buttonClick="${() => context.selectYear(year)}"
                            ></dcx-web-button>
                          `
                        )}
                      </div>
                    `
                  : nothing}

                ${context.isCalendarMode
                  ? html`
                      <div class="dcx-datepicker__grid-wrapper">
                        <table
                          class="dcx-datepicker__grid"
                          role="grid"
                          aria-label="${context.gridAriaLabel}"
                        >
                          <thead>
                            <tr role="row">
                              ${context.weekDays.map(
                                (wd) => html`
                                  <th scope="col" class="dcx-datepicker__weekday" abbr="${wd}">
                                    ${wd}
                                  </th>
                                `
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            ${context.calendarWeeks.map(
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
                                          tabindex="${context.isFocusedDay(day) ? 0 : -1}"
                                          aria-label="${day.date.getDate()} ${context.monthName} ${context.yearNumber}"
                                          @buttonClick="${() => context.selectDate(day)}"
                                          @keydown="${(e: KeyboardEvent) =>
                                            context.onGridKeydown(e, day)}"
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
                  ${context.showClearButton
                    ? html`
                        <dcx-web-button
                          class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--ghost dcx-datepicker__clear"
                          variant="secondary"
                          size="s"
                          aria-label="${context.labels.clearDate}"
                          label="${context.labels.clearDate}"
                          @buttonClick="${context.clearDate}"
                        ></dcx-web-button>
                      `
                    : nothing}
                  <dcx-web-button
                    class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--secondary"
                    variant="secondary"
                    size="s"
                    ?icon="${true}"
                    icon-name="calendar-fill"
                    aria-label="${context.labels.goToToday}"
                    label="${context.labels.today}"
                    @buttonClick="${context.goToToday}"
                  ></dcx-web-button>
                  <dcx-web-button
                    class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--primary"
                    label="Aplicar"
                    variant="primary"
                    size="s"
                    @buttonClick="${context.applyDate}"
                  ></dcx-web-button>
                </div>
              </div>
            </div>
          `
        : nothing}
    </div>
  `;
};

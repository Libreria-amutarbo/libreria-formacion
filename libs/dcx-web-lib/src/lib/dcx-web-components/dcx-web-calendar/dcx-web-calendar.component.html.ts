import { html } from 'lit';
import type {
  DcxCalendarDayCell,
  DcxCalendarEvent,
  DcxCalendarRecurrence,
} from '../../core/interfaces/calendar';
import type { DcxWebCalendar } from './dcx-web-calendar.component';

export const template = (host: DcxWebCalendar) => html`
  <div
    class="dcx-calendar-shell ${
      host.selectedEvent && !host.isYearView
        ? 'dcx-calendar-shell--with-sidepanel'
        : ''
    }"
  >
    <div
      class="dcx-calendar
        ${host.isMonthView ? 'dcx-calendar--month-view' : ''}
        ${host.isWeekView ? 'dcx-calendar--week-view' : ''}
        ${host.isYearView ? 'dcx-calendar--year-view' : ''}
        ${host.isMiniView ? 'dcx-calendar--mini' : ''}
        ${host.isRangeMode ? 'dcx-calendar--range' : ''}
        ${host.disabled ? 'dcx-calendar--disabled' : ''}"
      aria-label="${host.ariaLabel}"
    >
      ${host.isYearView ? renderYearView(host) : renderStandardView(host)}
    </div>

    ${
      host.selectedEvent && !host.isYearView
        ? renderSidepanel(host, host.selectedEvent)
        : null
    }
  </div>

  ${host.modalMode ? renderModalOverlay(host) : null}
`;

function renderStandardView(host: DcxWebCalendar) {
  return html`
    <div class="dcx-calendar__header">
      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Anterior"
        @click=${() => host.previous()}
      >
        <dcx-web-icon name="chevron-left" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>

      <span class="dcx-calendar__title">
        ${host.isWeekView ? host.weekLabel : host.monthLabel}
      </span>

      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Siguiente"
        @click=${() => host.next()}
      >
        <dcx-web-icon name="chevron-right" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>
    </div>

    ${host.isWeekView ? renderWeekView(host) : renderMonthView(host)}

    ${
      host.showFooter
        ? html`
          <div class="dcx-calendar__footer">
            ${
              host.footerMode === 'range'
                ? html`
                  <dcx-web-button
                    label="Limpiar"
                    variant="secondary"
                    size="m"
                    aria-label="Limpiar rango"
                    @buttonClick=${() => host.clearRange()}
                  >
                  </dcx-web-button>
                  <dcx-web-button
                    label="Aplicar"
                    variant="primary"
                    size="m"
                    aria-label="Aplicar rango"
                    @buttonClick=${() => host.applyRange()}
                  >
                  </dcx-web-button>
                `
                : html`
                  <dcx-web-button
                    label="Hoy"
                    variant="secondary"
                    size="m"
                    aria-label="Ir a hoy"
                    @buttonClick=${() => host.goToToday()}
                  >
                  </dcx-web-button>
                  ${
                    host.allowCreate && host.isMonthView
                      ? html`
                        <dcx-web-button
                          label="Nuevo evento"
                          variant="primary"
                          size="m"
                          aria-label="Crear nuevo evento"
                          @buttonClick=${() =>
                            host.openCreateModal(
                              host.localSelectedDate ?? host.localActiveDate,
                            )}
                        >
                        </dcx-web-button>
                      `
                      : null
                  }
                `
            }
          </div>
        `
        : null
    }
  `;
}

function renderMonthView(host: DcxWebCalendar) {
  return html`
    <div class="dcx-calendar__grid-wrap">
      <table class="dcx-calendar__grid">
        <thead>
          <tr>
            ${host.weekLabels.map(
              (weekday, index) => html`
                <th
                  class="dcx-calendar__weekday ${
                    index >= 5 ? 'dcx-calendar__weekday--weekend' : ''
                  }"
                >
                  ${weekday}
                </th>
              `,
            )}
          </tr>
        </thead>
        <tbody>
          ${host.monthWeeks.map(
            week => html`
              <tr>
                ${week.map(day => renderDayCell(host, day))}
              </tr>
            `,
          )}
        </tbody>
      </table>
    </div>
  `;
}

function renderDayCell(host: DcxWebCalendar, day: DcxCalendarDayCell) {
  return html`
    <td
      class="dcx-calendar__month-cell
        ${day.isToday ? 'dcx-calendar__month-cell--today' : ''}
        ${day.isWeekend ? 'dcx-calendar__month-cell--weekend' : ''}
        ${!day.isCurrentMonth ? 'dcx-calendar__month-cell--other-month' : ''}"
      @click=${() => host.selectDay(day)}
    >
      <button
        type="button"
        class="dcx-calendar__day-button
          ${
            day.isSelected || day.isRangeStart || day.isRangeEnd
              ? 'dcx-calendar__day-button--selected'
              : ''
          }
          ${day.isInRange ? 'dcx-calendar__day-button--in-range' : ''}"
        ?disabled=${host.disabled}
        @click=${(event: Event) => {
          event.stopPropagation();
          host.selectDay(day);
        }}
      >
        <span
          class="dcx-calendar__day-number ${
            day.isToday ? 'dcx-calendar__day-number--today' : ''
          }"
        >
          ${day.date.getDate()}
        </span>
      </button>

      ${
        host.showMonthEvents
          ? html`
            ${host.getVisibleEvents(day).map(
              event => html`
                <button
                  type="button"
                  class="dcx-calendar__month-pill dcx-calendar__month-pill--${host.getEventClass(
                    event.type,
                  )}"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    host.openEvent(event);
                  }}
                >
                  ${event.title}
                </button>
              `,
            )}
            ${
              host.getOverflowCount(day) > 0
                ? html`
                  <button
                    type="button"
                    class="dcx-calendar__month-more"
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      host.openDayOverflow(day);
                    }}
                  >
                    +${host.getOverflowCount(day)} más
                  </button>
                `
                : null
            }
          `
          : null
      }
    </td>
  `;
}

function renderWeekView(host: DcxWebCalendar) {
  return html`
    <div class="dcx-calendar__week-table-wrap">
      <table class="dcx-calendar__week-table">
        <thead>
          <tr>
            <th class="dcx-calendar__week-corner"></th>
            ${host.weekDays.map(
              day => html`
                <th
                  class="dcx-calendar__week-header
                    ${day.isToday ? 'dcx-calendar__week-header--today' : ''}
                    ${day.isWeekend ? 'dcx-calendar__week-header--weekend' : ''}"
                >
                  <span
                    class="dcx-calendar__week-day-number ${
                      day.isToday ? 'dcx-calendar__week-day-number--today' : ''
                    }"
                  >
                    ${day.date.getDate()}
                  </span>
                  <br />
                  <span class="dcx-calendar__week-day-label">
                    ${day.label}
                  </span>
                </th>
              `,
            )}
          </tr>
        </thead>
        <tbody>
          ${host.weekHours.map(
            hour => html`
              <tr>
                <td class="dcx-calendar__time-column">
                  ${hour < 10 ? '0' + hour : hour}:00
                </td>
                ${host.weekDays.map(
                  day => html`
                    <td class="dcx-calendar__week-slot">
                      ${host.getWeekSlotEvents(day.date, hour).map(
                        event => html`
                          <button
                            type="button"
                            class="dcx-calendar__event dcx-calendar__event--${host.getEventClass(
                              event.type,
                            )}"
                            @click=${() => host.openEvent(event)}
                          >
                            ${event.title}
                          </button>
                        `,
                      )}
                    </td>
                  `,
                )}
              </tr>
            `,
          )}
        </tbody>
      </table>
    </div>
  `;
}

function renderYearView(host: DcxWebCalendar) {
  return html`
    <div class="dcx-calendar__year-header">
      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Anterior"
        @click=${() => host.previous()}
      >
        <dcx-web-icon name="chevron-left" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>

      <span class="dcx-calendar__year-title">${host.yearLabel}</span>

      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Siguiente"
        @click=${() => host.next()}
      >
        <dcx-web-icon name="chevron-right" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>
    </div>

    <div class="dcx-calendar__year-grid">
      ${host.yearMonths.map(
        month => html`
          <button
            type="button"
            class="dcx-calendar__mini-month ${
              month.isActive ? 'dcx-calendar__mini-month--active' : ''
            }"
            @click=${() => host.selectYearMonth(month.index)}
          >
            <div class="dcx-calendar__mini-month-name">${month.label}</div>
            <div class="dcx-calendar__mini-grid">
              ${host.weekLabels.map(
                weekday => html`
                  <div class="dcx-calendar__mini-weekday">${weekday}</div>
                `,
              )}
              ${month.weeks.map(week =>
                week.map(
                  day => html`
                    <div
                      class="dcx-calendar__mini-day
                        ${day.isToday ? 'dcx-calendar__mini-day--today' : ''}
                        ${day.isSelected ? 'dcx-calendar__mini-day--selected' : ''}
                        ${
                          !day.isCurrentMonth
                            ? 'dcx-calendar__mini-day--other-month'
                            : ''
                        }"
                    >
                      ${day.isCurrentMonth ? day.date.getDate() : ''}
                    </div>
                  `,
                ),
              )}
            </div>
          </button>
        `,
      )}
    </div>
  `;
}

function renderSidepanel(host: DcxWebCalendar, activeEvent: DcxCalendarEvent) {
  return html`
    <div class="dcx-calendar-popover dcx-calendar-popover--embedded">
      <div
        class="dcx-calendar-popover__accent dcx-calendar-popover__accent--${host.getEventClass(
          activeEvent.type,
        )}"
      ></div>
      <div class="dcx-calendar-popover__header">
        <span class="dcx-calendar-popover__title">${activeEvent.title}</span>
        <div class="dcx-calendar-popover__actions">
          ${
            host.allowEdit
              ? html`
                <button
                  class="dcx-calendar-popover__icon-button"
                  type="button"
                  aria-label="Editar evento"
                  @click=${() => host.openEditModal(activeEvent)}
                >
                  <dcx-web-icon name="pencil" size="m" aria-hidden="true"></dcx-web-icon>
                </button>
              `
              : null
          }
          ${
            host.allowDelete
              ? html`
                <button
                  class="dcx-calendar-popover__icon-button"
                  type="button"
                  aria-label="Eliminar evento"
                  @click=${() => host.openDeleteModal()}
                >
                  <dcx-web-icon name="trash" size="m" aria-hidden="true"></dcx-web-icon>
                </button>
              `
              : null
          }
          <button
            class="dcx-calendar-popover__icon-button"
            type="button"
            aria-label="Cerrar vista rápida"
            @click=${() => host.closeSelectedEvent()}
          >
            <dcx-web-icon name="x-lg" size="m" aria-hidden="true"></dcx-web-icon>
          </button>
        </div>
      </div>
      <div class="dcx-calendar-popover__body">
        <div class="dcx-calendar-popover__detail">
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              stroke-width="1.4"
            />
            <path
              d="M8 5v3.5l2 2"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
            />
          </svg>
          <span>
            ${host.formatDayLabel(activeEvent.start)} · ${host.formatTimeRange(
              activeEvent,
            )}
          </span>
        </div>
        <div
          class="dcx-calendar-popover__detail ${
            activeEvent.type === 'urgent'
              ? 'dcx-calendar-popover__detail--priority'
              : ''
          }"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M2 5h12M2 9h8M2 13h5"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
            />
          </svg>
          <span>
            ${
              activeEvent.description ||
              host.formatRecurrenceLabel(activeEvent.recurrence)
            }
          </span>
        </div>
      </div>
      ${
        host.allowEdit
          ? html`
            <div class="dcx-calendar-popover__footer">
              <button
                class="dcx-calendar-dialog__button dcx-calendar-dialog__button--secondary dcx-calendar-dialog__button--small"
                type="button"
                @click=${() => host.openEditModal(activeEvent)}
              >
                Editar
              </button>
            </div>
          `
          : null
      }
    </div>
  `;
}

function renderModalOverlay(host: DcxWebCalendar) {
  return html`
    <div
      class="dcx-calendar-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dcx-calendar-dialog-title"
      @click=${() => host.closeOverlay()}
    >
      ${
        host.modalMode === 'delete'
          ? renderDeleteModal(host)
          : renderEventFormModal(host)
      }
    </div>
  `;
}

function renderDeleteModal(host: DcxWebCalendar) {
  return html`
    <div
      class="dcx-calendar-dialog dcx-calendar-dialog--delete"
      tabindex="-1"
      @click=${(e: Event) => e.stopPropagation()}
    >
      <div class="dcx-calendar-dialog__header">
        <div class="dcx-calendar-dialog__title" id="dcx-calendar-dialog-title">
          Eliminar evento
        </div>
        <button
          class="dcx-calendar-dialog__close"
          type="button"
          @click=${() => host.closeOverlay()}
        >
          <dcx-web-icon name="x-lg" size="m" aria-hidden="true"></dcx-web-icon>
        </button>
      </div>
      <div class="dcx-calendar-dialog__body">
        <p class="dcx-calendar-dialog__copy">
          ¿Eliminar <strong>${host.selectedEvent?.title || 'este evento'}</strong>?
          Este evento es recurrente.
        </p>
        <div class="dcx-calendar-delete-options">
          <dcx-web-radio
            name="deleteScope"
            .options=${host.deleteScopeOptions}
            size="m"
            .value=${host.deleteScope}
            @valueChange=${(e: CustomEvent<string>) => host.setDeleteScope(e.detail)}
            @change=${(e: Event) => {
              const val = (e.target as HTMLInputElement).value;
              if (val) {
                host.setDeleteScope(val);
              }
            }}
          ></dcx-web-radio>
        </div>
      </div>
      <div class="dcx-calendar-dialog__footer">
        <dcx-web-button
          label="Cancelar"
          variant="secondary"
          size="m"
          aria-label="Cancelar eliminación"
          @buttonClick=${() => host.closeOverlay()}
        ></dcx-web-button>
        <dcx-web-button
          label="Eliminar"
          variant="danger"
          size="m"
          aria-label="Confirmar eliminación"
          @buttonClick=${() => host.confirmDelete()}
        ></dcx-web-button>
      </div>
    </div>
  `;
}

function renderEventFormModal(host: DcxWebCalendar) {
  const isCreate = host.modalMode === 'create';
  return html`
    <div
      class="dcx-calendar-dialog"
      tabindex="-1"
      @click=${(e: Event) => e.stopPropagation()}
    >
      <div class="dcx-calendar-dialog__header">
        <div>
          <div class="dcx-calendar-dialog__title" id="dcx-calendar-dialog-title">
            ${isCreate ? 'Nuevo evento' : 'Editar evento'}
          </div>
          <div class="dcx-calendar-dialog__date-badge">
            ${host.eventForm.date}
          </div>
        </div>
        <button
          class="dcx-calendar-dialog__close"
          type="button"
          @click=${() => host.closeOverlay()}
        >
          <dcx-web-icon name="x-lg" size="m" aria-hidden="true"></dcx-web-icon>
        </button>
      </div>
      <div class="dcx-calendar-dialog__body">
        <div class="dcx-calendar-form__section-label">Tipo de evento</div>
        <div class="dcx-calendar-form__event-type-row">
          ${host.eventTypeOptions.map(
            option => html`
              <button
                type="button"
                class="dcx-calendar-form__event-type-button
                  dcx-calendar-form__event-type-button--${
                    option.value === 'meeting'
                      ? 'blue'
                      : option.value === 'delivery'
                        ? 'green'
                        : option.value === 'reminder'
                          ? 'orange'
                          : option.value === 'urgent'
                            ? 'red'
                            : 'purple'
                  }
                  ${
                    host.eventForm.type === option.value
                      ? 'dcx-calendar-form__event-type-button--active'
                      : ''
                  }"
                @click=${() => {
                  host.eventForm = { ...host.eventForm, type: option.value };
                  host.requestUpdate();
                }}
              >
                <span class="dcx-calendar-form__event-type-swatch"></span>
              </button>
            `,
          )}
        </div>

        <div class="dcx-calendar-form__field">
          <label class="dcx-calendar-form__label" for="calendar-event-title">
            Título <span class="dcx-calendar-form__label-required" aria-hidden="true">*</span>
          </label>
          <input
            id="calendar-event-title"
            class="dcx-calendar-form__input"
            name="title"
            .value=${host.eventForm.title}
            @input=${(e: Event) => {
              host.eventForm.title = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="dcx-calendar-form__field">
          <label class="dcx-calendar-form__label" for="calendar-event-date">Fecha</label>
          <input
            id="calendar-event-date"
            class="dcx-calendar-form__input"
            type="date"
            name="date"
            .value=${host.eventForm.date}
            @input=${(e: Event) => {
              host.eventForm.date = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="dcx-calendar-toggle">
          <span class="dcx-calendar-toggle__label">Todo el día</span>
          <span class="dcx-calendar-toggle__switch">
            <input
              id="calendar-event-all-day"
              class="dcx-calendar-toggle__input"
              type="checkbox"
              .checked=${host.eventForm.allDay}
              @change=${(e: Event) => {
                host.eventForm.allDay = (e.target as HTMLInputElement).checked;
                host.requestUpdate();
              }}
            />
            <label
              class="dcx-calendar-toggle__pill ${
                host.eventForm.allDay ? 'dcx-calendar-toggle__pill--on' : ''
              }"
              for="calendar-event-all-day"
            >
              <span class="dcx-calendar-toggle__thumb" aria-hidden="true"></span>
            </label>
          </span>
        </div>

        ${
          !host.eventForm.allDay
            ? html`
              <div class="dcx-calendar-form__time-columns">
                <div class="dcx-calendar-form__field">
                  <label class="dcx-calendar-form__label" for="calendar-start-time">
                    Hora inicio
                  </label>
                  <input
                    id="calendar-start-time"
                    class="dcx-calendar-form__input"
                    type="time"
                    name="startTime"
                    .value=${host.eventForm.startTime}
                    @input=${(e: Event) => {
                      host.eventForm.startTime = (
                        e.target as HTMLInputElement
                      ).value;
                    }}
                  />
                </div>
                <div class="dcx-calendar-form__field">
                  <label class="dcx-calendar-form__label" for="calendar-end-time">
                    Hora fin
                  </label>
                  <input
                    id="calendar-end-time"
                    class="dcx-calendar-form__input"
                    type="time"
                    name="endTime"
                    .value=${host.eventForm.endTime}
                    @input=${(e: Event) => {
                      host.eventForm.endTime = (
                        e.target as HTMLInputElement
                      ).value;
                    }}
                  />
                </div>
              </div>
            `
            : null
        }

        <hr class="dcx-calendar-form__divider" />

        <div class="dcx-calendar-form__field">
          <label class="dcx-calendar-form__label" for="calendar-description">
            Descripción
          </label>
          <textarea
            id="calendar-description"
            class="dcx-calendar-form__textarea"
            name="description"
            .value=${host.eventForm.description}
            @input=${(e: Event) => {
              host.eventForm.description = (
                e.target as HTMLTextAreaElement
              ).value;
            }}
          ></textarea>
        </div>

        <div class="dcx-calendar-form__field dcx-calendar-form__field--no-margin">
          <label class="dcx-calendar-form__label" for="calendar-recurrence">
            Repetir
          </label>
          <select
            id="calendar-recurrence"
            class="dcx-calendar-form__select"
            name="recurrence"
            .value=${host.eventForm.recurrence}
            @change=${(e: Event) => {
              host.eventForm.recurrence = (e.target as HTMLSelectElement)
                .value as DcxCalendarRecurrence;
            }}

          >
            ${host.recurrenceOptions.map(
              option => html`
                <option
                  value=${option.value}
                  ?selected=${host.eventForm.recurrence === option.value}
                >
                  ${option.label}
                </option>
              `,
            )}
          </select>
        </div>

        ${
          host.formError
            ? html`<p class="dcx-calendar-form__error">${host.formError}</p>`
            : null
        }
      </div>
      <div class="dcx-calendar-dialog__footer">
        ${
          !isCreate && host.allowDelete
            ? html`
              <div class="dcx-calendar-dialog__footer-left">
                <button
                  class="dcx-calendar-dialog__button dcx-calendar-dialog__button--ghost-red"
                  type="button"
                  @click=${() => host.openDeleteModal()}
                >
                  Eliminar
                </button>
              </div>
            `
            : null
        }
        <dcx-web-button
          label="Cancelar"
          variant="secondary"
          size="m"
          aria-label="Cancelar edición"
          @buttonClick=${() => host.closeOverlay()}
        ></dcx-web-button>
        <dcx-web-button
          label=${isCreate ? 'Guardar evento' : 'Actualizar'}
          variant="primary"
          size="m"
          aria-label=${isCreate ? 'Guardar evento' : 'Actualizar evento'}
          @buttonClick=${() => host.saveEvent()}
        ></dcx-web-button>
      </div>
    </div>
  `;
}

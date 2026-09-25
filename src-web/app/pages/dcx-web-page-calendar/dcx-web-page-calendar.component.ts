import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-calendar/dcx-web-calendar.component';

import type {
  DcxCalendarDeleteRequest,
  DcxCalendarEvent,
  DcxCalendarEventDraft,
} from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/calendar';

import {
  buildCalendarDemoEvents,
  cloneCalendarEvents,
} from '../../../../libs/dcx-web-lib/src/lib/core/fixtures/calendar';

@customElement('dcx-web-page-calendar')
export class DcxWebPageCalendar extends LitElement {
  @state()
  accessor monthDate = new Date(2026, 5, 1);

  @state()
  accessor rangeDate = new Date(2026, 5, 1);

  @state()
  accessor weekDate = new Date(2026, 5, 8);

  @state()
  accessor yearDate = new Date(2026, 0, 1);

  @state()
  accessor miniDate = new Date(2026, 5, 17);

  @state()
  accessor rangeStart: Date | null = new Date(2026, 5, 10);

  @state()
  accessor rangeEnd: Date | null = new Date(2026, 5, 18);

  @state()
  accessor selectedDay: Date | null = new Date(2026, 5, 18);

  @state()
  accessor appliedRangeLabel = '10/06/2026 - 18/06/2026';

  @state()
  accessor events: DcxCalendarEvent[] = cloneCalendarEvents(
    buildCalendarDemoEvents(),
  );

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    .demo-page {
      width: 100%;
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
    }

    .demo-page-header__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: var(--fw-bold, 700);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      color: var(--text-muted, #696e75);
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section {
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      overflow: hidden;
      margin-bottom: var(--sp-5, 20px);
      background: var(--bg-default, #ffffff);
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px) var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section__num {
      padding: 2px var(--sp-2, 8px);
      border-radius: var(--r-sm, 4px);
      background: var(--bg-sidebar, #f0f2f5);
      font-size: 10px;
      font-weight: var(--fw-bold, 700);
    }

    .demo-section__title {
      font-weight: var(--fw-semibold, 600);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      color: var(--text-muted, #696e75);
    }

    .demo-section__body {
      padding: var(--sp-5, 20px);
      overflow-x: auto;
    }

    .dcx-calendar-page__grid-two {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 220px;
      gap: var(--sp-6, 24px);
      align-items: start;
    }

    .dcx-calendar-page__range-stack,
    .dcx-calendar-page__mini-stack {
      display: flex;
      flex-direction: column;
    }

    .dcx-calendar-page__range-stack {
      gap: var(--sp-3, 12px);
    }

    .dcx-calendar-page__mini-stack {
      gap: var(--sp-4, 16px);
    }

    .dcx-calendar-page__info-card-title {
      font-weight: var(--fw-bold, 700);
    }

    .dcx-calendar-page__info-card-value {
      font-size: var(--fs-xl, 20px);
    }

    @media (max-width: 1200px) {
      .dcx-calendar-page__grid-two {
        grid-template-columns: 1fr;
      }
    }
  `;

  handleRangeChange(detail: { start: Date | null; end: Date | null }) {
    this.rangeStart = detail.start;
    this.rangeEnd = detail.end;

    if (!detail.start && !detail.end) {
      this.appliedRangeLabel = 'Sin aplicar';
      return;
    }

    if (!detail.start || !detail.end) {
      this.appliedRangeLabel = 'Selecciona un rango completo';
      return;
    }

    this.appliedRangeLabel = `${this.formatDate(detail.start)} - ${this.formatDate(detail.end)}`;
  }

  handleCalendarEventCreate(draft: DcxCalendarEventDraft) {
    this.events = [
      ...this.events,
      {
        id: `event-${Date.now()}`,
        title: draft.title,
        start: new Date(draft.start),
        end: draft.end ? new Date(draft.end) : null,
        allDay: draft.allDay,
        type: draft.type,
        description: draft.description ?? '',
        recurrence: draft.recurrence,
      },
    ];
  }

  handleCalendarEventUpdate(event: DcxCalendarEvent) {
    this.events = this.events.map(item =>
      item.id === event.id ? event : item,
    );
  }

  handleCalendarEventDelete(request: DcxCalendarDeleteRequest) {
    const activeEvent = this.events.find(item => item.id === request.eventId);
    if (!activeEvent) {
      return;
    }

    if (!activeEvent.seriesId || request.scope === 'single') {
      this.events = this.events.filter(item => item.id !== activeEvent.id);
      return;
    }

    if (request.scope === 'all') {
      this.events = this.events.filter(item => item.seriesId !== activeEvent.seriesId);
      return;
    }

    this.events = this.events.filter(item => {
      if (item.seriesId !== activeEvent.seriesId) {
        return true;
      }
      return item.start.getTime() < activeEvent.start.getTime();
    });
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Calendar</h1>
          <p class="demo-page-header__desc">
            Showcase funcional del calendario en fase 1: vistas mensual, semanal,
            anual y mini, navegación temporal, selección de rango y gestión local de eventos.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Vista mensual</span>
          </div>
          <p class="demo-section__desc">
            Navegación por mes, eventos por día, vista rápida del evento y acceso a crear evento.
          </p>
          <div class="demo-section__body">
            <dcx-web-calendar
              view="month"
              .selectionMode=${'single'}
              .activeDate=${this.monthDate}
              .selectedDate=${this.selectedDay}
              .events=${this.events}
              .dayMaxVisibleEvents=${2}
              @activeDateChange=${(event: CustomEvent<Date>) => {
                this.monthDate = event.detail;
              }}
              @dateSelect=${(event: CustomEvent<Date>) => {
                this.selectedDay = event.detail;
              }}
              @eventCreate=${(event: CustomEvent<DcxCalendarEventDraft>) => {
                this.handleCalendarEventCreate(event.detail);
              }}
              @eventUpdate=${(event: CustomEvent<DcxCalendarEvent>) => {
                this.handleCalendarEventUpdate(event.detail);
              }}
              @eventDelete=${(event: CustomEvent<DcxCalendarDeleteRequest>) => {
                this.handleCalendarEventDelete(event.detail);
              }}
            ></dcx-web-calendar>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Rango y mini</span>
          </div>
          <p class="demo-section__desc">
            Selección de rango con aplicar/limpiar y variante mini para navegación compacta.
          </p>
          <div class="demo-section__body">
            <div class="dcx-calendar-page__grid-two">
              <div class="dcx-calendar-page__range-stack">
                <div class="dcx-calendar-page__info-card">
                  <div class="dcx-calendar-page__info-card-title">
                    Rango aplicado
                  </div>
                  <p class="dcx-calendar-page__info-card-value">
                    ${this.appliedRangeLabel}
                  </p>
                </div>

                <dcx-web-calendar
                  view="month"
                  .selectionMode=${'range'}
                  .activeDate=${this.rangeDate}
                  .rangeStart=${this.rangeStart}
                  .rangeEnd=${this.rangeEnd}
                  .showFooter=${true}
                  .allowCreate=${false}
                  .events=${[]}
                  @activeDateChange=${(event: CustomEvent<Date>) => {
                    this.rangeDate = event.detail;
                  }}
                  @rangeChange=${(event: CustomEvent<{ start: Date | null; end: Date | null }>) => {
                    this.handleRangeChange(event.detail);
                  }}
                ></dcx-web-calendar>
              </div>

              <div class="dcx-calendar-page__mini-stack">
                <dcx-web-calendar
                  view="mini"
                  .selectionMode=${'single'}
                  .activeDate=${this.miniDate}
                  .selectedDate=${this.miniDate}
                  .allowCreate=${false}
                  .allowEdit=${false}
                  .allowDelete=${false}
                  .events=${[]}
                  @activeDateChange=${(event: CustomEvent<Date>) => {
                    this.miniDate = event.detail;
                  }}
                  @dateSelect=${(event: CustomEvent<Date>) => {
                    this.miniDate = event.detail;
                  }}
                ></dcx-web-calendar>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Vista semanal</span>
          </div>
          <p class="demo-section__desc">
            Rejilla horaria simplificada para validar colocación de eventos por día y hora.
          </p>
          <div class="demo-section__body">
            <dcx-web-calendar
              view="week"
              .selectionMode=${'none'}
              .activeDate=${this.weekDate}
              .events=${this.events}
              .allowCreate=${false}
              .showFooter=${false}
              .weekStartHour=${9}
              .weekEndHour=${16}
              @activeDateChange=${(event: CustomEvent<Date>) => {
                this.weekDate = event.detail;
              }}
            ></dcx-web-calendar>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Vista anual</span>
          </div>
          <p class="demo-section__desc">
            Resumen navegable de los 12 meses del año con realce del mes activo y del día de referencia.
          </p>
          <div class="demo-section__body">
            <dcx-web-calendar
              view="year"
              .selectionMode=${'single'}
              .activeDate=${this.yearDate}
              .selectedDate=${this.selectedDay}
              .allowCreate=${false}
              .allowEdit=${false}
              .allowDelete=${false}
              .showFooter=${false}
              .events=${[]}
              @activeDateChange=${(event: CustomEvent<Date>) => {
                this.yearDate = event.detail;
              }}
            ></dcx-web-calendar>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-calendar': DcxWebPageCalendar;
  }
}
import{a as e,l as t,t as n}from"./lit-C11zoK0j.js";import{c as r,l as i,n as a,r as o,u as s}from"./dcx-web-button.component-DgDUViKA.js";import{t as c}from"./src-RFmViYRZ.js";import"./defaults-DBXV-fV-.js";var l=[`month`,`week`,`year`,`mini`],u=[`none`,`single`,`range`],d=t`
  :host {
    --calendar-border: var(--border-light, #d1d5db);
    --calendar-border-input: var(--border-input, #cbd5e1);
    --calendar-surface: var(--bg-default, #ffffff);
    --calendar-surface-muted: var(--bg-surface, #f8fafc);
    --calendar-surface-subtle: var(--bg-hover, #eff6ff);
    --calendar-shadow: var(--shadow-lg, 0 20px 30px rgba(15, 23, 42, 0.18));
    --calendar-overlay: color-mix(in srgb, var(--text-dark, #2a2e33) 32%, transparent);
    --calendar-personal-bg: var(--bg-hover, #eff6ff);
    --calendar-personal-text: var(--bg-primary-pressed, #003a75);
    --calendar-personal-accent: var(--bg-primary-hover, #004080);

    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-calendar-shell {
    display: grid;
    gap: var(--sp-4, 16px);
  }

  .dcx-calendar-shell--with-sidepanel {
    grid-template-columns: minmax(0, 1fr) 280px;
    align-items: start;
  }

  .dcx-calendar {
    overflow: hidden;
    background: var(--calendar-surface);
    border: 1px solid var(--calendar-border);
    border-radius: var(--r-xl, 12px);
    box-shadow: var(--calendar-shadow);
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-calendar--mini {
    width: 220px;
  }

  .dcx-calendar--year-view,
  .dcx-calendar--month-view {
    width: 100%;
  }

  .dcx-calendar--week-view {
    width: 540px;
    max-width: 100%;
  }

  .dcx-calendar--disabled {
    opacity: 0.45;
    pointer-events: none;
  }

  .dcx-calendar__header,
  .dcx-calendar__year-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    background: var(--bg-primary, #0058ab);
  }

  .dcx-calendar__nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: var(--r-md, 6px);
    background: transparent;
    color: var(--text-white, #ffffff);
    cursor: pointer;
    opacity: 0.88;
    transition: background-color 0.2s ease, opacity 0.2s ease;
  }

  .dcx-calendar__nav:hover {
    background: var(--bg-primary-hover, #004080);
    opacity: 1;
  }

  .dcx-calendar__title,
  .dcx-calendar__year-title {
    color: var(--text-white, #ffffff);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-calendar__year-title {
    font-size: var(--fs-md, 16px);
  }

  .dcx-calendar__grid,
  .dcx-calendar__week-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .dcx-calendar__grid-wrap {
    padding: 0 var(--sp-3, 12px) var(--sp-3, 12px);
  }

  .dcx-calendar__weekday,
  .dcx-calendar__week-header {
    color: var(--text-muted, #696e75);
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    text-align: center;
  }

  .dcx-calendar__weekday {
    padding: 5px 0 6px;
    border-bottom: 1px solid var(--calendar-border);
  }

  .dcx-calendar__weekday--weekend {
    color: var(--text-disabled, #9ca3af);
  }

  .dcx-calendar__month-cell {
    position: relative;
    height: 32px;
    padding: 1px;
    vertical-align: top;
    cursor: pointer;
  }

  .dcx-calendar__day-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 6px 2px;
    border: 0;
    border-radius: var(--r-sm, 4px);
    background: transparent;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .dcx-calendar__day-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-sm, 12px);
    line-height: 1;
  }

  .dcx-calendar__day-button:hover:not(.dcx-calendar__day-button--selected):not(.dcx-calendar__day-button--in-range):not(:disabled) {
    background: var(--calendar-surface-subtle);
  }

  .dcx-calendar__day-number--today {
    font-weight: var(--fw-bold, 700);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-calendar__day-button--selected {
    background: var(--bg-primary, #0058ab);
    border-radius: var(--r-pill, 999px);
  }

  .dcx-calendar__day-button--selected .dcx-calendar__day-number {
    color: var(--text-white, #ffffff);
  }

  .dcx-calendar__day-button--in-range {
    background: var(--color-info-bg, #eff6ff);
    border-radius: var(--r-md, 6px);
  }

  .dcx-calendar__day-button--in-range .dcx-calendar__day-number {
    color: var(--color-info, #0058ab);
  }

  .dcx-calendar__month-cell--other-month .dcx-calendar__day-number {
    color: var(--text-disabled, #9ca3af);
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__month-cell {
    height: 108px;
    padding: var(--sp-1, 4px) var(--sp-2, 8px);
    border-right: 1px solid var(--calendar-border);
    border-bottom: 1px solid var(--calendar-border);
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__month-cell:last-child {
    border-right: none;
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__grid tbody tr:last-child .dcx-calendar__month-cell {
    border-bottom: none;
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__month-cell--today {
    background: var(--calendar-surface-subtle);
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__month-cell--weekend {
    background: var(--calendar-surface-muted, #fafafa);
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__month-cell--other-month {
    background: var(--calendar-surface-muted, #f8fafc);
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__day-button {
    justify-content: flex-start;
    width: auto;
    height: auto;
    padding: 0;
    margin-bottom: 3px;
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__day-button:hover:not(.dcx-calendar__day-button--selected) {
    background: transparent;
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__day-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__day-number--today {
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__day-button--selected {
    background: transparent;
    border-radius: 0;
  }

  .dcx-calendar--month-view:not(.dcx-calendar--range) .dcx-calendar__day-button--selected .dcx-calendar__day-number {
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-calendar__month-pill,
  .dcx-calendar__month-more,
  .dcx-calendar__event {
    display: block;
    width: 100%;
    margin-top: 2px;
    padding: 3px 5px;
    overflow: hidden;
    border: 0;
    border-left: 3px solid transparent;
    border-radius: 3px;
    background: transparent;
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-medium, 500);
    line-height: 1.4;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .dcx-calendar__event,
  .dcx-calendar__month-pill--blue {
    background: var(--color-info-bg, #eff6ff);
    color: var(--color-info, #0058ab);
    border-left-color: var(--bg-primary, #0058ab);
  }

  .dcx-calendar__month-pill--green,
  .dcx-calendar__event--green {
    background: var(--color-success-bg, #f0fdf4);
    color: var(--color-success, #16a34a);
    border-left-color: var(--color-success, #16a34a);
  }

  .dcx-calendar__month-pill--orange,
  .dcx-calendar__event--orange {
    background: var(--color-warning-bg, #fffbeb);
    color: var(--color-warning, #d97706);
    border-left-color: var(--color-warning, #d97706);
  }

  .dcx-calendar__month-pill--red,
  .dcx-calendar__event--red {
    background: var(--color-error-bg, #fef2f2);
    color: var(--color-error, #dc2626);
    border-left-color: var(--color-error, #dc2626);
  }

  .dcx-calendar__month-pill--purple {
    background: var(--calendar-personal-bg);
    color: var(--calendar-personal-text);
    border-left-color: var(--calendar-personal-accent);
  }

  .dcx-calendar__month-more {
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-calendar__footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--sp-2, 8px);
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border-top: 1px solid var(--border-default, #d1d5db);
  }

  .dcx-calendar__week-table-wrap {
    padding: 0 var(--sp-3, 12px) var(--sp-3, 12px);
    overflow-x: auto;
  }

  .dcx-calendar__week-corner {
    width: 44px;
    border-right: 1px solid var(--border-default, #d1d5db);
    border-bottom: 1px solid var(--border-default, #d1d5db);
  }

  .dcx-calendar__week-header {
    padding: var(--sp-2, 8px) var(--sp-1, 4px) var(--sp-3, 12px);
    text-align: center;
    color: var(--text-muted, #696e75);
    border-bottom: 1px solid var(--border-default, #d1d5db);
  }

  .dcx-calendar__week-header--today {
    color: var(--bg-primary, #0058ab);
  }

  .dcx-calendar__week-header--weekend {
    color: var(--text-muted, #696e75);
  }

  .dcx-calendar__week-day-number {
    font-size: 18px;
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
    display: inline-block;
    min-width: 28px;
    line-height: 1;
    margin-bottom: 2px;
  }

  .dcx-calendar__week-header--weekend .dcx-calendar__week-day-number {
    color: var(--text-disabled, #9ca3af);
  }

  .dcx-calendar__week-day-number--today {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: var(--r-pill, 999px);
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
    font-size: 14px;
  }

  .dcx-calendar__week-day-label {
    color: var(--text-muted, #696e75);
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-calendar__week-header--today .dcx-calendar__week-day-label {
    color: var(--bg-primary, #0058ab);
  }

  .dcx-calendar__time-column {
    width: 44px;
    padding: 4px var(--sp-2, 8px) 0 0;
    border-right: 1px solid var(--border-default, #d1d5db);
    border-bottom: 1px solid var(--border-default, #d1d5db);
    color: var(--text-muted, #696e75);
    font-size: 10px;
    text-align: right;
    vertical-align: top;
  }

  .dcx-calendar__week-slot {
    height: 52px;
    padding: 2px;
    border-right: 1px solid var(--border-default, #d1d5db);
    border-bottom: 1px solid var(--border-default, #d1d5db);
    vertical-align: top;
  }

  .dcx-calendar__week-slot:last-child {
    border-right: none;
  }

  .dcx-calendar__year-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--sp-3, 12px);
    padding: var(--sp-3, 12px) var(--sp-4, 16px) var(--sp-4, 16px);
  }

  .dcx-calendar__mini-month {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .dcx-calendar__mini-month-name {
    margin-bottom: 4px;
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-bold, 700);
    text-align: center;
    text-transform: capitalize;
  }

  .dcx-calendar__mini-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
  }

  .dcx-calendar__mini-weekday {
    color: var(--text-muted, #696e75);
    font-size: 8px;
    font-weight: var(--fw-semibold, 600);
    text-align: center;
  }

  .dcx-calendar__mini-day {
    padding: 2px 1px;
    border-radius: 2px;
    color: var(--text-dark, #2a2e33);
    font-size: 9px;
    text-align: center;
  }

  .dcx-calendar__mini-day--today {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-bold, 700);
  }

  .dcx-calendar__mini-day--selected {
    background: var(--bg-primary, #0058ab);
    border-radius: var(--r-pill, 999px);
    color: var(--text-white, #ffffff);
  }

  .dcx-calendar__mini-day--other-month {
    color: var(--text-disabled, #9ca3af);
  }

  .dcx-calendar__mini-month--active .dcx-calendar__mini-month-name {
    color: var(--bg-primary, #0058ab);
  }

  .dcx-calendar-popover {
    overflow: hidden;
    border-radius: var(--r-lg, 8px);
    background: var(--calendar-surface);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-calendar-popover--embedded {
    width: 272px;
  }

  .dcx-calendar-popover__accent {
    height: 4px;
    background: var(--bg-primary, #0058ab);
  }

  .dcx-calendar-popover__accent--green {
    background: var(--color-success, #16a34a);
  }

  .dcx-calendar-popover__accent--orange {
    background: var(--color-warning, #d97706);
  }

  .dcx-calendar-popover__accent--red {
    background: var(--color-error, #dc2626);
  }

  .dcx-calendar-popover__accent--purple {
    background: var(--bg-primary-hover, #004080);
  }

  .dcx-calendar-popover__header,
  .dcx-calendar-dialog__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sp-2, 8px);
    padding: var(--sp-3, 12px) var(--sp-4, 16px) var(--sp-2, 8px);
  }

  .dcx-calendar-popover__title,
  .dcx-calendar-dialog__title {
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-md, 16px);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-calendar-popover__actions {
    display: flex;
    gap: var(--sp-1, 4px);
  }

  .dcx-calendar-popover__icon-button,
  .dcx-calendar-dialog__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: var(--r-sm, 4px);
    background: transparent;
    color: var(--text-muted, #696e75);
    cursor: pointer;
  }

  .dcx-calendar-popover__icon-button:hover,
  .dcx-calendar-dialog__close:hover {
    background: var(--calendar-surface-subtle);
    color: var(--text-dark, #2a2e33);
  }

  .dcx-calendar-popover__body,
  .dcx-calendar-dialog__body {
    padding: 0 var(--sp-4, 16px) var(--sp-4, 16px);
  }

  .dcx-calendar-popover__detail,
  .dcx-calendar-dialog__copy,
  .dcx-calendar-dialog__date-badge {
    color: var(--text-muted, #696e75);
    font-size: 13px;
  }

  .dcx-calendar-popover__detail {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    line-height: 1.4;
  }

  .dcx-calendar-popover__detail + .dcx-calendar-popover__detail {
    margin-top: var(--sp-2, 8px);
  }

  .dcx-calendar-popover__detail--priority {
    color: var(--color-error, #dc2626);
  }

  .dcx-calendar-popover__footer,
  .dcx-calendar-dialog__footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--sp-2, 8px);
    padding: var(--sp-2, 8px) var(--sp-4, 16px) var(--sp-3, 12px);
    border-top: 1px solid var(--calendar-border);
  }

  .dcx-calendar-popover__footer {
    background: var(--calendar-surface);
  }

  .dcx-calendar-dialog__footer {
    background: var(--calendar-surface-muted);
  }

  .dcx-calendar-dialog__footer-left {
    margin-right: auto;
  }

  .dcx-calendar-dialog__button {
    appearance: none;
    -webkit-appearance: none;
    padding: var(--sp-2, 8px) var(--sp-4, 16px);
    border: 1px solid transparent;
    border-radius: var(--r-sm, 4px);
    background: transparent;
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.5;
    font-family: var(--ff-base, 'Inter', sans-serif);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .dcx-calendar-dialog__button--small {
    padding: 4px 12px;
    font-size: var(--fs-sm, 12px);
  }

  .dcx-calendar-dialog__button--primary {
    background: var(--bg-primary, #0058ab);
    border-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-calendar-dialog__button--secondary {
    background: transparent;
    border-color: var(--text-dark, #2a2e33);
    color: var(--text-dark, #2a2e33);
  }

  .dcx-calendar-dialog__button--danger {
    background: var(--color-error, #dc2626);
    border-color: var(--color-error, #dc2626);
    color: var(--text-white, #ffffff);
  }

  .dcx-calendar-dialog__button--ghost-red {
    background: transparent;
    border-color: var(--color-error, #dc2626);
    color: var(--color-error, #dc2626);
  }

  .dcx-calendar-dialog__button--primary:hover {
    background: var(--bg-primary-hover, #004080);
    border-color: var(--bg-primary-hover, #004080);
  }

  .dcx-calendar-dialog__button--secondary:hover {
    background: var(--calendar-surface-subtle);
  }

  .dcx-calendar-dialog__button--ghost-red:hover {
    background: var(--color-error-bg, #fef2f2);
  }

  .dcx-calendar-dialog__button--danger:hover {
    background: var(--color-danger-hover, #b91c1c);
    border-color: var(--color-danger-hover, #b91c1c);
  }

  .dcx-calendar-overlay {
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sp-6, 24px);
    background: var(--calendar-overlay);
  }

  .dcx-calendar-dialog {
    width: min(100%, 440px);
    overflow: hidden;
    border-radius: var(--r-xl, 12px);
    background: var(--calendar-surface);
    box-shadow: var(--calendar-shadow);
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-calendar-dialog:focus {
    outline: none;
  }

  .dcx-calendar-dialog--delete {
    width: min(100%, 380px);
  }

  .dcx-calendar-dialog__copy {
    margin: 0;
    line-height: 1.5;
  }

  .dcx-calendar-dialog__copy strong {
    color: var(--text-dark, #2a2e33);
  }

  .dcx-calendar-dialog__date-badge {
    display: inline-flex;
    margin-top: var(--sp-1, 4px);
    padding: var(--sp-1, 4px) 10px;
    border-radius: var(--r-pill, 999px);
    background: var(--color-info-bg, #eff6ff);
    color: var(--color-info, #0058ab);
  }

  .dcx-calendar-form__field {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
    margin-bottom: var(--sp-3, 12px);
  }

  .dcx-calendar-form__field--no-margin {
    margin-bottom: 0;
  }

  .dcx-calendar-form__label,
  .dcx-calendar-form__section-label,
  .dcx-calendar-toggle__label {
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-calendar-form__label-required {
    color: var(--color-error, #dc2626);
  }

  .dcx-calendar-form__input,
  .dcx-calendar-form__textarea,
  .dcx-calendar-form__select {
    width: 100%;
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border: 1px solid var(--calendar-border-input);
    border-radius: var(--r-sm, 4px);
    background: var(--calendar-surface);
    color: var(--text-dark, #2a2e33);
    font-size: 14px;
    font-weight: var(--fw-regular, 400);
    font-family: var(--ff-base, 'Inter', sans-serif);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .dcx-calendar-form__textarea {
    min-height: 68px;
    resize: vertical;
  }

  .dcx-calendar-form__input:focus,
  .dcx-calendar-form__textarea:focus,
  .dcx-calendar-form__select:focus {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 2px rgba(29, 184, 242, 0.2);
  }

  .dcx-calendar-form__select {
    padding-right: 2rem;
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%232a2e33' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }

  .dcx-calendar-form__divider {
    margin: var(--sp-3, 12px) 0;
    border: 0;
    border-top: 1px solid var(--border-default, #d1d5db);
  }

  .dcx-calendar-form__section-label {
    margin-bottom: var(--sp-2, 8px);
  }

  .dcx-calendar-form__event-type-row,
  .dcx-calendar-form__time-columns,
  .dcx-calendar-delete-options {
    display: grid;
    gap: var(--sp-3, 12px);
  }

  .dcx-calendar-form__event-type-row {
    grid-template-columns: repeat(5, 28px);
    margin-bottom: var(--sp-5, 20px);
  }

  .dcx-calendar-form__time-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dcx-calendar-form__event-type-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 3px solid transparent;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
  }

  .dcx-calendar-form__event-type-button--active {
    border-color: var(--text-dark, #2a2e33);
  }

  .dcx-calendar-form__event-type-swatch {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }

  .dcx-calendar-form__event-type-button--blue .dcx-calendar-form__event-type-swatch {
    background: var(--bg-primary, #0058ab);
  }

  .dcx-calendar-form__event-type-button--green .dcx-calendar-form__event-type-swatch {
    background: var(--color-success, #16a34a);
  }

  .dcx-calendar-form__event-type-button--orange .dcx-calendar-form__event-type-swatch {
    background: var(--color-warning, #d97706);
  }

  .dcx-calendar-form__event-type-button--red .dcx-calendar-form__event-type-swatch {
    background: var(--color-error, #dc2626);
  }

  .dcx-calendar-form__event-type-button--purple .dcx-calendar-form__event-type-swatch {
    background: var(--bg-primary-hover, #004080);
  }

  .dcx-calendar-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--sp-4, 16px);
  }

  .dcx-calendar-toggle__switch {
    position: relative;
    display: inline-flex;
  }

  .dcx-calendar-toggle__input {
    position: absolute;
    inset: 0;
    opacity: 0;
  }

  .dcx-calendar-toggle__pill {
    position: relative;
    display: inline-flex;
    width: 36px;
    height: 20px;
    border-radius: var(--r-pill, 999px);
    background: var(--border-default, #d1d5db);
    cursor: pointer;
  }

  .dcx-calendar-toggle__thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--bg-default, #ffffff);
    transition: transform 0.2s ease;
  }

  .dcx-calendar-toggle__pill--on {
    background: var(--bg-primary, #0058ab);
  }

  .dcx-calendar-toggle__pill--on .dcx-calendar-toggle__thumb {
    transform: translateX(16px);
  }

  .dcx-calendar-delete-options {
    margin-top: var(--sp-4, 16px);
  }

  .dcx-calendar-form__error {
    margin: var(--sp-3, 12px) 0 0;
    color: var(--color-error, #dc2626);
    font-size: var(--fs-sm, 12px);
  }

  @media (max-width: 1024px) {
    .dcx-calendar-shell--with-sidepanel {
      grid-template-columns: 1fr;
    }

    .dcx-calendar-popover--embedded {
      width: 100%;
    }

    .dcx-calendar__year-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 720px) {
    .dcx-calendar-form__time-columns {
      grid-template-columns: 1fr;
    }
  }
`,f=t=>e`
  <div
    class="dcx-calendar-shell ${t.selectedEvent&&!t.isYearView?`dcx-calendar-shell--with-sidepanel`:``}"
  >
    <div
      class="dcx-calendar
        ${t.isMonthView?`dcx-calendar--month-view`:``}
        ${t.isWeekView?`dcx-calendar--week-view`:``}
        ${t.isYearView?`dcx-calendar--year-view`:``}
        ${t.isMiniView?`dcx-calendar--mini`:``}
        ${t.isRangeMode?`dcx-calendar--range`:``}
        ${t.disabled?`dcx-calendar--disabled`:``}"
      aria-label="${t.ariaLabel}"
    >
      ${t.isYearView?_(t):p(t)}
    </div>

    ${t.selectedEvent&&!t.isYearView?v(t,t.selectedEvent):null}
  </div>

  ${t.modalMode?y(t):null}
`;function p(t){return e`
    <div class="dcx-calendar__header">
      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Anterior"
        @click=${()=>t.previous()}
      >
        <dcx-web-icon name="chevron-left" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>

      <span class="dcx-calendar__title">
        ${t.isWeekView?t.weekLabel:t.monthLabel}
      </span>

      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Siguiente"
        @click=${()=>t.next()}
      >
        <dcx-web-icon name="chevron-right" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>
    </div>

    ${t.isWeekView?g(t):m(t)}

    ${t.showFooter?e`
          <div class="dcx-calendar__footer">
            ${t.footerMode===`range`?e`
                  <dcx-web-button
                    label="Limpiar"
                    variant="secondary"
                    size="m"
                    aria-label="Limpiar rango"
                    @buttonClick=${()=>t.clearRange()}
                  >
                  </dcx-web-button>
                  <dcx-web-button
                    label="Aplicar"
                    variant="primary"
                    size="m"
                    aria-label="Aplicar rango"
                    @buttonClick=${()=>t.applyRange()}
                  >
                  </dcx-web-button>
                `:e`
                  <dcx-web-button
                    label="Hoy"
                    variant="secondary"
                    size="m"
                    aria-label="Ir a hoy"
                    @buttonClick=${()=>t.goToToday()}
                  >
                  </dcx-web-button>
                  ${t.allowCreate&&t.isMonthView?e`
                        <dcx-web-button
                          label="Nuevo evento"
                          variant="primary"
                          size="m"
                          aria-label="Crear nuevo evento"
                          @buttonClick=${()=>t.openCreateModal(t.localSelectedDate??t.localActiveDate)}
                        >
                        </dcx-web-button>
                      `:null}
                `}
          </div>
        `:null}
  `}function m(t){return e`
    <div class="dcx-calendar__grid-wrap">
      <table class="dcx-calendar__grid">
        <thead>
          <tr>
            ${t.weekLabels.map((t,n)=>e`
                <th
                  class="dcx-calendar__weekday ${n>=5?`dcx-calendar__weekday--weekend`:``}"
                >
                  ${t}
                </th>
              `)}
          </tr>
        </thead>
        <tbody>
          ${t.monthWeeks.map(n=>e`
              <tr>
                ${n.map(e=>h(t,e))}
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `}function h(t,n){return e`
    <td
      class="dcx-calendar__month-cell
        ${n.isToday?`dcx-calendar__month-cell--today`:``}
        ${n.isWeekend?`dcx-calendar__month-cell--weekend`:``}
        ${n.isCurrentMonth?``:`dcx-calendar__month-cell--other-month`}"
      @click=${()=>t.selectDay(n)}
    >
      <button
        type="button"
        class="dcx-calendar__day-button
          ${n.isSelected||n.isRangeStart||n.isRangeEnd?`dcx-calendar__day-button--selected`:``}
          ${n.isInRange?`dcx-calendar__day-button--in-range`:``}"
        ?disabled=${t.disabled}
        @click=${e=>{e.stopPropagation(),t.selectDay(n)}}
      >
        <span
          class="dcx-calendar__day-number ${n.isToday?`dcx-calendar__day-number--today`:``}"
        >
          ${n.date.getDate()}
        </span>
      </button>

      ${t.showMonthEvents?e`
            ${t.getVisibleEvents(n).map(n=>e`
                <button
                  type="button"
                  class="dcx-calendar__month-pill dcx-calendar__month-pill--${t.getEventClass(n.type)}"
                  @click=${e=>{e.stopPropagation(),t.openEvent(n)}}
                >
                  ${n.title}
                </button>
              `)}
            ${t.getOverflowCount(n)>0?e`
                  <button
                    type="button"
                    class="dcx-calendar__month-more"
                    @click=${e=>{e.stopPropagation(),t.openDayOverflow(n)}}
                  >
                    +${t.getOverflowCount(n)} más
                  </button>
                `:null}
          `:null}
    </td>
  `}function g(t){return e`
    <div class="dcx-calendar__week-table-wrap">
      <table class="dcx-calendar__week-table">
        <thead>
          <tr>
            <th class="dcx-calendar__week-corner"></th>
            ${t.weekDays.map(t=>e`
                <th
                  class="dcx-calendar__week-header
                    ${t.isToday?`dcx-calendar__week-header--today`:``}
                    ${t.isWeekend?`dcx-calendar__week-header--weekend`:``}"
                >
                  <span
                    class="dcx-calendar__week-day-number ${t.isToday?`dcx-calendar__week-day-number--today`:``}"
                  >
                    ${t.date.getDate()}
                  </span>
                  <br />
                  <span class="dcx-calendar__week-day-label">
                    ${t.label}
                  </span>
                </th>
              `)}
          </tr>
        </thead>
        <tbody>
          ${t.weekHours.map(n=>e`
              <tr>
                <td class="dcx-calendar__time-column">
                  ${n<10?`0`+n:n}:00
                </td>
                ${t.weekDays.map(r=>e`
                    <td class="dcx-calendar__week-slot">
                      ${t.getWeekSlotEvents(r.date,n).map(n=>e`
                          <button
                            type="button"
                            class="dcx-calendar__event dcx-calendar__event--${t.getEventClass(n.type)}"
                            @click=${()=>t.openEvent(n)}
                          >
                            ${n.title}
                          </button>
                        `)}
                    </td>
                  `)}
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `}function _(t){return e`
    <div class="dcx-calendar__year-header">
      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Anterior"
        @click=${()=>t.previous()}
      >
        <dcx-web-icon name="chevron-left" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>

      <span class="dcx-calendar__year-title">${t.yearLabel}</span>

      <button
        class="dcx-calendar__nav"
        type="button"
        aria-label="Siguiente"
        @click=${()=>t.next()}
      >
        <dcx-web-icon name="chevron-right" size="s" aria-hidden="true" color="white"></dcx-web-icon>
      </button>
    </div>

    <div class="dcx-calendar__year-grid">
      ${t.yearMonths.map(n=>e`
          <button
            type="button"
            class="dcx-calendar__mini-month ${n.isActive?`dcx-calendar__mini-month--active`:``}"
            @click=${()=>t.selectYearMonth(n.index)}
          >
            <div class="dcx-calendar__mini-month-name">${n.label}</div>
            <div class="dcx-calendar__mini-grid">
              ${t.weekLabels.map(t=>e`
                  <div class="dcx-calendar__mini-weekday">${t}</div>
                `)}
              ${n.weeks.map(t=>t.map(t=>e`
                    <div
                      class="dcx-calendar__mini-day
                        ${t.isToday?`dcx-calendar__mini-day--today`:``}
                        ${t.isSelected?`dcx-calendar__mini-day--selected`:``}
                        ${t.isCurrentMonth?``:`dcx-calendar__mini-day--other-month`}"
                    >
                      ${t.isCurrentMonth?t.date.getDate():``}
                    </div>
                  `))}
            </div>
          </button>
        `)}
    </div>
  `}function v(t,n){return e`
    <div class="dcx-calendar-popover dcx-calendar-popover--embedded">
      <div
        class="dcx-calendar-popover__accent dcx-calendar-popover__accent--${t.getEventClass(n.type)}"
      ></div>
      <div class="dcx-calendar-popover__header">
        <span class="dcx-calendar-popover__title">${n.title}</span>
        <div class="dcx-calendar-popover__actions">
          ${t.allowEdit?e`
                <button
                  class="dcx-calendar-popover__icon-button"
                  type="button"
                  aria-label="Editar evento"
                  @click=${()=>t.openEditModal(n)}
                >
                  <dcx-web-icon name="pencil" size="m" aria-hidden="true"></dcx-web-icon>
                </button>
              `:null}
          ${t.allowDelete?e`
                <button
                  class="dcx-calendar-popover__icon-button"
                  type="button"
                  aria-label="Eliminar evento"
                  @click=${()=>t.openDeleteModal()}
                >
                  <dcx-web-icon name="trash" size="m" aria-hidden="true"></dcx-web-icon>
                </button>
              `:null}
          <button
            class="dcx-calendar-popover__icon-button"
            type="button"
            aria-label="Cerrar vista rápida"
            @click=${()=>t.closeSelectedEvent()}
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
            ${t.formatDayLabel(n.start)} · ${t.formatTimeRange(n)}
          </span>
        </div>
        <div
          class="dcx-calendar-popover__detail ${n.type===`urgent`?`dcx-calendar-popover__detail--priority`:``}"
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
            ${n.description||t.formatRecurrenceLabel(n.recurrence)}
          </span>
        </div>
      </div>
      ${t.allowEdit?e`
            <div class="dcx-calendar-popover__footer">
              <button
                class="dcx-calendar-dialog__button dcx-calendar-dialog__button--secondary dcx-calendar-dialog__button--small"
                type="button"
                @click=${()=>t.openEditModal(n)}
              >
                Editar
              </button>
            </div>
          `:null}
    </div>
  `}function y(t){return e`
    <div
      class="dcx-calendar-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dcx-calendar-dialog-title"
      @click=${()=>t.closeOverlay()}
    >
      ${t.modalMode===`delete`?b(t):x(t)}
    </div>
  `}function b(t){return e`
    <div
      class="dcx-calendar-dialog dcx-calendar-dialog--delete"
      tabindex="-1"
      @click=${e=>e.stopPropagation()}
    >
      <div class="dcx-calendar-dialog__header">
        <div class="dcx-calendar-dialog__title" id="dcx-calendar-dialog-title">
          Eliminar evento
        </div>
        <button
          class="dcx-calendar-dialog__close"
          type="button"
          @click=${()=>t.closeOverlay()}
        >
          <dcx-web-icon name="x-lg" size="m" aria-hidden="true"></dcx-web-icon>
        </button>
      </div>
      <div class="dcx-calendar-dialog__body">
        <p class="dcx-calendar-dialog__copy">
          ¿Eliminar <strong>${t.selectedEvent?.title||`este evento`}</strong>?
          Este evento es recurrente.
        </p>
        <div class="dcx-calendar-delete-options">
          <dcx-web-radio
            name="deleteScope"
            .options=${t.deleteScopeOptions}
            size="m"
            .value=${t.deleteScope}
            @valueChange=${e=>t.setDeleteScope(e.detail)}
            @change=${e=>{let n=e.target.value;n&&t.setDeleteScope(n)}}
          ></dcx-web-radio>
        </div>
      </div>
      <div class="dcx-calendar-dialog__footer">
        <dcx-web-button
          label="Cancelar"
          variant="secondary"
          size="m"
          aria-label="Cancelar eliminación"
          @buttonClick=${()=>t.closeOverlay()}
        ></dcx-web-button>
        <dcx-web-button
          label="Eliminar"
          variant="danger"
          size="m"
          aria-label="Confirmar eliminación"
          @buttonClick=${()=>t.confirmDelete()}
        ></dcx-web-button>
      </div>
    </div>
  `}function x(t){let n=t.modalMode===`create`;return e`
    <div
      class="dcx-calendar-dialog"
      tabindex="-1"
      @click=${e=>e.stopPropagation()}
    >
      <div class="dcx-calendar-dialog__header">
        <div>
          <div class="dcx-calendar-dialog__title" id="dcx-calendar-dialog-title">
            ${n?`Nuevo evento`:`Editar evento`}
          </div>
          <div class="dcx-calendar-dialog__date-badge">
            ${t.eventForm.date}
          </div>
        </div>
        <button
          class="dcx-calendar-dialog__close"
          type="button"
          @click=${()=>t.closeOverlay()}
        >
          <dcx-web-icon name="x-lg" size="m" aria-hidden="true"></dcx-web-icon>
        </button>
      </div>
      <div class="dcx-calendar-dialog__body">
        <div class="dcx-calendar-form__section-label">Tipo de evento</div>
        <div class="dcx-calendar-form__event-type-row">
          ${t.eventTypeOptions.map(n=>e`
              <button
                type="button"
                class="dcx-calendar-form__event-type-button
                  dcx-calendar-form__event-type-button--${n.value===`meeting`?`blue`:n.value===`delivery`?`green`:n.value===`reminder`?`orange`:n.value===`urgent`?`red`:`purple`}
                  ${t.eventForm.type===n.value?`dcx-calendar-form__event-type-button--active`:``}"
                @click=${()=>{t.eventForm={...t.eventForm,type:n.value},t.requestUpdate()}}
              >
                <span class="dcx-calendar-form__event-type-swatch"></span>
              </button>
            `)}
        </div>

        <div class="dcx-calendar-form__field">
          <label class="dcx-calendar-form__label" for="calendar-event-title">
            Título <span class="dcx-calendar-form__label-required" aria-hidden="true">*</span>
          </label>
          <input
            id="calendar-event-title"
            class="dcx-calendar-form__input"
            name="title"
            .value=${t.eventForm.title}
            @input=${e=>{t.eventForm.title=e.target.value}}
          />
        </div>

        <div class="dcx-calendar-form__field">
          <label class="dcx-calendar-form__label" for="calendar-event-date">Fecha</label>
          <input
            id="calendar-event-date"
            class="dcx-calendar-form__input"
            type="date"
            name="date"
            .value=${t.eventForm.date}
            @input=${e=>{t.eventForm.date=e.target.value}}
          />
        </div>

        <div class="dcx-calendar-toggle">
          <span class="dcx-calendar-toggle__label">Todo el día</span>
          <span class="dcx-calendar-toggle__switch">
            <input
              id="calendar-event-all-day"
              class="dcx-calendar-toggle__input"
              type="checkbox"
              .checked=${t.eventForm.allDay}
              @change=${e=>{t.eventForm.allDay=e.target.checked,t.requestUpdate()}}
            />
            <label
              class="dcx-calendar-toggle__pill ${t.eventForm.allDay?`dcx-calendar-toggle__pill--on`:``}"
              for="calendar-event-all-day"
            >
              <span class="dcx-calendar-toggle__thumb" aria-hidden="true"></span>
            </label>
          </span>
        </div>

        ${t.eventForm.allDay?null:e`
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
                    .value=${t.eventForm.startTime}
                    @input=${e=>{t.eventForm.startTime=e.target.value}}
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
                    .value=${t.eventForm.endTime}
                    @input=${e=>{t.eventForm.endTime=e.target.value}}
                  />
                </div>
              </div>
            `}

        <hr class="dcx-calendar-form__divider" />

        <div class="dcx-calendar-form__field">
          <label class="dcx-calendar-form__label" for="calendar-description">
            Descripción
          </label>
          <textarea
            id="calendar-description"
            class="dcx-calendar-form__textarea"
            name="description"
            .value=${t.eventForm.description}
            @input=${e=>{t.eventForm.description=e.target.value}}
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
            .value=${t.eventForm.recurrence}
            @change=${e=>{t.eventForm.recurrence=e.target.value}}

          >
            ${t.recurrenceOptions.map(n=>e`
                <option
                  value=${n.value}
                  ?selected=${t.eventForm.recurrence===n.value}
                >
                  ${n.label}
                </option>
              `)}
          </select>
        </div>

        ${t.formError?e`<p class="dcx-calendar-form__error">${t.formError}</p>`:null}
      </div>
      <div class="dcx-calendar-dialog__footer">
        ${!n&&t.allowDelete?e`
              <div class="dcx-calendar-dialog__footer-left">
                <button
                  class="dcx-calendar-dialog__button dcx-calendar-dialog__button--ghost-red"
                  type="button"
                  @click=${()=>t.openDeleteModal()}
                >
                  Eliminar
                </button>
              </div>
            `:null}
        <dcx-web-button
          label="Cancelar"
          variant="secondary"
          size="m"
          aria-label="Cancelar edición"
          @buttonClick=${()=>t.closeOverlay()}
        ></dcx-web-button>
        <dcx-web-button
          label=${n?`Guardar evento`:`Actualizar`}
          variant="primary"
          size="m"
          aria-label=${n?`Guardar evento`:`Actualizar evento`}
          @buttonClick=${()=>t.saveEvent()}
        ></dcx-web-button>
      </div>
    </div>
  `}var S=class extends n{static styles=d;#e=`month`;get view(){return this.#e}set view(e){this.#e=e}#t=new Date;get activeDate(){return this.#t}set activeDate(e){this.#t=e}#n=[];get events(){return this.#n}set events(e){this.#n=e}#r=`none`;get selectionMode(){return this.#r}set selectionMode(e){this.#r=e}#i=null;get selectedDate(){return this.#i}set selectedDate(e){this.#i=e}#a=null;get rangeStart(){return this.#a}set rangeStart(e){this.#a=e}#o=null;get rangeEnd(){return this.#o}set rangeEnd(e){this.#o=e}#s=!1;get disabled(){return this.#s}set disabled(e){this.#s=e}#c=!0;get allowCreate(){return this.#c}set allowCreate(e){this.#c=e}#l=!0;get allowEdit(){return this.#l}set allowEdit(e){this.#l=e}#u=!0;get allowDelete(){return this.#u}set allowDelete(e){this.#u=e}#d=3;get dayMaxVisibleEvents(){return this.#d}set dayMaxVisibleEvents(e){this.#d=e}#f=8;get weekStartHour(){return this.#f}set weekStartHour(e){this.#f=e}#p=18;get weekEndHour(){return this.#p}set weekEndHour(e){this.#p=e}#m=!0;get showFooter(){return this.#m}set showFooter(e){this.#m=e}#h=`Calendario`;get ariaLabel(){return this.#h}set ariaLabel(e){this.#h=e}get today(){return this.startOfDay(new Date)}#g=this.startOfDay(new Date);get localActiveDate(){return this.#g}set localActiveDate(e){this.#g=e}#_=[];get localEvents(){return this.#_}set localEvents(e){this.#_=e}#v=null;get localSelectedDate(){return this.#v}set localSelectedDate(e){this.#v=e}#y=null;get localRangeStart(){return this.#y}set localRangeStart(e){this.#y=e}#b=null;get localRangeEnd(){return this.#b}set localRangeEnd(e){this.#b=e}#x=null;get selectedEventId(){return this.#x}set selectedEventId(e){this.#x=e}#S=null;get modalMode(){return this.#S}set modalMode(e){this.#S=e}#C=`single`;get deleteScope(){return this.#C}set deleteScope(e){this.#C=e}#w=``;get formError(){return this.#w}set formError(e){this.#w=e}#T=this.createEmptyForm(this.today);get eventForm(){return this.#T}set eventForm(e){this.#T=e}lastFocusedBeforeModal=null;weekLabels=[`Lu`,`Ma`,`Mi`,`Ju`,`Vi`,`Sa`,`Do`];eventTypeOptions=[{value:`meeting`,label:`Reunión`},{value:`delivery`,label:`Entrega`},{value:`reminder`,label:`Recordatorio`},{value:`urgent`,label:`Urgente`},{value:`personal`,label:`Personal`}];recurrenceOptions=[{value:`none`,label:`No repetir`},{value:`daily`,label:`Cada día`},{value:`weekly`,label:`Cada semana`},{value:`monthly`,label:`Cada mes`}];deleteScopeOptions=[{value:`single`,label:`Solo este evento`},{value:`following`,label:`Este y los siguientes`},{value:`all`,label:`Todos los eventos`}];connectedCallback(){super.connectedCallback(),this.localActiveDate=this.startOfDay(this.activeDate),this.localEvents=this.cloneEvents(this.events),this.localSelectedDate=this.normalizeDate(this.selectedDate),this.localRangeStart=this.normalizeDate(this.rangeStart),this.localRangeEnd=this.normalizeDate(this.rangeEnd),document.addEventListener(`keydown`,this.handleDocumentKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleDocumentKeydown)}willUpdate(e){e.has(`activeDate`)&&(this.localActiveDate=this.startOfDay(this.activeDate)),e.has(`events`)&&(this.localEvents=this.cloneEvents(this.events)),e.has(`selectedDate`)&&(this.localSelectedDate=this.normalizeDate(this.selectedDate)),e.has(`rangeStart`)&&(this.localRangeStart=this.normalizeDate(this.rangeStart)),e.has(`rangeEnd`)&&(this.localRangeEnd=this.normalizeDate(this.rangeEnd))}updated(e){e.has(`modalMode`)&&(this.modalMode===null?this.lastFocusedBeforeModal&&=(this.lastFocusedBeforeModal.focus(),null):(this.lastFocusedBeforeModal=document.activeElement,(this.shadowRoot?.querySelector(`.dcx-calendar-dialog`))?.focus()))}get isMonthView(){return this.view===`month`}get isWeekView(){return this.view===`week`}get isYearView(){return this.view===`year`}get isMiniView(){return this.view===`mini`}get isRangeMode(){return this.selectionMode===`range`}get showMonthEvents(){return this.isMonthView&&!this.isRangeMode}get footerMode(){return this.isRangeMode?`range`:`default`}get monthLabel(){return this.capitalize(this.localActiveDate.toLocaleDateString(`es-ES`,{month:this.isMiniView?`short`:`long`,year:`numeric`}))}get weekLabel(){let e=this.startOfWeek(this.localActiveDate),t=this.addDays(e,6);return`${e.getDate()} – ${t.getDate()} ${this.capitalize(t.toLocaleDateString(`es-ES`,{month:`short`}))} ${t.getFullYear()}`}get yearLabel(){return String(this.localActiveDate.getFullYear())}get weekHours(){let e=Math.min(this.weekStartHour,this.weekEndHour),t=Math.max(this.weekStartHour,this.weekEndHour);return Array.from({length:t-e+1},(t,n)=>e+n)}get monthWeeks(){return this.buildMonthGrid(this.localActiveDate,this.isRangeMode?this.localRangeStart:null,this.isRangeMode?this.localRangeEnd:null,this.isRangeMode?this.localRangeEnd??this.localRangeStart:this.localSelectedDate,!0)}get weekDays(){let e=this.startOfWeek(this.localActiveDate);return Array.from({length:7},(t,n)=>{let r=this.addDays(e,n);return{date:r,label:this.weekLabels[n],isToday:this.isSameDate(r,this.today),isWeekend:n>=5}})}get yearMonths(){return Array.from({length:12},(e,t)=>{let n=new Date(this.localActiveDate.getFullYear(),t,1);return{index:t,label:this.capitalize(n.toLocaleDateString(`es-ES`,{month:`long`})),weeks:this.buildMonthGrid(n,null,null,this.localSelectedDate,!1),isActive:t===this.localActiveDate.getMonth()}})}get selectedEvent(){return this.selectedEventId?this.localEvents.find(e=>e.id===this.selectedEventId)??null:null}setDeleteScope(e){(e===`single`||e===`following`||e===`all`)&&(this.deleteScope=e,this.requestUpdate())}previous(){if(this.disabled)return;let e=this.localActiveDate,t=e;switch(this.view){case`week`:t=this.addDays(e,-7);break;case`year`:t=new Date(e.getFullYear()-1,0,1);break;default:t=new Date(e.getFullYear(),e.getMonth()-1,1)}this.setActiveDate(t)}next(){if(this.disabled)return;let e=this.localActiveDate,t=e;switch(this.view){case`week`:t=this.addDays(e,7);break;case`year`:t=new Date(e.getFullYear()+1,0,1);break;default:t=new Date(e.getFullYear(),e.getMonth()+1,1)}this.setActiveDate(t)}goToToday(){this.disabled||(this.setActiveDate(this.today),this.isRangeMode||(this.localSelectedDate=this.today,this.selectionMode!==`none`&&this.dispatchEvent(new CustomEvent(`dateSelect`,{detail:this.today,bubbles:!0,composed:!0}))))}selectYearMonth(e){let t=new Date(this.localActiveDate.getFullYear(),e,1);this.setActiveDate(t),this.dispatchEvent(new CustomEvent(`viewChange`,{detail:`month`,bubbles:!0,composed:!0}))}selectDay(e){if(!this.disabled){if(this.setActiveDate(e.date),this.isRangeMode){let t=this.localRangeStart,n=this.localRangeEnd;if(!t||n){this.localRangeStart=e.date,this.localRangeEnd=null,this.emitRangeChange(e.date,null);return}if(e.date.getTime()<t.getTime()){this.localRangeStart=e.date,this.emitRangeChange(e.date,null);return}this.localRangeEnd=e.date,this.emitRangeChange(t,e.date);return}this.selectionMode!==`none`&&(this.localSelectedDate=e.date,this.dispatchEvent(new CustomEvent(`dateSelect`,{detail:e.date,bubbles:!0,composed:!0})))}}applyRange(){this.emitRangeChange(this.localRangeStart,this.localRangeEnd)}clearRange(){this.localRangeStart=null,this.localRangeEnd=null,this.emitRangeChange(null,null)}emitRangeChange(e,t){this.dispatchEvent(new CustomEvent(`rangeChange`,{detail:{start:e,end:t},bubbles:!0,composed:!0}))}openEvent(e){this.selectedEventId=e.id,this.dispatchEvent(new CustomEvent(`eventSelect`,{detail:e,bubbles:!0,composed:!0}))}openDayOverflow(e){let t=e.events[this.dayMaxVisibleEvents];t&&this.openEvent(t)}openCreateModal(e){!this.disabled&&this.allowCreate&&(this.formError=``,this.eventForm=this.createEmptyForm(e??this.localSelectedDate??this.localActiveDate),this.modalMode=`create`)}openEditModal(e){!this.disabled&&this.allowEdit&&(this.formError=``,this.selectedEventId=e.id,this.eventForm=this.createFormFromEvent(e),this.modalMode=`edit`)}openDeleteModal(){!this.disabled&&this.allowDelete&&this.selectedEvent&&(this.deleteScope=`single`,this.modalMode=`delete`)}closeOverlay(){this.modalMode=null,this.formError=``}closeSelectedEvent(){this.selectedEventId=null}saveEvent(){if(!this.eventForm.title.trim()){this.formError=`El título es obligatorio.`;return}let e=this.selectedEventId??void 0,t=this.formToEvent(this.eventForm,e);this.modalMode===`edit`&&e?(this.localEvents=this.localEvents.map(n=>n.id===e?t:n),this.emitEventUpdate(t)):(this.localEvents=[...this.localEvents,t],this.emitEventCreate(this.toEventDraft(t))),this.selectedEventId=t.id,this.localSelectedDate=this.startOfDay(t.start),this.setActiveDate(t.start),this.closeOverlay()}confirmDelete(){let e=this.selectedEvent;if(!e){this.closeOverlay();return}let t=this.deleteScope;this.emitEventDelete({eventId:e.id,scope:t}),this.localEvents=this.localEvents.filter(n=>!e.seriesId||t===`single`?n.id!==e.id:t===`all`?n.seriesId!==e.seriesId:n.seriesId!==e.seriesId||n.start.getTime()<e.start.getTime()),this.selectedEventId=null,this.closeOverlay()}handleEscape(){if(this.modalMode){this.closeOverlay();return}this.selectedEvent&&this.closeSelectedEvent()}handleDocumentKeydown=e=>{if(e.key===`Escape`){this.handleEscape();return}e.key===`Tab`&&this.modalMode!==null&&this.handleModalTab(e)};handleModalTab(e){let t=this.shadowRoot?.querySelector(`.dcx-calendar-dialog`);if(!t)return;let n=this.getFocusableElements(t);if(n.length===0){e.preventDefault(),t.focus();return}let r=this.shadowRoot?.activeElement,i=r&&t.contains(r)?n.indexOf(r):-1;e.shiftKey?i<=0&&(e.preventDefault(),this.focusElement(n[n.length-1])):(i===-1||i===n.length-1)&&(e.preventDefault(),this.focusElement(n[0]))}getFocusableElements(e){let t=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`,`dcx-web-button`,`dcx-web-radio`].join(`, `);return Array.from(e.querySelectorAll(t)).filter(e=>{if(e.getAttribute(`tabindex`)===`-1`||e.hasAttribute(`disabled`)||`disabled`in e&&e.disabled)return!1;let t=window.getComputedStyle(e);return t.display!==`none`&&t.visibility!==`hidden`})}focusElement(e){if(e){if(e.shadowRoot){let t=e.shadowRoot.querySelector(`input:checked`)||e.shadowRoot.querySelector(`button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`);if(t){t.focus();return}}e.focus()}}emitEventCreate(e){this.dispatchEvent(new CustomEvent(`eventCreate`,{detail:e,bubbles:!0,composed:!0}))}emitEventUpdate(e){this.dispatchEvent(new CustomEvent(`eventUpdate`,{detail:e,bubbles:!0,composed:!0}))}emitEventDelete(e){this.dispatchEvent(new CustomEvent(`eventDelete`,{detail:e,bubbles:!0,composed:!0}))}getVisibleEvents(e){return e.events.slice(0,this.dayMaxVisibleEvents)}getOverflowCount(e){return Math.max(e.events.length-this.dayMaxVisibleEvents,0)}getWeekSlotEvents(e,t){return this.localEvents.filter(n=>this.isSameDate(n.start,e)&&!n.allDay&&n.start.getHours()===t)}getEventClass(e){switch(e){case`delivery`:return`green`;case`reminder`:return`orange`;case`urgent`:return`red`;case`personal`:return`purple`;default:return`blue`}}formatDayLabel(e){return e.toLocaleDateString(`es-ES`,{weekday:`short`,day:`numeric`,month:`short`})}formatTimeRange(e){return e.allDay||!e.end?`Todo el día`:`${this.formatTime(e.start)} – ${this.formatTime(e.end)}`}formatRecurrenceLabel(e){switch(e){case`daily`:return`Repite cada día`;case`weekly`:return`Repite cada semana`;case`monthly`:return`Repite cada mes`;default:return`Sin recurrencia`}}setActiveDate(e){let t=this.startOfDay(e);this.localActiveDate=t,this.dispatchEvent(new CustomEvent(`activeDateChange`,{detail:t,bubbles:!0,composed:!0}))}buildMonthGrid(e,t,n,r,i=!0){let a=new Date(e.getFullYear(),e.getMonth(),1),o=this.startOfWeek(a),s=Array.from({length:42},(a,s)=>{let c=this.addDays(o,s),l=this.startOfDay(c),u=t?this.startOfDay(t):null,d=n?this.startOfDay(n):null,f=!!u&&this.isSameDate(l,u),p=!!d&&this.isSameDate(l,d),m=!!u&&!!d&&l.getTime()>u.getTime()&&l.getTime()<d.getTime();return{date:l,isCurrentMonth:l.getMonth()===e.getMonth(),isToday:this.isSameDate(l,this.today),isWeekend:[0,6].includes(l.getDay()),isSelected:!!r&&this.isSameDate(l,r),isRangeStart:f,isRangeEnd:p,isInRange:m,events:i?this.getEventsForDate(l):[]}});return Array.from({length:6},(e,t)=>s.slice(t*7,t*7+7))}getEventsForDate(e){return this.localEvents.filter(t=>this.isSameDate(t.start,e)).sort((e,t)=>e.start.getTime()-t.start.getTime())}createEmptyForm(e){return{title:``,date:this.toDateInputValue(e),startTime:`10:00`,endTime:`11:00`,allDay:!1,type:`meeting`,description:``,recurrence:`none`}}createFormFromEvent(e){return{title:e.title,date:this.toDateInputValue(e.start),startTime:e.allDay?`09:00`:this.toTimeInputValue(e.start),endTime:e.end?this.toTimeInputValue(e.end):`10:00`,allDay:e.allDay,type:e.type,description:e.description??``,recurrence:e.recurrence??`none`}}formToEvent(e,t){let[n,r,i]=e.date.split(`-`).map(Number),a=new Date(n,r-1,i);if(!e.allDay){let[t,n]=e.startTime.split(`:`).map(Number);a.setHours(t,n,0,0)}let o=null;if(!e.allDay){let[t,a]=e.endTime.split(`:`).map(Number);o=new Date(n,r-1,i,t,a,0,0)}let s=t?this.localEvents.find(e=>e.id===t):void 0;return{id:t??`event-${Date.now()}`,title:e.title.trim(),start:a,end:o,allDay:e.allDay,type:e.type,description:e.description.trim(),recurrence:e.recurrence,seriesId:s?.seriesId}}toEventDraft(e){return{title:e.title,start:new Date(e.start),end:e.end?new Date(e.end):null,allDay:e.allDay,type:e.type,description:e.description,recurrence:e.recurrence??`none`}}cloneEvents(e){return e.map(e=>({...e,start:new Date(e.start),end:e.end?new Date(e.end):null}))}normalizeDate(e){return e?this.startOfDay(e):null}startOfWeek(e){let t=this.startOfDay(e),n=t.getDay()===0?6:t.getDay()-1;return this.addDays(t,-n)}addDays(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),this.startOfDay(n)}startOfDay(e){let t=new Date(e);return t.setHours(0,0,0,0),t}isSameDate(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}toDateInputValue(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}toTimeInputValue(e){return`${String(e.getHours()).padStart(2,`0`)}:${String(e.getMinutes()).padStart(2,`0`)}`}formatTime(e){return e.toLocaleTimeString(`es-ES`,{hour:`2-digit`,minute:`2-digit`,hour12:!1})}capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}render(){return f(this)}};a([i({type:String}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`view`,null),a([i({attribute:!1}),o(`design:type`,typeof Date>`u`?Object:Date),o(`design:paramtypes`,[])],S.prototype,`activeDate`,null),a([i({attribute:!1}),o(`design:type`,Array),o(`design:paramtypes`,[])],S.prototype,`events`,null),a([i({type:String}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`selectionMode`,null),a([i({attribute:!1}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`selectedDate`,null),a([i({attribute:!1}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`rangeStart`,null),a([i({attribute:!1}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`rangeEnd`,null),a([i({type:Boolean}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`disabled`,null),a([i({type:Boolean}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`allowCreate`,null),a([i({type:Boolean}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`allowEdit`,null),a([i({type:Boolean}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`allowDelete`,null),a([i({type:Number}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`dayMaxVisibleEvents`,null),a([i({type:Number}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`weekStartHour`,null),a([i({type:Number}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`weekEndHour`,null),a([i({type:Boolean}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`showFooter`,null),a([i({type:String,attribute:`aria-label`}),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`ariaLabel`,null),a([r(),o(`design:type`,typeof Date>`u`?Object:Date),o(`design:paramtypes`,[])],S.prototype,`localActiveDate`,null),a([r(),o(`design:type`,Array),o(`design:paramtypes`,[])],S.prototype,`localEvents`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`localSelectedDate`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`localRangeStart`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`localRangeEnd`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`selectedEventId`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`modalMode`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`deleteScope`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`formError`,null),a([r(),o(`design:type`,Object),o(`design:paramtypes`,[])],S.prototype,`eventForm`,null),S=a([s(`dcx-web-calendar`)],S);var C={title:`DCXLibrary/WebComponents/Calendar`,component:`dcx-web-calendar`,tags:[`autodocs`],parameters:{layout:`padded`,controls:{expanded:!0}},argTypes:{view:{control:`select`,options:l,description:`Vista activa del calendario.`,table:{category:`Atributos`,type:{summary:`'month' | 'week' | 'year' | 'mini'`},defaultValue:{summary:`month`}}},selectionMode:{control:`select`,options:u,description:`Modo de selección.`,table:{category:`Atributos`,type:{summary:`'none' | 'single' | 'range'`},defaultValue:{summary:`none`}}},activeDate:{control:`date`,description:`Fecha base visible del calendario.`,table:{category:`Atributos`,type:{summary:`Date`}}},selectedDate:{control:`date`,description:`Fecha seleccionada.`,table:{category:`Atributos`}},rangeStart:{control:`date`,description:`Inicio del rango.`,table:{category:`Atributos`}},rangeEnd:{control:`date`,description:`Fin del rango.`,table:{category:`Atributos`}},dayMaxVisibleEvents:{control:`number`,description:`Máximo de eventos visibles por celda.`,table:{category:`Atributos`}},weekStartHour:{control:`number`,description:`Hora inicial semanal.`,table:{category:`Atributos`}},weekEndHour:{control:`number`,description:`Hora final semanal.`,table:{category:`Atributos`}},disabled:{control:`boolean`,table:{category:`Atributos`}},allowCreate:{control:`boolean`,description:`Permite crear eventos desde la UI.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},allowEdit:{control:`boolean`,description:`Permite editar eventos.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},allowDelete:{control:`boolean`,description:`Permite eliminar eventos.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},showFooter:{control:`boolean`,table:{category:`Atributos`}},ariaLabel:{control:`text`,table:{category:`Atributos`}},events:{control:!1,description:`Listado de eventos renderizados.`,table:{category:`Atributos`,type:{summary:`DcxCalendarEvent[]`}}},viewChange:{action:`viewChange`,table:{category:`Eventos`}},activeDateChange:{action:`activeDateChange`,table:{category:`Eventos`,type:{summary:`Date`}}},dateSelect:{action:`dateSelect`,table:{category:`Eventos`,type:{summary:`Date`}}},rangeChange:{action:`rangeChange`,table:{category:`Eventos`,type:{summary:`{ start: Date | null; end: Date | null }`}}},eventSelect:{action:`eventSelect`,table:{category:`Eventos`,type:{summary:`DcxCalendarEvent`}}},eventCreate:{action:`eventCreate`,table:{category:`Eventos`,type:{summary:`DcxCalendarEventDraft`}}},eventUpdate:{action:`eventUpdate`,table:{category:`Eventos`}},eventDelete:{action:`eventDelete`,table:{category:`Eventos`}}},args:{view:`month`,activeDate:new Date(2026,5,18),events:c(),selectionMode:`single`,selectedDate:new Date(2026,5,18),rangeStart:null,rangeEnd:null,disabled:!1,allowCreate:!0,allowEdit:!0,allowDelete:!0,dayMaxVisibleEvents:2,weekStartHour:9,weekEndHour:16,showFooter:!0,ariaLabel:`Calendar`},render:t=>e`
    <dcx-web-calendar
      .view=${t.view}
      .activeDate=${t.activeDate}
      .events=${t.events}
      .selectionMode=${t.selectionMode}
      .selectedDate=${t.selectedDate}
      .rangeStart=${t.rangeStart}
      .rangeEnd=${t.rangeEnd}
      .dayMaxVisibleEvents=${t.dayMaxVisibleEvents}
      .weekStartHour=${t.weekStartHour}
      .weekEndHour=${t.weekEndHour}
      aria-label=${t.ariaLabel}
      ?disabled=${t.disabled}
      ?allowCreate=${t.allowCreate}
      ?allowEdit=${t.allowEdit}
      ?allowDelete=${t.allowDelete}
      ?showFooter=${t.showFooter}
    >
    </dcx-web-calendar>
  `},w={},T={args:{events:[],selectionMode:`range`,selectedDate:null,rangeStart:new Date(2026,5,19),rangeEnd:new Date(2026,5,20),allowCreate:!1}},E={args:{view:`week`,selectionMode:`none`,showFooter:!1}},D={args:{view:`year`,activeDate:new Date(2026,0,1),showFooter:!1}},O={args:{view:`mini`,activeDate:new Date(2026,5,17),selectedDate:new Date(2026,5,17),allowCreate:!1,allowEdit:!1,allowDelete:!1}},k={args:{disabled:!0}},A={args:{allowCreate:!1,allowEdit:!1,allowDelete:!1}},j={args:{view:`week`,weekStartHour:6,weekEndHour:22}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    events: [],
    selectionMode: 'range',
    selectedDate: null,
    rangeStart: new Date(2026, 5, 19),
    rangeEnd: new Date(2026, 5, 20),
    allowCreate: false
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    view: 'week',
    selectionMode: 'none',
    showFooter: false
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    view: 'year',
    activeDate: new Date(2026, 0, 1),
    showFooter: false
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    view: 'mini',
    activeDate: new Date(2026, 5, 17),
    selectedDate: new Date(2026, 5, 17),
    allowCreate: false,
    allowEdit: false,
    allowDelete: false
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    allowCreate: false,
    allowEdit: false,
    allowDelete: false
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    view: 'week',
    weekStartHour: 6,
    weekEndHour: 22
  }
}`,...j.parameters?.docs?.source}}};var M=[`Month`,`Range`,`Week`,`Year`,`Mini`,`Disabled`,`WithoutCrud`,`WeekExtendedHours`];export{k as Disabled,O as Mini,w as Month,T as Range,E as Week,j as WeekExtendedHours,A as WithoutCrud,D as Year,M as __namedExportsOrder,C as default};
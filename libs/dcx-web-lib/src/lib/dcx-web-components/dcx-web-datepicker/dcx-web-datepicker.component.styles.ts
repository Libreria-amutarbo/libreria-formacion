import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    width: 100%;
    max-width: 280px;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-datepicker {
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-default, #e5e7eb);
    border-radius: var(--r-xl, 12px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .dcx-datepicker__input-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    outline: none;
  }

  .dcx-datepicker__input-wrapper:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
    border-radius: var(--r-xl, 12px);
  }

  .dcx-datepicker__input-wrapper--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .dcx-datepicker__input {
    width: 100%;
    pointer-events: none;
    background-color: var(--bg-default, #ffffff);
    border: 1px solid var(--border-input, #d1d5db);
    border-radius: var(--r-sm, 4px);
    font-size: var(--fs-base, 14px);
    color: var(--text-dark, #2a2e33);
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    font-family: inherit;
    box-sizing: border-box;
    cursor: pointer;
  }


  .dcx-datepicker__popover {
    border-top: 1px solid var(--border-default, #e5e7eb);
    width: 100%;
    box-sizing: border-box;
  }

  .dcx-datepicker__calendar {
    width: 100%;
    box-sizing: border-box;
  }

  .dcx-datepicker__header {
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-primary, #0058ab);
    box-sizing: border-box;
  }

  .dcx-datepicker__nav {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--content-default-white, #ffffff);
    padding: var(--sp-1, 4px);
    border-radius: var(--r-sm, 4px);
    display: flex;
    align-items: center;
    transition: background 0.15s;
  }

  .dcx-datepicker__nav dcx-web-icon,
  .dcx-datepicker__nav .dcx-icon,
  .dcx-datepicker__nav .dcx-icon i {
    color: var(--content-default-white, #ffffff);
    fill: var(--content-default-white, #ffffff);
  }

  .dcx-datepicker__nav:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .dcx-datepicker__nav:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  .dcx-datepicker__month-year {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 14px;
    font-weight: 600;
    color: var(--content-default-white, #ffffff);
  }

  .dcx-datepicker__month,
  .dcx-datepicker__year {
    --text-dark: var(--content-default-white, #ffffff);
    --bg-hover: rgba(255, 255, 255, 0.2);
    --fs-sm: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }


  .dcx-datepicker__select-list {
    display: grid;
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    gap: 4px;
    box-sizing: border-box;
  }

  .dcx-datepicker__select-list--months {
    grid-template-columns: repeat(3, 1fr);
  }

  .dcx-datepicker__select-list--years {
    grid-template-columns: repeat(4, 1fr);
  }

  .dcx-datepicker__select-item {
    width: 100%;
  }

  .dcx-datepicker__grid-wrapper {
    padding: var(--sp-2, 8px) var(--sp-2, 8px) var(--sp-3, 12px);
    box-sizing: border-box;
  }

  .dcx-datepicker__grid {
    width: 100%;
    border-collapse: separate;
    border-spacing: 2px 1px;
    table-layout: fixed;
  }

  .dcx-datepicker__weekday {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted, #696e75);
    text-align: center;
    padding: 5px 0 6px;
  }

  .dcx-datepicker__day {
    display: grid;
    width: 100%;
    height: 36px;
    box-sizing: border-box;
  }

  .dcx-datepicker__day:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -1px;
    border-radius: var(--r-sm, 4px);
  }

  .dcx-datepicker__day--today {
    --text-dark: var(--bg-primary, #0058ab);
    --fw-medium: var(--fw-bold, 700);
  }

  .dcx-datepicker__day--selected {
    background: var(--bg-primary, #0058ab);
    --text-dark: var(--content-default-white, #ffffff);
    --bg-hover: var(--bg-primary-hover, #004080);
    border-radius: var(--r-sm, 4px);
  }

  .dcx-datepicker__day--in-range {
    background: var(--color-info-bg, #eff6ff);
    --text-dark: var(--color-info, #0058ab);
    --bg-hover: #dbeafe;
    border-radius: 6px;
  }

  .dcx-datepicker__day--other-month {
    --text-dark: var(--text-placeholder, #9ca3af);
  }



  .dcx-datepicker__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--spacing-xs, 8px);
    padding: var(--spacing-xs, 8px) var(--sp-3, 12px);
    border-top: 1px solid var(--border-default, #e5e7eb);
    flex-wrap: nowrap;
    max-width: 100%;
    box-sizing: border-box;
    --r-sm: 20px;
  }

  .dcx-datepicker__footer-btn {
    min-width: 0;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-semibold, 600);
    border-radius: var(--r-sm, 4px);
    border: none;
    cursor: pointer;
    padding: 0 8px;
    box-sizing: border-box;
    transition: background 0.2s, color 0.2s;
    max-width: 100%;
    flex: 0 0 auto;
  }

  .dcx-datepicker__footer-btn--ghost {
    color: var(--text-muted, #696e75);
    box-shadow: none;
  }

  .dcx-datepicker__footer-btn--primary {
    background: transparent;
    color: inherit;
  }

  .dcx-datepicker__footer-btn--secondary {
    background: var(--bg-default, #ffffff);
    color: var(--bg-primary, #0058ab);
    border: none;
    box-shadow: none;
    transition: color 0.2s;
  }

  .dcx-datepicker__footer-btn--secondary:hover {
    color: var(--bg-primary-hover, #004080);
  }

  .dcx-datepicker__footer-btn .dcx-icon {
    margin-right: 0.5em;
  }
`;

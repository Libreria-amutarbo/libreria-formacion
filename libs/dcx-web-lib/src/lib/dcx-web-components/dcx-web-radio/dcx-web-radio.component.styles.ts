import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-radio-group {
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-md, 6px);
    padding: var(--sp-4, 16px);
    background: var(--bg-default, #ffffff);
    margin: 0;
  }

  .dcx-radio-group__legend {
    font-weight: var(--fw-semibold, 600);
    font-size: var(--fs-base, 14px);
    color: var(--text-label, #4f545a);
    padding: 0;
    margin-bottom: var(--sp-4, 16px);
  }

  .dcx-radio-group__options {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3, 12px);
  }

  .dcx-radio-group__hint {
    margin-top: var(--sp-2, 8px);
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
  }

  .dcx-radio-group__error {
    margin-top: var(--sp-2, 8px);
    font-size: var(--fs-sm, 12px);
    color: var(--border-error, #dc2626);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-radio {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    cursor: pointer;
    position: relative;
    user-select: none;
    color: var(--text-label, #4f545a);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);

    --dcx-radio-size: 20px;
    --dcx-radio-dot-size: 8px;
    --dcx-radio-border-color: var(--border-default, #2a2e33);
    --dcx-radio-dot-color: var(--bg-primary, #0058ab);
  }

  .dcx-radio__native {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .dcx-radio__control {
    width: var(--dcx-radio-size);
    height: var(--dcx-radio-size);
    border: 1.5px solid var(--dcx-radio-border-color);
    border-radius: var(--r-pill, 999px);
    background: var(--bg-default, #ffffff);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .dcx-radio__control::after {
    content: '';
    width: var(--dcx-radio-dot-size);
    height: var(--dcx-radio-dot-size);
    border-radius: var(--r-pill, 999px);
    background: var(--dcx-radio-dot-color);
    transform: scale(0);
    transition: transform 0.15s ease;
  }

  .dcx-radio__label {
    color: inherit;
  }

  .dcx-radio--checked {
    --dcx-radio-border-color: var(--bg-primary, #0058ab);
  }

  .dcx-radio--checked .dcx-radio__control::after {
    transform: scale(1);
  }

  .dcx-radio:hover:not(.dcx-radio--disabled):not(.dcx-radio--error) {
    --dcx-radio-border-color: var(--bg-primary, #0058ab);
  }

  .dcx-radio--error:hover:not(.dcx-radio--disabled) {
    --dcx-radio-border-color: var(--border-default, #2a2e33);
  }

  .dcx-radio:focus-within:not(.dcx-radio--disabled) .dcx-radio__control {
    box-shadow: 0 0 0 2px var(--bg-default, #ffffff), 0 0 0 4px var(--bg-primary, #0058ab);
  }

  .dcx-radio:focus-within:not(.dcx-radio--disabled).dcx-radio--error .dcx-radio__control {
    box-shadow: 0 0 0 2px var(--bg-default, #ffffff), 0 0 0 4px var(--border-error, #dc2626);
  }

  .dcx-radio--error {
    --dcx-radio-border-color: var(--border-error, #dc2626);
    --dcx-radio-dot-color: var(--border-error, #dc2626);
    color: var(--border-error, #dc2626);
  }

  .dcx-radio--disabled {
    cursor: not-allowed;
    color: var(--text-disabled, #696e75);
    --dcx-radio-border-color: var(--border-light, #d1d5db);
  }

  .dcx-radio--disabled .dcx-radio__control {
    background: var(--bg-disabled, #f3f4f6);
  }

  .dcx-radio--disabled.dcx-radio--checked {
    --dcx-radio-dot-color: var(--text-disabled-dark, #4f545a);
  }

  .dcx-radio--s {
    --dcx-radio-size: var(--fs-base, 14px);
    --dcx-radio-dot-size: var(--r-md, 6px);
  }

  .dcx-radio--m {
    --dcx-radio-size: var(--sp-4, 16px);
    --dcx-radio-dot-size: var(--sp-2, 8px);
  }

  .dcx-radio--l {
    --dcx-radio-size: var(--fs-lg, 18px);
    --dcx-radio-dot-size: var(--sp-2, 8px);
  }
`;

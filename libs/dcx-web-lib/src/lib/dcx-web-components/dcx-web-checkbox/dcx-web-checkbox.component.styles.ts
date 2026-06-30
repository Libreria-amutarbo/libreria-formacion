import { css } from 'lit';

export const dcxWebCheckboxStyles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
  }

  .dcx-checkbox-group__options {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3, 12px);
  }

  .dcx-checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    cursor: pointer;
    user-select: none;
    width: fit-content;
  }

  .dcx-checkbox-label--disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-checkbox-label--left {
    flex-direction: row;
  }

  .dcx-checkbox__btn {
    margin: 0;
    padding: 0.3rem;
    background: none;
    border: 1px solid transparent;
    border-radius: var(--r-sm, 4px);
    font-family: inherit;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 1.4rem;
    height: 1.4rem;
    box-sizing: border-box;

    cursor: pointer;
    outline: none;

    transition:
      background 0.12s ease,
      border-color 0.12s ease,
      box-shadow 0.12s ease,
      color 0.12s ease;
  }

  .dcx-checkbox__btn--secondary {
    background-color: var(--bg-default, #ffffff);
    color: var(--text-dark, #2a2e33);
    border-color: var(--border-light, #d1d5db);
  }

  .dcx-checkbox__btn--secondary:hover:not(:disabled) {
    background-color: var(--bg-hover, #f7f8fa);
    border-color: var(--border-hover, #9ca3af);
  }

  .dcx-checkbox__btn--secondary:active:not(:disabled) {
    background-color: var(--bg-pressed, #e1e3e6);
  }

  .dcx-checkbox__btn--secondary:focus-visible {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
  }

  .dcx-checkbox__btn--primary {
    background-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
    border-color: var(--bg-primary, #0058ab);
  }

  .dcx-checkbox__btn--primary:hover:not(:disabled) {
    background-color: var(--bg-primary-hover, #004080);
    border-color: var(--bg-primary-hover, #004080);
  }

  .dcx-checkbox__btn--primary:active:not(:disabled) {
    background-color: var(--bg-primary-pressed, #121a38);
  }

  .dcx-checkbox__btn--primary:focus-visible {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
  }

  .dcx-checkbox__btn--error-primary,
  .dcx-checkbox__btn--error-secondary {
    border-color: var(--border-error, #dc2626);
  }

  .dcx-checkbox__btn--error-primary {
    background-color: var(--background-error, #dc2626);
    color: var(--text-error, #fff);
  }

  .dcx-checkbox__btn--error-primary:hover:not(:disabled),
  .dcx-checkbox__btn--error-secondary:hover:not(:disabled) {
    background-color: var(--background-error-hover, #ffffff);
    border: 2px solid var(--border-error-hover, #dc2626);
    color: var(--border-error-hover, #dc2626);

    border-color: var(--border-error-hover, #dc2626);
    transform: scale(1.2);
  }

  .dcx-checkbox__btn:disabled {
    background-color: var(--bg-default, #ffffff);
    border-color: var(--border-light, #d1d5db);
    color: var(--text-disabled, #696e75);
    cursor: not-allowed;
    pointer-events: none;
  }

  .dcx-checkbox__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    line-height: 0;
  }

  .dcx-checkbox-text {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);
  }

  .dcx-checkbox-text--error {
    color: var(--text-error, #dc2626);
  }

  .dcx-checkbox__required {
    color: var(--color-error, #dc2626);
  }

  .dcx-checkbox__error {
    display: flex;
    align-items: center;
    gap: var(--sp-1, 4px);
    margin-top: var(--sp-1, 4px);
    color: var(--text-error, #dc2626);
    font-size: var(--fs-sm, 12px);
  }

  .dcx-checkbox__error-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }
`;
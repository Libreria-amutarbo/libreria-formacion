import { css } from 'lit';

export const dcxWebInputStyles = css`
  :host {
    display: inline-block;
    width: 100%;
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  :host([orientation='vertical']) .dcx-input__control {
    transform: rotate(-90deg);
    transform-origin: center;
  }

  .dcx-input__label {
    display: inline-block;
    margin-bottom: var(--sp-2, 8px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-input__label--invalid {
    color: var(--color-error, #dc2626);
  }

  .dcx-input__required {
    color: var(--color-error, #dc2626);
  }

  .dcx-input__wrapper {
    position: relative;
    width: 100%;
  }

  .dcx-input__field {
    position: relative;
    width: 100%;
  }

  .dcx-input__leading-icon {
    position: absolute;
    left: var(--sp-3, 12px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .dcx-input__control {
    width: 100%;
    background-color: var(--bg-default, #ffffff);
    border: 1px solid var(--border-input, #d1d5db);
    border-radius: var(--r-sm, 4px);
    font-size: var(--fs-base, 14px);
    color: var(--text-dark, #2a2e33);
    box-sizing: border-box;
  }

  .dcx-input__control:focus-visible {
    outline: none;
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 2px rgba(1, 88, 171, 0.15);
  }

  .dcx-input__control:hover:not(:disabled) {
    box-shadow: 0 0 0 2px var(--border-hover, #9ca3af);
  }

  .dcx-input__control--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--bg-disabled, #f3f4f6);
    color: var(--text-disabled, #696e75);
  }

  .dcx-input__control--invalid {
    border-color: var(--border-error, #dc2626);
    box-shadow: 0 0 0 1px var(--border-error, #dc2626);
    color: var(--color-error, #dc2626);
  }

  .dcx-input__control--xs {
    padding: var(--sp-2, 8px);
  }

  .dcx-input__control--s {
    padding: var(--sp-3, 12px);
  }

  .dcx-input__control--m {
    padding: var(--sp-4, 16px);
  }

  .dcx-input__control--l {
    padding: var(--sp-5, 20px);
  }

  .dcx-input__control--xl {
    padding: var(--sp-6, 24px);
  }

  .dcx-input__control--has-icon {
    padding-left: 40px;
  }

  .dcx-input__control--has-action {
    padding-right: var(--sp-10, 40px);
  }

  .dcx-input__hint {
    margin-top: var(--sp-1, 4px);
    color: var(--text-muted, #696e75);
    font-size: var(--fs-sm, 12px);
  }

  .dcx-input__error {
    margin-top: var(--sp-2, 8px);
    color: var(--color-error, #dc2626);
    font-size: var(--fs-sm, 12px);
    display: flex;
    align-items: flex-start;
    gap: var(--sp-2, 8px);
  }

  .dcx-input__error-list {
    margin: var(--sp-1, 4px) 0 0;
    padding-left: var(--sp-4, 16px);
    list-style: disc;
  }

  .dcx-input__action-button {
    position: absolute;
    right: var(--sp-2, 8px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
`;
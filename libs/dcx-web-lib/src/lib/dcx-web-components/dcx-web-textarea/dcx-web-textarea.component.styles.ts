import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    width: 100%;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-textarea__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
    width: 100%;
  }

  .dcx-textarea__wrapper--fluid {
    width: 100%;
  }

  .dcx-textarea__wrapper--float .dcx-textarea__label {
    position: absolute;
    z-index: 1;
    font-size: var(--fs-base, 14px);
    color: var(--text-label, #4f545a);
    font-weight: var(--fw-regular, 400);
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    left: var(--sp-3, 12px);
    top: var(--sp-2, 8px);
  }

  .dcx-textarea__wrapper--over.dcx-textarea__wrapper--active .dcx-textarea__label {
    top: -16px;
    font-size: var(--fs-sm, 12px);
    background: var(--bg-default, #ffffff);
    padding: 0 var(--sp-1, 4px);
  }

  .dcx-textarea__wrapper--in.dcx-textarea__wrapper--active .dcx-textarea__label {
    top: var(--sp-2, 8px);
    font-size: var(--fs-sm, 12px);
    color: var(--text-placeholder, #9ca3af);
  }

  .dcx-textarea__wrapper--on.dcx-textarea__wrapper--active .dcx-textarea__label {
    top: -8px;
    font-size: var(--fs-sm, 12px);
    color: var(--text-label, #4f545a);
    background: var(--bg-default, #ffffff);
    padding: 0 var(--sp-1, 4px);
  }

  .dcx-textarea__wrapper--ifta .dcx-textarea__label {
    font-size: var(--fs-sm, 12px);
    color: var(--text-placeholder, #9ca3af);
    top: var(--sp-2, 8px);
    transition: none;
  }

  .dcx-textarea__label {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #2a2e33);
  }

  .dcx-textarea__label--invalid {
    color: var(--border-error, #dc2626);
  }

  .dcx-textarea__label--disabled {
    color: var(--text-disabled, #9ca3af);
  }

  .dcx-textarea__required {
    color: var(--border-error, #dc2626);
    margin-left: 2px;
  }

  .dcx-textarea__control {
    width: 100%;
    max-width: 100%;
    min-height: 96px;
    box-sizing: border-box;
    overflow: auto;

    border: 2px solid var(--border-input, #d1d5db);
    border-radius: var(--r-md, 6px);
    background: var(--bg-default, #ffffff);
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
  }

  .dcx-textarea__wrapper--fluid .dcx-textarea__control {
    max-width: none;
    width: 100%;
  }

  .dcx-textarea__wrapper--float .dcx-textarea__control {
    padding-top: var(--sp-6, 24px);
  }

  .dcx-textarea__control::placeholder {
    color: var(--text-placeholder, #9ca3af);
  }

  .dcx-textarea__control:focus-visible {
    outline: none;
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 2px rgba(29, 184, 242, 0.18);
  }

  .dcx-textarea__control:disabled {
    background: var(--bg-hover, #e1e3e6);
    color: var(--text-muted, #696e75);
    cursor: not-allowed;
  }

  .dcx-textarea__control--autoresize {
    overflow: hidden;
    resize: none;
  }

  .dcx-textarea__control--small {
    min-height: 48px;
    font-size: var(--fs-xs, 11px);
    line-height: 1.3;
    padding: var(--sp-1, 4px) var(--sp-2, 8px);
  }

  .dcx-textarea__control--large {
    min-height: 160px;
    font-size: var(--fs-lg, 18px);
    line-height: 1.8;
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
  }

  .dcx-textarea__control--filled {
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-textarea__control--filled:focus-visible {
    background: var(--bg-default, #ffffff);
  }

  .dcx-textarea__control--invalid {
    border-color: var(--border-error, #dc2626);
  }

  .dcx-textarea__control--invalid:focus-visible {
    border-color: var(--border-error, #dc2626);
    box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.15);
  }

  .dcx-textarea__hint {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    margin-top: var(--sp-1, 4px);
    font-weight: var(--fw-regular, 400);
  }

  .dcx-textarea__error {
    font-size: var(--fs-sm, 12px);
    color: var(--border-error, #dc2626);
    margin-top: var(--sp-1, 4px);
    font-weight: var(--fw-regular, 400);
  }
`;

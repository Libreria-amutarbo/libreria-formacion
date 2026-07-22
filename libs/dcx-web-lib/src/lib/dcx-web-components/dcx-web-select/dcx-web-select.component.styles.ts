import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    width: 100%;
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
    box-sizing: border-box;
  }

  .dcx-select__label {
    display: inline-block;
    margin-bottom: var(--sp-1, 4px);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-select__required {
    color: var(--color-error, #dc2626);
  }

  .dcx-select__wrapper {
    position: relative;
  }

  .dcx-select__control {
    width: 100%;
    display: flex;
    align-items: center;
    padding: var(--sp-2, 8px)
      var(--sp-3, 12px);

    border: 1px solid
      var(--border-input, #d1d5db);

    border-radius:
      var(--r-sm, 4px);

    background: var(
      --bg-default,
      #ffffff
    );

    box-sizing: border-box;

    cursor: pointer;
  }

  .dcx-select__control.is-open,
  .dcx-select__control:focus-visible {
    border-color: var(
      --border-focus,
      #1db8f2
    );
  }

  .dcx-select__control.is-disabled {
    background-color: var(--bg-disabled, #f3f4f6);
    color: var(--text-disabled, #696e75);
    border-color: var(--border-disabled, #e5e7eb);
    cursor: not-allowed;
  }

  .dcx-select--spacing-xs {
    padding: var(--sp-1, 4px) var(--sp-2, 8px);
  }

  .dcx-select--spacing-s {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
  }

  .dcx-select--spacing-m {
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
  }

  .dcx-select--spacing-l {
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
  }

  .dcx-select--spacing-xl {
    padding: var(--sp-5, 20px) var(--sp-6, 24px);
  }

  .dcx-select__control.is-invalid {
    border-color: var(--border-error, #dc2626);
  }

  .dcx-select__control.is-invalid:focus-visible,
  .dcx-select__control.is-invalid.is-open {
    box-shadow: 0 0 0 2px rgba(220,38,38,.15);
  }

  .dcx-select__buttons {
    display: flex;
    align-items: center;
    gap: var(--sp-1, 4px);
    margin-left: auto;
    flex-shrink: 0;
  }

  .dcx-select__clear-btn {
    flex-shrink: 0;

    width: 16px;
    height: 16px;

    min-width: 16px;
    min-height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-select__panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 50;
    margin-top: var(--sp-1, 4px);
    border: 1px solid
      var(--border-input, #d1d5db);

    border-radius:
      var(--r-sm, 4px);

    background: var(
      --bg-default,
      #fff
    );

    box-shadow: var(
      --shadow-md,
      0 4px 12px rgba(0,0,0,.08)
    );
  }

  .dcx-select__options {
    max-height: var(--select-max-height, 250px);
    overflow-y: auto;
  }

  .dcx-select__option {
    padding: var(--sp-2, 8px)
      var(--sp-3, 12px);

    cursor: pointer;
  }

  .dcx-select__option.is-active,
  .dcx-select__option.is-selected {
    background: var(
      --bg-primary,
      #0058ab
    );

    color: var(
      --text-white,
      #ffffff
    );
  }

  .dcx-select__option.is-disabled {
    color: var(--text-disabled, #696e75);
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .dcx-select__option:not(.is-disabled):hover {
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-select__error {
    margin-top: var(--sp-1, 4px);
    color: var(
      --color-error,
      #dc2626
    );

    display: flex;
    gap: var(--sp-1, 4px);
  }
`;
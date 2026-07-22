import { css } from 'lit';

export const styles = css`
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

  .dcx-checkbox-text {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);
  }

  .dcx-checkbox-text--error {
    color: var(--color-error, #dc2626);
  }

  .dcx-checkbox__required {
    color: var(--color-error, #dc2626);
  }

  .dcx-checkbox__error {
    display: flex;
    align-items: center;
    gap: var(--sp-1, 4px);
    margin-top: var(--sp-1, 4px);
    color: var(--text-error, var(--color-error, #dc2626));
    font-size: var(--fs-sm, 12px);
  }

  .dcx-checkbox__error-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }
`;
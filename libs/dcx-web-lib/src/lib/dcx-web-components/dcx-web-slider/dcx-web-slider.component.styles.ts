import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  :host(.dcx-slider--vertical) {
    flex-direction: row;
    gap: var(--sp-1, 4px);
    align-items: center;
    height: 150px;
    width: fit-content;
  }

  :host(.dcx-slider--vertical) .dcx-slider__control {
    width: 40px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host(.dcx-slider--vertical) .dcx-slider__value-label {
    margin: 0;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    gap: var(--r-xs, 2px);
    width: 20px;
  }

  .dcx-slider__value-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--sp-2, 8px);
    font-size: var(--fs-sm, 12px);
    color: var(--text-dark, #2a2e33);
  }

  .dcx-slider__label {
    font-weight: var(--fw-medium, 500);
  }

  .dcx-slider__value {
    font-weight: var(--fw-bold, 700);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-slider__value-label.is-disabled .dcx-slider__value,
  .dcx-slider__value-label--disabled .dcx-slider__value {
    color: var(--text-disabled, #696e75);
  }


  .dcx-input__control {
    border: none !important;
    padding: 0 !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  .dcx-input__control:focus-visible {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  .dcx-input__wrapper {
    display: flex;
    align-items: center;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: var(--sp-1, 4px);
    border-radius: var(--r-xs, 2px);
    background: linear-gradient(
      to right,
      var(--bg-primary, #0058ab) var(--slider-progress, 0%),
      var(--border-light, #e5e7eb) var(--slider-progress, 0%)
    );
    outline: none;
    cursor: pointer;
    margin: var(--sp-2, 8px) 0;
    background-color: transparent;
  }

  input[type='range']:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: var(--r-xs, 2px);
    border-radius: var(--r-sm, 4px);
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--bg-primary, #0058ab);
    border: 2px solid #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--bg-primary, #0058ab);
    border: 2px solid #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  input[type='range']:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  input[type='range']:disabled::-webkit-slider-thumb {
    background: var(--text-disabled, #696e75);
  }

  input[type='range']:disabled::-moz-range-thumb {
    background: var(--text-disabled, #696e75);
  }
`;

import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
  }

  .dcx-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;

    gap: var(--sp-2, 8px);

    cursor: pointer;

    background: none;
    border: none;
    padding: 0;

    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);

    --toggle-width: 2.25rem;
    --toggle-height: 1.25rem;
    --thumb-size: 1rem;

    --toggle-transition-duration: 150ms;
    --toggle-transition-timing: ease;
  }

  .dcx-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-toggle--s {
    --toggle-width: 1.75rem;
    --toggle-height: 1rem;
    --thumb-size: 0.75rem;
  }

  .dcx-toggle--m {
    --toggle-width: 2.25rem;
    --toggle-height: 1.25rem;
    --thumb-size: 1rem;
  }

  .dcx-toggle--l {
    --toggle-width: 2.75rem;
    --toggle-height: 1.5rem;
    --thumb-size: 1.25rem;
  }

  .dcx-toggle--xl {
    --toggle-width: 3.25rem;
    --toggle-height: 1.75rem;
    --thumb-size: 1.5rem;
  }

  .dcx-toggle--top {
    flex-direction: column-reverse;
    align-items: center;
  }

  .dcx-toggle--bottom {
    flex-direction: column;
    align-items: center;
  }

  .dcx-toggle--left {
    flex-direction: row-reverse;
  }

  .dcx-toggle--right {
    flex-direction: row;
  }

  .dcx-toggle__track {
    width: var(--toggle-width);
    height: var(--toggle-height);

    background-color:
      var(--border-default, #2a2e33);

    border-radius: var(--r-pill, 999px);

    position: relative;

    flex-shrink: 0;

    transition:
      background-color
      var(--toggle-transition-duration)
      var(--toggle-transition-timing);
  }

  .dcx-toggle__thumb {
    display: block;

    width: var(--thumb-size);
    height: var(--thumb-size);

    background-color:
      var(--bg-default, #ffffff);

    border-radius: 50%;

    position: absolute;

    top: 50%;
    left: 0.125rem;

    transform: translateY(-50%);

    box-shadow: var(
      --shadow-sm,
      0 1px 2px rgba(0, 0, 0, 0.06)
    );

    transition:
      left
      var(--toggle-transition-duration)
      var(--toggle-transition-timing);
  }

  .dcx-toggle__thumb--checked {
    left: calc(
      var(--toggle-width) -
      var(--thumb-size) -
      0.125rem
    );
  }

  .dcx-toggle__label {
    font-size: var(--fs-base, 14px);
  }

  .dcx-toggle[aria-checked='true']
    .dcx-toggle__track {
    background-color:
      var(--bg-primary, #0058ab);
  }

  .dcx-toggle[aria-checked='true']:not(
      .dcx-toggle--disabled
    ):hover
    .dcx-toggle__track {
    background-color:
      var(--bg-primary-hover, #004080);
  }

  .dcx-toggle:focus-visible {
    outline: 2px solid
      var(--border-focus, #1db8f2);

    outline-offset: 2px;

    border-radius: var(--r-pill, 999px);
  }
`;
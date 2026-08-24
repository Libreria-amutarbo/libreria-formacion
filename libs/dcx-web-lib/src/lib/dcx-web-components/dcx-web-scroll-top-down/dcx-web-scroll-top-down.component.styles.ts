import { css } from 'lit';

export const styles = css`
  :host {
    position: fixed;
    right: var(--sp-6, 24px);
    bottom: var(--sp-6, 24px);
    z-index: 30;
    display: inline-flex;
  }

  .dcx-scroll-top-down__group {
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
  }

  .dcx-scroll-top-down__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;

    border-radius: 50%;
    background: var(--bg-default, #ffffff);
    border: 1.5px solid var(--border-light, #d1d5db);

    box-shadow: var(
      --shadow-md,
      0 4px 12px rgba(0, 0, 0, 0.08)
    );

    color: var(--text-dark, #2a2e33);

    cursor: pointer;

    transition:
      border-color 0.15s ease,
      background-color 0.15s ease,
      transform 0.2s cubic-bezier(
        0.34,
        1.56,
        0.64,
        1
      );
  }

  .dcx-scroll-top-down__button:hover:not(
      :disabled
    ) {
    border-color: var(
      --border-hover,
      #9ca3af
    );
    background: var(
      --bg-hover,
      #f7f8fa
    );
  }

  .dcx-scroll-top-down__button:active:not(
      :disabled
    ) {
    transform: scale(0.96);
  }

  .dcx-scroll-top-down__button:focus-visible {
    outline: 2px solid
      var(--border-focus, #1db8f2);
    outline-offset: 2px;
  }

  .dcx-scroll-top-down__button--s {
    width: 28px;
    height: 28px;
  }

  .dcx-scroll-top-down__button--m {
    width: 36px;
    height: 36px;
  }

  .dcx-scroll-top-down__button--l {
    width: 44px;
    height: 44px;
  }

  .dcx-scroll-top-down__button--xl {
    width: 52px;
    height: 52px;
  }

  .dcx-scroll-top-down--hidden {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .dcx-scroll-top-down__button {
      transition: none;
    }

    .dcx-scroll-top-down__button:active:not(
        :disabled
      ) {
      transform: none;
    }
  }
`;

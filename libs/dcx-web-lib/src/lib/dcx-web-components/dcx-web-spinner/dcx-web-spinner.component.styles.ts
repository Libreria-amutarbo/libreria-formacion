import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    font-family: var(
      --ff-base,
      'Inter',
      sans-serif
    );
  }

  .dcx-spinner {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--sp-4, 16px);
    animation-delay: var(
      --dcx-spinner-delay,
      1000ms
    );
  }

  .dcx-spinner:not(
      .dcx-spinner--wrapper
    ) {
    text-align: center;
  }

  .dcx-spinner--wrapper {
    position: relative;
    display: block;
  }

  .dcx-spinner__circle {
    flex-shrink: 0;
    border-style: solid;
    border-color: var(
      --border-light,
      #d1d5db
    );
    border-top-color: var(
      --dcx-spinner-color,
      var(--bg-primary, #0058ab)
    );
    border-radius: 50%;
    animation: dcx-spinner-spin 0.8s linear infinite;
  }

  .dcx-spinner--s .dcx-spinner__circle {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }

  .dcx-spinner--m .dcx-spinner__circle {
    width: 24px;
    height: 24px;
    border-width: 3px;
  }

  .dcx-spinner--l .dcx-spinner__circle {
    width: 32px;
    height: 32px;
    border-width: 4px;
  }

  .dcx-spinner--xl .dcx-spinner__circle {
    width: 48px;
    height: 48px;
    border-width: 5px;
  }

  @media (prefers-reduced-motion: reduce) {
    .dcx-spinner__circle {
      animation-duration: 2.4s;
    }
  }

  .dcx-spinner__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .dcx-spinner__title {
    font-size: var(--fs-md, 16px);
    font-weight: var(
      --fw-semibold,
      600
    );
    color: var(
      --text-dark,
      #2a2e33
    );
  }

  .dcx-spinner__description {
    font-size: var(
      --fs-base,
      14px
    );
    color: var(
      --text-muted,
      #696e75
    );
  }

  .dcx-spinner__label {
    font-weight: var(
      --fw-medium,
      500
    );
    color: var(
      --text-dark,
      #2a2e33
    );
  }

  .dcx-spinner__overlay {
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: var(--sp-2, 8px);

    background-color: color-mix(
      in srgb,
      var(--bg-default, #ffffff) 92%,
      transparent
    );

    backdrop-filter: blur(2px);
    z-index: 10;
  }

  @keyframes dcx-spinner-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

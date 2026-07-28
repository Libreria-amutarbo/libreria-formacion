import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(
      --ff-base,
      'Inter',
      sans-serif
    );
  }

  .dcx-message {
    display: flex;
    align-items: flex-start;
    gap: var(--sp-3, 12px);
    padding: var(--sp-3, 12px)
      var(--sp-4, 16px);
    border-radius: var(--r-md, 6px);
    border-left: 4px solid transparent;
    margin-bottom: var(--sp-3, 12px);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
  }

  .dcx-message__body {
    flex: 1;
    min-width: 0;
  }

  .dcx-message__title {
    display: block;
    margin: 0 0 2px;
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.4;
  }

  .dcx-message__paragraph {
    margin: 0;
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
    opacity: 0.85;
  }

  .dcx-message__link {
    display: inline-block;
    margin-top: var(--sp-1, 4px);
    text-decoration: underline;
    text-underline-offset: 0.12em;
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    color: inherit;
  }

  .dcx-message__icon {
    flex-shrink: 0;
  }

  .dcx-message__close {
    flex-shrink: 0;
    margin-left: auto;
    opacity: 0.5;
  }

  .dcx-message__close:hover,
  .dcx-message__close:focus-within {
    opacity: 1;
  }

  .notification {
    background: var(
      --color-info-bg,
      #eff6ff
    );
    border-left-color: var(
      --color-info,
      #0058ab
    );
    color: #1e3a5f;
  }

  .warning {
    background: var(
      --color-warning-bg,
      #fffbeb
    );
    border-left-color: var(
      --color-warning,
      #d97706
    );
    color: #78350f;
  }

  .error {
    background: var(
      --color-error-bg,
      #fef2f2
    );
    border-left-color: var(
      --color-error,
      #dc2626
    );
    color: #7f1d1d;
  }

  .success {
    background: var(
      --color-success-bg,
      #f0fdf4
    );
    border-left-color: var(
      --color-success,
      #16a34a
    );
    color: #14532d;
  }
`;

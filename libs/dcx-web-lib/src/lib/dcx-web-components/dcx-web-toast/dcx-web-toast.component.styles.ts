import { css } from 'lit';

export const styles = css`
  :host {
    display: contents;
  }

  .dcx-toast-outlet {
    position: fixed;
    z-index: 1000;

    display: flex;
    flex-direction: column;
    gap: var(--sp-3, 12px);

    pointer-events: none;
  }

  .dcx-toast-outlet > * {
    pointer-events: auto;
  }

  .dcx-toast-outlet--top-right {
    top: var(--sp-4, 16px);
    right: var(--sp-4, 16px);
    bottom: auto;
    left: auto;
    align-items: flex-end;
    flex-direction: column;
  }

  .dcx-toast-outlet--top-left {
    top: var(--sp-4, 16px);
    left: var(--sp-4, 16px);
    bottom: auto;
    right: auto;
    align-items: flex-start;
    flex-direction: column;
  }

  .dcx-toast-outlet--bottom-right {
    right: var(--sp-4, 16px);
    bottom: var(--sp-4, 16px);
    top: auto;
    left: auto;
    align-items: flex-end;
    flex-direction: column-reverse;
  }

  .dcx-toast-outlet--bottom-left {
    left: var(--sp-4, 16px);
    bottom: var(--sp-4, 16px);
    top: auto;
    right: auto;
    align-items: flex-start;
    flex-direction: column-reverse;
  }

  .dcx-toast {
    --dcx-toast-bg: #1e2226;
    --dcx-toast-action-color: var(
      --color-info,
      #1db8f2
    );

    display: flex;
    align-items: center;
    gap: var(--sp-3, 12px);

    min-width: 280px;
    max-width: 440px;

    padding: var(--sp-3, 12px) 14px;

    border-radius: var(--r-lg, 8px);

    background: var(--dcx-toast-bg);
    color: var(
      --text-white,
      #ffffff
    );

    box-shadow:
      0 4px 12px
      rgba(0, 0, 0, 0.12);

    font-family: var(
      --ff-base,
      var(
        --font-family-primary,
        'Inter',
        sans-serif
      )
    );

    font-size: 13px;
    font-weight: var(--fw-medium, 500);
    line-height: 1.4;
  }

  .dcx-toast--info {
    --dcx-toast-bg: #1e2226;
    --dcx-toast-action-color: var(
      --color-info,
      #1db8f2
    );
  }

  .dcx-toast--success {
    --dcx-toast-bg: #166534;
    --dcx-toast-action-color: #86efac;
  }

  .dcx-toast--warning {
    --dcx-toast-bg: #78350f;
    --dcx-toast-action-color: #fde68a;
  }

  .dcx-toast--error {
    --dcx-toast-bg: #7f1d1d;
    --dcx-toast-action-color: #fca5a5;
  }

  .dcx-toast__message-content {
    flex: 1;
    min-width: 0;

    --dcx-message-align-items: center;
    --dcx-message-gap: var(--sp-3, 12px);

    --dcx-message-bg: transparent;
    --dcx-message-border-left: none;
    --dcx-message-border-radius: 0;

    --dcx-message-padding: 0;
    --dcx-message-margin-bottom: 0;

    --dcx-message-color: var(
      --text-white,
      #ffffff
    );
  }

  .dcx-toast__action {
    margin-left: auto;
    color: var(
      --dcx-toast-action-color
    );
  }

  .dcx-toast__close {
    flex-shrink: 0;

    opacity: 0.65;

    transition:
      opacity 0.15s ease;
  }

  .dcx-toast__close:hover,
  .dcx-toast__close:focus-within {
    opacity: 1;
  }
`;

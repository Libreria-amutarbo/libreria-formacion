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
    align-items: flex-end;
  }

  .dcx-toast-outlet--top-left {
    top: var(--sp-4, 16px);
    left: var(--sp-4, 16px);
    align-items: flex-start;
  }

  .dcx-toast-outlet--bottom-right {
    bottom: var(--sp-4, 16px);
    right: var(--sp-4, 16px);
    align-items: flex-end;
    flex-direction: column-reverse;
  }

  .dcx-toast-outlet--bottom-left {
    bottom: var(--sp-4, 16px);
    left: var(--sp-4, 16px);
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

    padding: 12px 14px;
    border-radius: var(--r-lg, 8px);

    background: var(
      --dcx-toast-bg
    );

    color: var(
      --text-white,
      #ffffff
    );

    box-shadow: var(
      --shadow-md,
      0 4px 12px rgba(0,0,0,.08)
    );

    font-family: var(
      --ff-base,
        'Inter',
        sans-serif
    );
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
    --dcx-message-bg: transparent;
    --dcx-message-border-left: none;
    --dcx-message-border-radius: 0;
    --dcx-message-padding: 0;
    --dcx-message-margin-bottom: 0;
    --dcx-message-gap: 12px;
    --dcx-message-color: var(--text-white, #ffffff);
    --dcx-message-paragraph-color: var(
      --text-white,
      #ffffff
    );
    --dcx-message-paragraph-font-size: 13px;
    --dcx-message-paragraph-font-weight: 500;
    --dcx-message-paragraph-opacity: 1;
    --dcx-message-icon-color: var(
      --text-white,
      #ffffff
    );
  }

  .dcx-toast__action {
    margin-left: auto;
  }

  .dcx-toast__close {
    flex-shrink: 0;
    opacity: 0.65;
    transition: opacity 0.15s ease;
  }

  .dcx-toast__close:hover,
  .dcx-toast__close:focus-within {
    opacity: 1;
  }
`;

import { css } from "lit";

export const chipStyles = css`
    :host {
      display: inline-flex;
    }

    dcx-web-icon {
      color: inherit;
    }

    .dcx-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      height: 2rem;
      padding: var(--sp-2, 8px) var(--sp-3, 12px);
      border-radius: var(--r-pill, 1rem);
      border: 1px solid transparent;
      font-family: var(--ff-base, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
      font-weight: var(--fw-medium, 500);
      font-size: var(--fs-base, 0.875rem);
      line-height: 1.2;
      cursor: default;
      box-sizing: border-box;
      transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    .dcx-chip--primary {
      background-color: var(--bg-primary, #0058ab);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--secondary {
      background-color: var(--bg-default, #ffffff);
      color: var(--text-dark, #212121);
      border-color: var(--border-default, #2a2e33);
    }

    .dcx-chip--success {
      background-color: var(--status-success, #00a76f);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--warning {
      background-color: var(--status-warning, #f59e0b);
      color: var(--text-dark, #212121);
    }

    .dcx-chip--error {
      background-color: var(--status-error, #ef4444);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--info {
      background-color: var(--status-info, #12abdb);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--gray {
      background-color: var(--bg-secondary, #c8cdcd);
      color: var(--text-dark, #212121);
    }

    .dcx-chip__image {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .dcx-chip__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    .dcx-chip__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .dcx-chip__remove-button {
      width: 2rem;
      height: 2rem;
      transform: scale(0.75);
      margin: -0.25rem;
      flex-shrink: 0;
    }

    .dcx-chip__remove-button:hover {
      opacity: 0.85;
    }

    .dcx-chip:hover .dcx-chip__label {
      text-decoration: underline;
    }
`;
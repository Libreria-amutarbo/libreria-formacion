import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
  }

  .dcx-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    min-width: 1.5rem;
    padding: 0 8px;
    height: 1.5rem;
    font-size: 11px;
    box-sizing: border-box;
  }

  .dcx-badge--sm {
    min-width: 1rem;
    height: 1rem;
    padding: 0 4px;
    font-size: 10px;
  }

  .dcx-badge--lg {
    min-width: 2rem;
    height: 2rem;
    padding: 0 8px;
    font-size: 13px;
  }

  .dcx-badge--xl {
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 12px;
    font-size: 15px;
  }

  .dcx-badge--primary {
    background-color: #0058ab;
    color: #ffffff;
  }

  .dcx-badge--secondary {
    background-color: #696e75;
    color: #ffffff;
  }

  .dcx-badge--success {
    background-color: #16a34a;
    color: #ffffff;
  }

  .dcx-badge--info {
    background-color: #0284c7;
    color: #ffffff;
  }

  .dcx-badge--warn {
    background-color: #b45309;
    color: #ffffff;
  }

  .dcx-badge--danger {
    background-color: #dc2626;
    color: #ffffff;
  }
`;

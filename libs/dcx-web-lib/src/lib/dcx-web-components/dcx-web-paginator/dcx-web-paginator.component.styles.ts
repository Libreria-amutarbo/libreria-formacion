import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-paginator {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
    width: 100%;
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    border-top: 1px solid var(--border-light, #d1d5db);
    background: var(--bg-default, #ffffff);
    border-radius: 0 0 var(--r-lg, 8px) var(--r-lg, 8px);
  }

  .dcx-paginator__row-meta {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--sp-4, 16px);
  }

  .dcx-paginator__size {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
  }

  .items-per-page-label {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-medium, 500);
    white-space: nowrap;
  }

  .dcx-paginator__size-select {
    width: 72px;
    height: 32px;
    border: 1px solid var(--border-default, #2a2e33);
    border-radius: var(--r-sm, 4px);
    background: var(--bg-default, #ffffff);
    color: var(--text-dark, #2a2e33);
    font-family: inherit;
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    padding: 0 8px;
  }

  .dcx-paginator__size-select:focus-visible {
    outline: 2px solid var(--border-focus, #0058ab);
    outline-offset: 2px;
  }

  .page-info,
  .items-per-page-info {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    white-space: nowrap;
  }

  .items-per-page-info {
    text-align: right;
  }

  .page-info {
    margin-top: var(--sp-1, 4px);
    text-align: center;
  }

  .dcx-paginator__pages {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-1, 4px);
  }

  .dcx-paginator__button,
  .dcx-paginator__button--disabled,
  .dcx-paginator__page,
  .dcx-paginator__page--current,
  .dcx-paginator__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    .dcx-paginator {
      padding: var(--sp-3, 12px);
    }

    .dcx-paginator__row-meta {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: var(--sp-2, 8px);
    }

    .items-per-page-info {
      text-align: center;
    }
  }
`;

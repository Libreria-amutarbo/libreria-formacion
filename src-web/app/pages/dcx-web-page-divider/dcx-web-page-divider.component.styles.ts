import { css } from 'lit';

export const dcxWebPageDividerStyles = css`
  :host {
    display: block;
    padding: var(--sp-8, 32px);
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
  }

  .demo-page {
    width: 100%;
    max-width: 860px;
    padding-bottom: var(--sp-12, 48px);
  }

  .demo-page-header {
    margin-bottom: var(--sp-8, 32px);
  }

  .demo-page-header__kicker {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted, #696e75);
    margin-bottom: var(--sp-1, 4px);
  }

  .demo-page-header__title {
    font-size: var(--fs-2xl, 24px);
    font-weight: var(--fw-bold, 700);
    color: var(--text-dark, #2a2e33);
    margin: 0 0 var(--sp-2, 8px) 0;
  }

  .demo-page-header__desc {
    font-size: var(--fs-base, 14px);
    line-height: 1.65;
    color: var(--text-muted, #696e75);
    max-width: 560px;
    margin: 0 0 var(--sp-5, 20px);
  }

  .demo-page-header__divider {
    border: none;
    border-top: 1px solid var(--border-light, #d1d5db);
    margin: 0;
  }

  .demo-section {
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    margin-bottom: var(--sp-5, 20px);
    overflow: hidden;
  }

  .demo-section__header {
    display: flex;
    gap: var(--sp-4, 16px);
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    background: var(--bg-surface, #f4f5f7);
    border-bottom: 1px solid var(--border-light, #d1d5db);
  }

  .demo-section__num {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-bold, 700);
    color: var(--text-muted, #696e75);
    background: #edf0f3;
    border-radius: var(--r-sm, 4px);
    padding: var(--r-xs, 2px) var(--sp-2, 8px);
  }

  .demo-section__title {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
  }

  .demo-section__desc {
    padding: var(--sp-3, 12px) var(--sp-4, 16px) 0;
    font-size: var(--fs-xs, 11px);
    color: var(--text-muted, #696e75);
    margin: 0;
  }

  .demo-section__body {
    padding: var(--sp-5, 20px) var(--sp-4, 16px);
  }

  .demo-label {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    margin: 0;
  }

  .vertical-container {
    display: flex;
    gap: var(--sp-4, 16px);
    height: 120px;
    align-items: stretch;
  }

  .vertical-container p {
    margin: 0;
    align-self: center;
    font-size: var(--fs-sm, 12px);
  }

  .vertical-size-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2, 8px);
    height: 100%;
  }

  .vertical-thickness-grid {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: var(--sp-8, 32px);
    height: 200px;
    align-items: flex-end;
  }

  .vertical-sizes-grid {
    display: flex;
    flex-direction: row;
    gap: var(--sp-12, 48px);
    height: 300px;
    align-items: flex-end;
  }

  .vertical-grid {
    display: flex;
    gap: var(--sp-12, 48px);
    height: 220px;
    align-items: flex-end;
  }

  .vertical-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2, 8px);
    height: 100%;
  }

  .color-vertical-grid {
    display: grid;
    grid-template-columns: repeat(7, auto);
    gap: var(--sp-3, 12px);
    height: 180px;
    align-items: stretch;
  }
`;

import { css } from 'lit';

export const dcxWebPageDividerStyles = css`
  :host {
    display: block;
    padding: 2rem;
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
  }

  .demo-page {
    width: 100%;
    max-width: 860px;
    padding-bottom: 3rem;
  }

  .demo-page-header {
    margin-bottom: 2rem;
  }

  .demo-page-header__kicker {
    font-size: var(--fs-xs, 11px);
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--text-muted, #696e75);
    margin-bottom: .3rem;
  }

  .demo-page-header__title {
    font-size: var(--fs-lg, 28px);
    font-weight: var(--fw-bold, 700);
    color: var(--text-dark, #2a2e33);
    margin: 0 0 .6rem 0;
  }

  .demo-page-header__desc {
    font-size: var(--fs-sm, 14px);
    line-height: 1.65;
    color: var(--text-muted, #696e75);
    max-width: 560px;
    margin: 0 0 1.25rem;
  }

  .demo-page-header__divider {
    border: none;
    border-top: 1px solid var(--border-light, #e5e7eb);
    margin: 0;
  }

  .demo-section {
    background: var(--bg-default, #fff);
    border: 1px solid var(--border-light, #e5e7eb);
    border-radius: var(--r-lg, 8px);
    margin-bottom: 1.25rem;
    overflow: hidden;
  }

  .demo-section__header {
    display: flex;
    gap: 10px;
    padding: 10px 16px;
    background: var(--bg-surface, #f4f5f7);
    border-bottom: 1px solid var(--border-light, #e5e7eb);
  }

  .demo-section__num {
    font-size: 10px;
    font-weight: var(--fw-bold, 700);;
    color: var(--text-muted, #696e75);
    background: #edf0f3;
    border-radius: var(--sp-1, 4px);
    padding: 2px 8px;
  }

  .demo-section__title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dark, #2a2e33);
  }

  .demo-section__desc {
    padding: 10px 16px 0;
    font-size: var(--fs-xs, 12px);
    color: var(--text-muted, #696e75);
    margin: 0;
  }

  .demo-section__body {
    padding: 20px 16px;
  }

  .demo-label {
    font-size: var(--fs-xs, 12px);
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
    font-size: var(--fs-sm, 14px);
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

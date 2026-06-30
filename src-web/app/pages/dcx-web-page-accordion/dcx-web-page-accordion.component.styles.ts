import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: var(--sp-8, 2rem);
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
  }

  .demo-page {
    width: 100%;
    max-width: 860px;
    padding-bottom: var(--sp-12, 3rem);
  }

  .demo-page-header {
    margin-bottom: var(--sp-8, 2rem);
  }

  .demo-page-header__kicker {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--text-muted, #696e75);
    margin-bottom: var(--sp-1, .3rem);
  }

  .demo-page-header__title {
    font-size: var(--fs-2xl, 28px);
    font-weight: var(--fw-bold, 700);
    color: var(--text-dark, #2a2e33);
    margin: 0 0 var(--sp-2, .6rem) 0;
  }

  .demo-page-header__desc {
    font-size: var(--fs-base, 14px);
    line-height: 1.65;
    color: var(--text-muted, #696e75);
    max-width: 560px;
    margin: 0 0 var(--sp-5, 1.25rem);
  }

  .demo-page-header__divider {
    border: none;
    border-top: 1px solid var(--border-light, #e5e7eb);
    margin: 0;
  }

  .demo-section {
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #e5e7eb);
    border-radius: var(--r-lg, 8px);
    margin-bottom: var(--sp-5, 1.25rem);
    overflow: hidden;
  }

  .demo-section__header {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 10px);
    padding: var(--sp-2, 10px) var(--sp-4, 16px);
    background: var(--bg-surface, #f4f5f7);
    border-bottom: 1px solid var(--border-light, #e5e7eb);
  }

  .demo-section__num {
    font-size: var(--fs-xs, 10px);
    font-weight: var(--fw-bold, 700);
    color: var(--text-muted, #696e75);
    background: var(--bg-surface, #edf0f3);
    border-radius: var(--r-sm, 4px);
    padding: var(--sp-1, 2px) var(--sp-2, 8px);
  }

  .demo-section__title {
    font-size: var(--fs-base, 13px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
  }

  .demo-section__body {
    padding: var(--sp-5, 20px) var(--sp-4, 16px);
  }

  .demo-section__desc {
    padding: var(--sp-2, 10px) var(--sp-4, 16px) 0;
    font-size: var(--fs-sm, 12px);
    line-height: 1.55;
    color: var(--text-muted, #696e75);
    margin: 0;
  }

  code {
    background: var(--bg-surface, #f3f4f6);
    padding: var(--sp-1, 2px) var(--sp-1, 6px);
    border-radius: var(--r-sm, 3px);
    font-family: monospace;
    font-size: var(--fs-sm, 12px);
    color: var(--text-dark, #1f2937);
  }

  dcx-web-accordion {
    display: block;
    margin-bottom: var(--sp-4, 1rem);
  }

  .api-btn {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
    border: none;
    border-radius: var(--r-sm, 4px);
    cursor: pointer;
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-semibold, 600);
    font-family: var(--ff-base, 'Inter', sans-serif);
    transition: background-color 0.15s ease-in-out;
  }

  .api-btn:hover {
    background: var(--bg-primary-hover, #003d7a);
  }
`;

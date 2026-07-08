import { css } from 'lit';

export const pageDrawerStyles = css`
  :host {
    display: block;
    padding: var(--sp-8, 32px);
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
  }

  .demo-page {
    width: 100%;
    max-width: 860px;
    padding-bottom: 3rem;
  }

  .demo-page-header {
    margin-bottom: var(--sp-12, 48px);
  }

  .demo-page-header__kicker {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted, #696e75);
    margin-bottom: 0.3rem;
  }

  .demo-page-header__title {
    font-size: 28px;
    font-weight: var(--fw-bold, 700);
    letter-spacing: -0.3px;
    color: var(--text-dark, #2a2e33);
    margin-bottom: 0.6rem;
    margin-top: 0;
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
    overflow: visible;
    margin-bottom: var(--sp-5, 20px);
  }

  .demo-section__header {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: var(--sp-2, 8px) var(--sp-4, 16px);
    background: var(--bg-surface, #f4f5f7);
    border-bottom: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px) var(--r-lg, 8px) 0 0;
  }

  .demo-section__num {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-bold, 700);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted, #696e75);
    background: #edf0f3;
    border-radius: var(--r-sm, 4px);
    padding: 2px var(--sp-2, 8px);
    flex-shrink: 0;
    line-height: 1.6;
  }

  .demo-section__title {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
  }

  .demo-section__desc {
    padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
    font-size: var(--fs-sm, 12px);
    line-height: 1.55;
    color: var(--text-muted, #696e75);
    margin: 0;
  }

  .demo-section__body {
    padding: var(--sp-5, 20px) var(--sp-4, 16px);
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2, 8px);
    align-items: center;
  }


  /* Custom header/footer styles */
  .drawer-custom-header {
    display: flex;
    align-items: center;
    gap: var(--sp-3, 12px);
    text-align: left;
  }

  .drawer-custom-header__icon {
    font-size: var(--fs-xl, 20px);
    line-height: 1;
  }

  .drawer-custom-header__title {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
    margin: 0;
  }

  .drawer-custom-header__subtitle {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    margin: 0;
  }

  .drawer-footer-actions {
    display: flex;
    gap: var(--sp-2, 8px);
    width: 100%;
  }
`;
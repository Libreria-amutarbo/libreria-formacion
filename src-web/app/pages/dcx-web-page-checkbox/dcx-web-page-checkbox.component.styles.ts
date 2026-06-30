import { css } from 'lit';

export const dcxWebPageCheckboxStyles = css`
  :host {
    display: block;
    padding: 32px;
    font-family: Inter, sans-serif;
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
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #696e75;
    margin-bottom: .3rem;
  }

  .demo-page-header__title {
    font-size: 28px;
    font-weight: 700;
    color: #2a2e33;
    margin: 0 0 .6rem 0;
  }

  .demo-page-header__desc {
    font-size: 14px;
    line-height: 1.65;
    color: #696e75;
    max-width: 560px;
    margin: 0 0 1.25rem;
  }

  .demo-page-header__divider {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 0;
  }

  .demo-section {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 1.25rem;
    overflow: hidden;
  }

  .demo-section__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    background: #f4f5f7;
    border-bottom: 1px solid #e5e7eb;
  }

  .demo-section__num {
    font-size: 10px;
    font-weight: 700;
    color: #696e75;
    background: #edf0f3;
    border-radius: 4px;
    padding: 2px 8px;
  }

  .demo-section__title {
    font-size: 13px;
    font-weight: 600;
    color: #2a2e33;
  }

  .demo-section__desc {
    padding: 10px 16px 0;
    font-size: 12px;
    line-height: 1.55;
    color: #696e75;
    margin: 0;
  }

  .demo-section__body {
    padding: 20px 16px;
  }
`;
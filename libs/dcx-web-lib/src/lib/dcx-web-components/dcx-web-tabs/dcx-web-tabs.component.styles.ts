import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .dcx-tabs {
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-weight: var(--fw-medium, 500);

    display: flex;
    flex-direction: column;
  }

  .dcx-tabs__controls {
    display: flex;
    justify-content: flex-end;
  }

  .dcx-tabs__controls dcx-web-button {
    margin-left: var(--sp-2, 8px);
  }

  .dcx-tabs__header-container {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .dcx-tabs__header {
    display: flex;
    border-bottom: 1px solid var(--border-light, #d1d5db);
    gap: var(--sp-3, 12px);
    overflow-x: auto;
    overflow-y: hidden;
    flex: 1;
    scroll-behavior: smooth;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .dcx-tabs__header::-webkit-scrollbar {
    display: none;
  }

  .dcx-tabs__header--brand {
    background: var(--bg-primary, #0058ab);
    border-radius: var(--r-xl, 12px) var(--r-xl, 12px) 0 0;
    border-bottom: 2px solid var(--border-focus, #1db8f2);
    min-height: 48px;
  }

  .dcx-tabs__header--pill {
    background: var(--border-light, #d1d5db);
    border-radius: var(--r-pill, 999px);
    padding: 3px;
    gap: 2px;
    border-bottom: none;
    min-height: 40px;
    display: inline-flex;
    width: auto;
  }

  .dcx-tabs__header--subtle {
    border-bottom: 1px solid var(--border-light, #d1d5db);
    gap: var(--sp-2, 8px);
  }

  .dcx-tabs__scroll-button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-tabs__scroll-button--left {
    order: -1;
  }

  .dcx-tabs__scroll-button--right {
    order: 1;
  }

  .dcx-tabs__content {
    padding: var(--sp-4, 16px);
    animation: fadeIn 0.3s ease;
  }

  .dcx-tab__panel {
    width: 100%;
  }

  .dcx-tab__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-2, 8px);

    background: none;
    border: none;
    border-bottom: 3px solid transparent;

    color: var(--text-disabled, #696e75);

    cursor: pointer;

    transition: all 0.3s ease;

    position: relative;

    flex-shrink: 0;

    white-space: nowrap;

    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    margin-right: var(--sp-3, 12px);

    text-align: center;

    font-family: inherit;
    font-size: var(--fs-base, 14px);
  }

  .dcx-tab__button:hover:not(.disabled) {
    color: var(--bg-primary, #0058ab);
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-tab__button:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
    border-radius: var(--r-sm, 4px);
  }

  .dcx-tab__button.active {
    color: var(--bg-primary, #0058ab);
    border-bottom-color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-tab__button.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .dcx-tab__button--pill {
    color: var(--text-muted, #696e75);
    padding: var(--sp-1, 4px) var(--sp-4, 16px);
    border-radius: var(--r-pill, 999px);
    margin-right: 0;
    border-bottom: none;
    box-shadow: none;
  }

  .dcx-tab__button--pill:hover:not(.disabled) {
    color: var(--bg-primary, #0058ab);
    background: var(--bg-default, #ffffff);
    border-radius: var(--r-pill, 999px);
  }

  .dcx-tab__button--pill.active {
    background: var(--bg-default, #ffffff);
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
    border-radius: var(--r-pill, 999px);
    box-shadow: var(
      --shadow-sm,
      0 1px 2px rgba(0, 0, 0, 0.06)
    );
  }

  .dcx-tab__button--pill.disabled {
    color: var(--text-disabled, #696e75);
    opacity: 0.6;
    cursor: not-allowed;
  }

  .dcx-tab__button--brand {
    color: var(--text-placeholder, #9ca3af);
  }

  .dcx-tab__button--brand:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-white, #ffffff);
  }

  .dcx-tab__button--brand.active {
    color: var(--text-white, #ffffff);
    border-bottom-color: var(--border-focus, #1db8f2);
    background: rgba(255, 255, 255, 0.1);
  }

  .dcx-tab__button--subtle {
    font-size: var(--fs-sm, 12px);
    padding: var(--sp-2, 8px) var(--sp-4, 16px);
    margin-right: 0;
  }

  .dcx-tab__badge {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    padding: 1px 7px;

    border-radius: var(--r-pill, 999px);

    background: #dbeafe;
    color: #1d4ed8;

    margin-left: 6px;
  }

  .dcx-tab__badge.active {
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

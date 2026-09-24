import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
    --dcx-picklist-gap: var(--sp-4, 16px);
    --dcx-picklist-panel-bg: var(--bg-default, #ffffff);
    --dcx-picklist-panel-border: var(--border-light, #d1d5db);
    --dcx-picklist-muted: var(--text-muted, #696e75);
    --dcx-picklist-radius: var(--r-lg, 8px);
    --dcx-picklist-item-radius: var(--r-md, 6px);
    --dcx-picklist-selected-bg: var(--color-info-bg, #eff6ff);
    --dcx-picklist-selected-color: var(--color-info, #0058ab);
    --dcx-picklist-focus: var(--border-focus, #1db8f2);
  }

  .dcx-picklist {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto minmax(0, 1fr) auto;
    gap: var(--dcx-picklist-gap);
    align-items: center;
  }

  .dcx-picklist--disabled {
    opacity: 0.72;
  }

  .dcx-picklist__panel {
    min-width: 0;
    border: 1px solid var(--dcx-picklist-panel-border);
    border-radius: var(--dcx-picklist-radius);
    background: var(--dcx-picklist-panel-bg);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06));
    overflow: hidden;
  }

  .dcx-picklist__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3, 12px);
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    border-bottom: 1px solid var(--dcx-picklist-panel-border);
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-picklist__header h3 {
    margin: 0;
    font-size: var(--fs-md, 16px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.3;
  }

  .dcx-picklist__header span {
    min-width: 1.75rem;
    padding: 2px 8px;
    border-radius: var(--r-pill, 999px);
    background: var(--bg-default, #ffffff);
    color: var(--dcx-picklist-muted);
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    text-align: center;
  }

  .dcx-picklist__filter {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border-bottom: 1px solid var(--dcx-picklist-panel-border);
  }

  .dcx-picklist__filter dcx-web-input {
    display: block;
    width: 100%;
  }

  .dcx-picklist__list-wrap {
    position: relative;
    min-height: 3.5rem;
  }

  .dcx-picklist__empty {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: var(--sp-1, 4px);
    color: var(--dcx-picklist-muted);
    font-size: var(--fs-sm, 12px);
    text-align: center;
    pointer-events: none;
  }

  .dcx-picklist__reorder-controls,
  .dcx-picklist__transfer-controls {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
  }

  .dcx-picklist__reorder-controls dcx-web-button,
  .dcx-picklist__transfer-controls dcx-web-button {
    display: inline-flex;
    width: 2.25rem;
    height: 2.25rem;
  }

  .dcx-picklist__panel--source,
  .dcx-picklist__panel--target {
    min-width: 0;
  }

  .dcx-picklist__list {
    --list-bg-selected: var(--dcx-picklist-selected-bg, #eff6ff);
    --list-text-selected: var(--dcx-picklist-selected-color, #0058ab);
  }

  .dcx-picklist__list dcx-web-list {
    --list-bg-selected: var(--dcx-picklist-selected-bg, #eff6ff);
    --list-text-selected: var(--dcx-picklist-selected-color, #0058ab);
  }

  @media (max-width: 900px) {
    .dcx-picklist {
      grid-template-columns: 1fr;
    }

    .dcx-picklist__reorder-controls,
    .dcx-picklist__transfer-controls {
      flex-direction: row;
    }
  }
`;

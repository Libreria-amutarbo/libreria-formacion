import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
    --list-bg-hover: var(--bg-hover, #f7f8fa);
    --list-bg-selected: var(--bg-primary, #0058ab);
    --list-text-selected: var(--text-white, #ffffff);
    --list-border-radius: var(--r-md, 6px);
    --list-spacing: var(--sp-3, 12px);
    --list-item-gap: var(--sp-4, 16px);
    --list-font-size: var(--fs-sm, 12px);
    --list-icon-size: 1.2rem;
    --list-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --list-divider-color: var(--bg-pressed, #e1e3e6);
    --list-icon-bg: var(--bg-hover, #f3f4f6);
  }

  /* ── Container ── */
  .dcx-list-container {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    overflow: hidden;
    background-color: var(--bg-default, #ffffff);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06));
  }

  .dcx-list-container .dcx-list-item:not(:last-child) {
    border-bottom: 1px solid var(--list-divider-color);
  }

  /* ── Item base ── */
  .dcx-list-item {
    margin: 0;
    transition: var(--list-transition);
    position: relative;
    outline: none;
  }

  .dcx-list-item-content {
    display: flex;
    align-items: center;
    gap: var(--list-item-gap);
    padding: var(--list-spacing) calc(var(--list-spacing) * 1.5);
    font-size: var(--list-font-size);
    transition: var(--list-transition);
  }

  /* ── Selectable ── */
  .dcx-list-item.selectable {
    cursor: pointer;
    user-select: none;
  }

  .dcx-list-item.selectable:hover:not(.disabled) {
    background-color: var(--list-bg-hover);
  }

  .dcx-list-item.selectable:hover:not(.disabled) .dcx-list-icon-container {
    background-color: var(--bg-pressed, #e1e3e6);
    transform: scale(1.05);
  }

  .dcx-list-item.selectable:active:not(.disabled) {
    transform: scale(0.99);
    background-color: var(--bg-pressed, #e1e3e6);
  }

  .dcx-list-item.selectable:focus-visible {
    box-shadow: inset 0 0 0 2px var(--border-focus, #1db8f2);
    z-index: 1;
  }

  /* ── Selected ── */
  .dcx-list-item.selected {
    background-color: var(--color-info-bg, #eff6ff);
    box-shadow: inset 3px 0 0 var(--bg-primary, #0058ab);
  }

  .dcx-list-item.selected .dcx-list-text {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-list-item.selected .dcx-list-description {
    color: var(--bg-primary, #0058ab);
    opacity: 0.75;
  }

  .dcx-list-item.selected:not(.danger) .dcx-list-icon-container,
  .dcx-list-item.selected:not(.danger) .dcx-list-icon {
    background-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
    fill: currentColor;
    stroke: currentColor;
    transform: none;
  }

  .dcx-list-item.danger.selected .dcx-list-icon {
    background-color: transparent;
    color: var(--text-white, #ffffff);
  }

  .dcx-list-item.selected .dcx-list-children-indicator {
    color: var(--bg-primary, #0058ab) !important;
  }

  .dcx-list-item.selected.selectable:hover:not(.disabled) {
    background-color: var(--color-info-bg, #eff6ff);
  }

  .dcx-list-item.selected.selectable:hover:not(.disabled) .dcx-list-icon-container {
    background-color: var(--bg-primary, #0058ab);
    color: white;
    transform: none;
  }

  /* ── Disabled ── */
  .dcx-list-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dcx-list-item.disabled .dcx-list-item-content {
    pointer-events: none;
  }

  /* ── Danger ── */
  .dcx-list-item.danger {
    color: var(--color-error, #dc2626);
  }

  .dcx-list-item.danger .dcx-list-icon-container {
    color: var(--color-error, #dc2626);
    background-color: var(--color-error-bg, #fef2f2);
  }

  .dcx-list-item.danger.selectable:hover:not(.disabled) {
    background-color: var(--color-error-bg, #fef2f2);
  }

  .dcx-list-item.danger.selected {
    background-color: var(--color-error-bg, #fef2f2);
    box-shadow: inset 3px 0 0 var(--color-error, #dc2626);

  }

  .dcx-list-item.selected .dcx-web-icon,
  .dcx-list-item.danger.selected .dcx-web-icon {
    color: var(--text-white, #ffffff) !important;
    background: transparent !important;
  }

  .dcx-list-item.danger.selected .dcx-list-text,
  .dcx-list-item.danger.selected .dcx-list-description,
  .dcx-list-item.danger.selected .dcx-list-children-indicator {
    color: var(--color-error, #dc2626);
  }

  .dcx-list-item.danger.selected .dcx-list-icon-container {
    background-color: var(--color-error, #dc2626);
    color: white;
  }

  /* ── Icon container ── */
  .dcx-list-icon-container {
    flex-shrink: 0;
    width: calc(var(--list-icon-size) * 2);
    height: calc(var(--list-icon-size) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--list-icon-bg);
    border-radius: var(--r-md, 6px);
    color: var(--text-dark, #2a2e33);
    transition: var(--list-transition);
    font-size: var(--list-icon-size);
  }

  /* ── Icon ── */
  .dcx-list-icon {
    flex-shrink: 0;
    font-size: 1.2rem;
    width: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Text container ── */
  .dcx-list-text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  /* ── Text ── */
  .dcx-list-text {
    font-weight: var(--fw-medium, 500);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-dark, #2a2e33);
  }

  /* ── Description ── */
  .dcx-list-description {
    font-size: 0.9em;
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-regular, 400);
    margin-top: 2px;
  }

  /* ── Children indicator ── */
  .dcx-list-children-indicator {
    flex-shrink: 0;
    margin-left: auto;
    font-size: 0.9rem;
    color: var(--text-placeholder, #9ca3af);
    transition: transform 0.2s ease;
  }

  /* ── Divider ── */
  .dcx-list-divider {
    height: 1px;
    background-color: var(--list-divider-color);
    margin: 0;
  }

  /* ── Nested list ── */
  .dcx-list-nested {
    padding: var(--sp-2, 8px);
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-list-nested ul {
    border: 1px solid var(--list-divider-color);
    border-radius: var(--r-md, 6px);
    background-color: white;
    overflow: hidden;
  }

  .dcx-list-nested ul .dcx-list-item {
    border-bottom: 1px solid var(--list-divider-color);
  }

  .dcx-list-nested ul .dcx-list-item:last-child {
    border-bottom: none;
  }

  /* ── Context Menu integration ── */
  :host-context(.dcx-context-menu) .dcx-list-container {
    border: none;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
  }

  :host-context(.dcx-context-menu) .dcx-list-item {
    border-bottom: none !important;
    line-height: 1.5;
    position: relative;
  }

  :host-context(.dcx-context-menu) .dcx-list-item .dcx-list-item-content {
    padding: 8px 12px;
    gap: 12px;
    border-radius: 0;
  }

  :host-context(.dcx-context-menu) .dcx-list-item .dcx-list-icon-container {
    width: auto;
    height: auto;
    background: transparent;
    padding: 0;
    font-size: 1.1rem;
    color: var(--text-muted, #696e75);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.selectable:hover .dcx-list-icon-container {
    color: var(--bg-primary, #0058ab);
    background: transparent;
    transform: none;
  }

  :host-context(.dcx-context-menu) .dcx-list-item.selectable .dcx-list-item-content:hover {
    background-color: var(--background-hover);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.danger {
    color: var(--color-danger, #dc2626);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.danger .dcx-list-icon {
    color: var(--color-danger, #dc2626);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.danger.selectable:hover {
    background-color: #fef2f2;
  }

  :host-context(.dcx-context-menu) .dcx-list-nested {
    margin-left: 0;
    margin-top: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    position: absolute;
    top: -6px;
    left: calc(100% + 4px);
    min-width: 200px;
    background: var(--bg-default, rgba(255, 255, 255, 0.95));
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid var(--border-light, rgba(209, 213, 219, 0.4));
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
    padding: var(--sp-1, 6px) 0;
    display: none;
    z-index: 10000;
    animation: dcxListSubmenuEnter 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  :host-context(.dcx-context-menu) .dcx-list-nested .dcx-list-divider {
    margin: 6px 8px;
    background-color: var(--bg-pressed, rgba(0, 0, 0, 0.06));
    height: 1px;
    border: none;
  }

  :host-context(.dcx-context-menu) .dcx-list-nested ul {
    border: 1px solid var(--border-light, rgba(209, 213, 219, 0.4));
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    background: var(--bg-default, #ffffff);
    padding: var(--sp-1, 4px);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
  }

  :host-context(.dcx-context-menu) .dcx-list-nested ul .dcx-list-item {
    border-bottom: none;
  }

  :host-context(.dcx-context-menu) .dcx-list-item.has-children:hover > .dcx-list-nested {
    display: block;
  }

  :host-context(.dcx-context-menu) ul {
    padding-left: 0;
  }

  @keyframes dcxListSubmenuEnter {
    from {
      opacity: 0;
      transform: translateX(-8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
`;
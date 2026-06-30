import { css } from 'lit';

export const styles = css`
  :host {
    display: contents;
  }

  .dcx-context-menu {
    position: fixed;
    z-index: 9999;
    width: 240px;
    overflow: visible;
    background: var(--bg-default, #ffffff);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    box-shadow:
      var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06)),
      var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08)),
      var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
    color: var(--text-dark, #2a2e33);
    padding: var(--sp-1, 4px);
    animation: dcxContextMenuEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    outline: none;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-context-menu:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
  }

  .dcx-context-menu--absolute {
    position: absolute;
  }

  .dcx-context-menu__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .dcx-context-menu__list ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .dcx-context-menu__list .dcx-context-menu__divider {
    margin: 6px var(--sp-2, 8px);
    background-color: var(--bg-pressed, #e1e3e6);
    height: 1px;
    border: none;
  }

  .dcx-context-menu__list .dcx-context-menu__item {
    margin: 2px 0;
    border-radius: var(--r-md, 6px);
    transition:
      background-color 0.15s ease-out,
      transform 0.15s ease-out,
      color 0.15s ease-out;
    position: relative;
    outline: none;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__item-content {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border-radius: var(--r-md, 6px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    gap: var(--sp-3, 12px);
    display: flex;
    align-items: center;
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:hover {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:hover .dcx-context-menu__icon {
    color: var(--bg-primary, #0058ab);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
    border-radius: var(--r-md, 6px);
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger {
    color: var(--color-error, #dc2626);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger .dcx-context-menu__icon {
    color: var(--color-error, #dc2626);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger.dcx-context-menu__item--selectable:hover {
    background-color: var(--color-error-bg, #fef2f2);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger.dcx-context-menu__item--selectable:hover .dcx-context-menu__icon {
    color: var(--color-error, #dc2626);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:active {
    transform: scale(0.98);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--disabled:hover {
    transform: none;
    background-color: transparent;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__icon {
    font-size: 1.1rem;
    color: var(--text-muted, #696e75);
    transition:
      color 0.2s ease,
      transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp-5, 20px);
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__text {
    flex: 1;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__description {
    font-size: 0.9em;
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-regular, 400);
    margin-top: 2px;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__children-indicator {
    color: var(--text-muted, #696e75);
    font-size: 0.8rem;
    margin-left: auto;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__nested {
    padding: var(--sp-1, 4px);
    background: var(--bg-default, #ffffff);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
    animation: dcxSubmenuEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    min-width: 200px;
    left: calc(100% + var(--sp-1, 4px));
    top: -6px;
    position: absolute;
    z-index: 10000;
    display: none;
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--has-children:hover > .dcx-context-menu__nested,
  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--has-children:focus-within > .dcx-context-menu__nested {
    display: block;
  }

  @keyframes dcxContextMenuEnter {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes dcxSubmenuEnter {
    from {
      opacity: 0;
      transform: translateX(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
`;

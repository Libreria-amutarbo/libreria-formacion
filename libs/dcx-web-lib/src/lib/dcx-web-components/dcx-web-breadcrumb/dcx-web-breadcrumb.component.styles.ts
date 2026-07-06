import { css } from 'lit';

export const breadcrumbStyles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-bc {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--sp-2, 8px);
  }

  .dcx-bc__item {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    color: var(--text-muted, #696e75);
    font-size: var(--fs-base, 14px);
    line-height: 1.2;
  }

  .dcx-bc__link {
    color: var(--bg-primary, #0058ab);
    text-decoration: none;
    font-weight: var(--fw-medium, 500);
    border: 1px solid transparent;
    border-radius: var(--r-sm, 4px);
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
    display: inline-flex;
    align-items: center;
  }

  .dcx-bc__link:hover {
    color: var(--bg-primary-hover, #004080);
    text-decoration: underline;
  }

  .dcx-bc__link:focus-visible {
    border-color: var(--border-focus, #1db8f2);
    outline: none;
  }

  .dcx-bc__link[aria-disabled='true'] {
    color: var(--text-disabled, #696e75);
    cursor: not-allowed;
    text-decoration: none;
    pointer-events: none;
  }

  .dcx-bc__link--icon svg {
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }

  .dcx-bc__link--icon:hover svg {
    border-bottom-color: currentColor;
  }

  .dcx-bc__action-btn,
  .dcx-bc__ellipsis-btn {
    --text-dark: var(--bg-primary, #0058ab);
  }

  .dcx-bc__action-btn:hover,
  .dcx-bc__ellipsis-btn:hover {
    --text-dark: var(--bg-primary-hover, #004080);
  }

  .dcx-bc__current {
    display: inline-flex;
    align-items: center;
    color: var(--text-dark, #2a2e33);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-bc__current:focus-visible {
    outline: 1px solid var(--border-focus, #1db8f2);
    outline-offset: 1px;
    border-radius: var(--r-sm, 4px);
  }

  .dcx-bc__current svg {
    color: var(--text-dark, #2a2e33);
  }

  .dcx-bc__current.disabled {
    color: var(--text-disabled, #696e75);
    cursor: not-allowed;
  }

  .dcx-bc__current.disabled svg {
    color: var(--text-disabled, #696e75);
  }

  .dcx-bc__item--ellipsis {
    position: relative;
  }

  .dcx-bc__sep {
    display: flex;
    align-items: center;
    color: var(--text-muted, #696e75);
    font-size: var(--fs-sm, 12px);
    user-select: none;
  }

  .dcx-context-menu {
    display: none;
    position: absolute;
    z-index: 9999;
    width: 240px;
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
    color: var(--text-dark, #2a2e33);
    padding: var(--sp-1, 4px);
    top: calc(100% + var(--sp-1, 4px));
    left: 0;
    outline: none;
  }

  .dcx-context-menu.open {
    display: block;
    animation: dcxContextMenuEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .dcx-context-menu__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .dcx-context-menu__item {
    margin: 2px 0;
    border-radius: var(--r-md, 6px);
    transition:
      background-color 0.15s ease-out,
      transform 0.15s ease-out,
      color 0.15s ease-out;
    cursor: pointer;
  }

  .dcx-context-menu__item.selectable:hover {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-context-menu__item.selectable:active {
    transform: scale(0.98);
  }

  .dcx-context-menu__item.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .dcx-context-menu__item.disabled:hover {
    background-color: transparent;
    transform: none;
  }

  .dcx-context-menu__item-content {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    gap: var(--sp-3, 12px);
    display: flex;
    align-items: center;
  }

  .dcx-context-menu__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp-5, 20px);
    color: var(--text-muted, #696e75);
  }

  .dcx-context-menu__item.selectable:hover .dcx-context-menu__icon {
    color: var(--bg-primary, #0058ab);
  }

  .dcx-context-menu__text {
    flex: 1;
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
`;

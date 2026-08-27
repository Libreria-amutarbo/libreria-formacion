import { css } from 'lit';

export const styles = css`
  :host {
    display: contents;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .dcx-popover {
    position: absolute;
    z-index: 1000;
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #e5e7eb);
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
    min-width: 160px;
    max-width: 350px;
    box-sizing: border-box;
  }

  .dcx-popover:focus {
    outline: none;
  }

  .dcx-popover__arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #e5e7eb);
    border-right-color: transparent;
    border-bottom-color: transparent;
    transform: translateX(-50%) rotate(45deg);
    pointer-events: none;
  }

  .dcx-popover:not(.dcx-popover--flipped) .dcx-popover__arrow {
    top: -6px;
  }

  .dcx-popover--flipped .dcx-popover__arrow {
    bottom: -6px;
    border-color: var(--border-light, #e5e7eb);
    border-top-color: transparent;
    border-left-color: transparent;
  }

  .dcx-popover__content {
    display: block;
    width: 100%;
    padding: var(--sp-3, 12px) 14px;
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
    box-sizing: border-box;
  }

  .dcx-popover__content h3,
  ::slotted(h3) {
    margin: 0 0 var(--sp-2, 8px) 0;
    color: var(--bg-primary, #0058ab);
    font-size: var(--fs-md, 16px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.3;
  }

  .dcx-popover__content h4,
  ::slotted(h4) {
    margin: 0 0 var(--sp-2, 8px) 0;
    color: var(--bg-primary, #0058ab);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.3;
  }

  .dcx-popover__content p,
  ::slotted(p) {
    margin: 0;
    color: var(--text-muted, #696e75);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
  }
`;

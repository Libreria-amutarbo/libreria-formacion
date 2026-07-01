import { css } from 'lit';

export const dcxWebDividerStyles = css`
  :host {
    display: block;
  }

  :host(.horizontal) {
    width: var(--dcx-divider-size, 100%);
    height: auto;
  }

  :host(.vertical) {
    height: var(--dcx-divider-size, 100%);
    width: auto;
  }

  .dcx-divider {
    margin: 0;
    display: block;
  }
  
  :host(.horizontal) .dcx-divider:not(.dcx-divider--labeled) {
    width: 100%;
    height: 0;
    border-top: var(--dcx-divider-thickness, 1px)
      var(--dcx-divider-style, solid)
      var(--dcx-divider-color, var(--border-light, #d1d5db));
  }

  :host(.vertical) .dcx-divider:not(.dcx-divider--labeled) {
    height: 100%;
    width: 0;
    border-left: var(--dcx-divider-thickness, 1px)
      var(--dcx-divider-style, solid)
      var(--dcx-divider-color, var(--border-light, #d1d5db));
  }

  :host(.horizontal) .dcx-divider--labeled {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    border: none;
  }

  :host(.vertical) .dcx-divider--labeled {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 0.5rem;
    border: none;
  }

  :host(.horizontal) .dcx-divider__line {
    flex: 1;
    height: 0;
    border-top: var(--dcx-divider-thickness)
      var(--dcx-divider-style)
      var(--dcx-divider-color);
  }

  :host(.vertical) .dcx-divider__line {
    flex: 1;
    width: 0;
    border-left: var(--dcx-divider-thickness)
      var(--dcx-divider-style)
      var(--dcx-divider-color);
  }

  .dcx-divider__label {
    color: var(--dcx-divider-color);
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-sm);
    line-height: 1;
    white-space: nowrap;
    user-select: none;
  }

  :host(.vertical) .dcx-divider__label {
    writing-mode: sideways-lr;
    text-orientation: mixed;
  }
`;
import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
    position: relative;
  }

  .tooltip-container {
    display: inline-flex;
  }

  .dcx-ng-tooltip {
    --tooltip-arrow-size: 5px;
    --tooltip-arrow-side-offset: 8px;

    position: absolute;
    z-index: 9999;

    background-color: var(
      --background-secondary,
      #1c1f23
    );

    color: var(
      --content-default-white,
      #fff
    );

    border-radius: var(--r-md, 6px);

    padding:
      var(--sp-1, 4px)
      var(--sp-2, 8px);

    font-size: var(--fs-sm, 12px);
    line-height: 1.4;

    font-family: var(
      --ff-base,
      'Inter',
      sans-serif
    );

    max-width: 250px;
    width: max-content;

    word-wrap: break-word;

    box-shadow: var(
      --shadow-md,
      0 4px 12px rgba(0, 0, 0, 0.15)
    );

    animation: fade-in linear 0.2s;
  }

  /* =====================================
   * POSITIONING
   * ===================================== */

  .dcx-ng-tooltip--top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  .dcx-ng-tooltip--right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  /* =====================================
   * PRIMARY VARIANT
   * ===================================== */

  .dcx-ng-tooltip--primary {
    background-color: var(
      --bg-primary,
      #0058ab
    );
  }

  /* =====================================
   * ARROW BASE
   * ===================================== */

  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
    display: block;
  }

  /* =====================================
   * TOP
   * ===================================== */

  .dcx-ng-tooltip--top .tooltip-arrow {
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);

    border-width:
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      0
      var(--tooltip-arrow-size);

    border-color:
      var(--background-secondary, #1c1f23)
      transparent
      transparent
      transparent;
  }

  .dcx-ng-tooltip--top.dcx-ng-tooltip--arrow-left
    .tooltip-arrow {
    left: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  .dcx-ng-tooltip--top.dcx-ng-tooltip--arrow-center
    .tooltip-arrow {
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--top.dcx-ng-tooltip--arrow-right
    .tooltip-arrow {
    left: auto;
    right: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  /* =====================================
   * BOTTOM
   * ===================================== */

  .dcx-ng-tooltip--bottom .tooltip-arrow {
    top: -3px;
    left: 50%;
    transform: translateX(-50%);

    border-width:
      0
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size);

    border-color:
      transparent
      transparent
      var(--background-secondary, #1c1f23)
      transparent;
  }

  .dcx-ng-tooltip--bottom.dcx-ng-tooltip--arrow-left
    .tooltip-arrow {
    left: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  .dcx-ng-tooltip--bottom.dcx-ng-tooltip--arrow-center
    .tooltip-arrow {
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--bottom.dcx-ng-tooltip--arrow-right
    .tooltip-arrow {
    left: auto;
    right: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  /* =====================================
   * LEFT
   * ===================================== */

  .dcx-ng-tooltip--left .tooltip-arrow {
    right: -3px;
    top: 50%;
    transform: translateY(-50%);

    border-width:
      var(--tooltip-arrow-size)
      0
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size);

    border-color:
      transparent
      transparent
      transparent
      var(--background-secondary, #1c1f23);
  }

  /* =====================================
   * RIGHT
   * ===================================== */

  .dcx-ng-tooltip--right .tooltip-arrow {
    left: -3px;
    top: 50%;
    transform: translateY(-50%);

    border-width:
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      0;

    border-color:
      transparent
      var(--background-secondary, #1c1f23)
      transparent
      transparent;
  }

  /* =====================================
   * PRIMARY ARROWS
   * ===================================== */

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--top
    .tooltip-arrow {
    border-color:
      var(--bg-primary, #0058ab)
      transparent
      transparent
      transparent;
  }

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--bottom
    .tooltip-arrow {
    border-color:
      transparent
      transparent
      var(--bg-primary, #0058ab)
      transparent;
  }

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--left
    .tooltip-arrow {
    border-color:
      transparent
      transparent
      transparent
      var(--bg-primary, #0058ab);
  }

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--right
    .tooltip-arrow {
    border-color:
      transparent
      var(--bg-primary, #0058ab)
      transparent
      transparent;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

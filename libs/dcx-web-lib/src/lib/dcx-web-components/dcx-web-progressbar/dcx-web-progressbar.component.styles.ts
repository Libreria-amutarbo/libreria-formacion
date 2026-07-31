import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .dcx-progressbar {
    width: 100%;
    position: relative;
  }

  .dcx-progressbar__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--sp-2, 8px);
    margin-bottom: var(--sp-1, 4px);
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
  }

  .dcx-progressbar__header span:last-child {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-progressbar__container {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    position: relative;
  }

  .dcx-progressbar__track {
    flex: 1;
    height: var(--sp-1, 4px);
    background: var(--border-light, #e5e7eb);
    border-radius: var(--r-xs, 2px);
    position: relative;
    overflow: hidden;
  }

  .dcx-progressbar__fill {
    height: 100%;
    width: var(--progress-width, 0%);
    background: var(--bg-primary, #0058ab);
    border-radius: var(--r-xs, 2px);
    transition: width 0.3s ease;
  }

  .dcx-progressbar--segmented .dcx-progressbar__fill {
    animation: loading-pulse 1.5s ease-in-out infinite;
  }

  .dcx-progressbar__segments {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 2px;
    padding: 0 2px;
  }

  .dcx-progressbar__segment {
    flex: 1;
    border-right: 2px solid
      var(--bg-default, #ffffff);
  }

  .dcx-progressbar__segment:last-child {
    border-right: none;
  }

  .dcx-progressbar__tooltip {
    position: absolute;
    top: -32px;
    left: var(--tooltip-position, 0%);
    transform: translateX(-50%);
    background: var(--text-dark, #2a2e33);
    color: var(--text-white, #ffffff);
    padding: var(--sp-1, 4px) var(--sp-2, 8px);
    border-radius: var(--r-md, 6px);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    white-space: nowrap;
    pointer-events: none;
    }

    .dcx-progressbar__tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);

    border-width: 4px;
    border-style: solid;
    border-color:
        var(--text-dark, #2a2e33)
        transparent
        transparent
        transparent;
    }

  

  .dcx-progressbar__stepper {
    position: relative;
    width: 100%;
  }

  .dcx-progressbar__stepper-track {
    position: absolute;
    top: var(--sp-5, 20px);
    left: var(--sp-6, 24px);
    right: var(--sp-6, 24px);
    height: var(--r-xs, 2px);
    background: var(--border-light, #d1d5db);
    z-index: 0;
  }

  .dcx-progressbar__stepper-progress {
    height: 100%;
    width: var(--stepper-progress, 0%);
    background: var(--bg-primary, #0058ab);
  }

  .dcx-progressbar__steps {
    display: flex;
    justify-content: space-between;
    position: relative; 
    z-index: 1;
  }

  .dcx-progressbar__step:not(:last-child) {
    margin-right: var(--sp-4, 16px);
  }

  .dcx-progressbar__step {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2, 8px);
  }

  .dcx-progressbar__step-circle {
    width: var(--sp-10, 40px);
    height: var(--sp-10, 40px);
    border-radius: var(--r-pill, 999px);
    border: 2px solid
      var(--border-light, #d1d5db);
    background: var(--bg-default, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-progressbar__step--active
    .dcx-progressbar__step-circle {
    background: var(--bg-primary, #0058ab);
    border-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-progressbar__step--completed
    .dcx-progressbar__step-circle {
    background: var(--color-success, #16a34a);
    border-color: var(--color-success, #16a34a);
    color: var(--text-white, #ffffff);
  }

  .dcx-progressbar__checkmark {
      color: var(--text-white, #ffffff);
    }

  .dcx-progressbar__step-label {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    text-align: center;
  }

  @keyframes loading-pulse {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.6;
    }
  }
`;
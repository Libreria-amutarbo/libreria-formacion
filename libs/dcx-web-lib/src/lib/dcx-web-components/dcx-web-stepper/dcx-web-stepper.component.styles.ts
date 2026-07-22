import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .dcx-stepper {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6, 24px);
    width: 100%;
  }

  .dcx-stepper--horizontal .dcx-stepper__header {
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    width: 100%;
  }

  .dcx-stepper--horizontal .dcx-stepper__item {
    flex: 1 1 0;
    min-width: 0;
  }

  .dcx-stepper--horizontal .dcx-stepper__step {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .dcx-stepper--horizontal .dcx-stepper__step-label {
    align-items: center;
    text-align: center;
  }

  .dcx-stepper--horizontal .dcx-stepper__divider {
    flex: 1 1 0;
    min-width: var(--sp-4, 16px);
    width: auto;
    margin: calc(var(--sp-8, 32px) / 2 - 1px)
      var(--sp-3, 12px) 0;
  }

  .dcx-stepper--vertical .dcx-stepper__header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-4, 16px);
  }

  .dcx-stepper--vertical .dcx-stepper__divider {
    width: 2px;
    height: var(--sp-8, 32px);
    margin-left: calc(var(--sp-6, 24px) / 2 - 1px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .dcx-stepper--s .dcx-stepper__step-indicator {
    width: var(--sp-6, 24px);
    height: var(--sp-6, 24px);
  }

  .dcx-stepper--s .dcx-stepper__number,
  .dcx-stepper--s .dcx-stepper__label-text {
    font-size: var(--fs-sm, 12px);
  }

  .dcx-stepper--m .dcx-stepper__step-indicator {
    width: var(--sp-8, 32px);
    height: var(--sp-8, 32px);
  }

  .dcx-stepper--m .dcx-stepper__number,
  .dcx-stepper--m .dcx-stepper__label-text {
    font-size: var(--fs-base, 14px);
  }

  .dcx-stepper--l .dcx-stepper__step-indicator {
    width: var(--sp-10, 40px);
    height: var(--sp-10, 40px);
  }

  .dcx-stepper--l .dcx-stepper__number,
  .dcx-stepper--l .dcx-stepper__label-text {
    font-size: var(--fs-lg, 18px);
  }

  .dcx-stepper--xl .dcx-stepper__step-indicator {
    width: var(--sp-12, 48px);
    height: var(--sp-12, 48px);
  }

  .dcx-stepper--xl .dcx-stepper__number,
  .dcx-stepper--xl .dcx-stepper__label-text {
    font-size: var(--fs-xl, 20px);
  }

  .dcx-stepper__header {
    display: flex;
    align-items: center;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .dcx-stepper__item {
    display: flex;
    list-style: none;
  }

  .dcx-stepper__step {
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: var(--sp-3, 12px);
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s ease;
  }

  .dcx-stepper__step:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
    border-radius: var(--r-md, 6px);
  }


  .dcx-stepper__step:not(.dcx-stepper__step--disabled):hover
  .dcx-stepper__step-indicator,
  .dcx-stepper__step:not(.dcx-stepper__step--disabled):hover
  .dcx-stepper__step-indicator dcx-web-icon {
  border-color: var(--bg-primary-hover, #004080);
  color: var(--bg-primary-hover, #004080);
  }

  .dcx-stepper__step--active .dcx-stepper__step-indicator {
    border-color: var(--bg-primary, #0058ab);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-stepper__step--active .dcx-stepper__label-text {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-stepper__step--completed .dcx-stepper__step-indicator {
    background: var(--bg-primary, #0058ab);
    border-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-stepper__step--completed .dcx-stepper__label-text {
    color: var(--text-dark, #2a2e33);
  }

  .dcx-stepper__step--error .dcx-stepper__step-indicator {
    border-color: var(--color-error, #dc2626);
    color: var(--color-error, #dc2626);
  }

  .dcx-stepper__step--error .dcx-stepper__label-text {
    color: var(--color-error, #dc2626);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-stepper__step--disabled {
    cursor: not-allowed;
  }

  .dcx-stepper__step--disabled .dcx-stepper__step-indicator {
    background: var(--bg-disabled, #f3f4f6);
    border-color: var(--border-light, #d1d5db);
    color: var(--text-disabled, #696e75);
  }

  .dcx-stepper__step--disabled .dcx-stepper__label-text {
    color: var(--text-disabled, #696e75);
  }

  .dcx-stepper__step--disabled:hover .dcx-stepper__step-indicator {
    border-color: var(--border-light, #d1d5db);
    color: var(--text-disabled, #696e75);
  }

  .dcx-stepper__step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--sp-8, 32px);
    height: var(--sp-8, 32px);
    border-radius: 50%;
    background: var(--bg-default, #ffffff);
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-medium, 500);
    border: 2px solid var(--border-light, #d1d5db);
    transition: all 0.2s ease;
  }

  .dcx-stepper__number {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    line-height: 1;
  }

  .dcx-stepper__custom-icon {
    width: 70%;
    height: 70%;
  }

  .dcx-stepper__check-icon{
    
    display: flex;
    color: var(--text-white, #ffffff);
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 70%;
    margin: 0;
    padding: 0;
  }

  .dcx-stepper__error-icon {
    color: var(--color-error, #dc2626);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 70%;
    margin: 0;
    padding: 0;
  }

  .dcx-stepper__check-icon {
    transform: translateY(1px);
  }

  .dcx-stepper__error-icon {
    transform: translateX(1px) translateY(1px);
  }

  .dcx-stepper__step-label {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
  }

  .dcx-stepper__label-text {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #2a2e33);
    line-height: 1.4;
  }

  .dcx-stepper__label-description {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    line-height: 1.3;
  }

  .dcx-stepper__label-optional {
    font-size: var(--fs-xs, 11px);
    color: var(--text-placeholder, #9ca3af);
    font-style: italic;
  }

  .dcx-stepper__divider {
    flex-shrink: 0;
    width: calc(100% - var(--sp-8, 32px) - var(--sp-3, 12px) * 2);
    height: 2px;
    margin: 0 var(--sp-3, 12px);
    background: var(--border-light, #d1d5db);
    transition: background 0.2s ease;
  }

  .dcx-stepper__divider--completed {
    background: var(--bg-primary, #0058ab);
  }

  .dcx-stepper__content {
    padding: var(--sp-6, 24px);
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-md, 6px);
    animation: fadeIn 0.2s ease;
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
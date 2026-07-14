import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-card {
    display: block;
    background: transparent;
    border: none;
    padding: 0;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    outline: none;
  }

  .dcx-card--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .dcx-card--interactive {
    cursor: pointer;
  }

  .dcx-card--interactive:not(.dcx-card--disabled):hover {
    transform: translateY(-2px);
  }

  .dcx-card--interactive:not(.dcx-card--disabled):hover .dcx-card__inner {
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
  }

  .dcx-card:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: var(--sp-1, 4px);
    border-radius: var(--r-sm, 4px);
  }

  .dcx-card__inner {
    display: flex;
    flex-direction: column;
    background: var(--bg-default, #ffffff);
    border-style: var(--card-border-style);
    border-color: var(--bg-primary, #0058ab);
    border-width: var(--card-border-width);
    position: relative;
    box-shadow: var(--card-shadow, var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08)));
    width: 100%;
    max-width: var(--card-max-content-width, 420px);
    box-sizing: border-box;
  }

  .dcx-card__inner--layout-vertical {
    flex-direction: column;
  }

  .dcx-card__inner--layout-horizontal {
    flex-direction: row;
    align-items: stretch;
    gap: var(--sp-4, 16px);
  }


  .dcx-card__inner--size-s {
    padding: var(--sp-3, 12px);
    gap: var(--sp-2, 8px);
    border-radius: var(--r-xl, 12px);
    --card-max-image-width: 92%;
  }

  .dcx-card__inner--size-m {
    padding: var(--sp-4, 16px);
    gap: var(--sp-3, 12px);
    border-radius: var(--r-lg, 8px);
    --card-max-image-width: 100%;
  }

  .dcx-card__inner--size-l {
    padding: var(--sp-6, 24px);
    gap: var(--sp-4, 16px);
    border-radius: var(--r-xl, 12px);
    --card-max-image-width: 100%;
  }

  .dcx-card__inner--size-xl {
    padding: var(--sp-10, 40px);
    gap: var(--sp-5, 20px);
    border-radius: var(--r-xl, 12px);
    --card-max-image-width: 100%;
  }

  .dcx-card__inner--layout-horizontal.dcx-card__inner--align-start {
    justify-content: flex-start;
  }

  .dcx-card__inner--layout-horizontal.dcx-card__inner--align-center {
    justify-content: center;
  }

  .dcx-card__inner--layout-horizontal.dcx-card__inner--align-end {
    justify-content: flex-end;
  }

  .dcx-card__image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }

  .dcx-card__image {
    display: block;
    width: 100%;
    max-width: var(--card-max-image-width, 180px);
    border-radius: var(--r-md, 6px);
    object-fit: cover;
  }

  .dcx-card__inner--layout-horizontal .dcx-card__image-container {
    flex: 0 0 auto;
    max-width: var(--card-max-image-width, 180px);
    margin-right: var(--sp-4, 16px);
  }

  .dcx-card__inner--layout-horizontal .dcx-card__body {
    flex: 1 1 0%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dcx-card__inner--accent-top::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: var(--sp-1, 4px);
    background: linear-gradient(
      90deg,
      var(--bg-primary, #0058ab),
      var(--color-success, #16a34a)
    );
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    z-index: 2;
  }

  .dcx-card__body {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
    min-width: 0;
  }

  .dcx-card__header {
    margin-bottom: var(--sp-4, 16px);
  }

  .dcx-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
    max-width: 100%;
    min-width: 0;
  }

  .dcx-card__footer {
    margin-top: var(--sp-4, 16px);
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--sp-2, 8px);
    justify-content: flex-start;
  }

  .dcx-card__title {
    margin: 0 0 var(--sp-2, 8px) 0;
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-card__subtitle {
    margin: 0;
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-regular, 400);
  }


  .dcx-card__inner--size-s .dcx-card__title,
  .dcx-card__inner--size-s ::slotted(h3),
  .dcx-card__inner--size-s ::slotted(.dcx-card__title) {
    font-size: var(--fs-md, 16px);
  }
  .dcx-card__inner--size-s .dcx-card__subtitle,
  .dcx-card__inner--size-s ::slotted(p),
  .dcx-card__inner--size-s ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-base, 14px);
  }

 
  .dcx-card__inner--size-m .dcx-card__title,
  .dcx-card__inner--size-m ::slotted(h3),
  .dcx-card__inner--size-m ::slotted(.dcx-card__title) {
    font-size: var(--fs-lg, 18px);
  }
  .dcx-card__inner--size-m .dcx-card__subtitle,
  .dcx-card__inner--size-m ::slotted(p),
  .dcx-card__inner--size-m ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-md, 16px);
  }

  .dcx-card__inner--size-l .dcx-card__title,
  .dcx-card__inner--size-l ::slotted(h3),
  .dcx-card__inner--size-l ::slotted(.dcx-card__title) {
    font-size: var(--fs-xl, 20px);
  }
  .dcx-card__inner--size-l .dcx-card__subtitle,
  .dcx-card__inner--size-l ::slotted(p),
  .dcx-card__inner--size-l ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-md, 16px);
  }

  .dcx-card__inner--size-xl .dcx-card__title,
  .dcx-card__inner--size-xl ::slotted(h3),
  .dcx-card__inner--size-xl ::slotted(.dcx-card__title) {
    font-size: var(--fs-2xl, 24px);
  }
  .dcx-card__inner--size-xl .dcx-card__subtitle,
  .dcx-card__inner--size-xl ::slotted(p),
  .dcx-card__inner--size-xl ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-lg, 18px);
  }


  .dcx-card__inner--align-start .dcx-card__body > * {
    align-self: flex-start;
    text-align: left;
  }

  .dcx-card__inner--align-center .dcx-card__body > * {
    align-self: center;
    text-align: center;
  }

  .dcx-card__inner--align-end .dcx-card__body > * {
    align-self: flex-end;
    text-align: right;
  }

  .dcx-card__inner--align-start .dcx-card__footer {
    justify-content: flex-start;
  }

  .dcx-card__inner--align-center .dcx-card__footer {
    justify-content: center;
  }

  .dcx-card__inner--align-end .dcx-card__footer {
    justify-content: flex-end;
  }

  .dcx-card__inner--align-start .dcx-card__image-container {
    justify-content: flex-start;
  }

  .dcx-card__inner--align-center .dcx-card__image-container {
    justify-content: center;
  }

  .dcx-card__inner--align-end .dcx-card__image-container {
    justify-content: flex-end;
  }
`;
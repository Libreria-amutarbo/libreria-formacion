import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .dcx-accordion {
    font-family: var(--ff-base, 'Inter', sans-serif);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    overflow: hidden;
    background-color: var(--bg-default, #ffffff);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .dcx-accordion--transition-smooth .dcx-accordion__content-wrapper {
    transition:
      max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .dcx-accordion--transition-smooth .dcx-accordion__chevron {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dcx-accordion--transition-fast .dcx-accordion__content-wrapper {
    transition:
      max-height 0.15s ease-in-out,
      opacity 0.15s ease-in-out,
      padding 0.15s ease-in-out;
  }
  .dcx-accordion--transition-fast .dcx-accordion__chevron {
    transition: transform 0.15s ease-in-out;
  }

  .dcx-accordion--transition-slow .dcx-accordion__content-wrapper {
    transition:
      max-height 0.5s ease-in-out,
      opacity 0.5s ease-in-out,
      padding 0.5s ease-in-out;
  }
  .dcx-accordion--transition-slow .dcx-accordion__chevron {
    transition: transform 0.5s ease-in-out;
  }

  .dcx-accordion--transition-none .dcx-accordion__content-wrapper,
  .dcx-accordion--transition-none .dcx-accordion__chevron {
    transition: none;
  }

  .dcx-accordion__item {
    border-bottom: 1px solid var(--border-light, #d1d5db);
  }

  .dcx-accordion__item:last-child {
    border-bottom: none;
  }

  .dcx-accordion__item--disabled .dcx-accordion__header {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-accordion__item--disabled .dcx-accordion__header:hover {
    background-color: var(--bg-default, #ffffff);
  }

  .dcx-accordion__item--expanded .dcx-accordion__header {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-accordion__item--expanded .dcx-accordion__chevron {
    transform: rotate(180deg);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-accordion--flush {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
  }

  .dcx-accordion--flush .dcx-accordion__header {
    border-radius: 0;
  }

  .dcx-accordion--flush .dcx-accordion__header:focus-visible {
    outline-offset: 0;
  }

  .dcx-accordion__heading {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  .dcx-accordion__header {
    display: flex;
    align-items: center;
    gap: var(--sp-3, 12px);
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
    background-color: var(--bg-default, #ffffff);
    width: 100%;
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #2a2e33);
    border: none;
    border-radius: 0;
    text-align: left;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease-in-out;
  }

  .dcx-accordion__header:hover:not([disabled]) {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-accordion__header:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
  }

  .dcx-accordion__header[disabled] {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-accordion__icon {
    flex-shrink: 0;
    color: var(--bg-primary, #0058ab);
    width: var(--sp-5, 20px);
    height: var(--sp-5, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-accordion__title-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .dcx-accordion__title {
    font-weight: var(--fw-semibold, 600);
    line-height: 1.4;
  }

  .dcx-accordion__description {
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-regular, 400);
    color: var(--text-muted, #696e75);
    line-height: 1.4;
  }

  .dcx-accordion__chevron {
    flex-shrink: 0;
    color: var(--text-dark, #2a2e33);
    transform: rotate(0deg);
    width: var(--sp-5, 20px);
    height: var(--sp-5, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition:
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.2s ease;
  }

  .dcx-accordion__chevron svg {
    width: 14px;
    height: 14px;
  }

  .dcx-accordion__content-wrapper {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 var(--sp-5, 20px);
  }

  .dcx-accordion__content-wrapper--expanded {
    max-height: 2000px;
    opacity: 1;
    padding: 0 var(--sp-5, 20px) var(--sp-4, 16px);
  }

  .dcx-accordion__content-wrapper--disabled-content .dcx-accordion__content {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  .dcx-accordion__content {
    padding-top: var(--sp-3, 12px);
    background-color: var(--bg-default, #ffffff);
    color: var(--text-muted, #696e75);
    line-height: var(--line-height-normal, 1.6);
    font-size: var(--fs-base, 14px);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .dcx-accordion__content--scrollable {
    overflow-y: auto;
    padding-right: var(--sp-2, 8px);
  }

  .dcx-accordion__content--scrollable::-webkit-scrollbar {
    width: var(--sp-1, 4px);
  }
  .dcx-accordion__content--scrollable::-webkit-scrollbar-track {
    background: transparent;
  }
  .dcx-accordion__content--scrollable::-webkit-scrollbar-thumb {
    background: var(--border-light, #d1d5db);
    border-radius: var(--r-pill, 999px);
  }
`;

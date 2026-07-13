import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: var(--sp-4, 16px);
    box-sizing: border-box;
  }

  .dcx-carousel__content {
    display: flex;
    align-items: center;
    gap: var(--sp-5, 20px);
    position: relative;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .dcx-carousel__container {
    overflow: hidden;
    flex: 1;
    min-width: 0;
    box-sizing: border-box;
  }

  .dcx-carousel__items-wrapper {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    will-change: transform;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  .dcx-carousel__item {
    flex: 0 0 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--sp-3, 12px);
  }

  .dcx-carousel--vertical {
    flex-direction: row;
    align-items: center;
    height: auto;
  }

  .dcx-carousel--vertical .dcx-carousel__content {
    flex-direction: column;
    flex: 1;
    height: auto;
    gap: var(--sp-2, 8px);
    align-items: stretch;
  }

  .dcx-carousel--vertical .dcx-carousel__container {
    height: 420px;
    flex: none;
    min-height: 0;
  }

  .dcx-carousel--vertical .dcx-carousel__items-wrapper {
    flex-direction: column;
  }

  .dcx-carousel--vertical .dcx-carousel__item {
    flex: 0 0 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  .dcx-carousel--vertical .dcx-carousel__indicators {
    flex-direction: column;
    justify-content: center;
    padding: 0 var(--sp-2, 8px);
  }

  .dcx-carousel--vertical .dcx-carousel__indicator {
    width: var(--sp-2, 8px);
    height: var(--sp-2, 8px);
  }

  .dcx-carousel--vertical .dcx-carousel__indicator--active {
    width: var(--sp-2, 8px);
    height: var(--sp-6, 24px);
  }

  .dcx-carousel__indicators {
    display: flex;
    justify-content: center;
    gap: var(--sp-2, 8px);
    padding: var(--sp-2, 8px) 0;
  }

  .dcx-carousel__indicator {
    display: inline-block;
    width: var(--sp-2, 8px);
    height: var(--sp-2, 8px);
    padding: 0;
    border: 1px solid transparent;
    border-radius: var(--r-pill, 999px);
    background-color: var(--border-light, #d1d5db);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .dcx-carousel__indicator:hover:not([disabled]) {
    background-color: var(--border-hover, #9ca3af);
  }

  .dcx-carousel__indicator--active {
    width: var(--sp-6, 24px);
    background-color: var(--bg-primary, #0058ab);
  }

  .dcx-carousel__indicator--active:hover:not([disabled]) {
    background-color: var(--bg-primary-hover, #004080);
  }

  .dcx-carousel__prev,
  .dcx-carousel__next {
    flex-shrink: 0;
    align-self: center;
    z-index: 10;
  }

  .dcx-carousel__sr-only {
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

  @media (prefers-reduced-motion: reduce) {
    .dcx-carousel__items-wrapper {
      transition: none;
    }
  }
`;

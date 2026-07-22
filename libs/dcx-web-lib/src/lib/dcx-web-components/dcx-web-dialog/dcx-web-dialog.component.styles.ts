import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .dcx-dialog-root {
    position: fixed;
    inset: 0;
    z-index: 1000;
  }

  .dcx-dialog__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    transition: opacity 200ms ease;
    opacity: 1;
  }

  .dcx-dialog {
    font-family: var(--ff-base, 'Inter', sans-serif);
    line-height: 1.5;
    position: absolute;
    background: var(--bg-default, #ffffff);
    border-radius: var(--r-lg, 8px);
    width: 420px;
    max-width: 90%;
    max-height: 70vh;
    opacity: 1;
    transition: opacity 200ms ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 var(--sp-5, 20px) var(--sp-16, 64px) rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .dcx-dialog--pos-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .dcx-dialog--pos-top {
    top: var(--sp-4, 16px);
    left: 50%;
    transform: translate(-50%, 0);
  }

  .dcx-dialog--pos-bottom {
    bottom: var(--sp-4, 16px);
    left: 50%;
    transform: translate(-50%, 0);
  }

  .dcx-dialog--pos-left {
    left: var(--sp-4, 16px);
    top: 50%;
    transform: translate(0, -50%);
  }

  .dcx-dialog--pos-right {
    right: var(--sp-4, 16px);
    top: 50%;
    transform: translate(0, -50%);
  }

  .dcx-dialog--pos-top-left {
    top: var(--sp-4, 16px);
    left: var(--sp-4, 16px);
  }

  .dcx-dialog--pos-top-right {
    top: var(--sp-4, 16px);
    right: var(--sp-4, 16px);
  }

  .dcx-dialog--pos-bottom-left {
    bottom: var(--sp-4, 16px);
    left: var(--sp-4, 16px);
  }

  .dcx-dialog--pos-bottom-right {
    bottom: var(--sp-4, 16px);
    right: var(--sp-4, 16px);
  }

  .dcx-dialog__header {
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
    border-bottom: 1px solid var(--border-default, #2a2e33);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .dcx-dialog__title {
    font-size: var(--fs-md, 16px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
    margin: 0;
  }

  .dcx-dialog__close {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;
    background: none;
    border: none;
  }

  .dcx-dialog__body {
    font-size: var(--fs-base, 14px);
    color: var(--text-muted, #696e75);
    padding: var(--sp-5, 20px);
    overflow-y: auto;
    flex: 1 1 auto;
    min-height: 0;
  }

  .dcx-dialog__footer {
    padding: var(--sp-3, 12px) var(--sp-5, 20px);
    border-top: 1px solid var(--border-default, #2a2e33);
    background: var(--bg-surface, #f4f5f7);
    display: flex;
    justify-content: flex-end;
    gap: var(--sp-4, 16px);
    flex-shrink: 0;
  }
`;
import { css } from 'lit';

export const dcxWebPageDialogStyles = css`

    :host {
    display: block;
    padding: var(--sp-8, 32px);
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
    }
    .demo-page {
    width: 100%;
    max-width: 860px;
    padding-bottom: var(--sp-12, 48px);
    }
    .demo-page-header {
    margin-bottom: var(--sp-8, 32px);
    }
    .demo-page-header__kicker {
    font-size: var(--fs-xs, 11px);
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--text-muted, #696e75);
    margin-bottom: var(--sp-2, 8px);
    }
    .demo-page-header__title {
    font-size: var(--fs-2xl, 24px);
    font-weight: 700;
    color: var(--text-dark, #2a2e33);
    margin: 0 0 var(--sp-4, 16px) 0;
    }
    .demo-page-header__desc {
    font-size: var(--fs-base, 14px);
    line-height: 1.65;
    color: var(--text-muted, #696e75);
    max-width: 560px;
    margin: 0 0 var(--sp-6, 24px);
    }
    .demo-page-header__divider {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 0;
    }
    .demo-section {
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-default, #e5e7eb);
    border-radius: var(--r-lg, 8px);
    margin-bottom: var(--sp-6, 24px);
    overflow: hidden;
    }
    .demo-section__header {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    background: var(--bg-surface, #f4f5f7);
    border-bottom: 1px solid var(--border-default, #e5e7eb);
    }
    .demo-section__num {
    font-size: 10px;
    font-weight: 700;
    color: var(--text-muted, #696e75);
    background: #edf0f3;
    border-radius: var(--r-sm, 4px);
    padding: var(--sp-1, 4px) var(--sp-3, 12px);
    }
    .demo-section__title {
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
    }
    .demo-section__desc {
    padding:  var(--sp-3, 12px) var(--sp-4, 16px);
    font-size: var(--fs-sm, 12px);
    line-height: 1.55;
    color: var(--text-muted, #696e75);
    margin: 0;
    }
    .demo-section__body {
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    }

    #positioned-dialogs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: var(--sp-4, 16px);
    }
    #positioned-dialogs .mock-btn {
    font-family: var(--ff-base, 'Inter', sans-serif);
    width: 50px;
    height: 50px;
    font-size: var(--fs-2xl, 24px);
    border-radius: var(--r-lg, 8px);
    background-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
    border: none;
    cursor: pointer;
    }
    #positioned-dialogs .mock-btn:hover {
    background-color: var(--bg-primary-hover, #004080);
    }
    .dialog-icon {
    width: var(--sp-12, 48px);
    height: var(--sp-12, 44px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--sp-3, 12px);
    }
    .icon-danger {
    background: var(--color-error-bg, #fef2f2);
    }
    .icon-info {
    background: #dbeafe;
    }
    .dcx-field {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
    margin-bottom: var(--sp-4, 16px);
    }
    .dcx-field:last-child {
    margin-bottom: 0;
    }
    .dcx-label {
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #2a2e33);
    }
    .dcx-input {
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border: 1px solid var(--border-default, #2a2e33);
    border-radius: var(--r-sm, 4px);
    color: var(--text-dark, #2a2e33);
    background: var(--bg-default, #ffffff);
    outline: none;
    transition: border-color 0.15s;
    }
    .dcx-input:focus {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 2px rgba(29, 184, 242, 0.2);
    }
    .dcx-input::placeholder {
    color: var(--text-disabled, #9ca3af);
    }
    .dcx-select {
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    padding-right: var(--sp-8, 32px);
    border: 1px solid var(--border-default, #2a2e33);
    border-radius: var(--r-sm, 4px);
    color: var(--text-dark, #2a2e33);
    background: var(--bg-default, #ffffff);
    outline: none;
    width: 100%;
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%232a2e33' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: border-color 0.15s;
    }
    .dcx-select:focus {
    border-color: var(--border-focus, #1db8f2);
    }
    `;
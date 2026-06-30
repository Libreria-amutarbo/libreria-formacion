import { css } from 'lit';

export const pageCardStyles = css`
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
        font-weight: var( --fw-semibold, 600);
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--text-muted, #696e75);
        margin-bottom: var(--sp-1, 4px);
    }

    .demo-page-header__title {
        font-size: 28px;
        font-weight: var(--fw-bold, 700);
        letter-spacing: -0.3px;
        color: var(--text-dark, #2a2e33);
        margin-bottom: var(--sp-2, 8px);
        margin-top: 0;
    }

    .demo-page-header__desc {
        font-size: var(--fs-base, 14px);
        line-height: 1.65;
        color: var(--text-muted, #696e75);
        max-width: 560px;
        margin: 0 0 var(--sp-5, 20px);
    }

    .demo-page-header__divider {
        border: none;
        border-top: 1px solid var(--border-light, #e5e7eb);
        margin: 0;
    }

    .demo-section {
        background: var(--bg-default, #ffffff);
        border: 1px solid var(--border-light, #e5e7eb);
        border-radius: var(--r-lg, 8px);
        overflow: visible;
        margin-bottom: var(--sp-5, 20px);
    }

    .demo-section__header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px var(--sp-4, 16px);
        background: var(--bg-surface, #f4f5f7);
        border-bottom: 1px solid var(--border-light, #e5e7eb);
        border-radius: var(--r-lg, 8px) var(--r-lg, 8px) 0 0;
    }

    .demo-section__num {
        font-size: var(--fs-xs, 11px);
        font-weight: var(--fw-bold, 700);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted, #696e75);
        background: #edf0f3;
        border-radius: var(--r-sm, 4px);
        padding: 2px var(--sp-2, 8px);
        flex-shrink: 0;
        line-height: 1.6;
    }

    .demo-section__title {
        font-size: var(--fs-base, 14px);
        font-weight: var( --fw-semibold, 600);
        color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
        padding: 10px var(--sp-4, 16px) 0;
        font-size: var(--fs-sm, 12px);
        line-height: 1.55;
        color: var(--text-muted, #696e75);
        margin: 0;
    }

    .demo-section__body--narrow {
        max-width: 480px;
    }
    
    .demo-section__body {
        padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .card-demo-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--sp-4, 16px);
        align-items: stretch;
    }

    .card-demo-grid--2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    dcx-web-card {
        display: block;
        width: 100%;
    }

    .card-demo__header {
        display: flex;
        align-items: center;
        gap: var(--sp-3, 12px);
    }

    .card-demo__header--space-between {
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

    .card-demo__avatar {
        width: 40px;
        height: 40px;
        border-radius: var(--r-pill, 999px);
        background: var(--info-light, #dbeafe);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: var(--fs-base, 14px);
        font-weight: var(--fw-semibold, 600);
        color: var(--color-info, #12abdb);
        flex-shrink: 0;
    }

    .card-demo__name {
        font-size: var(--fs-md, 16px);
        font-weight: var(--fw-semibold, 600);
        color: var(--text-dark, #2a2e33);
    }

    .card-demo__role {
        margin-top: 1px;
        font-size: var(--fs-sm, 12px);
        color: var(--text-muted, #696e75);
    }

    .card-demo__title {
        font-size: var(--fs-md, 16px);
        font-weight: var(--fw-semibold, 600);
        color: var(--text-dark, #2a2e33);
    }

    .card-demo__subtitle {
        font-size: var(--fs-base, 14px);
        color: var(--text-muted, #696e75);
        margin-top: var(--sp-1, 4px);
    }

    .card-demo__hr {
        border: 0;
        border-top: 1px solid var(--border-light, #d1d5db);
        margin: var(--sp-3, 12px) 0;
    }

    .card-demo__stats {
        display: flex;
        gap: var(--sp-4, 16px);
    }

    .card-demo__stat {
        flex: 1;
        background: var(--bg-surface, #f4f5f7);
        border-radius: var(--r-md, 6px);
        padding: var(--sp-2, 8px);
        text-align: center;
    }

    .card-demo__stat-val {
        font-size: var(--fs-lg, 18px);
        font-weight: var(--fw-bold, 700);
        color: var(--bg-primary, #0058ab);
    }

    .card-demo__stat-lbl {
        margin-top: 1px;
        font-size: var(--fs-xs, 11px);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--text-muted, #696e75);
    }

    .mock-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 4px;
        background: linear-gradient(
            to right,
            var(--bg-primary, #0058ab) 0%,
            var(--bg-primary, #0058ab) var(--slider-fill, 0%),
            var(--border-light, #d1d5db) var(--slider-fill, 0%),
            var(--border-light, #d1d5db) 100%
        );
        border-radius: var(--r-sm, 4px);
        outline: none;
        margin: var(--sp-2, 8px) 0;
        cursor: pointer;
    }

    .mock-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        background: var(--bg-primary, #0058ab);
        border-radius: 50%;
        border: 2px solid var(--text-white, #ffffff);
        box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06));
        cursor: pointer;
    }

    .mock-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: var(--bg-primary, #0058ab);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid var(--text-white, #ffffff);
        box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06));
    }

    .mock-slider__progress {
        margin: var(--sp-3, 12px) 0 var(--sp-1, 4px);
        display: flex;
        justify-content: space-between;
        font-size: var(--fs-sm, 12px);
        color: var(--text-muted, #696e75);
        width: 100%;
    }

    .mock-slider__progress-val {
        color: var(--bg-primary, #0058ab);
        font-weight: var(--fw-semibold, 600);
    }

    .mock-chip {
        display: inline-flex;
        align-items: center;

        height: 2rem;
        padding: 0 var(--sp-3, 12px);

        border-radius: var(--r-pill, 999px);
        border: 1px solid transparent;

        font-family: var(--ff-base, 'Inter', sans-serif);
        font-size: var(--fs-base, 14px);
        font-weight: var(--fw-medium, 500);
        line-height: 1;

        white-space: nowrap;

        cursor: default;
    }

    .mock-chip:hover { text-decoration: underline; }

    .mock-chip--primary {
        background-color: var(--bg-primary, #0058ab);
        color: var(--text-white, #ffffff);
    }

    .mock-chip--secondary {
        background-color: var(--bg-default, #ffffff);
        color: var(--text-dark, #2a2e33);
        border-color: var(--border-default, #2a2e33);
    }

    .mock-chip--success {
        background-color: var(--status-success, #00a76f);
        color: var(--text-white, #ffffff);
    }

    .mock-chip--warning {
        background-color: var(--status-warning, #ffa726);
        color: var(--text-dark, #2a2e33);
    }

    .card-demo__kpi-value {
        margin: var(--sp-2, 8px) 0 var(--sp-1, 4px);
        font-size: 36px;
        line-height: 1;
        font-weight: var(--fw-bold, 700);
        color: var(--text-dark, #2a2e33);
    }

    .card-demo__kpi-trend {
        margin: 0 0 var(--sp-1, 4px);
        font-size: var(--fs-sm, 12px);
        font-weight: var(--fw-semibold, 600);
        color: var(--color-success, #16a34a);
    }

    .card-demo__kpi-label {
        margin: 0;
        font-size: var(--fs-sm, 12px);
        color: var(--text-muted, #696e75);
    }

    .card-demo__tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--sp-2, 8px);
        margin-top: 0;
    }

    .card-demo__actions {
        display: flex;
        gap: var(--sp-2, 8px);
        margin-top: 0;
    }

    .mock-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        gap: var(--sp-2, 8px);
        padding: 0 var(--sp-3, 12px);
        border-radius: var(--r-sm, 4px);
        font-family: inherit;
        font-size: var(--fs-sm, 12px);
        border: none;
        cursor: pointer;
    }

    .mock-btn-primary { 
        background: var(--bg-primary, #0058ab);
        color: var(--text-white, #ffffff);
    }

    .mock-btn-secondary {
        background: var(--bg-default, #ffffff);
        color: var(--text-dark, #2a2e33);
        border: 1px solid var(--border-light, #d1d5db);
    }

    .mock-btn-primary:hover {
        background: var(--bg-primary-hover, #004080); 
    }

    .mock-btn-secondary:hover {
        background: var(--bg-hover, #f7f8fa); 
    }
`;

import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .dcx-file-upload {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--sp-2, 8px);
    font-family: var(--ff-base, 'Inter', sans-serif);
    width: 100%;
  }

  .dcx-file-upload__validation-message {
    width: 100%;
  }

  .dcx-file-upload__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-2, 8px);
    width: 100%;
    min-width: 0;
  }

  .dcx-file-upload__actions {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-3, 12px);
    flex-wrap: wrap;
  }

  .dcx-file-upload__zone {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--border-default, #d1d5db);
    border-radius: 6px;
    background: var(--bg-default, #ffffff);
    padding: 8px 10px;
    cursor: pointer;
    transition: border-color 0.12s, background 0.12s;
    width: 100%;
    min-width: 0;
  }

  .dcx-file-upload__zone:not(.dcx-file-upload__zone--disabled):hover {
    border-color: var(--border-hover, #9ca3af);
    background: #fafafa;
  }

  .dcx-file-upload__zone--disabled {
    background: var(--bg-disabled, #f3f4f6);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .dcx-file-upload__zone--error {
    border-color: var(--color-danger, #dc2626);
  }

  .dcx-file-upload__zone-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: 5px var(--sp-3, 12px);
    border-radius: var(--r-sm, 4px);
    border: 1px solid var(--border-default, #d1d5db);
    background: var(--bg-default, #ffffff);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #111827);
    cursor: pointer;
    font-family: var(--ff-base, 'Inter', sans-serif);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .dcx-file-upload__zone-btn dcx-web-icon {
    display: inline-flex;
    line-height: 0;
  }

  .dcx-file-upload__zone-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .dcx-file-upload__dropzone {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: var(--sp-8, 32px);
    padding: 8px 10px;
    border: 1px dashed var(--border-light, #d1d5db);
    border-radius: var(--r-md, 6px);
    background: var(--bg-default, #ffffff);
    width: 100%;
    transition: border-color 0.12s, background 0.12s;
    min-width: 0;
  }

  .dcx-file-upload__dropzone--small {
    display: flex;
    align-items: center;
  }

  .dcx-file-upload__dropzone--large {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--sp-2, 8px);
    width: min(100%, 28rem);
    min-height: 12rem;
    padding: 1.25rem;
  }

  .dcx-file-upload__dropzone--drag-over {
    border-color: var(--bg-primary, #0058ab);
    border-style: dashed;
    background: color-mix(
      in srgb,
      var(--bg-primary, #0058ab) 10%,
      var(--bg-default, #ffffff)
    );
  }

  .dcx-file-upload__dropzone--disabled {
    opacity: 0.6;
  }

  .dcx-file-upload__input {
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

  .dcx-file-upload__placeholder {
    font-size: var(--fs-sm, 12px);
    color: var(--text-disabled, #696e75);
    flex: 1;
  }

  .dcx-file-upload__file-name {
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #111827);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  .dcx-file-upload__file-item .dcx-file-upload__file-name {
    flex: 1;
  }

  .dcx-file-upload__file-list {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .dcx-file-upload__file-item {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    width: 100%;
    background: #f9fafb;
    border: 1px solid var(--bg-disabled, #f3f4f6);
    border-radius: var(--r-sm, 4px);
    padding: 6px 10px;
    box-sizing: border-box;
  }

  .dcx-file-upload__file-icon {
    flex-shrink: 0;
    color: var(--text-muted, #6b7280);
    line-height: 0;
  }

  .dcx-file-upload__file-size {
    font-size: var(--fs-sm, 12px);
    color: var(--text-disabled, #696e75);
    white-space: nowrap;
    margin-left: auto;
  }

  .dcx-file-upload__remove-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: var(--r-sm, 4px);
    background: transparent;
    color: var(--text-muted, #6b7280);
    cursor: pointer;
    flex-shrink: 0;
  }

  .dcx-file-upload__remove-btn dcx-web-icon {
    display: inline-flex;
    line-height: 0;
  }

  .dcx-file-upload__remove-btn:hover:not(:disabled) {
    background: var(--bg-hover, #f3f4f6);
    color: var(--text-dark, #111827);
  }

  .dcx-file-upload__remove-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dcx-file-upload__drop-hint {
    color: var(--text-disabled, #696e75);
    font-size: var(--fs-base, 14px);
  }

  .dcx-file-upload__zone,
    .dcx-file-upload__dropzone,
    .dcx-file-upload__file-list,
    .dcx-file-upload__file-item {
    box-sizing: border-box;
  }
`;

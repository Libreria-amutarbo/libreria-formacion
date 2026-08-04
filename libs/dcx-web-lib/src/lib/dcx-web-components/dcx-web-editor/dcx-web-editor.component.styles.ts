import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-editor__label {
    display: inline-block;
    margin-bottom: var(--sp-2, 8px);
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-editor__required {
    margin-left: var(--sp-1, 4px);
    color: var(--color-danger, #dc2626);
  }

  .dcx-editor {
    width: 100%;
    max-width: 720px;
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-sm, 4px);
    background: var(--bg-default, #ffffff);
    overflow: hidden;
  }

  .dcx-editor.is-disabled {
    background: var(--bg-disabled, #f3f4f6);
  }

  .dcx-editor__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-1, 4px);
    padding: var(--sp-2, 8px);
    border-bottom: 1px solid var(--border-light, #d1d5db);
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-editor__content {
    width: 100%;
    padding: var(--sp-3, 12px);
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
    outline: none;
    overflow: auto;
  }

  .dcx-editor__content b,
  .dcx-editor__content strong {
    font-weight: var(--fw-bold, 700);
  }

  .dcx-editor__content i,
  .dcx-editor__content em {
    font-style: italic;
  }

  .dcx-editor__content u {
    text-decoration: underline;
  }

  .dcx-editor__content ol,
  .dcx-editor__content ul {
    margin: var(--sp-2, 8px) 0;
    padding-left: var(--sp-5, 24px);
  }

  .dcx-editor__content ol {
    list-style: decimal;
  }

  .dcx-editor__content ul {
    list-style: disc;
  }

  .dcx-editor__content li {
    margin: var(--sp-1, 4px) 0;
    display: list-item;
  }

  .dcx-editor__content:empty::before {
    content: attr(data-placeholder);
    color: var(--text-disabled, #696e75);
    pointer-events: none;
  }

  .dcx-editor__content.is-focused {
    box-shadow: inset 0 0 0 2px var(--border-focus, #1db8f2);
  }

  .dcx-editor__content.is-invalid {
    box-shadow: inset 0 0 0 2px var(--color-danger, #dc2626);
  }

  .dcx-editor__content.is-disabled,
  .dcx-editor__content.is-readonly {
    color: var(--text-disabled, #696e75);
    cursor: not-allowed;
  }

  .dcx-editor__content.is-readonly {
    cursor: default;
  }

  .dcx-editor__error {
    padding: 0 var(--sp-3, 12px) var(--sp-3, 12px);
    color: var(--color-danger, #dc2626);
    font-size: var(--fs-sm, 12px);
  }
`;

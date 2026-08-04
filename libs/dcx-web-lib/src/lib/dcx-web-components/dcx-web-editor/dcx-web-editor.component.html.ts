import { html, nothing } from 'lit';
import type { DcxWebEditor } from './dcx-web-editor.component';

export const template = (host: DcxWebEditor) => {
  return html`
    ${host.label
      ? html`
          <label class="dcx-editor__label" id="${host.id}-label">
            ${host.label}
            ${host.required
              ? html`<span class="dcx-editor__required">*</span>`
              : nothing}
          </label>
        `
      : nothing}

    <div class="dcx-editor ${host.isDisabled ? 'is-disabled' : ''}">
      <div class="dcx-editor__toolbar" role="toolbar" aria-label="Formato">
        ${host.toolbarItems.map(
          item => html`
            <dcx-web-button
              variant="icon-only"
              size="s"
              .icon="${true}"
              icon-name="${item.icon}"
              icon-size="m"
              .ariaLabel="${item.ariaLabel}"
              .disabled="${host.isDisabled || host.readonly}"
              .pressed="${host.isToolbarActionActive(item.action)}"
              @mousedown="${(e: MouseEvent) => host.onToolbarMouseDown(e)}"
              @buttonClick="${() => host.onToolbarButtonClick(item)}"
            ></dcx-web-button>
          `,
        )}
      </div>

      <div
        class="${host.editorClasses}"
        id="${host.id}"
        style="min-height: ${host.minHeight}"
        role="textbox"
        aria-multiline="true"
        contenteditable="${!host.isDisabled && !host.readonly}"
        tabindex="${host.isDisabled || host.readonly ? nothing : '0'}"
        data-placeholder="${host.placeholder}"
        aria-labelledby="${host.label ? `${host.id}-label` : nothing}"
        aria-label="${!host.label ? host.ariaLabel ?? nothing : nothing}"
        aria-required="${host.required ? 'true' : nothing}"
        aria-invalid="${String(host.isInvalid)}"
        aria-describedby="${host.describedBy ?? nothing}"
        @beforeinput="${(e: InputEvent) => host.onBeforeInput(e)}"
        @input="${() => host.onInput()}"
        @focus="${() => host.onFocus()}"
        @blur="${() => host.onBlur()}"
        @keyup="${() => host.onEditorSelectionChange()}"
        @mouseup="${() => host.onEditorSelectionChange()}"
      ></div>

      ${host.isInvalid && host.errorMessage
        ? html`
            <div class="dcx-editor__error" id="${host.errorId}">
              ${host.errorMessage}
            </div>
          `
        : nothing}
    </div>
  `;
};

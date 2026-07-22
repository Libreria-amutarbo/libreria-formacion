import { html, nothing } from 'lit';
import type { DcxWebDrawer } from './dcx-web-drawer.component';

export const template = (host: DcxWebDrawer) => {
  if (!host.rendered) {
    return nothing;
  }

  const drawerClasses = [
    'dcx-drawer',
    `dcx-drawer--${host.position}`,
    host.fullScreen ? 'dcx-drawer--fullscreen' : '',
  ].filter(Boolean);

  const rootClasses = ['dcx-drawer-root', host.closing ? 'dcx-drawer-root--closing' : ''];
  const shouldRenderMask = host.modal;

  return html`
    <div class=${rootClasses.filter(Boolean).join(' ')} style="z-index:${host.resolvedZIndex};">
      ${shouldRenderMask
        ? html`<div
            class="dcx-drawer__mask"
            aria-hidden="true"
            @pointerdown=${host.handleMaskPointerDown}
          ></div>`
        : nothing}

      <aside
        class=${drawerClasses.join(' ')}
        role="dialog"
        aria-modal=${host.modal ? 'true' : nothing}
        aria-labelledby=${host.header ? host.drawerTitleId : nothing}
        style="z-index:${host.resolvedZIndex + 1};${host.panelWidth ? ` width:${host.panelWidth};` : ''}${host.panelHeight ? ` height:${host.panelHeight};` : ''}"
      >
        ${host.hasHeader
          ? html`
              <header class="dcx-drawer__header">
                ${host.querySelector('[slot="drawerHeader"]')
                  ? html`<slot name="drawerHeader"></slot>`
                  : html`<h3 class="dcx-drawer__title" id=${host.drawerTitleId}>${host.header}</h3>`}

                ${host.showCloseIcon
                  ? html`<dcx-web-button
                      variant="icon-only"
                      size="s"
                      aria-label="Cerrar drawer"
                      @buttonClick=${host.closeDrawer}
                    >
                      <dcx-web-icon slot="dcx-icon" name="x"></dcx-web-icon>
                    </dcx-web-button>`
                  : nothing}
              </header>
            `
          : nothing}

        <div class="dcx-drawer__content">
          <slot></slot>
        </div>

        ${host.hasFooter
          ? html`
              <footer class="dcx-drawer__footer">
                ${host.querySelector('[slot="drawerFooter"]')
                  ? html`<slot name="drawerFooter"></slot>`
                  : html`<span>${host.footer}</span>`}
              </footer>
            `
          : nothing}
      </aside>
    </div>
  `;
};

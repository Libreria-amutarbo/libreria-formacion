import { html } from 'lit';
import type { DcxWebContextMenu } from './dcx-web-context-menu.component';

export const template = (host: DcxWebContextMenu) => {
  if (!host.isOpen) return html``;

  const classes = `dcx-context-menu ${
    host.positionMode === 'absolute' ? 'dcx-context-menu--absolute' : ''
  }`;
  const style = `top: ${host.top}; left: ${host.left}; opacity: ${
    host.isPositioned ? '1' : '0'
  };`;

  return html`
    <div
      class="${classes}"
      style="${style}"
      @click="${(e: Event) => e.stopPropagation()}"
      tabindex="-1"
      role="menu"
      aria-label="Menú contextual"
    >
      <ul class="dcx-context-menu__list" role="presentation">
        ${host.items.map((item, index) => host.renderItem(item, index))}
      </ul>
    </div>
  `;
};

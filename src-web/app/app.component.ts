import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './pages/dcx-web-page-badge/dcx-web-page-badge.component';
import './pages/dcx-web-page-dialog/dcx-web-page-dialog.component';
import './pages/dcx-web-page-card/dcx-web-page-card.component';
import './pages/dcx-web-page-breadcrumb/dcx-web-page-breadcrumb.component';
import './pages/dcx-web-page-accordion/dcx-web-page-accordion.component';
import './pages/dcx-web-page-button/dcx-web-page-button.component';
import './pages/dcx-web-page-drawer/dcx-web-page-drawer.component';
import './pages/dcx-web-page-chip/dcx-web-page-chip.component';
import './pages/dcx-web-page-icon/dcx-web-page-icon.component';
import './pages/dcx-web-page-home/dcx-web-page-home.component';
import './pages/dcx-web-page-checkbox/dcx-web-page-checkbox.component';
import './pages/dcx-web-page-divider/dcx-web-page-divider.component';
import './pages/dcx-web-page-context-menu/dcx-web-page-context-menu.component';
import './pages/dcx-web-page-input/dcx-web-page-input.component';
import './pages/dcx-web-page-stepper/dcx-web-page-stepper.component';

@customElement('dcx-web-root')
export class DcxWebRoot extends LitElement {
  @state() private accessor _currentPath = window.location.hash || '#home';

  override createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    window.addEventListener('hashchange', () => {
      this._currentPath = window.location.hash || '#home';
    });
  }

  static override styles = css`
    :host {
      display: block;
    }

    .app-shell {
      font-family: var(--ff-base, 'Inter', sans-serif);
      background: #f4f5f7;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem 2rem;
      box-sizing: border-box;
    }
  `;

  override render() {
    let content;
    switch (this._currentPath) {
      case '#badge':
        content = html`<dcx-web-page-badge></dcx-web-page-badge>`;
        break;
      case '#dialog':
        content = html`<dcx-web-page-dialog></dcx-web-page-dialog>`;
        break;
      case '#card':
        content = html`<dcx-web-page-card></dcx-web-page-card>`;
        break;
      case '#checkbox':
        content = html`<dcx-web-page-checkbox></dcx-web-page-checkbox>`;
        break;
      case '#divider':
        content = html`<dcx-web-page-divider></dcx-web-page-divider>`;
        break;
      case '#breadcrumb':
        content = html`<dcx-web-page-breadcrumb></dcx-web-page-breadcrumb>`;
        break;
      case '#context-menu':
        content = html`<dcx-web-page-context-menu></dcx-web-page-context-menu>`;
        break;
      case '#accordion':
        content = html`<dcx-web-page-accordion></dcx-web-page-accordion>`;
        break;
      case '#button':
        content = html`<dcx-web-page-button></dcx-web-page-button>`;
        break;
      case '#drawer':
        content = html`<dcx-web-page-drawer></dcx-web-page-drawer>`;
        break;
      case '#chip':
        content = html`<dcx-web-page-chip></dcx-web-page-chip>`;
        break;
      case '#icon':
        content = html`<dcx-web-page-icon></dcx-web-page-icon>`;
        break;
      case '#input':
        content = html`<dcx-web-page-input></dcx-web-page-input>`;
        break;
      case '#stepper':
        content = html`<dcx-web-page-stepper></dcx-web-page-stepper>`;
        break;
      default:
        content = html`<dcx-web-page-home></dcx-web-page-home>`;
    }

    return html`
      <style>
        ${DcxWebRoot.styles}
      </style>
      <div class="app-shell">
        ${content}
      </div>
    `;
  }
}

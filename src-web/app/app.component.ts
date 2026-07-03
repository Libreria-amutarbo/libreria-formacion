import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './pages/dcx-web-page-badge/dcx-web-page-badge.component';
import './pages/dcx-web-page-button/dcx-web-page-button.component';
import './pages/dcx-web-page-drawer/dcx-web-page-drawer.component';
import './pages/dcx-web-page-home/dcx-web-page-home.component';

@customElement('dcx-web-root')
export class DcxWebRoot extends LitElement {
  @state() private accessor _currentPath = window.location.hash || '#home';

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
      case '#button':
        content = html`<dcx-web-page-button></dcx-web-page-button>`;
        break;
      case '#drawer':
        content = html`<dcx-web-page-drawer></dcx-web-page-drawer>`;
        break;
      default:
        content = html`<dcx-web-page-home></dcx-web-page-home>`;
    }

    return html`
      <div class="app-shell">
        ${content}
      </div>
    `;
  }
}

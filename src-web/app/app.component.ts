import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './pages/dcx-web-page-badge/dcx-web-page-badge.component';
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
      font-family: var(--ff-base, var(--font-family-primary, 'Inter', sans-serif));
      background: var(--bg-surface, #f4f5f7);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 4rem 2rem 2rem;
      box-sizing: border-box;
    }
  `;

  override render() {
    return html`
      <div class="app-shell">
        ${this._currentPath === '#badge'
          ? html`<dcx-web-page-badge></dcx-web-page-badge>`
          : html`<dcx-web-page-home></dcx-web-page-home>`}
      </div>
    `;
  }
}

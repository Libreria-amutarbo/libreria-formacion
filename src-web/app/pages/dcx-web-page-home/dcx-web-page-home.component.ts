import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('dcx-web-page-home')
export class DcxWebPageHome extends LitElement {
  @state() private accessor _searchTerm = '';

  private _cards = [
    { route: 'badge', name: 'Badge' },
    { route: 'button', name: 'Button' },
  ];

  static override styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    h1 {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #696e75;
      margin-bottom: 0.4rem;
    }

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #2a2e33;
      margin-bottom: 1.5rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      width: 100%;
      max-width: 900px;
    }

    .card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 80px;
    }

    .card:hover {
      border-color: #0058ab;
      box-shadow: 0 4px 12px rgba(0, 88, 171, 0.1);
      transform: translateY(-2px);
    }

    .card-name {
      font-size: 16px;
      font-weight: 600;
      color: #2a2e33;
    }
  `;

  override render() {
    return html`
      <h1>DCX WEB Library</h1>
      <h2>Componentes</h2>

      <div class="grid">
        ${this._cards.map(
          card => html`
            <a class="card" href="#${card.route}">
              <div class="card-name">${card.name}</div>
            </a>
          `
        )}
      </div>
    `;
  }
}

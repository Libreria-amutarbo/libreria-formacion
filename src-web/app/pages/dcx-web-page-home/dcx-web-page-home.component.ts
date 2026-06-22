import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface HomeCard {
  icon: string;
  name: string;
  route: string;
}

const ROUTE_ICONS: Record<string, string> = {
  badge: 'app-indicator',
  accordion: 'list',
};

@customElement('dcx-web-page-home')
export class DcxWebPageHome extends LitElement {
  @state() private accessor _searchTerm = '';

  private _cards: HomeCard[] = [
    {
      route: 'badge',
      name: 'Badge',
      icon: ROUTE_ICONS['badge'],
    },
    {
      route: 'accordion',
      name: 'Accordion',
      icon: ROUTE_ICONS['accordion'],
    },
  ];

  static override styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: var(--ff-base, var(--font-family-primary, 'Inter', sans-serif));
    }

    h1 {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--content-subtle, #696e75);
      margin-bottom: 0.4rem;
    }

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: var(--content-default, #2a2e33);
      margin-bottom: 1rem;
    }

    .search {
      width: 100%;
      max-width: 420px;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--r-md, 6px);
      font-family: inherit;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
      width: 100%;
      max-width: 900px;
    }

    .card {
      background: var(--background-default, #fff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--border-radius-md, 6px);
      padding: 1.25rem 1.5rem;
      cursor: pointer;
      transition: box-shadow 0.15s, border-color 0.15s, transform 0.1s;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      min-height: 118px;
    }

    .card:hover {
      border-color: var(--color-primary, #0058ab);
      box-shadow: 0 4px 16px rgba(0, 88, 171, 0.12);
      transform: translateY(-2px);
    }

    .card-icon {
      font-size: 22px;
      margin-bottom: 0.25rem;
    }

    .card-name {
      font-size: 15px;
      font-weight: 600;
      color: var(--content-default, #2a2e33);
    }

    .card-file {
      font-size: 11px;
      color: var(--content-subtle, #696e75);
      font-family: monospace;
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      color: var(--content-subtle, #696e75);
      padding: 1rem 0;
    }
  `;

  private _onSearch(e: Event) {
    this._searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
  }

  private _filteredCards() {
    if (!this._searchTerm) return this._cards;
    return this._cards.filter(card =>
      `${card.name} ${card.route}`.toLowerCase().includes(this._searchTerm),
    );
  }

  override render() {
    const filtered = this._filteredCards();
    return html`
      <h1>DCX WEB Library</h1>
      <h2>Designs — Dev</h2>

      <input
        type="search"
        placeholder="Buscar..."
        class="search"
        @input="${this._onSearch}"
      />

      <div class="grid">
        ${filtered.map(
          card => html`
            <a class="card" href="#${card.route}">
              <div class="card-icon"><i class="bi bi-${card.icon}"></i></div>
              <div class="card-name">${card.name}</div>
              <div class="card-file">dcx-web-page-${card.route}.html</div>
            </a>
          `,
        )}
        ${
          filtered.length === 0
            ? html`<div class="no-results">No hay componentes que coincidan.</div>`
            : ''
        }
      </div>
    `;
  }
}

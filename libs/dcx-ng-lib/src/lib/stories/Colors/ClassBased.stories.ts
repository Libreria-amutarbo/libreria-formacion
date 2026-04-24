import { palette, tokens } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaletteGroup = 'primary' | 'grey' | 'base';

interface ExplorerArgs {
  group: PaletteGroup;
  columns: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const createSwatch = (label: string, hex: string) => `
  <div style="border-radius:8px;overflow:hidden;border:1px solid ${palette.grey[200]};">
    <div style="background:${hex};min-height:80px;"></div>
    <div style="background:${palette.base.white};padding:.65rem .75rem;border-top:1px solid ${palette.grey[200]};">
      <div style="font-weight:600;color:${palette.grey[700]};font-size:.8rem;margin-bottom:.25rem;${FONT}">${label}</div>
      <div style="font-family:monospace;color:${palette.grey[500]};font-size:.72rem;">${hex}</div>
    </div>
  </div>
`;

const col = (span: number, content: string) =>
  `<div class="dcx-col dcx-col--${span}">${content}</div>`;

const grid = (content: string) =>
  `<div class="dcx-grid dcx-grid--gap-m">${content}</div>`;

const FONT = `font-family: var(--app-font, 'Roboto', sans-serif);`;

const sectionHeader = (title: string, subtitle = '') => `
  <div style="margin-bottom:1.25rem;">
    <h3 style="margin:0;color:${palette.grey[700]};font-size:1.1rem;font-weight:700;${FONT}">${title}</h3>
    ${subtitle ? `<p style="margin:.3rem 0 0;color:${palette.grey[500]};font-size:.85rem;${FONT}">${subtitle}</p>` : ''}
  </div>
`;

const divider = () =>
  `<hr style="border:none;border-top:1px solid ${palette.grey[200]};margin:2rem 0;">`;

// Reverse lookup: hex → 'palette.group[tone]'
const buildColorNameMap = () => {
  const map = new Map<string, string>();
  for (const group in palette) {
    const g = palette[group as keyof typeof palette] as Record<string, string>;
    for (const tone in g) {
      map.set(g[tone].toLowerCase(), `palette.${group}['${tone}']`);
    }
  }
  return map;
};

const colorNameMap = buildColorNameMap();
const getPalettePath = (hex: string) =>
  colorNameMap.get(hex.toLowerCase()) ?? hex;

const buildTokenTable = (title: string, section: Record<string, string>) => {
  const headerRow = `
    <div style="display:grid;grid-template-columns:1fr 24px 1fr auto;gap:.75rem;align-items:center;
      padding:.45rem .75rem;background:${palette.grey[100]};border-radius:6px 6px 0 0;
      border:1px solid ${palette.grey[200]};font-weight:700;font-size:.7rem;
      color:${palette.grey[500]};text-transform:uppercase;letter-spacing:.06em;${FONT}">
      <span>Token</span>
      <span></span>
      <span>Paleta</span>
      <span>Hex</span>
    </div>
  `;

  const rows = Object.entries(section)
    .map(
      ([key, hex]) => `
      <div style="display:grid;grid-template-columns:1fr 24px 1fr auto;gap:.75rem;align-items:center;
        padding:.5rem .75rem;border:1px solid ${palette.grey[200]};border-top:none;font-size:.78rem;${FONT}">
        <code style="color:${palette.grey[700]};font-family:monospace;font-weight:600;">${key}</code>
        <span style="width:20px;height:20px;border-radius:4px;background:${hex};
          border:1px solid ${palette.grey[300]};display:inline-block;flex-shrink:0;"></span>
        <code style="color:${palette.grey[500]};font-family:monospace;">${getPalettePath(hex)}</code>
        <code style="color:${palette.grey[400]};font-family:monospace;">${hex}</code>
      </div>
    `,
    )
    .join('');

  return `
    <div>
      <h4 style="margin:0 0 .5rem;color:${palette.grey[700]};font-size:.88rem;font-weight:700;${FONT}">
        tokens.<span style="color:${palette.primary[500]};">${title}</span>
      </h4>
      <div style="border-radius:8px;overflow:hidden;">${headerRow}${rows}</div>
    </div>
  `;
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<ExplorerArgs> = {
  title: 'DCXLibrary/Utilities/Color System',
  tags: ['autodocs'],
  argTypes: {
    group: {
      control: { type: 'select' },
      options: ['primary', 'grey', 'base'],
      description: 'Grupo de paleta a visualizar',
      table: {
        category: 'Attributes',
        type: { summary: "'primary' | 'grey' | 'base'" },
        defaultValue: { summary: 'primary' },
      },
    },
    columns: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Número de columnas en el grid de swatches',
      table: {
        category: 'Attributes',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
  },
  parameters: {
    layout: 'padded',
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        component: `
## Sistema de Colores DCX

El sistema de colores está organizado en **tres capas jerárquicas**:

| Capa | Descripción | Ejemplo |
|------|-------------|---------|
| **Palette** | Valores de color primitivos | \`palette.primary[500]\` → \`#0058ab\` |
| **Semantic** | Colores con significado contextual | \`palette.semantic['red-800']\` |
| **Tokens** | Roles de diseño que apuntan a la paleta | \`tokens.text.error\` |

> **Regla de uso:** Consume siempre colores a través de **tokens** en los componentes.
> Accede a \`palette\` directamente sólo para definir nuevos tokens.

\`\`\`typescript
import { palette, tokens } from '@dcx-ng-components/dcx-ng-lib';
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ExplorerArgs>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Todos los colores primitivos agrupados por familia: Primary, Grey y Base.
 */
export const FullPalette: Story = {
  name: 'Paleta Completa',
  parameters: {
    docs: {
      description: {
        story:
          'Vista completa de todos los colores primitivos disponibles. Los tonos bajos (100–400) son claros y los altos (500–700) son oscuros. Importa `palette` de `../../../index`.',
      },
    },
  },
  render: () => ({
    template: `
      <section>
        ${sectionHeader('Primary', 'Azules corporativos — base de la identidad visual DCX.')}
        ${grid(
          Object.entries(palette.primary)
            .map(([tone, hex]) => col(3, createSwatch(`primary.${tone}`, hex)))
            .join(''),
        )}

        ${divider()}

        ${sectionHeader('Grey', 'Escala de grises para textos, bordes y fondos neutros.')}
        ${grid(
          Object.entries(palette.grey)
            .map(([tone, hex]) => col(3, createSwatch(`grey.${tone}`, hex)))
            .join(''),
        )}

        ${divider()}

        ${sectionHeader('Base', 'Colores de base absolutos.')}
        ${grid(col(3, createSwatch('base.white', palette.base.white)))}
      </section>
    `,
  }),
};

/**
 * Colores semánticos: transmiten significado (error, información) de forma independiente al matiz.
 */
export const SemanticPalette: Story = {
  name: 'Paleta Semántica',
  parameters: {
    docs: {
      description: {
        story:
          'Colores con significado contextual (error, información, alerta). Evita usarlos directamente en componentes — prefiere los tokens semánticos correspondientes como `tokens.text.error` o `tokens.background.error`.',
      },
    },
  },
  render: () => ({
    template: `
      <section>
        ${sectionHeader(
          'Semantic',
          'Colores con significado contextual: errores, alertas e información.',
        )}
        ${grid(
          Object.entries(palette.semantic)
            .map(([name, hex]) => col(3, createSwatch(`semantic.${name}`, hex)))
            .join(''),
        )}
      </section>
    `,
  }),
};

/**
 * Referencia completa de todos los tokens de diseño con su valor de paleta y hex correspondiente.
 */
export const TokenReference: Story = {
  name: 'Tokens de Diseño',
  parameters: {
    docs: {
      description: {
        story: `
Mapa completo de tokens → paleta → hex para las cuatro categorías de tokens:

- **text** — Color de contenido textual (títulos, etiquetas, errores)
- **background** — Fondos de elementos interactivos y de layout
- **content** — Iconos y elementos gráficos vectoriales
- **border** — Bordes, separadores y anillos de foco

Importa \`tokens\` de \`../../../index\`.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <section>
        ${sectionHeader(
          'Tokens de Diseño',
          'Referencia de cómo cada token apunta a un valor de la paleta primitiva.',
        )}
        ${grid(
          [
            col(6, buildTokenTable('text', tokens.text)),
            col(6, buildTokenTable('background', tokens.background)),
            col(6, buildTokenTable('content', tokens.content)),
            col(6, buildTokenTable('border', tokens.border)),
          ].join(''),
        )}
      </section>
    `,
  }),
};

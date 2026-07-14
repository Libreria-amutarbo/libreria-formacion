import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';
import {
  LAYOUT_LIST,
  ALIGN_LIST,
  SIZE_LIST,
  ALIGN_DEFAULT,
  SIZE_DEFAULT,
  LAYOUT_DEFAULT,
} from '../../core/defaults/generic';
import {
  BORDER_STYLE_LIST,
  BORDER_STYLE_DEFAULT,
  SHADOW_LIST,
  DEFAULTARGS,
} from '../../core/defaults/card';

const DEMO_STYLES = html`
  <style>
    .card-demo__avatar { width: var(--sp-10, 40px); height: var(--sp-10, 40px); border-radius: var(--r-pill, 999px); background: var(--color-info-light, #dbeafe); display: inline-flex; align-items: center; justify-content: center; font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600); color: var(--color-info, #0058ab); flex-shrink: 0; }
    .card-demo__name { font-size: var(--fs-base, 14px); font-weight: var(--fw-semibold, 600); color: var(--text-dark, #2a2e33); }
    .card-demo__role { margin-top: 1px; font-size: var(--fs-sm, 12px); color: var(--text-muted, #696e75); }
    .card-demo__header { display: flex; align-items: center; gap: var(--sp-3, 12px); }
    .card-demo__header--space-between { justify-content: space-between; align-items: flex-start; width: 100%; }
    .card-demo__title { font-size: var(--fs-base, 14px); font-weight: var(--fw-semibold, 600); color: var(--text-dark, #2a2e33); }
    .card-demo__subtitle { font-size: var(--fs-sm, 12px); color: var(--text-muted, #696e75); margin-top: var(--sp-1, 4px); }
    .card-demo__title-lg { font-size: var(--fs-lg, 18px); font-weight: var(--fw-semibold, 600); color: var(--text-dark, #2a2e33); margin: 0; }
    .card-demo__subtitle-lg { font-size: var(--fs-base, 14px); color: var(--text-muted, #696e75); margin: 0; margin-top: var(--sp-1, 4px); }
    .card-demo__hr { margin: var(--sp-3, 12px) 0; }
    .card-demo__stats { display: flex; gap: var(--sp-4, 16px); }
    .card-demo__stat { flex: 1; background: var(--bg-surface, #f4f5f7); border-radius: var(--r-md, 6px); padding: var(--sp-2, 8px); text-align: center; }
    .card-demo__stat-val { font-size: var(--fs-lg, 18px); font-weight: var(--fw-bold, 700); color: var(--bg-primary, #0058ab); }
    .card-demo__stat-lbl { margin-top: 1px; font-size: var(--fs-xs, 11px); letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted, #696e75); }
    .card-demo__kpi-value { margin: var(--sp-2, 8px) 0 var(--sp-1, 4px); font-size: var(--fs-2xl, 36px); line-height: 1; font-weight: var(--fw-bold, 700); color: var(--text-dark, #2a2e33); }
    .card-demo__kpi-trend { margin: 0 0 var(--sp-1, 4px); font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600); color: var(--color-success, #16a34a); }
    .card-demo__kpi-label { margin: 0; font-size: var(--fs-sm, 12px); color: var(--text-muted, #696e75); }
    .card-demo__tags { display: flex; flex-wrap: wrap; gap: var(--sp-2, 8px); margin-top: 0; }
    .card-demo__actions { display: flex; gap: var(--sp-2, 8px); margin-top: 0; }
  </style>
`;

const Template = (args: any, slots?: any) => {
  const mergedArgs = { ...DEFAULTARGS, ...args };
  return html`
    <dcx-web-card
      .image=${mergedArgs.image}
      imageAlt=${mergedArgs.imageAlt}
      title=${mergedArgs.title}
      subtitle=${mergedArgs.subtitle}
      layout=${mergedArgs.layout}
      align=${mergedArgs.align}
      size=${mergedArgs.size}
      maxContentWidth=${mergedArgs.maxContentWidth}
      maxImageWidth=${mergedArgs.maxImageWidth}
      ?accent=${mergedArgs.accent}
      ?bordered=${mergedArgs.bordered}
      .borderWidth=${mergedArgs.borderWidth}
      borderStyle=${mergedArgs.borderStyle}
      .shadow=${mergedArgs.shadow}
      .interactive=${mergedArgs.interactive}
      ?disabled=${mergedArgs.disabled}
    >
      ${slots}
    </dcx-web-card>
  `;
};

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Card',
  component: 'dcx-web-card',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
  decorators: [
    (story) => html`
      ${DEMO_STYLES}
      ${story()}
    `,
  ],

  argTypes: {
    align: {
      description: 'Alineación del bloque y del contenido.',
      options: ALIGN_LIST,
      control: { type: 'select' },
      table: {
        category: 'Atributos',
        defaultValue: { summary: ALIGN_DEFAULT },
      },
    },
    bordered: {
      description: 'Activa borde explícito.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    borderStyle: {
      description: 'Tipo de línea del borde de la carta.',
      options: BORDER_STYLE_LIST,
      control: { type: 'select' },
      table: {
        category: 'Atributos',
        defaultValue: { summary: BORDER_STYLE_DEFAULT },
      },
    },
    borderWidth: {
      description: 'Grosor del borde (px). Máx 16px',
      control: { type: 'number', min: 0, max: 16, step: 1 },
      table: {
        category: 'Atributos',
      },
    },
    accent: {
      description: 'Aplica color de acento al borde.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    disabled: {
      description: 'Deshabilita la carta',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    image: {
      description: 'URL de la imagen.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },
    imageAlt: {
      description: 'Texto alternativo para la imagen.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },
    interactive: {
      description: 'Convierte la carta en interactivo (hover/cursor).',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    layout: {
      description: 'Orientación del contenido.',
      options: LAYOUT_LIST,
      control: { type: 'select' },
      table: {
        category: 'Atributos',
        defaultValue: { summary: LAYOUT_DEFAULT },
      },
    },
    maxContentWidth: {
      description: 'Ancho máx. del bloque (en cualquier layout).',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },
    maxImageWidth: {
      description: 'Ancho máx. de imagen.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },
    shadow: {
      description: 'Sombra: preset 0/1/2/3.',
      options: SHADOW_LIST,
      control: { type: 'select' },
      table: {
        category: 'Atributos',
      },
    },
    size: {
      description: 'Tamaño (padding + tipografía).',
      options: SIZE_LIST,
      control: { type: 'select' },
      table: {
        category: 'Atributos',
        defaultValue: { summary: SIZE_DEFAULT },
      },
    },
    subtitle: {
      description: 'Subtítulo o descripción corta de la carta.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },
    title: {
      description: 'Título principal de la carta.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },
    'dcx-card-click': {
      description: 'Se emite al hacer clic o activar con teclado (Enter/Space) cuando la carta es interactiva.',
      table: {
        category: 'Eventos',
        type: { summary: '(event: MouseEvent | KeyboardEvent) => void' },
      },
    },
  },

  args: DEFAULTARGS,
  render: (args) => Template(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ProfileCard: Story = {
  render: (args) => html`
    <div style="max-width:640px; margin:auto; padding:var(--sp-10, 40px); background:var(--bg-surface,#f4f5f7);">
      ${Template(
        { ...args, accent: true },
        html`
          <div slot="header" class="card-demo__header">
            <div class="card-demo__avatar">MG</div>
            <div>
              <div class="card-demo__name">María García</div>
              <div class="card-demo__role">Cloud Architect · Madrid</div>
            </div>
          </div>

          <div slot="content">
            <dcx-web-divider class="card-demo__hr" thickness="0.0625" color="var(--border-default, #2a2e33)"></dcx-web-divider>
            <div class="card-demo__stats">
              <div class="card-demo__stat">
                <div class="card-demo__stat-val">12</div>
                <div class="card-demo__stat-lbl">Proyectos</div>
              </div>
              <div class="card-demo__stat">
                <div class="card-demo__stat-val">98%</div>
                <div class="card-demo__stat-lbl">Satisf.</div>
              </div>
              <div class="card-demo__stat">
                <div class="card-demo__stat-val">7</div>
                <div class="card-demo__stat-lbl">Certif.</div>
              </div>
            </div>
          </div>
        `
      )}
    </div>
  `,
  args: {
    layout: 'vertical',
    align: 'center',
    size: 'm',
    image: 'https://picsum.photos/640/360',
    maxContentWidth: '640px',
    maxImageWidth: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    shadow: 2,
    interactive: true,
    disabled: false,
  },
};

export const ProjectCard: Story = {
  render: (args) => Template(
    { ...args, accent: true },
    html`
      <div slot="header" class="card-demo__header card-demo__header--space-between">
        <div class="card-demo__title">Cloud Migration</div>
        <dcx-web-chip label="Activo" color="success"></dcx-web-chip>
      </div>
      <div slot="content">
        <p style="margin:0 0 var(--sp-4, 16px);font-size:var(--fs-base, 14px);color:var(--text-muted, #9ca3af);">
          Descripción del proyecto de migración a la nube.
        </p>
        <dcx-web-slider
          textLabel="Progreso"
          min="0"
          max="100"
          value="82"
          valueSuffix="%"
          step="1"
        ></dcx-web-slider>
      </div>
      <div slot="footer">
        <div class="card-demo__actions" style="margin-top: var(--sp-4, 16px);">
          <dcx-web-button label="Ver detalle" variant="primary"></dcx-web-button>
        </div>
      </div>
    `
  ),
  args: {
    layout: 'vertical',
    align: 'center',
    size: 'm',
    image: 'https://picsum.photos/640/360',
    maxContentWidth: '640px',
    maxImageWidth: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    shadow: 2,
    interactive: true,
    disabled: false,
  },
};

export const KpiCard: Story = {
  render: (args) => Template(
    { ...args, accent: true },
    html`
      <div slot="header" class="card-demo__header">
        <div class="card-demo__title">Satisfacción cliente</div>
      </div>
      <div slot="content">
        <div class="card-demo__kpi-value">98%</div>
        <div class="card-demo__kpi-trend">↑ +1.2% este mes</div>
        <div class="card-demo__kpi-label">Media de 24 proyectos activos</div>
      </div>
    `
  ),
  args: {
    layout: 'vertical',
    align: 'center',
    size: 'm',
    image: 'https://picsum.photos/640/360',
    maxContentWidth: '640px',
    maxImageWidth: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    shadow: 2,
    interactive: true,
    disabled: false,
  },
};

export const LabelCard: Story = {
  render: (args) => Template(
    { ...args, image: null },
    html`
      <div slot="header">
         <div class="card-demo__title-lg">SAP S/4HANA · Airbus</div>
        <div class="card-demo__subtitle-lg">
          Implementación de módulos FI/CO y MM en Airbus, incluyendo migración de datos históricos.
        </div>
      </div>
      <div slot="content">
        <div class="card-demo__tags">
          <dcx-web-chip label="SAP" color="primary"></dcx-web-chip>
          <dcx-web-chip label="Finanzas" color="secondary"></dcx-web-chip>
          <dcx-web-chip label="En revisión" color="warning"></dcx-web-chip>
        </div>
      </div>
      <div slot="footer">
        <div class="card-demo__actions">
          <dcx-web-button label="Abrir" variant="primary"></dcx-web-button>
          <dcx-web-button label="Archivar" variant="secondary"></dcx-web-button>
        </div>
      </div>
    `
  ),
  args: {
    layout: 'vertical',
    align: 'start',
    size: 'm',
    maxContentWidth: '640px',
    maxImageWidth: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    shadow: 2,
    interactive: true,
    disabled: false,
  },
};

export const DisabledCard: Story = {
  args: {
    layout: 'horizontal',
    align: 'end',
    maxContentWidth: '960px',
    image: 'https://picsum.photos/360/240',
    disabled: true,
  },
};

export const WithSlotsVertical: Story = {
  render: (args) => Template(
    args,
    html`
      <div slot="header" class="card-demo__header-custom">
        <h3 class="card-demo__title-lg">Encabezado personalizado</h3>
        <p class="card-demo__subtitle-lg">Este header sobrescribe el título/subtítulo por defecto</p>
      </div>
      <div slot="content">
        <p class="card-demo__content">Contenido principal de la card. Aquí puedes insertar cualquier HTML, componentes, etc.</p>
      </div>
      <div slot="footer" class="card-demo__actions">
        <dcx-web-button label="Cancelar" variant="secondary"></dcx-web-button>
        <dcx-web-button label="Aceptar" variant="primary"></dcx-web-button>
      </div>
    `
  ),
  args: {
    layout: 'vertical',
    align: 'center',
    size: 'm',
    image: 'https://picsum.photos/640/360',
    maxContentWidth: '640px',
    maxImageWidth: '100%',
    bordered: true,
    borderStyle: 'solid',
    borderWidth: 1,
    shadow: 2,
    interactive: true,
    disabled: false,
  },
};

export const AccentVariant: Story = {
  name: 'Acento',
  render: () => html`
    <div style="display:flex;gap:var(--sp-4, 16px);align-items:stretch;">
      ${Template({
        title: 'Sin acento',
        subtitle: 'accent = false',
        image: null,
        size: 'm',
        layout: 'vertical',
        align: 'start',
        maxContentWidth: '280px',
        shadow: 1,
        accent: false,
        interactive: false,
      })}
      ${Template({
        title: 'Con acento',
        subtitle: 'accent = true',
        image: null,
        size: 'm',
        layout: 'vertical',
        align: 'start',
        maxContentWidth: '280px',
        shadow: 1,
        accent: true,
        interactive: false,
      })}
    </div>
  `,
};

export const BorderStyles: Story = {
  name: 'Estilos de borde',
  render: () => html`
    <div style="display:flex;gap:var(--sp-3, 12px);flex-wrap:wrap;">
      ${Template({ title: 'solid',  subtitle: 'borderStyle', image: null, size: 's', bordered: true, borderStyle: 'solid',  borderWidth: 2, maxContentWidth: '160px', interactive: false })}
      ${Template({ title: 'dashed', subtitle: 'borderStyle', image: null, size: 's', bordered: true, borderStyle: 'dashed', borderWidth: 2, maxContentWidth: '160px', interactive: false })}
      ${Template({ title: 'dotted', subtitle: 'borderStyle', image: null, size: 's', bordered: true, borderStyle: 'dotted', borderWidth: 2, maxContentWidth: '160px', interactive: false })}
      ${Template({ title: 'double', subtitle: 'borderStyle', image: null, size: 's', bordered: true, borderStyle: 'double', borderWidth: 4, maxContentWidth: '160px', interactive: false })}
      ${Template({ title: 'none',   subtitle: 'borderStyle', image: null, size: 's', bordered: true, borderStyle: 'none',                  maxContentWidth: '160px', interactive: false })}
    </div>
  `,
};

export const ShadowVariants: Story = {
  name: 'Sombras',
  render: () => html`
    <div style="display:flex;gap:var(--sp-5, 20px);flex-wrap:wrap;padding:var(--sp-5, 20px);background:var(--bg-surface,#f4f5f7);">
      ${Template({ title: 'shadow 0', subtitle: 'sin sombra',    image: null, size: 's', shadow: 0, maxContentWidth: '160px', interactive: false })}
      ${Template({ title: 'shadow 1', subtitle: 'sombra suave',  image: null, size: 's', shadow: 1, maxContentWidth: '160px', interactive: false })}
      ${Template({ title: 'shadow 2', subtitle: 'sombra media',  image: null, size: 's', shadow: 2, maxContentWidth: '160px', interactive: false })}
      ${Template({ title: 'shadow 3', subtitle: 'sombra fuerte', image: null, size: 's', shadow: 3, maxContentWidth: '160px', interactive: false })}
    </div>
  `,
};

export const SizeXL: Story = {
  name: 'Tamaño XL',
  args: {
    size: 'xl',
    layout: 'vertical',
    align: 'start',
    image: 'https://picsum.photos/640/360',
    title: 'Tarjeta XL',
    subtitle: 'Este tamaño usa un padding y tipografía ampliados para destacar.',
    maxContentWidth: '640px',
    shadow: 2,
    interactive: true,
    disabled: false,
  },
};

export const WithSlotsHorizontal: Story = {
  render: (args) => Template(
    args,
    html`
      <div slot="header">
        <h3 class="card-demo__title-lg" style="margin:0 0 var(--sp-2, 8px);">Encabezado personalizado</h3>
        <p class="card-demo__subtitle-lg" style="margin:0;">Este header sobrescribe el título/subtítulo por defecto</p>
      </div>
      <div slot="content">
        <p>Contenido principal de la card. Aquí puedes insertar cualquier HTML, componentes, etc.</p>
      </div>
      <div slot="footer">
        <div class="card-demo__actions">
          <dcx-web-button label="Cancelar" variant="secondary"></dcx-web-button>
          <dcx-web-button label="Aceptar" variant="primary"></dcx-web-button>
        </div>
      </div>
    `
  ),
  args: {
    layout: 'horizontal',
    align: 'start',
    size: 'm',
    image: 'https://picsum.photos/360/240',
    maxContentWidth: '800px',
    maxImageWidth: '100%',
    shadow: 1,
    interactive: true,
    disabled: false,
  },
};
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

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Card',
  component: 'dcx-web-card',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },

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
  render: (args) => html`
    <dcx-web-card
      .image=${args.image}
      imageAlt=${args.imageAlt}
      title=${args.title}
      subtitle=${args.subtitle}
      layout=${args.layout}
      align=${args.align}
      size=${args.size}
      maxContentWidth=${args.maxContentWidth}
      maxImageWidth=${args.maxImageWidth}
      ?accent=${args.accent}
      ?bordered=${args.bordered}
      .borderWidth=${args.borderWidth}
      borderStyle=${args.borderStyle}
      .shadow=${args.shadow}
      .interactive=${args.interactive}
      ?disabled=${args.disabled}
    >
    </dcx-web-card>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ProfileCard: Story = {
  render: (args) => html`
    <div style="max-width:640px; margin:auto; padding:2.5rem; background:var(--color-surface,#f4f5f7);">
      <dcx-web-card
        .size=${args.size}
        .image=${args.image}
        imageAlt=${args.imageAlt}
        ?bordered=${args.bordered}
        borderStyle=${args.borderStyle}
        .borderWidth=${args.borderWidth}
        .shadow=${args.shadow}
        .interactive=${args.interactive}
        ?disabled=${args.disabled}
        layout=${args.layout}
        align=${args.align}
        maxContentWidth=${args.maxContentWidth}
        maxImageWidth=${args.maxImageWidth}
        ?accent=${true}
      >
        <div slot="header" style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:999px;background:#dbeafe;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:var(--background-primary,#0058ab);flex-shrink:0;">
            MG
          </div>
          <div>
            <div style="font-size:15px;font-weight:600;color:var(--content-default,#2a2e33);">
              María García
            </div>
            <div style="margin-top:1px;font-size:12px;color:var(--content-subtle,#696e75);">
              Cloud Architect · Madrid
            </div>
          </div>
        </div>

        <div slot="content">
          <hr style="border:0;border-top:1px solid var(--border-default,#e5e7eb);margin:12px 0;" />

          <div style="display:flex;gap:16px;">
            <div style="flex:1;background:var(--color-surface,#f4f5f7);border-radius:6px;padding:8px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--background-primary,#0058ab);">12</div>
              <div style="margin-top:1px;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--content-subtle,#696e75);">
                Proyectos
              </div>
            </div>

            <div style="flex:1;background:var(--color-surface,#f4f5f7);border-radius:6px;padding:8px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--background-primary,#0058ab);">98%</div>
              <div style="margin-top:1px;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--content-subtle,#696e75);">
                Satisf.
              </div>
            </div>

            <div style="flex:1;background:var(--color-surface,#f4f5f7);border-radius:6px;padding:8px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--background-primary,#0058ab);">7</div>
              <div style="margin-top:1px;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--content-subtle,#696e75);">
                Certif.
              </div>
            </div>
          </div>
        </div>

      </dcx-web-card>
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
  render: (args) => html`
    <dcx-web-card
      .size=${args.size}
      .image=${args.image}
      imageAlt=${args.imageAlt}
      ?bordered=${args.bordered}
      borderStyle=${args.borderStyle}
      .borderWidth=${args.borderWidth}
      .shadow=${args.shadow}
      .interactive=${args.interactive}
      ?disabled=${args.disabled}
      layout=${args.layout}
      align=${args.align}
      maxContentWidth=${args.maxContentWidth}
      maxImageWidth=${args.maxImageWidth}
      ?accent=${true}
    >
      <div slot="header" style="display:flex;align-items:center;gap:0.75rem;justify-content:space-between;align-items:flex-start;">
        <div style="font-size:15px;font-weight:600;color:var(--content-default,#2a2e33);">Cloud Migration</div>
        <span style="display:inline-flex;align-items:center;height:1.5rem;padding:0 8px;border-radius:999px;font-size:12px;font-weight:500;background:#00a76f;color:#fff;white-space:nowrap;">Activo</span>
      </div>
      <div slot="content">
        <p style="margin:0 0 1rem;font-size:15px;color:#9ca3af;">
          Descripción del proyecto de migración a la nube.
        </p>
        <div style="margin:0.75rem 0 0.25rem;display:flex;justify-content:space-between;font-size:12px;color:var(--content-subtle,#696e75);width:100%;">
          <span>Progreso</span>
          <span style="color:var(--background-primary,#0058ab);font-weight:600;">82%</span>
        </div>
        <input style="width:100%;height:4px;margin-bottom:0.25rem;accent-color:var(--background-primary,#0058ab);"
          min="0"
          max="100"
          value="82"
          type="range"
          step="1"
          aria-invalid="false"
        />
        </div>
      <div slot="footer">
        <div style="display:flex;gap:0.5rem;margin-top:1rem;">
        <button style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:4px;font-family:inherit;font-size:12px;border:none;cursor:pointer;background:#0058ab;color:#fff;">
            Ver detalle
          </button>
        </div>
      </div>
    </dcx-web-card>
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

export const KpiCard: Story = {
  render: (args) => html`
    <dcx-web-card
      .size=${args.size}
      .image=${args.image}
      imageAlt=${args.imageAlt}
      ?bordered=${args.bordered}
      borderStyle=${args.borderStyle}
      .borderWidth=${args.borderWidth}
      .shadow=${args.shadow}
      .interactive=${args.interactive}
      ?disabled=${args.disabled}
      layout=${args.layout}
      align=${args.align}
      maxContentWidth=${args.maxContentWidth}
      maxImageWidth=${args.maxImageWidth}
      ?accent=${true}
    >
      <div slot="header" style="display:flex;align-items:center;gap:0.75rem;">
        <div style="font-size:15px;font-weight:600;color:var(--content-default,#2a2e33);">Satisfacción cliente</div>
      </div>
      <div slot="content">
        <div style="margin:0.5rem 0 0.25rem;font-size:36px;line-height:1;font-weight:700;color:var(--content-default,#2a2e33);">98%</div>
        <div style="margin:0 0 0.25rem;font-size:12px;font-weight:600;color:#16a34a;">↑ +1.2% este mes</div>
        <div style="margin:0;font-size:12px;color:var(--content-subtle,#696e75);">Media de 24 proyectos activos</div>
      </div>
    </dcx-web-card>
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

export const LabelCard: Story = {
  render: (args) => html`
    <dcx-web-card
      .size=${args.size}
      .image=${null}
      imageAlt=${args.imageAlt}
      ?bordered=${args.bordered}
      borderStyle=${args.borderStyle}
      .borderWidth=${args.borderWidth}
      .shadow=${args.shadow}
      .interactive=${args.interactive}
      ?disabled=${args.disabled}
      layout=${args.layout}
      align=${args.align}
      maxContentWidth=${args.maxContentWidth}
      maxImageWidth=${args.maxImageWidth}
    >
      <div slot="header">
         <div style="font-size:15px;font-weight:600;color:var(--content-default,#2a2e33);">SAP S/4HANA · Airbus</div>
        <div style="font-size:13px;color:var(--content-subtle,#696e75);margin-top:0.25rem;">
          Implementación de módulos FI/CO y MM en Airbus, incluyendo migración de datos históricos.
        </div>
      </div>
      <div slot="content">
        <div style="display:flex;gap:0.5rem;">
        <span style="display:inline-flex;align-items:center;height:2rem;padding:0 12px;border-radius:999px;border:1px solid transparent;font-size:14px;font-weight:500;white-space:nowrap;background:#0058ab;color:#fff;">SAP</span>
          <span style="display:inline-flex;align-items:center;height:2rem;padding:0 12px;border-radius:999px;font-size:14px;font-weight:500;white-space:nowrap;background:#fff;color:#2a2e33;border:1px solid #2a2e33;">Finanzas</span>
          <span style="display:inline-flex;align-items:center;height:2rem;padding:0 12px;border-radius:999px;border:1px solid transparent;font-size:14px;font-weight:500;white-space:nowrap;background:#ff9100;color:#2a2e33;">En revisión</span>
        </div>
      </div>
      <div slot="footer">
        <div style="display:flex;gap:0.5rem;">
        <button style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:4px;font-family:inherit;font-size:12px;border:none;cursor:pointer;background:#0058ab;color:#fff;">Abrir</button>
          <button style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:4px;font-family:inherit;font-size:12px;cursor:pointer;background:#fff;color:#2a2e33;border:1px solid #d1d5db;">Archivar</button>
        </div>
      </div>
    </dcx-web-card>
  `,
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
  render: (args) => html`
    <dcx-web-card
      layout=${args.layout}
      align=${args.align}
      .size=${args.size}
      .image=${args.image}
      imageAlt=${args.imageAlt}
      maxContentWidth=${args.maxContentWidth}
      maxImageWidth=${args.maxImageWidth}
      ?bordered=${args.bordered}
      borderStyle=${args.borderStyle}
      .borderWidth=${args.borderWidth}
      .shadow=${args.shadow}
      .interactive=${args.interactive}
      ?disabled=${args.disabled}
    >
      <div slot="header" style="display:flex;flex-direction:column;gap:0.5rem;">
        <h3 style="margin:0;font-size:18px;font-weight:600;color:var(--content-default,#2a2e33);">Encabezado personalizado</h3>
        <p style="margin:0;font-size:14px;color:var(--content-subtle,#696e75);">Este header sobrescribe el título/subtítulo por defecto</p>
      </div>
      <div slot="content">
        <p style="margin:0;font-size:14px;color:var(--content-default,#2a2e33);">Contenido principal de la card. Aquí puedes insertar cualquier HTML, componentes, etc.</p>
      </div>
      <div slot="footer" style="display:flex;gap:0.5rem;">
        <button style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:6px;border:1px solid #d1d5db;background:#fff;color:#2a2e33;font-size:12px;font-weight:600;cursor:pointer;">Cancelar</button>
        <button style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:6px;border:none;background:var(--background-primary,#0058ab);color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Aceptar</button>
      </div>
    </dcx-web-card>
  `,
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
    <div style="display:flex;gap:16px;align-items:stretch;">
      <dcx-web-card
        title="Sin acento"
        subtitle="accent = false"
        .image=${null}
        size="m"
        layout="vertical"
        align="start"
        maxContentWidth="280px"
        .shadow=${1}
        ?accent=${false}
        .interactive=${false}
      ></dcx-web-card>
      <dcx-web-card
        title="Con acento"
        subtitle="accent = true"
        .image=${null}
        size="m"
        layout="vertical"
        align="start"
        maxContentWidth="280px"
        .shadow=${1}
        ?accent=${true}
        .interactive=${false}
      ></dcx-web-card>
    </div>
  `,
};

export const BorderStyles: Story = {
  name: 'Estilos de borde',
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <dcx-web-card title="solid"  subtitle="borderStyle" .image=${null} size="s" ?bordered=${true} borderStyle="solid"  .borderWidth=${2} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
      <dcx-web-card title="dashed" subtitle="borderStyle" .image=${null} size="s" ?bordered=${true} borderStyle="dashed" .borderWidth=${2} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
      <dcx-web-card title="dotted" subtitle="borderStyle" .image=${null} size="s" ?bordered=${true} borderStyle="dotted" .borderWidth=${2} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
      <dcx-web-card title="double" subtitle="borderStyle" .image=${null} size="s" ?bordered=${true} borderStyle="double" .borderWidth=${4} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
      <dcx-web-card title="none"   subtitle="borderStyle" .image=${null} size="s" ?bordered=${true} borderStyle="none"               maxContentWidth="160px" .interactive=${false}></dcx-web-card>
    </div>
  `,
};

export const ShadowVariants: Story = {
  name: 'Sombras',
  render: () => html`
    <div style="display:flex;gap:20px;flex-wrap:wrap;padding:20px;background:var(--bg-surface,#f4f5f7);">
      <dcx-web-card title="shadow 0" subtitle="sin sombra"    .image=${null} size="s" .shadow=${0} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
      <dcx-web-card title="shadow 1" subtitle="sombra suave"  .image=${null} size="s" .shadow=${1} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
      <dcx-web-card title="shadow 2" subtitle="sombra media"  .image=${null} size="s" .shadow=${2} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
      <dcx-web-card title="shadow 3" subtitle="sombra fuerte" .image=${null} size="s" .shadow=${3} maxContentWidth="160px" .interactive=${false}></dcx-web-card>
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

export const WithSlotsHorizontal: Story = {  render: (args) => html`
    <dcx-web-card
      layout=${args.layout}
      align=${args.align}
      .size=${args.size}
      .image=${args.image}
      imageAlt=${args.imageAlt}
      maxContentWidth=${args.maxContentWidth}
      maxImageWidth=${args.maxImageWidth}
      .shadow=${args.shadow}
      .interactive=${args.interactive}
      ?disabled=${args.disabled}
    >
    <div slot="header">
    <h3 style="margin:0 0 0.5rem;font-size:18px;font-weight:600;">Encabezado personalizado</h3>
        <p style="margin:0;font-size:14px;color:var(--content-subtle,#696e75);">Este header sobrescribe el título/subtítulo por defecto</p>
      </div>
      <div slot="content">
      <p>Contenido principal de la card. Aquí puedes insertar cualquier HTML, componentes, etc.</p>
      </div>
      <div slot="footer">
        <div style="display:flex;gap:0.5rem;">
        <button style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:4px;font-family:inherit;font-size:12px;cursor:pointer;background:#fff;color:#2a2e33;border:1px solid #d1d5db;margin-right:0.5rem;">Cancelar</button>
          <button style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:4px;font-family:inherit;font-size:12px;border:none;cursor:pointer;background:#0058ab;color:#fff;">Aceptar</button>
        </div>
      </div>
    </dcx-web-card>
    `,
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
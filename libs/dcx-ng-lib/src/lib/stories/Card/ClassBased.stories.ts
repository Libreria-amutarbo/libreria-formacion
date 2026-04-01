import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import {
  ALIGN_DEFAULT,
  ALIGN_LIST,
  DcxNgButtonComponent,
  DcxNgCardComponent,
  LAYOUT_DEFAULT,
  LAYOUT_LIST,
  SIZE_DEFAULT,
  SIZE_LIST,
  BORDER_STYLE_DEFAULT,
  BORDER_STYLE_LIST,
  DEFAULTARGS,
  SHADOW_LIST,
  DcxNgSliderComponent,
  DcxNgChipComponent,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgCardComponent> = {
  title: 'DCXLibrary/Components/Card',
  component: DcxNgCardComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgButtonComponent, DcxNgSliderComponent, DcxNgChipComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    align: {
      description: 'Alineación del bloque y del contenido.',
      options: ALIGN_LIST,
      control: { type: 'select' },
      table: {
        category: 'Attributes',
        defaultValue: { summary: ALIGN_DEFAULT },
      },
    },
    bordered: {
      description: 'Activa borde explícito.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    borderStyle: {
      description: 'Tipo de línea del borde de la carta.',
      options: BORDER_STYLE_LIST,
      control: { type: 'select' },
      table: {
        category: 'Attributes',
        defaultValue: { summary: BORDER_STYLE_DEFAULT },
      },
    },
    borderWidth: {
      description: 'Grosor del borde (px). Máx 16px',
      control: { type: 'number', min: 0, max: 16, step: 1 },
      table: {
        category: 'Attributes',
      },
    },
    accent: {
      description: 'Aplica color de acento al borde.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    disabled: {
      description: 'Deshabilita la carta',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    image: {
      description: 'URL de la imagen.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    imageAlt: {
      description: 'Texto alternativo para la imagen.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    interactive: {
      description: 'Convierte la carta en interactivo (hover/cursor).',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    layout: {
      description: 'Orientación del contenido.',
      options: LAYOUT_LIST,
      control: { type: 'select' },
      table: {
        category: 'Attributes',
        defaultValue: { summary: LAYOUT_DEFAULT },
      },
    },
    maxContentWidth: {
      description: 'Ancho máx. del bloque (en cualquier layout).',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    maxImageWidth: {
      description: 'Ancho máx. de imagen.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    shadow: {
      description: 'Sombra: preset 0/1/2/3.',
      options: SHADOW_LIST,
      control: { type: 'select' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      description: 'Tamaño (padding + tipografía).',
      options: SIZE_LIST,
      control: { type: 'select' },
      table: {
        category: 'Attributes',
        defaultValue: { summary: SIZE_DEFAULT },
      },
    },
    subtitle: {
      description: 'Subtítulo o descripción corta de la carta.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    title: {
      description: 'Título principal de la carta.',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
  },

  args: DEFAULTARGS,
};

export default meta;
type Story = StoryObj<DcxNgCardComponent>;

export const Default: Story = {};

export const ProfileCard: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="max-width:640px; margin:auto; padding:2.5rem; background:var(--color-surface,#f4f5f7);">
        <ng-template #headerTpl>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:40px;height:40px;border-radius:999px;background:#dbeafe;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:var(--background-primary,#0058ab);flex-shrink:0;">MG</div>
            <div>
              <div style="font-size:15px;font-weight:600;color:var(--content-default,#2a2e33);">María García</div>
              <div style="margin-top:1px;font-size:12px;color:var(--content-subtle,#696e75);">Cloud Architect · Madrid</div>
            </div>
          </div>
        </ng-template>
        <ng-template #contentTpl>
          <hr style="border:0;border-top:1px solid var(--border-default,#e5e7eb);margin:12px 0;" />
          <div style="display:flex;gap:16px;">
            <div style="flex:1;background:var(--color-surface,#f4f5f7);border-radius:6px;padding:8px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--background-primary,#0058ab);">12</div>
              <div style="margin-top:1px;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--content-subtle,#696e75);">Proyectos</div>
            </div>
            <div style="flex:1;background:var(--color-surface,#f4f5f7);border-radius:6px;padding:8px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--background-primary,#0058ab);">98%</div>
              <div style="margin-top:1px;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--content-subtle,#696e75);">Satisf.</div>
            </div>
            <div style="flex:1;background:var(--color-surface,#f4f5f7);border-radius:6px;padding:8px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--background-primary,#0058ab);">7</div>
              <div style="margin-top:1px;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--content-subtle,#696e75);">Certif.</div>
            </div>
          </div>
        </ng-template>
        <dcx-ng-card
          [size]="size"
          [image]="image"
          [imageAlt]="imageAlt"
          [bordered]="bordered"
          [borderStyle]="borderStyle"
          [borderWidth]="borderWidth"
          [shadow]="shadow"
          [interactive]="interactive"
          [disabled]="disabled"
          [layout]="layout"
          [align]="align"
          [maxContentWidth]="maxContentWidth"
          [maxImageWidth]="maxImageWidth"
          [header]="headerTpl"
          [content]="contentTpl"
          [accent]="true"
        ></dcx-ng-card>
      </div>
    `,
  }),
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
  render: args => ({
    props: { ...args },
    template: `
      <ng-template #headerProjectTpl>
        <div style="display:flex;align-items:center;gap:0.75rem;justify-content:space-between;align-items:flex-start;">
          <div style="font-size:15px;font-weight:600;color:var(--content-default,#2a2e33);">Cloud Migration</div>
          <dcx-ng-chip label="Activo" size="s" color="success"></dcx-ng-chip>
        </div>
      </ng-template>

      <ng-template #contentProjectTpl>
        <p style="margin:0 0 1rem;font-size:15px;color:#9ca3af;">
          Descripción del proyecto de migración a la nube.
        </p>
        <div style="margin:0.75rem 0 0.25rem;display:flex;justify-content:space-between;font-size:12px;color:var(--content-subtle,#696e75);width:100%;">
          <span>Progreso</span>
          <span style="color:var(--background-primary,#0058ab);font-weight:600;">82%</span>
        </div>
        <dcx-ng-slider
          style="margin-bottom:0.25rem;width:100%;"
          [showLabel]="false"
          [value]="82"
          [min]="0"
          [max]="100"
        ></dcx-ng-slider>
      </ng-template>

      <ng-template #footerProjectTpl>
        <div style="display:flex;gap:0.5rem;margin-top:1rem;">
          <dcx-ng-button
            label="Ver detalle"
            variant="primary"
            size="s"
          ></dcx-ng-button>
        </div>
      </ng-template>

      <dcx-ng-card
        [size]="size"
        [image]="image"
        [imageAlt]="imageAlt"
        [bordered]="bordered"
        [borderStyle]="borderStyle"
        [borderWidth]="borderWidth"
        [shadow]="shadow"
        [interactive]="interactive"
        [disabled]="disabled"
        [layout]="layout"
        [align]="align"
        [maxContentWidth]="maxContentWidth"
        [maxImageWidth]="maxImageWidth"
        [header]="headerProjectTpl"
        [content]="contentProjectTpl"
        [footer]="footerProjectTpl"
        [accent]="true"
      ></dcx-ng-card>
    `,
  }),
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
  render: args => ({
    props: { ...args },
    template: `
      <ng-template #headerKpiTpl>
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <div style="font-size:15px;font-weight:600;color:var(--content-default,#2a2e33);">Satisfacción cliente</div>
        </div>
      </ng-template>

      <ng-template #contentKpiTpl>
        <div style="margin:0.5rem 0 0.25rem;font-size:36px;line-height:1;font-weight:700;color:var(--content-default,#2a2e33);">98%</div>
        <div style="margin:0 0 0.25rem;font-size:12px;font-weight:600;color:#16a34a;">↑ +1.2% este mes</div>
        <div style="margin:0;font-size:12px;color:var(--content-subtle,#696e75);">Media de 24 proyectos activos</div>
      </ng-template>

      <dcx-ng-card
        [size]="size"
        [image]="image"
        [imageAlt]="imageAlt"
        [bordered]="bordered"
        [borderStyle]="borderStyle"
        [borderWidth]="borderWidth"
        [shadow]="shadow"
        [interactive]="interactive"
        [disabled]="disabled"
        [layout]="layout"
        [align]="align"
        [maxContentWidth]="maxContentWidth"
        [maxImageWidth]="maxImageWidth"
        [header]="headerKpiTpl"
        [content]="contentKpiTpl"
        [accent]="true"
      ></dcx-ng-card>
    `,
  }),
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
  render: args => ({
    props: { ...args },
    template: `
       <ng-template #headerTags1Tpl>
    <div class="title">SAP S/4HANA · Airbus</div>
    <div class="subtitle">
      Implementación de módulos FI/CO y MM en Airbus, incluyendo migración de
      datos históricos.
    </div>
  </ng-template>

  <ng-template #contentTags1Tpl>
    <div style="display:flex;gap:0.5rem;">
      <dcx-ng-chip label="SAP" size="s" color="primary"></dcx-ng-chip>
      <dcx-ng-chip label="Finanzas" size="s" color="secondary"></dcx-ng-chip>
      <dcx-ng-chip label="En revisión" size="s" color="warning"></dcx-ng-chip>
    </div>
  </ng-template>

  <ng-template #footerTags1Tpl>
    <div style="display:flex;gap:0.5rem;">
      <dcx-ng-button label="Abrir" variant="primary" size="s"></dcx-ng-button>
      <dcx-ng-button
        label="Archivar"
        variant="secondary"
        size="s"
      ></dcx-ng-button>
    </div>
  </ng-template>

      <dcx-ng-card
        [size]="size"
        [image]="null"
        [imageAlt]="imageAlt"
        [bordered]="bordered"
        [borderStyle]="borderStyle"
        [borderWidth]="borderWidth"
        [shadow]="shadow"
        [interactive]="interactive"
        [disabled]="disabled"
        [layout]="layout"
        [align]="align"
        [maxContentWidth]="maxContentWidth"
        [maxImageWidth]="maxImageWidth"
        [header]="headerTags1Tpl"
        [content]="contentTags1Tpl"
        [footer]="footerTags1Tpl"
      ></dcx-ng-card>
    `,
  }),
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
  render: args => ({
    props: { ...args },
    template: `
      <!-- Definimos los templates "slots" -->
      <ng-template #headerTpl>
        <div class="custom-header">
          <h3 class="title">Encabezado personalizado</h3>
          <p class="subtitle">Este header sobrescribe el título/subtítulo por defecto</p>
        </div>
      </ng-template>

      <ng-template #contentTpl>
        <div class="custom-content">
          <p>Contenido principal de la card. Aquí puedes insertar cualquier HTML, componentes, etc.</p>
          
        </div>
      </ng-template>

      <ng-template #footerTpl>
        <div class="custom-footer">
          <dcx-ng-button type="button"  label="Cancelar" variant="secondary" size="s" style="margin-right:0.5rem"></dcx-ng-button>
          <dcx-ng-button type="button" aria-label="Acción secundaria"  label="Aceptar" size="s"></dcx-ng-button>
        </div>
      </ng-template>

      <!-- Pasamos los TemplateRef a los inputs de la card -->
      <dcx-ng-card
        [layout]="layout"
        [align]="align"
        [size]="size"
        [image]="image"
        [imageAlt]="imageAlt"
        [bordered]="bordered"
        [borderStyle]="borderStyle"
        [borderWidth]="borderWidth"
        [shadow]="shadow"
        [interactive]="interactive"
        [disabled]="disabled"
        [maxContentWidth]="maxContentWidth"
        [maxImageWidth]="maxImageWidth"
        [header]="headerTpl"
        [content]="contentTpl"
        [footer]="footerTpl"
      ></dcx-ng-card>
    `,
  }),
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

export const WithSlotsHorizontal: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <ng-template #headerTpl>
          <h3 class="title">Encabezado personalizado</h3>
          <p class="subtitle">Este header sobrescribe el título/subtítulo por defecto</p>
      </ng-template>

      <ng-template #contentTpl>
        <div class="custom-content">
          <p>Contenido principal de la card. Aquí puedes insertar cualquier HTML, componentes, etc.</p>
          
        </div>
      </ng-template>

      <ng-template #footerTpl>
        <div class="custom-footer">
        
          <dcx-ng-button type="button"  label="Cancelar" variant="secondary" size="s"  style="margin-right:0.5rem"></dcx-ng-button>
          <dcx-ng-button type="button" aria-label="Acción secundaria" label="Aceptar" size="s" ></dcx-ng-button>
        </div>
      </ng-template>


      <dcx-ng-card
        [layout]="layout"
        [align]="align"
        [size]="size"
        [image]="image"
        [imageAlt]="imageAlt"
        [maxContentWidth]="maxContentWidth"
        [maxImageWidth]="maxImageWidth"
        [shadow]="shadow"
        [interactive]="interactive"
        [disabled]="disabled"
        [header]="headerTpl"
        [content]="contentTpl"
        [footer]="footerTpl"
      ></dcx-ng-card>
    `,
  }),
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

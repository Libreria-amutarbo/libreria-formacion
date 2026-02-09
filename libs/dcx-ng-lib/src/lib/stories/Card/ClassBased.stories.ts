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
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgCardComponent> = {
  title: 'DCXLibrary/Card/Class based',
  component: DcxNgCardComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgButtonComponent],
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

export const VerticalCenterImg50: Story = {
  args: {
    layout: 'vertical',
    align: 'center',
    maxContentWidth: '560px',
    maxImageWidth: '50%',
  },
};

export const HorizontalCenterMax800: Story = {
  args: {
    layout: 'horizontal',
    align: 'center',
    maxContentWidth: '800px',
    image: 'https://picsum.photos/360/240',
  },
};

export const HorizontalEnd: Story = {
  args: {
    layout: 'horizontal',
    align: 'end',
    maxContentWidth: '960px',
    image: 'https://picsum.photos/360/240',
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

import type { Meta, StoryObj } from '@storybook/angular';

import {
  ALIGN_DEFAULT,
  ALIGN_LIST,
  DcxNgCardComponent,
  LAYOUT_DEFAULT,
  LAYOUT_LIST,
  SIZE_DEFAULT,
  SIZE_LIST,
} from '@dcx-ng-components/dcx-ng-lib';
import {
  BORDER_STYLE_DEFAULT,
  BORDER_STYLE_LIST,
  DEFAULTARGS,
  SHADOW_LIST,
} from '../../core/mock/card';

const meta: Meta<DcxNgCardComponent> = {
  title: 'DCXLibrary/Card/Class based',
  component: DcxNgCardComponent,
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
    maxImageWidth: '50%', // imagen al 50% y centrada
  },
};

export const HorizontalCenterMax800: Story = {
  args: {
    layout: 'horizontal',
    align: 'center',
    maxContentWidth: '800px', // bloque centrado y limitado también en horizontal
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

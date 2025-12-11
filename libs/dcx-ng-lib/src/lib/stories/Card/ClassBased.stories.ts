import type { Meta, StoryObj } from '@storybook/angular';

import { DcxNgCardComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DEFAULTARGS, TITLE, VARIANT, VARIANTLIST } from '../../core/mock/card';

const meta: Meta<DcxNgCardComponent> = {
  title: 'DCXLibrary/Card/Class based',
  component: DcxNgCardComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal del card.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },
    subtitle: {
      description: 'Subtítulo o descripción corta.',
      control: { type: 'text' },
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

    variant: {
      description: 'Variante visual.',
      control: 'select',
      options: VARIANTLIST,
      table: {
        category: 'Atributos',
        defaultValue: { summary: VARIANT },
      },
    },
    layout: {
      description: 'Orientación del contenido.',
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Atributos',
      },
    },
    align: {
      description: 'Alineación del bloque y del contenido.',
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Atributos',
      },
    },
    size: {
      description: 'Tamaño (padding + tipografía).',
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Atributos',
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
      description: 'Ancho máx. de imagen (vertical).',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },

    bordered: {
      description: 'Activa borde explícito.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    borderWidth: {
      description: 'Grosor del borde (px).',
      control: { type: 'number', min: 0, max: 16, step: 1 },
      table: {
        category: 'Atributos',
      },
    },
    borderStyle: {
      description: 'Tipo de línea del borde.',
      options: ['solid', 'dashed', 'dotted', 'double', 'none'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Atributos',
      },
    },
    borderColor: {
      description: 'Color del borde.',
      control: { type: 'color' },
      table: {
        category: 'Atributos',
      },
    },

    shadow: {
      description: 'Sombra: preset 0/1/2/3 o "custom".',
      options: [0, 1, 2, 3, 'custom'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Atributos',
      },
    },
    shadowValue: {
      description: 'Valor literal de box-shadow si `shadow="custom"`.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
      },
    },

    interactive: {
      description: 'Convierte el card en interactivo (hover/cursor).',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    disabled: {
      description: 'Deshabilita interacciones/estilos.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
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

export const SubtleCustomShadow: Story = {
  args: {
    variant: 'subtle',
    bordered: true,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'hsl(210deg 20% 80%)',
    shadow: 'custom',
    shadowValue: '0 12px 24px -8px rgba(0,0,0,.25)',
    size: 'lg',
    layout: 'vertical',
    align: 'center',
    image: 'https://picsum.photos/800/500',
    maxContentWidth: '560px',
    maxImageWidth: '100%',
  },
};

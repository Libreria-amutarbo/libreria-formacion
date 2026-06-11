import { ArgTypes } from '@storybook/angular';
import { tokens } from '@dcx-ng-components/dcx-ng-lib';

export const argTypesDivider: ArgTypes = {
  orientation: {
    control: 'select',
    options: ['horizontal', 'vertical'],
    description: 'Dirección del divisor.',
    table: {
      category: 'Atributos',
      type: { summary: 'horizontal | vertical' },
      defaultValue: { summary: 'horizontal' },
    },
  },
  size: {
    control: 'select',
    options: ['s', 'm', 'l', 'xl', 'auto'],
    description: 'Longitud del divisor. `auto` rellena el contenedor padre.',
    table: {
      category: 'Atributos',
      type: { summary: 's | m | l | xl | auto' },
      defaultValue: { summary: 'auto' },
    },
  },
  color: {
    control: 'color',
    description: 'Color de la línea. Acepta cualquier valor CSS válido.',
    table: {
      category: 'Atributos',
      type: { summary: 'string' },
      defaultValue: { summary: tokens.background.primary },
    },
  },
  thickness: {
    control: { type: 'number', min: 0, max: 20, step: 0.2 },
    description: 'Grosor de la línea en unidades `rem`.',
    table: {
      category: 'Atributos',
      type: { summary: 'number' },
      defaultValue: { summary: '0.25' },
    },
  },
  type: {
    control: 'select',
    options: ['default', 'dot', 'dash'],
    description: 'Estilo visual de la línea: sólida, punteada o discontinua.',
    table: {
      category: 'Atributos',
      type: { summary: 'default | dot | dash' },
      defaultValue: { summary: 'default' },
    },
  },
  label: {
    control: 'text',
    description: 'Texto visible centrado entre dos líneas. Cuando se establece, el divisor cambia a la variante con etiqueta.',
    table: {
      category: 'Atributos',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  ariaLabel: {
    control: 'text',
    description: 'Etiqueta accesible para lectores de pantalla. Si está vacío y no hay `label`, el divisor se oculta a los lectores de pantalla (`aria-hidden="true"`).',
    table: {
      category: 'Accesibilidad',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
};

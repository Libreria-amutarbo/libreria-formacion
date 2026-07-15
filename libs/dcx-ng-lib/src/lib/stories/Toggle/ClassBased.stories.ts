import { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgToggleComponent,
  POSITION_LIST,
  SIZE_LIST,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgToggleComponent> = {
  title: 'DCXLibrary/Components/Toggle',
  component: DcxNgToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      name: 'checked',
      description: 'Estado actual del toggle (encendido/apagado).',
      control: 'boolean',
      table: { category: 'Atributos', type: { summary: 'boolean' } },
    },
    disabled: {
      name: 'disabled',
      description: 'Deshabilita el toggle (atributo nativo).',
      control: 'boolean',
      table: { category: 'Atributos', type: { summary: 'boolean' } },
    },
    label: {
      name: 'label',
      description: 'Texto de la etiqueta mostrada junto al toggle.',
      control: 'text',
      table: { category: 'Atributos', type: { summary: 'string | null' } },
    },
    size: {
      name: 'size',
      description: 'Tamaño del toggle.',
      control: 'select',
      options: SIZE_LIST,
      table: {
        category: 'Atributos',
        type: { summary: "'s' | 'm' | 'l' | 'xl' | 'auto'" },
        defaultValue: { summary: 'm' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      description:
        'Nombre accesible explícito. Si no se indica, se usa label como alternativa, y "Toggle" como último recurso.',
      control: 'text',
      table: { category: 'Atributos', type: { summary: 'string | null' } },
    },
    textPosition: {
      name: 'textPosition',
      description: 'Posición del label respecto al control.',
      control: 'select',
      options: POSITION_LIST,
      table: {
        category: 'Atributos',
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
        defaultValue: { summary: 'right' },
      },
    },
    toggled: {
      name: 'toggled',
      action: 'toggled',
      description: 'Se emite con el nuevo valor cada vez que cambia el estado.',
      table: {
        category: 'Eventos',
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgToggleComponent>;

export const DefaultToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Activar función',
    size: 'm',
    ariaLabel: 'Activar función',
    textPosition: 'right',
  },
};

export const CheckedByDefault: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Activo por defecto',
    size: 'm',
    ariaLabel: 'Toggle activo',
    textPosition: 'right',
  },
};

export const DisabledToggle: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'No se puede interactuar',
    size: 'm',
    ariaLabel: 'Toggle deshabilitado',
    textPosition: 'right',
  },
};

export const AriaOnlyToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: null,
    size: 'm',
    ariaLabel: 'Toggle sin label visible',
    textPosition: 'right',
  },
};

export const SmallToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Toggle pequeño',
    size: 's',
    ariaLabel: 'Toggle pequeño',
    textPosition: 'right',
  },
};

export const MediumToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Toggle mediano',
    size: 'm',
    ariaLabel: 'Toggle mediano',
    textPosition: 'right',
  },
};

export const LargeToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Toggle grande',
    size: 'l',
    ariaLabel: 'Toggle grande',
    textPosition: 'right',
  },
};

export const ExtraLargeToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Toggle extra grande',
    size: 'xl',
    ariaLabel: 'Toggle extra grande',
    textPosition: 'right',
  },
};

export const RightLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Label a la derecha',
    size: 'm',
    ariaLabel: 'Label a la derecha',
    textPosition: 'right',
  },
};

export const LeftLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Label a la izquierda',
    size: 'm',
    ariaLabel: 'Label a la izquierda',
    textPosition: 'left',
  },
};

export const TopLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Label arriba',
    size: 'm',
    ariaLabel: 'Label arriba',
    textPosition: 'top',
  },
};

export const BottomLabelToggle: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Label abajo',
    size: 'm',
    ariaLabel: 'Label abajo',
    textPosition: 'bottom',
  },
};

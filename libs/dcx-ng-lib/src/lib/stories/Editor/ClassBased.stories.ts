import {
  DcxNgEditorComponent,
  EDITOR_DEFAULT_ARIA_DESCRIBEDBY,
  EDITOR_DEFAULT_ARIA_LABEL,
  EDITOR_DEFAULT_DISABLED,
  EDITOR_DEFAULT_ERROR_MESSAGE,
  EDITOR_DEFAULT_INVALID,
  EDITOR_DEFAULT_LABEL,
  EDITOR_DEFAULT_MIN_HEIGHT,
  EDITOR_DEFAULT_PLACEHOLDER,
  EDITOR_DEFAULT_READONLY,
  EDITOR_DEFAULT_REQUIRED,
  EDITOR_DEFAULT_TOOLBAR_ACTIONS,
  EDITOR_DEFAULT_VALUE,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgEditorComponent> = {
  title: 'DCXLibrary/Components/Editor',
  component: DcxNgEditorComponent,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Id del editor',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    value: {
      description: 'Contenido HTML del editor',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    label: {
      description: 'Etiqueta del editor',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    placeholder: {
      description: 'Placeholder del editor',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    disabled: {
      description: 'Deshabilita el editor',
      control: { type: 'boolean' },
      table: { category: 'Attributes' },
    },
    readonly: {
      description: 'Activa el modo solo lectura',
      control: { type: 'boolean' },
      table: { category: 'Attributes' },
    },
    required: {
      description: 'Marca el editor como requerido',
      control: { type: 'boolean' },
      table: { category: 'Attributes' },
    },
    isInvalid: {
      description: 'Muestra el estado de error',
      control: { type: 'boolean' },
      table: { category: 'Attributes' },
    },
    errorMessage: {
      description: 'Mensaje de error',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    ariaLabel: {
      control: { type: 'text' },
      table: { category: 'Accessibility' },
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      table: { category: 'Accessibility' },
    },
    minHeight: {
      description: 'Altura minima del area editable',
      control: { type: 'text' },
      table: { category: 'Styles' },
    },
    toolbarActions: {
      description: 'Acciones visibles en la barra de herramientas',
      control: { type: 'object' },
      table: { category: 'Attributes' },
    },
    valueChange: {
      action: 'value changed',
      description: 'Se emite cuando cambia el contenido del editor.',
      table: {
        category: 'Events',
        type: { summary: '(value: string) => void' },
      },
    },
    blurEvent: {
      action: 'blur',
      description: 'Se emite cuando el editor pierde el foco.',
      table: { category: 'Events' },
    },
    focusEvent: {
      action: 'focus',
      description: 'Se emite cuando el editor recibe el foco.',
      table: { category: 'Events' },
    },
  },
  args: {
    value: EDITOR_DEFAULT_VALUE,
    label: EDITOR_DEFAULT_LABEL,
    placeholder: EDITOR_DEFAULT_PLACEHOLDER,
    disabled: EDITOR_DEFAULT_DISABLED,
    readonly: EDITOR_DEFAULT_READONLY,
    required: EDITOR_DEFAULT_REQUIRED,
    isInvalid: EDITOR_DEFAULT_INVALID,
    errorMessage: EDITOR_DEFAULT_ERROR_MESSAGE,
    ariaLabel: EDITOR_DEFAULT_ARIA_LABEL,
    ariaDescribedBy: EDITOR_DEFAULT_ARIA_DESCRIBEDBY,
    minHeight: EDITOR_DEFAULT_MIN_HEIGHT,
    toolbarActions: EDITOR_DEFAULT_TOOLBAR_ACTIONS,
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgEditorComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgEditorComponent>;

export const ClassBased: Story = {};

export const withPlaceholder: Story = {
  args: {
    label: 'Contenido',
    placeholder: 'Escribe el contenido...',
  },
};

export const withValue: Story = {
  args: {
    label: 'Descripción',
    value: '<p>Texto con <strong>formato</strong>.</p>',
  },
};

export const readOnly: Story = {
  args: {
    label: 'Resumen',
    readonly: true,
    value: '<p>Contenido en modo lectura.</p>',
  },
};

export const disabled: Story = {
  args: {
    label: 'Contenido',
    disabled: true,
    value: '<p>Editor deshabilitado.</p>',
  },
};

export const isInvalid: Story = {
  args: {
    label: 'Observaciones',
    required: true,
    isInvalid: true,
    errorMessage: 'El contenido es obligatorio',
  },
};

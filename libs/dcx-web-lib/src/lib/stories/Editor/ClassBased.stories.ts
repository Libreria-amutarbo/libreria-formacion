import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../../../index';
import type { DcxEditorToolbarAction } from '../../core/interfaces/editor';
import { EDITOR_DEFAULT_TOOLBAR_ACTIONS } from '../../core/defaults';

const TOOLBAR_ACTIONS: DcxEditorToolbarAction[] = [
  'bold',
  'italic',
  'underline',
  'orderedList',
  'unorderedList',
  'removeFormat',
];

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Editor',
  component: 'dcx-web-editor',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Contenido HTML del editor (saneado antes de renderizar).',
      table: { category: 'Atributos', type: { summary: 'string' } },
    },
    label: {
      control: 'text',
      description: 'Etiqueta visible del editor.',
      table: { category: 'Atributos', type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'Texto de ayuda que se muestra cuando el editor está vacío.',
      table: { category: 'Atributos', type: { summary: 'string' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible cuando no hay label.',
      table: { category: 'Atributos', type: { summary: 'string | null' } },
    },
    minHeight: {
      control: 'text',
      description: 'Altura mínima del área editable.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '160px' },
      },
    },
    toolbarActions: {
      control: 'check',
      options: TOOLBAR_ACTIONS,
      description: 'Acciones visibles en la barra de herramientas.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxEditorToolbarAction[]' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el editor y su barra de herramientas.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Modo solo lectura: se muestra el contenido pero no se edita.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marca el editor como obligatorio (muestra el asterisco).',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Estado de error del editor.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Mensaje de error mostrado cuando isInvalid es true.',
      table: { category: 'Atributos', type: { summary: 'string' } },
    },
    onValueChange: {
      action: 'valueChange',
      description: 'Se emite cuando cambia el contenido del editor.',
      table: { category: 'Eventos' },
    },
    onFocusEvent: {
      action: 'focusEvent',
      description: 'Se emite cuando el editor recibe el foco.',
      table: { category: 'Eventos' },
    },
    onBlurEvent: {
      action: 'blurEvent',
      description: 'Se emite cuando el editor pierde el foco.',
      table: { category: 'Eventos' },
    },
  },
  args: {
    value: '',
    label: 'Descripción',
    placeholder: 'Escribe aquí...',
    ariaLabel: '',
    minHeight: '160px',
    toolbarActions: EDITOR_DEFAULT_TOOLBAR_ACTIONS,
    disabled: false,
    readonly: false,
    required: false,
    isInvalid: false,
    errorMessage: '',
  },
  render: ({
    value,
    label,
    placeholder,
    ariaLabel,
    minHeight,
    toolbarActions,
    disabled,
    readonly,
    required,
    isInvalid,
    errorMessage,
    onValueChange,
    onFocusEvent,
    onBlurEvent,
  }) => html`
    <dcx-web-editor
      .value=${value}
      .label=${label}
      .placeholder=${placeholder}
      .ariaLabel=${ariaLabel}
      .minHeight=${minHeight}
      .toolbarActions=${toolbarActions}
      .disabled=${disabled}
      .readonly=${readonly}
      .required=${required}
      .isInvalid=${isInvalid}
      .errorMessage=${errorMessage}
      @valueChange=${onValueChange}
      @focusEvent=${onFocusEvent}
      @blurEvent=${onBlurEvent}
    ></dcx-web-editor>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    value:
      '<strong>Título</strong><br />Texto con <em>énfasis</em> y una lista:<ul><li>Uno</li><li>Dos</li></ul>',
  },
};

export const Required: Story = {
  args: { required: true },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'Este campo es obligatorio.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '<strong>Contenido no editable</strong>',
  },
};

export const ReadOnly: Story = {
  args: {
    readonly: true,
    value: '<strong>Solo lectura</strong><br />No se puede editar.',
  },
};

export const LimitedToolbar: Story = {
  name: 'Barra reducida',
  args: {
    toolbarActions: ['bold', 'italic', 'removeFormat'],
  },
};

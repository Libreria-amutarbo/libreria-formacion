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
      description: 'ID único del editor. Vincula el `<label>` con el área editable vía `for`/`aria-labelledby`.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'dcx-editor-<random>' },
      },
    },
    value: {
      description: 'Contenido HTML del editor. Soporta two-way binding con `[(value)]`.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    label: {
      description: 'Etiqueta visible sobre el editor.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    placeholder: {
      description: 'Texto de guía que se muestra cuando el editor está vacío.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    disabled: {
      description: 'Deshabilita el editor y todos los botones de la toolbar.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      description: 'Activa el modo solo lectura. La toolbar y la edición quedan desactivadas.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description: 'Marca el campo como obligatorio (`aria-required="true"`).',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isInvalid: {
      description: 'Activa el estado de error: borde rojo y muestra `errorMessage`.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      description: 'Mensaje de error visible bajo el editor cuando `isInvalid=true`.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    minHeight: {
      description: 'Altura mínima del área editable. Acepta cualquier valor CSS (`px`, `rem`, `vh`…).',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "'160px'" },
      },
    },
    toolbarActions: {
      description:
        'Subconjunto de acciones visibles en la barra de herramientas. ' +
        'Valores posibles: `bold`, `italic`, `underline`, `orderedList`, `unorderedList`, `removeFormat`.',
      control: { type: 'object' },
      table: {
        category: 'Atributos',
        type: { summary: 'DcxEditorToolbarAction[]' },
        defaultValue: { summary: 'todas (6)' },
      },
    },
    ariaLabel: {
      description:
        'Etiqueta accesible para lectores de pantalla. Usar cuando el editor no tiene `label` visible.',
      control: { type: 'text' },
      table: {
        category: 'Accesibilidad',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    ariaDescribedBy: {
      description:
        'ID de un elemento externo adicional que describe el editor. Se concatena con el id del mensaje de error si `isInvalid=true`.',
      control: { type: 'text' },
      table: {
        category: 'Accesibilidad',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    valueChange: {
      action: 'valueChange',
      description: 'Se emite en cada cambio de contenido del editor.',
      table: {
        category: 'Eventos',
        type: { summary: '(value: string) => void' },
      },
    },
    blurEvent: {
      action: 'blurEvent',
      description: 'Se emite cuando el editor pierde el foco.',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
      },
    },
    focusEvent: {
      action: 'focusEvent',
      description: 'Se emite cuando el editor recibe el foco.',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
      },
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
    docs: {
      description: {
        component:
          '`dcx-ng-editor` es un editor de texto enriquecido basado en `contenteditable` con barra de herramientas de formato. ' +
          'Soporta negrita, cursiva, subrayado, listas y limpiar formato. ' +
          'Implementa `ControlValueAccessor` para integración con Angular Forms. ' +
          'El contenido se sanitiza automáticamente contra XSS.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgEditorComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Usa el panel de controles para configurar interactivamente todos los atributos del editor.',
      },
    },
  },
};

export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Placeholder visible cuando el editor está vacío.',
      },
    },
  },
  args: {
    label: 'Contenido',
    placeholder: 'Escribe el contenido...',
  },
};

export const WithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Editor con contenido HTML inicial que incluye formato enriquecido.',
      },
    },
  },
  args: {
    label: 'Descripción',
    value: '<p>Texto con <strong>negrita</strong>, <em>cursiva</em> y <u>subrayado</u>.</p>',
  },
};

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'La toolbar y el área editable quedan desactivadas. El contenido es visible pero no editable.',
      },
    },
  },
  args: {
    label: 'Resumen',
    readonly: true,
    value: '<p>Contenido en modo lectura.</p>',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'El editor y todos los botones de la toolbar quedan deshabilitados con opacidad reducida.',
      },
    },
  },
  args: {
    label: 'Contenido',
    disabled: true,
    value: '<p>Editor deshabilitado.</p>',
  },
};

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado de error: borde rojo, `aria-invalid="true"` y mensaje de error visible bajo el editor.',
      },
    },
  },
  args: {
    label: 'Observaciones',
    required: true,
    isInvalid: true,
    errorMessage: 'El contenido es obligatorio',
  },
};

export const ToolbarVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Toolbar reducida a solo las acciones básicas de formato de texto (`bold`, `italic`, `underline`). ' +
          'Útil para formularios donde no se necesitan listas ni limpiar formato.',
      },
    },
  },
  args: {
    label: 'Comentario',
    placeholder: 'Escribe tu comentario...',
    toolbarActions: ['bold', 'italic', 'underline'],
  },
};

export const WithAriaLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Editor sin `<label>` visible: usa `ariaLabel` para proporcionar el nombre accesible a lectores de pantalla. ' +
          'Útil cuando el editor está embebido en un contexto con label externo o cuando el diseño no incluye etiqueta visible.',
      },
    },
  },
  args: {
    label: '',
    ariaLabel: 'Campo de notas del expediente',
    placeholder: 'Añade notas...',
  },
};

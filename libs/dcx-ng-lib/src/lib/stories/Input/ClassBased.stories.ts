import {
  DcxNgInputComponent,
  DcxInputType,
  INPUT_DEFAULT_ARIA_DESCRIBEDBY,
  INPUT_DEFAULT_ARIA_LABEL,
  INPUT_DEFAULT_AUTOCOMPLETE,
  INPUT_DEFAULT_DISABLED,
  INPUT_DEFAULT_ERROR_MESSAGE,
  INPUT_DEFAULT_INPUTMODE,
  INPUT_DEFAULT_INVALID,
  INPUT_DEFAULT_LABEL,
  INPUT_DEFAULT_NAME,
  INPUT_DEFAULT_PLACEHOLDER,
  INPUT_DEFAULT_READONLY,
  INPUT_DEFAULT_REQUIRED,
  INPUT_DEFAULT_TYPE,
  INPUT_DEFAULT_VALUE,
  INPUT_DEFAULT_REQUIRED_MESSAGE,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ReactiveFormsModule } from '@angular/forms';

const meta: Meta<DcxNgInputComponent> = {
  title: 'DCXLibrary/Components/Input',
  component: DcxNgInputComponent,
  tags: ['autodocs'],
  argTypes: {
    id: {
      name: 'id',
      description:
        'Id del input. Es la única fuente del id; el label, el hint y el error lo derivan.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'dcx-input-{aleatorio}' },
      },
    },
    value: {
      name: 'value',
      description: 'Valor del input (compatible con ngModel y Reactive Forms).',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string | number' },
        defaultValue: { summary: '""' },
      },
    },
    label: {
      name: 'label',
      description: 'Texto de la etiqueta visible, asociada al input por id.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    hint: {
      name: 'hint',
      description:
        'Texto de ayuda bajo el campo, enlazado por aria-describedby. Se oculta cuando hay error.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    placeholder: {
      name: 'placeholder',
      description: 'Texto de marcador de posición.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    type: {
      name: 'type',
      description: 'Tipo de input. Algunos tipos muestran icono o botón de acción.',
      control: { type: 'select' },
      options: [
        DcxInputType.TEXT,
        DcxInputType.NUMBER,
        DcxInputType.EMAIL,
        DcxInputType.PASSWORD,
        DcxInputType.SEARCH,
        DcxInputType.TEL,
        DcxInputType.URL,
        DcxInputType.FILE,
      ],
      table: {
        category: 'Atributos',
        type: { summary: 'DcxInputType' },
        defaultValue: { summary: 'text' },
      },
    },
    spacing: {
      name: 'spacing',
      description: 'Espaciado interno (padding) del campo.',
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl'],
      table: {
        category: 'Atributos',
        type: { summary: 'DcxSpacing' },
        defaultValue: { summary: 'xs' },
      },
    },
    disabled: {
      name: 'disabled',
      description: 'Deshabilita el campo (atributo nativo).',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      name: 'readonly',
      description: 'Campo de solo lectura (atributo nativo).',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      name: 'required',
      description: 'Marca el campo como obligatorio (asterisco y aria-required).',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isInvalid: {
      name: 'isInvalid',
      description: 'Fuerza el estado de error (borde rojo y mensajes con role="alert").',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      name: 'errorMessage',
      description: 'Mensaje de error único (se muestra si isInvalid es true).',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    requiredMessage: {
      name: 'requiredMessage',
      description:
        'Texto a mostrar cuando el campo requerido está vacío tras perder el foco.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'Este campo es requerido' },
      },
    },
    name: {
      name: 'name',
      description: 'Atributo name del input nativo.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    autocomplete: {
      name: 'autocomplete',
      description: 'Atributo autocomplete del input nativo.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    inputMode: {
      name: 'inputMode',
      description: 'Atributo inputmode del input nativo (teclado en móvil).',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      description: 'Nombre accesible cuando no hay label visible.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    ariaDescribedBy: {
      name: 'ariaDescribedBy',
      description: 'Id(s) externos a añadir a aria-describedby.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    errorIcon: {
      name: 'errorIcon',
      description: 'Nombre del icono de error (Bootstrap Icons).',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'info-circle' },
      },
    },
    valueChange: {
      name: 'valueChange',
      action: 'valueChange',
      description: 'Se emite cuando cambia el valor del input.',
      table: {
        category: 'Eventos',
        type: { summary: '(value: string | number | null) => void' },
      },
    },
    blurEvent: {
      name: 'blurEvent',
      action: 'blurEvent',
      description: 'Se emite cuando el input pierde el foco.',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
      },
    },
    focusEvent: {
      name: 'focusEvent',
      action: 'focusEvent',
      description: 'Se emite cuando el input recibe el foco.',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
      },
    },
    enterPressed: {
      name: 'enterPressed',
      action: 'enterPressed',
      description: 'Se emite cuando el usuario pulsa Enter dentro del input.',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    value: INPUT_DEFAULT_VALUE,
    disabled: INPUT_DEFAULT_DISABLED,
    readonly: INPUT_DEFAULT_READONLY,
    placeholder: INPUT_DEFAULT_PLACEHOLDER,
    type: INPUT_DEFAULT_TYPE,
    name: INPUT_DEFAULT_NAME,
    required: INPUT_DEFAULT_REQUIRED,
    requiredMessage: INPUT_DEFAULT_REQUIRED_MESSAGE,
    autocomplete: INPUT_DEFAULT_AUTOCOMPLETE,
    inputMode: INPUT_DEFAULT_INPUTMODE,
    isInvalid: INPUT_DEFAULT_INVALID,
    label: INPUT_DEFAULT_LABEL,
    hint: '',
    ariaLabel: INPUT_DEFAULT_ARIA_LABEL,
    ariaDescribedBy: INPUT_DEFAULT_ARIA_DESCRIBEDBY,
    errorMessage: INPUT_DEFAULT_ERROR_MESSAGE,
    spacing: 'xs',
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DcxNgInputComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgInputComponent>;

export const Default: Story = {
  args: {
    label: 'Nombre completo',
    placeholder: 'Ej: Jean Dupont',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Nombre completo',
    placeholder: 'Ej: Jean Dupont',
    hint: 'Tal como aparece en el documento oficial.',
  },
};

export const Required: Story = {
  args: {
    label: 'Email corporativo',
    placeholder: 'nombre@empresa.com',
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email corporativo',
    placeholder: 'nombre@empresa.com',
    isInvalid: true,
    errorMessage: 'Introduce un email válido.',
  },
};

export const InvalidList: Story = {
  render: (args) => ({
    props: {
      ...args,
      errorMessages: [
        { type: 'minLength', message: 'Mínimo 8 caracteres.' },
        { type: 'uppercase', message: 'Debe contener una mayúscula.' },
      ],
    },
    template: `
      <dcx-ng-input
        label="Contraseña"
        [type]="type"
        [isInvalid]="true"
        [errorMessages]="errorMessages"
      ></dcx-ng-input>
    `,
  }),
  args: {
    type: DcxInputType.PASSWORD,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    placeholder: 'No editable',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Solo lectura',
    value: 'Generado automáticamente',
    readonly: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Contraseña',
    type: DcxInputType.PASSWORD,
    placeholder: '••••••••',
  },
};

export const Search: Story = {
  args: {
    label: 'Búsqueda',
    type: DcxInputType.SEARCH,
    placeholder: 'Buscar...',
  },
};

export const Types: Story = {
  render: () => ({
    template: `
      <article style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
        <dcx-ng-input label="Texto" [type]="DcxInputType.TEXT"></dcx-ng-input>
        <dcx-ng-input label="Número" [type]="DcxInputType.NUMBER"></dcx-ng-input>
        <dcx-ng-input label="Email" [type]="DcxInputType.EMAIL"></dcx-ng-input>
        <dcx-ng-input label="Teléfono" [type]="DcxInputType.TEL"></dcx-ng-input>
        <dcx-ng-input label="URL" [type]="DcxInputType.URL"></dcx-ng-input>
      </article>
    `,
    props: { DcxInputType },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <article style="display:flex; flex-direction:column; gap:16px;">
        <dcx-ng-input label="xs" spacing="xs" placeholder="xs"></dcx-ng-input>
        <dcx-ng-input label="s" spacing="s" placeholder="s"></dcx-ng-input>
        <dcx-ng-input label="m" spacing="m" placeholder="m"></dcx-ng-input>
        <dcx-ng-input label="l" spacing="l" placeholder="l"></dcx-ng-input>
        <dcx-ng-input label="xl" spacing="xl" placeholder="xl"></dcx-ng-input>
      </article>
    `,
  }),
};

export const Files: Story = {
  args: {
    label: 'Adjuntar archivo',
    type: DcxInputType.FILE,
  },
};

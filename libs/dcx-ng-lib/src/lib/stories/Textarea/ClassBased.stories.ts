import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DcxNgTextareaComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgTextareaComponent> = {
  title: 'DCXLibrary/Components/Textarea',
  component: DcxNgTextareaComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgTextareaComponent],
    }),
  ],
  argTypes: {
    value: {
      description: 'Valor del textarea',
      control: { type: 'text' },
      table: { category: 'Atributos' },
    },
    rows: {
      description: 'Número de filas visibles',
      control: { type: 'number' },
      table: { category: 'Atributos' },
    },
    cols: {
      description: 'Número de columnas visibles',
      control: { type: 'number' },
      table: { category: 'Atributos' },
    },
    placeholder: {
      description: 'Placeholder del textarea',
      control: { type: 'text' },
      table: { category: 'Atributos' },
    },
    disabled: {
      description: 'Estado deshabilitado',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    readonly: {
      description: 'Estado solo lectura',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    autoResize: {
      description: 'Ajusta la altura automáticamente según el contenido',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    fluid: {
      description: 'Ocupa el 100% del ancho del contenedor',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    size: {
      description: 'Tamaño del textarea',
      control: { type: 'select' },
      options: ['small', 'normal', 'large'],
      table: { category: 'Atributos' },
    },
    filled: {
      description: 'Estilo filled con fondo relleno',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    invalid: {
      description: 'Estado inválido',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    errorMessage: {
      description: 'Mensaje de error a mostrar',
      control: { type: 'text' },
      table: { category: 'Atributos' },
    },
    id: {
      description:
        'Identificador único de la instancia (se genera automáticamente si no se indica).',
      control: { type: 'text' },
      table: { category: 'Atributos' },
    },
    ariaLabel: {
      description:
        'Nombre accesible de respaldo cuando no hay label visible.',
      control: { type: 'text' },
      table: { category: 'Atributos' },
    },
    required: {
      description: 'Marca el campo como obligatorio (aria-required + asterisco).',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    hint: {
      description: 'Texto de ayuda bajo el campo (se oculta si hay error).',
      control: { type: 'text' },
      table: { category: 'Atributos' },
    },
    maxLength: {
      description: 'Número máximo de caracteres permitidos (maxlength nativo).',
      control: { type: 'number' },
      table: { category: 'Atributos' },
    },
    resizable: {
      description:
        'Permite redimensionar verticalmente de forma manual. Se ignora si autoResize está activo.',
      control: { type: 'boolean' },
      table: { category: 'Atributos' },
    },
    valueChange: {
      action: 'valueChange',
      description: 'Se emite cuando cambia el valor del textarea.',
      table: {
        category: 'Eventos',
        type: { summary: '(value: string) => void' },
      },
    },
  },
  args: {
    value: '',
    rows: 5,
    cols: 30,
    placeholder: 'Escribe aquí...',
    disabled: false,
    readonly: false,
    autoResize: false,
    fluid: false,
    size: 'normal',
    filled: false,
    invalid: false,
    errorMessage: '',
    required: false,
    hint: '',
    resizable: true,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgTextareaComponent>;

export const Default: Story = {};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    value: 'Añade más líneas para ver cómo crece.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'La propiedad autoResize permite que el textarea ajuste su altura automáticamente según el contenido.',
      },
    },
  },
};

export const FloatLabelVariants: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="padding: 2rem;">
        <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
          <div>
            <dcx-ng-textarea [floatLabel]="'over'" label="Over Label"></dcx-ng-textarea>
          </div>
          <div>
            <dcx-ng-textarea [floatLabel]="'in'" label="In Label" ></dcx-ng-textarea>
          </div>
          <div>
            <dcx-ng-textarea [floatLabel]="'on'" label="On Label" ></dcx-ng-textarea>
          </div>
        </div>
      </div>
    `,
  }),
};

export const IftaLabel: Story = {
  args: {
    floatLabel: 'ifta',
    label: 'Description',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estilo IFTA (In-Field Text Area) es una variante de etiqueta flotante que se muestra dentro del área de texto cuando el campo está vacío.',
      },
    },
  },
};

export const Sizes: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="padding: 2rem;">
        <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
          <div>
            <dcx-ng-textarea size="small" placeholder="Small"></dcx-ng-textarea>
          </div>
          <div>
            <dcx-ng-textarea placeholder="Normal"></dcx-ng-textarea>
          </div>
          <div>
            <dcx-ng-textarea size="large" placeholder="Large"></dcx-ng-textarea>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Fluid: Story = {
  args: {
    fluid: true,
    placeholder: 'Fluid textarea',
  },
  parameters: {
    docs: {
      description: {
        story:
          'La propiedad fluid hace que el textarea ocupe el 100% del ancho de su contenedor, adaptándose a diferentes tamaños de pantalla y diseños.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    filled: true,
    placeholder: 'Filled textarea',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estilo filled se activa con la propiedad filled, que aplica un fondo relleno al textarea para diferenciarlo visualmente.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estado deshabilitado se aplica usando la propiedad disabled, que bloquea la interacción y aplica estilos visuales para indicar que el textarea no está activo.',
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    label: 'Descripción',
    required: true,
    invalid: true,
    placeholder: 'Escribe aquí...',
    errorMessage: 'Este campo es obligatorio',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estado inválido se activa con la propiedad invalid, que aplica estilos de error al textarea y al label, y muestra el asterisco de campo obligatorio si required es true. El mensaje de error se anuncia con role="alert".',
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    label: 'Notas',
    filled: true,
    hint: 'Max. 500 caracteres',
    maxLength: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'La propiedad hint muestra un texto de ayuda bajo el campo (se oculta automáticamente si hay un error visible). maxLength aplica el atributo maxlength nativo.',
      },
    },
  },
};

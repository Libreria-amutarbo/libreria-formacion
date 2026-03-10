import { DcxInputType } from '../../core/interfaces/input';
import { DcxNgInputComponent } from '../../dcx-ng-components/dcx-ng-input/dcx-ng-input.component';
import { Meta, StoryObj } from '@storybook/angular';


const meta: Meta<DcxNgInputComponent> = {
  title: 'DCXLibrary/Input',
  component: DcxNgInputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        DcxInputType.TEXT,
        DcxInputType.NUMBER,
        DcxInputType.EMAIL,
        DcxInputType.PASSWORD,
        DcxInputType.SEARCH,
        DcxInputType.TEL,
        DcxInputType.URL
      ],
      description: 'Tipo de input (text, number, email, password, etc.)',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'TEXT' }
      }
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Tamaño del input según sistema de espaciado',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'm' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder mostrado cuando el input está vacío',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'null' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita la interacción con el input',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Marca el input como requerido (validación HTML5)',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'Etiqueta asociada al input',
      table: { 
        category: 'Attributes',
        defaultValue: { summary: 'null' }
      }
    }
  },
};

export default meta;
type Story = StoryObj<DcxNgInputComponent>;

export const TextSmall: Story = {
  args: {
    type: DcxInputType.TEXT,
    size: 's',
    placeholder: 'Enter text...',
    disabled: false,
    required: false,
    label: 'Input Label',
  },
};

export const NumberMedium: Story = {
  args: {
    type: DcxInputType.NUMBER,
    size: 'm',
    placeholder: 'Enter number...',
    disabled: false,
    required: false,
    label: 'Input Label',
  },
};

export const EmailLargeRequired: Story = {
  args: {
    type: DcxInputType.EMAIL,
    size: 'l',
    placeholder: 'Enter email...',
    disabled: false,
    required: true,
    label: 'Input Label',
  },
};

export const PasswordExtraLarge: Story = {
  args: {
    type: DcxInputType.PASSWORD,
    size: 'xl',
    placeholder: 'Enter password...',
    disabled: false,
    required: false,
    label: 'Input Label',
  },
};

export const AutoRequired: Story = {
  args: {
    type: DcxInputType.TEXT,
    size: 'auto',
    placeholder: 'Enter data auto size...',
    disabled: false,
    required: true,
    label: 'Date Input',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 200px;">
      <dcx-ng-input 
  [label]="label" 
  [placeholder]="placeholder" 
  [disabled]="disabled" 
  [required]="required"
  [type]="type" 
  [size]="size" 
  (valueChange)="onValueChange($event)">
</dcx-ng-input>
    </div>
    `,
  }),
};

export const SearchDefault: Story = {
  args: {
    type: DcxInputType.SEARCH,
    placeholder: 'Search...',
    label: 'Search Input'
  },
};

export const TelDisabled: Story = {
  args: {
    type: DcxInputType.TEL,
    size: 'm',
    placeholder: 'Enter phone number...',
    disabled: true,
    required: false,
    label: 'Phone Input',
  },
};

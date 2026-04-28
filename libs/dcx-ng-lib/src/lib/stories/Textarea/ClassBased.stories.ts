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
      table: { category: 'Attributes' },
    },
    rows: {
      description: 'Número de filas visibles',
      control: { type: 'number' },
      table: { category: 'Attributes' },
    },
    cols: {
      description: 'Número de columnas visibles',
      control: { type: 'number' },
      table: { category: 'Attributes' },
    },
    placeholder: {
      description: 'Placeholder del textarea',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    disabled: {
      description: 'Estado deshabilitado',
      control: { type: 'boolean' },
      table: { category: 'Attributes' },
    },
    readonly: {
      description: 'Estado solo lectura',
      control: { type: 'boolean' },
      table: { category: 'Attributes' },
    },
    autoResize: {
      description: 'Ajusta la altura automáticamente según el contenido',
      control: { type: 'boolean' },
      table: { category: 'Attributes' },
    },
    valueChange: {
      action: 'valueChange',
      table: { category: 'Events' },
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
    value:
      'Texto inicial para probar el autoresize.\nAñade más líneas para ver cómo crece.',
  },
};

export const FloatLabelVariants: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="padding: 2rem;">
        <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
          <div>
            <dcx-ng-textarea [floatLabel]="'over'" label="Over Label" placeholder=" "></dcx-ng-textarea>
          </div>
          <div>
            <dcx-ng-textarea [floatLabel]="'in'" label="In Label" placeholder=" "></dcx-ng-textarea>
          </div>
          <div>
            <dcx-ng-textarea [floatLabel]="'on'" label="On Label" placeholder=" "></dcx-ng-textarea>
          </div>
        </div>
      </div>
    `,
  }),
};

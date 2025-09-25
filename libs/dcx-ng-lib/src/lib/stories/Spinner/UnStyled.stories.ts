import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSpinnerComponent } from '../../dcx-ng-components/dcx-ng-spinner/dcx-ng-spinner.component';

const meta: Meta<DcxNgSpinnerComponent> = {
  title: 'DCXLibrary/Spinner/Without style',
  component: DcxNgSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: 'Tamaño del spinner',
    },
    wrapper: {
      control: 'boolean',
      description: 'Si el spinner debe actuar como overlay sobre contenido',
    },
    delay: {
      control: 'number',
      description: 'Retardo en milisegundos antes de mostrar el spinner',
    },
    label: {
      control: 'text',
      description: 'Texto descriptivo que acompaña al spinner',
    }
  },
};

export default meta;
type Story = StoryObj<DcxNgSpinnerComponent>;

export const DefaultSpinner: Story = {
  args: {
    size: 'm',
    wrapper: false,
    delay: 0,
    label: 'Loading...',
  },
};

export const WithoutLabel: Story = {
  args: {
    size: 'm',
    wrapper: false,
    delay: 0,
    label: null,
  },
};

export const WithWrapper: Story = {
  args: {
    size: 'l',
    wrapper: true,
    delay: 0,
    label: 'Loading content',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 200px; height: 100px; border: 1px solid #ccc; padding: 1rem;">
        <dcx-ng-spinner [size]="size" [wrapper]="wrapper" [label]="label">
          <p>Contenido dentro del wrapper</p>
        </dcx-ng-spinner>
      </div>
    `
  })
};

import { DcxNgSliderComponent } from '../../dcx-ng-components/dcx-ng-slider/dcx-ng-slider.component';
import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgSliderComponent> = {
  title: 'DCXLibrary/Slider/ClassBased',
  component: DcxNgSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Valor actual del slider',
      table: {
        defaultValue: { summary: '0' },
        category: 'Attributes',
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Valor mínimo del slider',
      table: {
        defaultValue: { summary: '0' },
        category: 'Attributes',
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Valor máximo del slider',
      table: {
        category: 'Attributes',
      },
    },
    step: {
      control: { type: 'number' },
      description: 'Incremento entre valores',
      table: {
        defaultValue: { summary: '1' },
        category: 'Attributes',
      },
    },
    vertical: {
      control: { type: 'boolean' },
      description: 'Valor actual del slider',
      defaultValue: { summary: false },
      table: {
        category: 'Attributes',
      },
    },
    sliderHeight: {
      control: { type: 'number' },
      description: 'Altura del slider en px',
      table: {
        defaultValue: { summary: '300px' },
        category: 'Attributes',
      },
    },
    sliderWidth: {
      control: { type: 'range' },
      description: 'Anchura del slider en px',
      table: {
        defaultValue: { summary: '100px' },
        category: 'Attributes',
      },
    },
    valueChange: {
      action: 'value changed',
      description: 'Se emite cuando cambia el valor del slider.',
      table: {
        category: 'Events',
        type: {
          summary: '(value: number) => void',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
  args: {
    value: 0,
    step: 1,
    vertical: false,
    max: 50,
    sliderWidth: '300',
    sliderHeight: '100',

    // value: 10,
    // step: 1,
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgSliderComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgSliderComponent>;

export const ClassBassed: Story = {};

export const Default: Story = {
  // args: {
  //   value: 10,
  //   step: 1,
  //   vertical: false,
  // },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

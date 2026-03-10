import {
  SLIDER_DEFAULT_VALUES,
  DcxNgSliderComponent,
} from '@dcx-ng-components/dcx-ng-lib';
import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgSliderComponent> = {
  title: 'DCXLibrary/Slider',
  component: DcxNgSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    showLabel: {
      description: 'Mostrar label',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    textLabel: {
      description: 'Texto del label',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
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
    showLabel: SLIDER_DEFAULT_VALUES.showLabel,
    textLabel: SLIDER_DEFAULT_VALUES.textLabel,
    value: SLIDER_DEFAULT_VALUES.value,
    step: SLIDER_DEFAULT_VALUES.step,
    vertical: SLIDER_DEFAULT_VALUES.showLabel,
    min: SLIDER_DEFAULT_VALUES.min,
    max: SLIDER_DEFAULT_VALUES.max,
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

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

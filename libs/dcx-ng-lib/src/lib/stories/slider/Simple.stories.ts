import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSliderComponent } from '../../dcx-ng-components/dcx-ng-slider/dcx-ng-slider.component';

const meta: Meta<DcxNgSliderComponent> = {
  title: 'DCXLibrary/Slider/Simple',
  component: DcxNgSliderComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Valor actual del slider',
    },
    step: {
      control: { type: 'number' },
      description: 'Incremento entre valores',
    },
    vertical: {
      control: { type: 'boolean' },
      description: 'Orientación vertical del slider',
    },
  },
  args: {
    value: 10,
    step: 1,
    vertical: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgSliderComponent>;

export const Default: Story = {
  args: {
    value: 10,
    step: 1,
    vertical: false,
  },
};

export const Vertical: Story = {
  args: {
    value: 50,
    step: 5,
    vertical: true,
  },
};
import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSliderComponent } from './dcx-ng-slider.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DcxNgSliderComponent> = {
  component: DcxNgSliderComponent,
  title: 'DcxNgSliderComponent',
};
export default meta;
type Story = StoryObj<DcxNgSliderComponent>;

export const Primary: Story = {
  args: {
    value: 0,
    formControlName: '',
    step: 1,
    vertical: false,
  },
};

export const Heading: Story = {
  args: {
    value: 0,
    formControlName: '',
    step: 1,
    vertical: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-slider works!/gi)).toBeTruthy();
  },
};

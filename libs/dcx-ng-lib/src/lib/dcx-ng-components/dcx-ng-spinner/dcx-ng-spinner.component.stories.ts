import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSpinnerComponent } from './dcx-ng-spinner.component';

import { within, expect } from '@storybook/test';

const meta: Meta<DcxNgSpinnerComponent> = {
  component: DcxNgSpinnerComponent,
  title: 'DcxNgSpinnerComponent',
};
export default meta;
type Story = StoryObj<DcxNgSpinnerComponent>;

export const Primary: Story = {
  args: {
    size: 'm',
    wrapper: false,
    delay: 100,
    label: null,
  },
};

export const Heading: Story = {
  args: {
    size: 'm',
    wrapper: false,
    delay: 100,
    label: null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-spinner works!/gi)).toBeTruthy();
  },
};

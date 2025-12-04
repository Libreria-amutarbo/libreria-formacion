import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgChipComponent } from './dcx-ng-chip.component';

import { within, expect } from '@storybook/test';

const meta: Meta<DcxNgChipComponent> = {
  component: DcxNgChipComponent,
  title: 'DcxNgChipComponent',
};
export default meta;
type Story = StoryObj<DcxNgChipComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-chip works!/gi)).toBeTruthy();
  },
};

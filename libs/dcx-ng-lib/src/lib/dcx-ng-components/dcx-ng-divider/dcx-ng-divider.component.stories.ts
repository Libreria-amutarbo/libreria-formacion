import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgDividerComponent } from './dcx-ng-divider.component';

import { within, expect } from '@storybook/test';

const meta: Meta<DcxNgDividerComponent> = {
  component: DcxNgDividerComponent,
  title: 'DcxNgDividerComponent',
};
export default meta;
type Story = StoryObj<DcxNgDividerComponent>;

export const Primary: Story = {
  args: {
    color: '#ff0000',
    size: 'auto',
    orientation: 'horizontal',
    thickness: 0.25,
    ariaLabel: '',
  },
};

export const Heading: Story = {
  args: {
    color: '#ff0000',
    size: 'auto',
    orientation: 'horizontal',
    thickness: 0.25,
    ariaLabel: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-divider works!/gi)).toBeTruthy();
  },
};

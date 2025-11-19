import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconComponent } from './dcx-ng-icon.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DcxNgIconComponent> = {
  component: DcxNgIconComponent,
  title: 'DcxNgIconComponent',
};
export default meta;
type Story = StoryObj<DcxNgIconComponent>;

export const Primary: Story = {
  args: {
    size: 'm',
    spacing: 'none',
    color: '',
    name: '',
  },
};

export const Heading: Story = {
  args: {
    size: 'm',
    spacing: 'none',
    color: '',
    name: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-icon works!/gi)).toBeTruthy();
  },
};

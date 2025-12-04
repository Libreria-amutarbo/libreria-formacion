import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgMessageComponent } from './dcx-ng-message.component';

import { within, expect } from '@storybook/test';

const meta: Meta<DcxNgMessageComponent> = {
  component: DcxNgMessageComponent,
  title: 'DcxNgMessageComponent',
};
export default meta;
type Story = StoryObj<DcxNgMessageComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-message works!/gi)).toBeTruthy();
  },
};

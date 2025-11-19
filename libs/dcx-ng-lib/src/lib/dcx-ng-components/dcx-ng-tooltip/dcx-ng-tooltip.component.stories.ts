import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgTooltipComponent, TooltipPosition } from './dcx-ng-tooltip.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DcxNgTooltipComponent> = {
  component: DcxNgTooltipComponent,
  title: 'DcxNgTooltipComponent',
};
export default meta;
type Story = StoryObj<DcxNgTooltipComponent>;

export const Primary: Story = {
  args: {
    position: TooltipPosition.TOP,
    hideTooltipOnClick: false,
    content: '',
  },
};

export const Heading: Story = {
  args: {
    position: TooltipPosition.TOP,
    hideTooltipOnClick: false,
    content: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-tooltip works!/gi)).toBeTruthy();
  },
};

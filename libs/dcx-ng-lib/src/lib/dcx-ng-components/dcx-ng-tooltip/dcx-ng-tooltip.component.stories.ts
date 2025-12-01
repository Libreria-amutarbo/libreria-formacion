import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgTooltipComponent } from './dcx-ng-tooltip.component';

import { within, expect } from '@storybook/test';
import { DcxPosition } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgTooltipComponent> = {
  component: DcxNgTooltipComponent,
  title: 'DcxNgTooltipComponent',
};
export default meta;
type Story = StoryObj<DcxNgTooltipComponent>;

export const Primary: Story = {
  args: {
    position: DcxPosition.TOP,
    hideTooltipOnClick: false,
    content: '',
  },
};

export const Heading: Story = {
  args: {
    position: DcxPosition.TOP,
    hideTooltipOnClick: false,
    content: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-tooltip works!/gi)).toBeTruthy();
  },
};

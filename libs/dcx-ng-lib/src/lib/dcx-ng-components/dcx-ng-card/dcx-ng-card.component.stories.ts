import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgCardComponent } from './dcx-ng-card.component';

import { within, expect } from '@storybook/test';

const meta: Meta<DcxNgCardComponent> = {
  component: DcxNgCardComponent,
  title: 'DcxNgCardComponent',
};
export default meta;
type Story = StoryObj<DcxNgCardComponent>;

export const Primary: Story = {
  args: {
    header: '',
    subheader: '',
    iconClass: '',
    closable: false,
    visible: true,
  },
};

export const Heading: Story = {
  args: {
    header: '',
    subheader: '',
    iconClass: '',
    closable: false,
    visible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-card works!/gi)).toBeTruthy();
  },
};

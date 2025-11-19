import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgTableComponent } from './dcx-ng-table.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DcxNgTableComponent> = {
  component: DcxNgTableComponent,
  title: 'DcxNgTableComponent',
};
export default meta;
type Story = StoryObj<DcxNgTableComponent>;

export const Primary: Story = {
  args: {
    showGrid: false,
    showStripped: false,
    scroll: false,
    scrollHeight: '320px',
  },
};

export const Heading: Story = {
  args: {
    showGrid: false,
    showStripped: false,
    scroll: false,
    scrollHeight: '320px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-table works!/gi)).toBeTruthy();
  },
};

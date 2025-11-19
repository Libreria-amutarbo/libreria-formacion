import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgToggleComponent, TogglePosition } from './dcx-ng-toggle.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DcxNgToggleComponent> = {
  component: DcxNgToggleComponent,
  title: 'DcxNgToggleComponent',
};
export default meta;
type Story = StoryObj<DcxNgToggleComponent>;

export const Primary: Story = {
  args: {
    checked: false,
    disabled: false,
    label: null,
    size: 'medium',
    color: '#000',
    ariaLabel: '',
    textPosition: TogglePosition.RIGHT,
  },
};

export const Heading: Story = {
  args: {
    checked: false,
    disabled: false,
    label: null,
    size: 'medium',
    color: '#000',
    ariaLabel: '',
    textPosition: TogglePosition.RIGHT,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-toggle works!/gi)).toBeTruthy();
  },
};

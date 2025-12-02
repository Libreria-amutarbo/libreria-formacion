import type { Meta, StoryObj } from '@storybook/angular';

import { expect, within } from '@storybook/test';
import { DcxPosition, DcxNgToggleComponent } from '@dcx-ng-components/dcx-ng-lib';

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
    size: 'm',
    color: '#000',
    ariaLabel: '',
    textPosition: DcxPosition.RIGHT,
  },
};

export const Heading: Story = {
  args: {
    checked: false,
    disabled: false,
    label: null,
    size: 'm',
    color: '#000',
    ariaLabel: '',
    textPosition: DcxPosition.RIGHT,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-toggle works!/gi)).toBeTruthy();
  },
};

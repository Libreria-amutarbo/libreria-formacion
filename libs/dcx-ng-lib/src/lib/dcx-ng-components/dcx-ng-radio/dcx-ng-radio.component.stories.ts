import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgRadioComponent } from './dcx-ng-radio.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DcxNgRadioComponent> = {
  component: DcxNgRadioComponent,
  title: 'DcxNgRadioComponent',
};
export default meta;
type Story = StoryObj<DcxNgRadioComponent>;

export const Primary: Story = {
  args: {
    name: '',
    value: null,
    label: null,
    disabled: false,
    size: 'l',
    ariaLabel: '',
    unstyled: false,
  },
};

export const Heading: Story = {
  args: {
    name: '',
    value: null,
    label: null,
    disabled: false,
    size: 'l',
    ariaLabel: '',
    unstyled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-radio works!/gi)).toBeTruthy();
  },
};

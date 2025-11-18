import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSelectComponent } from './dcx-ng-select.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DcxNgSelectComponent> = {
  component: DcxNgSelectComponent,
  title: 'DcxNgSelectComponent',
};
export default meta;
type Story = StoryObj<DcxNgSelectComponent>;

export const Primary: Story = {
  args: {
    options: [],
    placeholder: '',
    label: '',
    ariaLabel: '',
  },
};

export const Heading: Story = {
  args: {
    options: [],
    placeholder: '',
    label: '',
    ariaLabel: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-select works!/gi)).toBeTruthy();
  },
};

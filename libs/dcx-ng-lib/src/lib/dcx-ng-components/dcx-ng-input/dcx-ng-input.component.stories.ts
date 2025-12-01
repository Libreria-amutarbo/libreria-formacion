import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgInputComponent } from './dcx-ng-input.component';

import { within, expect } from '@storybook/test';
import { DcxInputType } from '../../core/interfaces';

const meta: Meta<DcxNgInputComponent> = {
  component: DcxNgInputComponent,
  title: 'DcxNgInputComponent',
};
export default meta;
type Story = StoryObj<DcxNgInputComponent>;

export const Primary: Story = {
  args: {
    type: DcxInputType.TEXT,
    placeholder: null,
    size: 'm',
    disabled: false,
    required: false,
    label: null,
    errorMessages: [],
  },
};

export const Heading: Story = {
  args: {
    type: DcxInputType.TEXT,
    placeholder: null,
    size: 'm',
    disabled: false,
    required: false,
    label: null,
    errorMessages: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-input works!/gi)).toBeTruthy();
  },
};

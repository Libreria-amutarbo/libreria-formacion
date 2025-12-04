import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgInputComponent, InputType, InputSize } from './dcx-ng-input.component';

import { within, expect } from '@storybook/test';

const meta: Meta<DcxNgInputComponent> = {
  component: DcxNgInputComponent,
  title: 'DcxNgInputComponent',
};
export default meta;
type Story = StoryObj<DcxNgInputComponent>;

export const Primary: Story = {
  args: {
    type: InputType.TEXT,
    placeholder: null,
    size: InputSize.MEDIUM,
    disabled: false,
    required: false,
    label: null,
    errorMessages: [],
  },
};

export const Heading: Story = {
  args: {
    type: InputType.TEXT,
    placeholder: null,
    size: InputSize.MEDIUM,
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

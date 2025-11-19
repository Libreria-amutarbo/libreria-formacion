import type { Meta, StoryObj } from '@storybook/angular';
import { TestHostComponent } from './dcx-ng-slider.component.spec';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TestHostComponent> = {
  component: TestHostComponent,
  title: 'TestHostComponent',
};
export default meta;
type Story = StoryObj<TestHostComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-slider.spec works!/gi)).toBeTruthy();
  },
};

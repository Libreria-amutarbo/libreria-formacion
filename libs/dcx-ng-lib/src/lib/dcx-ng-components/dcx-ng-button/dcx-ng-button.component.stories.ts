import type { Meta, StoryObj } from '@storybook/angular/';
import { DcxNgButtonComponent, ICON_POSITION } from './dcx-ng-button.component';

import { within, expect } from '@storybook/test';

const meta: Meta<DcxNgButtonComponent> = {
  component: DcxNgButtonComponent,
  title: 'DcxNgButtonComponent',
};
export default meta;
type Story = StoryObj<DcxNgButtonComponent>;

export const Primary: Story = {
  args: {
    label: '',
    ariaLabel: '',
    type: 'button',
    disabled: false,
    size: 'medium',
    class: '',
    iconName: '',
    iconPosition: ICON_POSITION.start,
    iconSpacing: 'none',
    iconColor: '',
    icon: '',
  },
};

export const Heading: Story = {
  args: {
    label: '',
    ariaLabel: '',
    type: 'button',
    disabled: false,
    size: 'medium',
    class: '',
    iconName: '',
    iconPosition: ICON_POSITION.start,
    iconSpacing: 'none',
    iconColor: '',
    icon: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dcx-ng-button works!/gi)).toBeTruthy();
  },
};

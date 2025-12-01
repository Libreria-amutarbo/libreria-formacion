import type { Meta, StoryObj } from '@storybook/angular/';

import { within, expect } from '@storybook/test';
import { ICON_POSITION, DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

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
    size: 'm',
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
    size: 'm',
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

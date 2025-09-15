import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';

const ActionsData = {
  buttonClick: fn(),
};

const meta: Meta<DcxNgButtonComponent> = {
  title: 'DCXLibrary/Button/Class based',
  component: DcxNgButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'link', 'icon'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large', 'block'] },
    buttonClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<DcxNgButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Click me',
    icon: '',
    disabled: false,
    variant: 'primary',
    size: 'medium',
    buttonClick: ActionsData.buttonClick,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Click me',
    icon: '',
    disabled: false,
    variant: 'secondary',
    size: 'medium',
    buttonClick: ActionsData.buttonClick,
  },
};

export const Link: Story = {
  args: {
    label: 'Click me',
    icon: '',
    disabled: false,
    variant: 'link',
    size: 'medium',
    buttonClick: ActionsData.buttonClick,
  },
};

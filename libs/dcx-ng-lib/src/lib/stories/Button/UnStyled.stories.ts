import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';

const ActionsData = { buttonClick: fn(), };

const meta: Meta<DcxNgButtonComponent> = {
  title: 'DCXLibrary/Button/Without style',
  component: DcxNgButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DcxNgButtonComponent>;

export const Unstyled: Story = {
  args: {
    label: 'Click me',
    buttonClick: ActionsData.buttonClick,
  },
};

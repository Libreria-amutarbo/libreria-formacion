import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgRadioComponent } from '../../dcx-ng-components/dcx-ng-radio/dcx-ng-radio.component';

const meta: Meta<DcxNgRadioComponent> = {
  title: 'DCXLibrary/Radio/Unstyled',
  component: DcxNgRadioComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['s', 'm', 'l'],
    },
    disabled: { control: 'boolean' },
    unstyled: { control: 'boolean' },
    label: { control: 'text' },
    value: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DcxNgRadioComponent>;

export const Unstyled: Story = {
  args: {
    name: 'unstyled',
    value: 'valor1',
    label: '',
    size: 'm',
    disabled: false,
    unstyled: true,
  },
};

export const UnstyledSize: Story = {
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-radio name="grupo2" value="s" label="S" size="s" [unstyled]="true"></dcx-ng-radio>
      <dcx-ng-radio name="grupo2" value="m" label="M" size="m" [unstyled]="true"></dcx-ng-radio>
      <dcx-ng-radio name="grupo2" value="l" label="L" size="l" [unstyled]="true"></dcx-ng-radio>
    `,
  }),
};
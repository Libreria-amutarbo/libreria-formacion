import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgListComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgListComponent> = {
  title: 'DCXLibrary/List/Unstyled',
  component: DcxNgListComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
  },
  args: {
    items: ['Alpha', 'Beta', 'Gamma'],
  },
};

export default meta;
type Story = StoryObj<DcxNgListComponent>;

export const Basic: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <dcx-ng-list [items]="items"></dcx-ng-list>
    `,
  }),
};

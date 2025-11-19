// ClassBased.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgListComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgListComponent> = {
  title: 'DCXLibrary/List/Class based',
  component: DcxNgListComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
  },
  args: {
    items: ['Uno', 'Dos', 'Tres', 'Cuatro'],
  },
};

export default meta;
type Story = StoryObj<DcxNgListComponent>;

export const ClassBasedDemo: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="display:grid; gap:8px; max-width:480px;">
        <dcx-ng-list [items]="items"></dcx-ng-list>
        <div style="color:#6e7781">
          Total items: <strong>{{ items?.length ?? 0 }}</strong>
        </div>
      </div>
    `,
  }),
};

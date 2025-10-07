import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgTooltipComponent, TooltipPosition } from '../../dcx-ng-components/dcx-ng-tooltip/dcx-ng-tooltip.component';

const meta: Meta<DcxNgTooltipComponent> = {
  title: 'DCXLibrary/Tooltip/ClassBased',
  component: DcxNgTooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    content: {
      control: 'text',
      description: 'Content of the tooltip',
      defaultValue: 'This is a tooltip',
    },
    hideTooltipOnClick: {
      control: 'boolean',
      description: 'Whether the tooltip should hide when clicking',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgTooltipComponent>;

export const DefaultTooltip: Story = {
  args: {
    content: 'Default tooltip',
    position: TooltipPosition.TOP,
    hideTooltipOnClick: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; display: flex;">
      <dcx-ng-tooltip [content]="content" [position]="position" [hideTooltipOnClick]="hideTooltipOnClick">
        <button>Hover me</button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const LeftTooltip: Story = {
  args: {
    position: TooltipPosition.LEFT,
    content: 'Tooltip on the left',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; display: flex;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <button>Hover me</button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const RightTooltip: Story = {
  args: {
    position: TooltipPosition.RIGHT,
    content: 'Tooltip on the right',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; display: flex;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <button>Hover me</button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const BottomTooltip: Story = {
  args: {
    position: TooltipPosition.BOTTOM,
    content: 'Tooltip on the bottom',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; display: flex;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <button>Hover me</button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const TopTooltip: Story = {
  args: {
    position: TooltipPosition.TOP,
    content: 'Tooltip on the top',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; display: flex;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <button>Hover me</button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const HideOnClickTooltip: Story = {
  args: {
    content: 'Tooltip on the top',
    hideTooltipOnClick: true,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; display: flex;">
      <dcx-ng-tooltip [content]="content" [hideTooltipOnClick]="hideTooltipOnClick">
        <button>Hover me</button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
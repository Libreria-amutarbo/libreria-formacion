import { DcxPosition } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgTooltipComponent } from '../../dcx-ng-components/dcx-ng-tooltip/dcx-ng-tooltip.component';

const meta: Meta<DcxNgTooltipComponent> = {
  title: 'DCXLibrary/Tooltip/ClassBased',
  component: DcxNgTooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      table: { category: 'Attributes' }
    },
    content: {
      control: 'text',
      description: 'Content of the tooltip',
      defaultValue: 'This is a tooltip',
      table: { category: 'Attributes' }
    },
    hideTooltipOnClick: {
      control: 'boolean',
      description: 'Whether the tooltip should hide when clicking',
      defaultValue: false,
      table: { category: 'Attributes' }
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgTooltipComponent>;

export const DefaultTooltip: Story = {
  args: {
    content: 'Default tooltip',
    position: DcxPosition.TOP,
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
    position: DcxPosition.LEFT,
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
    position: DcxPosition.RIGHT,
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
    position: DcxPosition.BOTTOM,
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
    position: DcxPosition.TOP,
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

export const ViewportEdgePositioning: Story = {
  args: {
    content: 'This tooltip intelligently adjusts its position to stay within the viewport boundaries',
    position: DcxPosition.TOP,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="height: 600px; width: 10s00px; position: relative;">
      <!-- Top-left corner -->
      <div style="position: absolute; top: -10px; left: 10px;">
        <dcx-ng-tooltip [content]="'TOP position - should flip to BOTTOM'" [position]="'top'">
          <button style="padding: 8px 12px;">Top-Left Corner</button>
        </dcx-ng-tooltip>
      </div>
      
      <!-- Top-right corner -->
      <div style="position: absolute; top: -10px; right: 10px;">
        <dcx-ng-tooltip [content]="'TOP position - should flip to LEFT'" [position]="'top'">
          <button style="padding: 8px 12px;">Top-Right Corner</button>
        </dcx-ng-tooltip>
      </div>
      
      <!-- Bottom-left corner -->
      <div style="position: absolute; bottom: -10px; left: 10px;">
        <dcx-ng-tooltip [content]="'BOTTOM position - should flip to RIGHT'" [position]="'bottom'">
          <button style="padding: 8px 12px;">Bottom-Left Corner</button>
        </dcx-ng-tooltip>
      </div>
      
      <!-- Bottom-right corner -->
      <div style="position: absolute; bottom: -10px; right: 10px;">
        <dcx-ng-tooltip [content]="'BOTTOM position - should flip to TOP'" [position]="'bottom'">
          <button style="padding: 8px 12px;">Bottom-Right Corner</button>
        </dcx-ng-tooltip>
      </div>
      
      <!-- Left edge -->
      <div style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%);">
        <dcx-ng-tooltip [content]="'LEFT position - should flip to RIGHT'" [position]="'left'">
          <button style="padding: 8px 12px;">Left Edge</button>
        </dcx-ng-tooltip>
      </div>
      
      <!-- Right edge -->
      <div style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%);">
        <dcx-ng-tooltip [content]="'RIGHT position - should flip to LEFT'" [position]="'right'">
          <button style="padding: 8px 12px;">Right Edge</button>
        </dcx-ng-tooltip>
      </div>
      
      <!-- Center (normal behavior) -->
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <dcx-ng-tooltip [content]="'Center position - should maintain preferred position'" [position]="'top'">
          <button style="padding: 12px 20px; background: #007bff; color: white; border: none; border-radius: 4px;">Center (Normal)</button>
        </dcx-ng-tooltip>
      </div>
    </div>
    `,
  }),
};

export const LongContentTooltip: Story = {
  args: {
    content: 'This is a very long tooltip content that should wrap properly and test the intelligent positioning system with longer text that might cause issues with viewport boundaries when positioned near edges.',
    position: DcxPosition.LEFT,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="height: 200px; position: relative; padding: 20px;">
      <div style="position: absolute; top: 40px; left: 20px;">
        <dcx-ng-tooltip [content]="content" [position]="position">
          <button style="padding: 8px 12px;">Long Content Left Test</button>
        </dcx-ng-tooltip>
      </div>
    </div>
    `,
  }),
};
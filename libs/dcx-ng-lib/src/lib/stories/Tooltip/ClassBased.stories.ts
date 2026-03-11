import { DcxNgButtonComponent, DcxNgIconComponent, DcxNgTooltipComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<DcxNgTooltipComponent> = {
  title: 'DCXLibrary/Tooltip',
  component: DcxNgTooltipComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgButtonComponent, DcxNgIconComponent, DcxNgTooltipComponent],
    }),
  ],
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
    position: 'top',
    hideTooltipOnClick: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position" [hideTooltipOnClick]="hideTooltipOnClick">
        <dcx-ng-button label="Hover me"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const LeftTooltip: Story = {
  args: {
    position: 'left',
    content: 'Tooltip on the left',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Hover me"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const RightTooltip: Story = {
  args: {
    position: 'right',
    content: 'Tooltip on the right',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Hover me"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const BottomTooltip: Story = {
  args: {
    position: 'bottom',
    content: 'Tooltip on the bottom',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Hover me"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const TopTooltip: Story = {
  args: {
    position: 'top',
    content: 'Tooltip on the top',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Hover me"></dcx-ng-button>
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
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [hideTooltipOnClick]="hideTooltipOnClick">
        <dcx-ng-button label="Hover me"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

export const LongContentTooltip: Story = {
  args: {
    content: 'This is a very long tooltip content that should wrap properly and test the intelligent positioning system with longer text that might cause issues with viewport boundaries when positioned near edges.',
    position: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="height: 200px; position: relative; padding: 20px;">
      <div style="position: absolute; top: 40px; left: 20px;">
        <dcx-ng-tooltip [content]="content" [position]="position">
          <dcx-ng-button label="Long Content Test"></dcx-ng-button>
        </dcx-ng-tooltip>
      </div>
    </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: {
    content: 'This is an icon with a tooltip',
    position: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-icon name="info-circle" size="24"></dcx-ng-icon>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

export const WithLinkInside: Story = {
  args: {
    contentHtml: 'Click <a href="#">here</a> to learn more',
    position: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [contentHtml]="contentHtml" [position]="position">
        <dcx-ng-button label="Hover for link"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

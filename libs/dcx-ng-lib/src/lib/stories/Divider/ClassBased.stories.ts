import { DcxNgDividerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { argTypesDivider } from './utils';
import { tokens } from '../../core/mock/colors';

const meta: Meta<DcxNgDividerComponent> = {
  title: 'DCXLibrary/Components/Divider',
  component: DcxNgDividerComponent,
  tags: ['autodocs'],
  argTypes: argTypesDivider,
  parameters: {
    docs: {
      description: {
        component:
          'The `dcx-ng-divider` component is a flexible layout utility for visually separating content. ' +
          'It supports horizontal and vertical orientations, multiple size presets (`s`, `m`, `l`, `xl`, `auto`), ' +
          'solid and dotted line styles, and full color/thickness customization via inputs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgDividerComponent>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Use the controls panel below to interactively configure orientation, size, color, thickness, and type.',
      },
    },
  },
  args: {
    size: 'auto',
    orientation: 'horizontal',
    type: 'default',
    color: tokens.background.pressed,
    thickness: 0.25,
    ariaLabel: 'Interactive Divider',
  },
};

export const HorizontalSizes: Story = {
  name: 'Horizontal — All Sizes',
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal dividers rendered at every available size: `s` (5rem), `m` (15rem), `l` (30rem), `xl` (35rem), and `auto` (fills the container width).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
        <span style="font-size:12px;color:#888">size="s"</span>
        <dcx-ng-divider size="s" ariaLabel="Small" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="m"</span>
        <dcx-ng-divider size="m" ariaLabel="Medium" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="l"</span>
        <dcx-ng-divider size="l" ariaLabel="Large" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="xl"</span>
        <dcx-ng-divider size="xl" ariaLabel="Extra Large" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="auto"</span>
        <dcx-ng-divider size="auto" ariaLabel="Auto" color="${tokens.background.primary}"></dcx-ng-divider>
      </div>
    `,
  }),
};

export const VerticalSizes: Story = {
  name: 'Vertical — All Sizes',
  parameters: {
    docs: {
      description: {
        story:
          'Vertical dividers rendered at every available size. The parent container must have a defined height for the divider to be visible.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:row;align-items:flex-end;gap:48px;padding:16px;height:600px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">s (5rem)</span>
          <dcx-ng-divider size="s" orientation="vertical" ariaLabel="Small" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">m (15rem)</span>
          <dcx-ng-divider size="m" orientation="vertical" ariaLabel="Medium" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">l (30rem)</span>
          <dcx-ng-divider size="l" orientation="vertical" ariaLabel="Large" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">xl (35rem)</span>
          <dcx-ng-divider size="xl" orientation="vertical" ariaLabel="Extra Large" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">auto</span>
          <dcx-ng-divider size="auto" orientation="vertical" ariaLabel="Auto" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
      </div>
    `,
  }),
};

export const AllTypes: Story = {
  name: 'All Types',
  parameters: {
    docs: {
      description: {
        story:
          'All available line styles: `default` (solid), `dot` (dotted), and `dash` (dashed).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
        <span style="font-size:12px;color:#888">type="default" — solid</span>
        <dcx-ng-divider size="auto" type="default" ariaLabel="Default" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">type="dot" — dotted</span>
        <dcx-ng-divider size="auto" type="dot" ariaLabel="Dot" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">type="dash" — dashed</span>
        <dcx-ng-divider size="auto" type="dash" ariaLabel="Dash" color="${tokens.background.primary}"></dcx-ng-divider>
      </div>
    `,
  }),
};

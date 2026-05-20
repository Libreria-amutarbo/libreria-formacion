import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DcxNgBadgeComponent, DcxNgButtonComponent, DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgBadgeComponent> = {
  title: 'DCXLibrary/Components/Badge',
  component: DcxNgBadgeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgBadgeComponent, DcxNgButtonComponent, DcxNgIconComponent],
    }),
  ],
  args: {
    value: '2',
    severity: 'primary',
    size: 'md',
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Texto o número que muestra el badge',
      table: {
        type: { summary: 'string' },
        category: 'Attributes',
        defaultValue: { summary: '""' },
      },
    },
    severity: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warn', 'danger'],
      description: 'Color semántico del badge',
      table: {
        type: { summary: '"primary" | "secondary" | "success" | "info" | "warn" | "danger"' },
        category: 'Attributes',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del badge',
      table: {
        type: { summary: '"sm" | "md" | "lg" | "xl"' },
        category: 'Attributes',
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgBadgeComponent>;

export const Default: Story = {
  args: {
    value: '2',
    severity: 'primary',
    size: 'md',
  },
};

export const Severities: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <dcx-ng-badge value="2" severity="primary" />
        <dcx-ng-badge value="6" severity="secondary" />
        <dcx-ng-badge value="8" severity="success" />
        <dcx-ng-badge value="4" severity="info" />
        <dcx-ng-badge value="9" severity="warn" />
        <dcx-ng-badge value="3" severity="danger" />
      </div>
    `,
    styles: [`.story-row { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }`],
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <dcx-ng-badge value="8" size="xl" severity="success" />
        <dcx-ng-badge value="6" size="lg" severity="warn" />
        <dcx-ng-badge value="4" size="md" severity="info" />
        <dcx-ng-badge value="2" size="sm" severity="primary" />
      </div>
    `,
    styles: [`.story-row { display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; }`],
  }),
};

export const OverlayIcon: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <div class="story-overlay">
          <dcx-ng-badge value="2" class="story-badge" />
          <dcx-ng-icon name="bell" size="xl" />
        </div>
        <div class="story-overlay">
          <dcx-ng-badge value="5" severity="danger" class="story-badge" />
          <dcx-ng-icon name="envelope" size="xl" />
        </div>
        <div class="story-overlay">
          <dcx-ng-badge severity="danger" class="story-badge" />
          <dcx-ng-icon name="calendar" size="xl" />
        </div>
      </div>
    `,
    styles: [
      `.story-row { display:flex; gap:24px; align-items:center; flex-wrap:wrap; }`,
      `.story-overlay { position:relative; display:inline-flex; }`,
      `.story-badge { position:absolute; top:-6px; right:-6px; z-index:1; }`,
    ],
  }),
};

export const OverlayButton: Story = {
  render: () => ({
    template: `
      <div class="story-row">
        <div class="story-overlay">
          <dcx-ng-badge value="2" class="story-badge" />
          <dcx-ng-button label="Notificaciones" variant="primary" size="m" icon iconName="bell" iconPosition="left" iconSize="m" />
        </div>
        <div class="story-overlay">
          <dcx-ng-badge value="4" severity="danger" class="story-badge" />
          <dcx-ng-button label="Bandeja" variant="secondary" size="m" icon iconName="inbox" iconPosition="left" iconSize="m" />
        </div>
      </div>
    `,
    styles: [
      `.story-row { display:flex; gap:24px; align-items:center; flex-wrap:wrap; }`,
      `.story-overlay { position:relative; display:inline-flex; }`,
      `.story-badge { position:absolute; top:-6px; right:-6px; z-index:1; }`,
    ],
  }),
};

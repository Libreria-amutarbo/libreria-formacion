import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  DcxNgCardComponent,
  DcxNgSkeletonComponent,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgSkeletonComponent> = {
  title: 'DCXLibrary/Components/Skeleton',
  component: DcxNgSkeletonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgSkeletonComponent, DcxNgCardComponent],
    }),
  ],
  args: {
    shape: 'rectangle',
    width: '100%',
    height: '1rem',
    size: null,
    borderRadius: null,
    animation: 'wave',
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['rectangle', 'circle'],
      description: 'Forma visual del placeholder',
      table: {
        type: { summary: "'rectangle' | 'circle'" },
        defaultValue: { summary: 'rectangle' },
      },
    },
    width: {
      control: 'text',
      description: 'Ancho CSS. Se ignora cuando size tiene valor',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'text',
      description: 'Alto CSS. Se ignora cuando size tiene valor',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1rem' },
      },
    },
    size: {
      control: 'text',
      description: 'Tamaño único para ancho y alto',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Radio CSS para rectángulos',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    animation: {
      control: 'select',
      options: ['wave', 'none'],
      description: 'Animación visual del placeholder',
      table: {
        type: { summary: "'wave' | 'none'" },
        defaultValue: { summary: 'wave' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgSkeletonComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="max-width: 32rem;">
        <dcx-ng-skeleton
          [shape]="shape"
          [width]="width"
          [height]="height"
          [size]="size"
          [borderRadius]="borderRadius"
          [animation]="animation">
        </dcx-ng-skeleton>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: grid; gap: 1rem; max-width: 34rem;">
        <dcx-ng-skeleton width="20rem" height="1rem" [animation]="animation"></dcx-ng-skeleton>
        <dcx-ng-skeleton width="14rem" height="1rem" borderRadius="16px" [animation]="animation"></dcx-ng-skeleton>
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <dcx-ng-skeleton size="2rem" [animation]="animation"></dcx-ng-skeleton>
          <dcx-ng-skeleton size="3rem" [animation]="animation"></dcx-ng-skeleton>
          <dcx-ng-skeleton size="4rem" [animation]="animation"></dcx-ng-skeleton>
          <dcx-ng-skeleton shape="circle" size="2rem" [animation]="animation"></dcx-ng-skeleton>
          <dcx-ng-skeleton shape="circle" size="3rem" [animation]="animation"></dcx-ng-skeleton>
          <dcx-ng-skeleton shape="circle" size="4rem" [animation]="animation"></dcx-ng-skeleton>
        </div>
      </div>
    `,
  }),
};

export const CardPlaceholder: Story = {
  render: args => ({
    props: args,
    template: `
      <ng-template #cardSkeletonHeaderTpl>
        <div style="display: flex; gap: var(--sp-3, 12px); align-items: center; margin-bottom: var(--sp-4, 16px);">
          <dcx-ng-skeleton shape="circle" size="3rem" [animation]="animation"></dcx-ng-skeleton>
          <div style="display: grid; gap: var(--sp-2, 8px); flex: 1;">
            <dcx-ng-skeleton width="70%" height="1rem" [animation]="animation"></dcx-ng-skeleton>
            <dcx-ng-skeleton width="42%" height="0.75rem" [animation]="animation"></dcx-ng-skeleton>
          </div>
        </div>
      </ng-template>

      <ng-template #cardSkeletonContentTpl>
        <dcx-ng-skeleton width="100%" height="9rem" borderRadius="8px" [animation]="animation"></dcx-ng-skeleton>
      </ng-template>

      <ng-template #cardSkeletonFooterTpl>
        <div style="display: flex; justify-content: space-between; margin-top: var(--sp-4, 16px);">
          <dcx-ng-skeleton width="5rem" height="2rem" borderRadius="6px" [animation]="animation"></dcx-ng-skeleton>
          <dcx-ng-skeleton width="5rem" height="2rem" borderRadius="6px" [animation]="animation"></dcx-ng-skeleton>
        </div>
      </ng-template>

      <dcx-ng-card
        aria-busy="true"
        [image]="null"
        [header]="cardSkeletonHeaderTpl"
        [content]="cardSkeletonContentTpl"
        [footer]="cardSkeletonFooterTpl"
        [bordered]="true"
        [shadow]="1"
        align="start"
        maxContentWidth="24rem"
      ></dcx-ng-card>
    `,
  }),
};

export const ListPlaceholder: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="display: grid; gap: var(--sp-4, 16px); max-width: 28rem;">
        @for (item of [1, 2, 3, 4]; track item) {
          <div style="display: flex; gap: var(--sp-3, 12px); align-items: center;">
            <dcx-ng-skeleton shape="circle" size="3rem" [animation]="animation"></dcx-ng-skeleton>
            <div style="display: grid; gap: var(--sp-2, 8px); flex: 1;">
              <dcx-ng-skeleton width="100%" height="0.875rem" [animation]="animation"></dcx-ng-skeleton>
              <dcx-ng-skeleton width="72%" height="0.875rem" [animation]="animation"></dcx-ng-skeleton>
            </div>
          </div>
        }
      </div>
    `,
  }),
};

export const NoAnimation: Story = {
  args: {
    animation: 'none',
  },
  render: args => ({
    props: args,
    template: `
      <div style="display: grid; gap: var(--sp-2, 8px); max-width: 28rem;">
        <dcx-ng-skeleton width="100%" height="1rem" [animation]="animation"></dcx-ng-skeleton>
        <dcx-ng-skeleton width="82%" height="1rem" [animation]="animation"></dcx-ng-skeleton>
        <dcx-ng-skeleton width="64%" height="1rem" [animation]="animation"></dcx-ng-skeleton>
      </div>
    `,
  }),
};

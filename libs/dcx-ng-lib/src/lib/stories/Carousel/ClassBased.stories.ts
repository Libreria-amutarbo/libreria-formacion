import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  DcxNgCarouselComponent,
  DcxNgCardComponent,
  DcxNgChipComponent,
  CAROUSEL_DEFAULT_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgCarouselComponent> = {
  title: 'DCXLibrary/Components/Carousel',
  component: DcxNgCarouselComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DcxNgCarouselComponent,
        DcxNgCardComponent,
        DcxNgChipComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    autoplayInterval: {
      control: { type: 'number', min: 0, step: 500 },
    },
  },
  args: {
    value: CAROUSEL_DEFAULT_ITEMS,
    circular: false,
    orientation: 'horizontal',
    showNavigators: true,
    showIndicators: true,
    autoplayInterval: 0,
  },
};

export default meta;
type Story = StoryObj<DcxNgCarouselComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div [style.max-width]="orientation === 'horizontal' ? '450px' : '400px'" 
           [style.height]="orientation === 'vertical' ? '600px' : 'auto'" 
           style="margin: auto; padding: 20px;">
        <dcx-ng-carousel 
          [value]="value"
          [circular]="circular"
          [orientation]="orientation"
          [showNavigators]="showNavigators"
          [showIndicators]="showIndicators"
          [autoplayInterval]="autoplayInterval"
          [style.height]="orientation === 'vertical' ? '100%' : 'auto'"
        >
          <ng-template #item let-data>
            <dcx-ng-card 
              [title]="data.title" 
              [content]="cardContentTpl"
              [image]="data.image"
              [interactive]="true"
              style="width: 100%; height: 100%;"
            >
              <ng-template #cardContentTpl>
                <dcx-ng-chip [label]="data.tag" size="s" style="margin-bottom: 8px; display: inline-block;"></dcx-ng-chip>
                <p style="margin: 0; font-size: 14px; color: var(--text-muted, #696e75);">{{ data.description }}</p>
              </ng-template>
            </dcx-ng-card>
          </ng-template>
        </dcx-ng-carousel>
      </div>
    `,
  }),
};

export const AutoplayCircular: Story = {
  args: {
    circular: true,
    autoplayInterval: 3000,
  },
  render: Default.render,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 650px; max-width: 400px; margin: auto; padding: 20px;">
        <dcx-ng-carousel 
          [value]="value"
          [circular]="circular"
          [orientation]="orientation"
          [showNavigators]="showNavigators"
          [showIndicators]="showIndicators"
          [autoplayInterval]="autoplayInterval"
          style="height: 100%;"
        >
          <ng-template #item let-data>
            <dcx-ng-card 
              [title]="data.title" 
              [image]="data.image"
              [content]="verticalContentTpl"
              style="width: 100%; height: 100%;"
            >
              <ng-template #verticalContentTpl>
                <p style="margin: 0; font-size: 14px; color: var(--text-muted, #696e75);">{{ data.description }}</p>
              </ng-template>
            </dcx-ng-card>
          </ng-template>
        </dcx-ng-carousel>
      </div>
    `,
  }),
};

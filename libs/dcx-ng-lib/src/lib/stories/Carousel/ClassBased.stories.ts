import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  DcxNgCarouselComponent,
  DcxNgCardComponent,
  DcxNgChipComponent,
  DcxNgListComponent,
  DcxNgRadioComponent,
  CAROUSEL_DEFAULT_ITEMS,
  CAROUSEL_MIXED_ITEMS,
  LIST_ITEMS_WITH_ICONS,
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
        DcxNgListComponent,
        DcxNgRadioComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'Array de elementos a mostrar en el carousel.',
      table: {
        category: 'Attributes',
        type: { summary: 'any[]' },
      },
    },
    circular: {
      control: 'boolean',
      description: 'Indica si el carousel es infinito.',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Dirección del desplazamiento del carousel.',
      table: {
        category: 'Attributes',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    showNavigators: {
      control: 'boolean',
      description: 'Muestra u oculta los botones de navegación (prev/next).',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showIndicators: {
      control: 'boolean',
      description: 'Muestra u oculta los indicadores de página.',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    autoplayInterval: {
      control: { type: 'number', min: 0, step: 500 },
      description:
        'Tiempo en milisegundos para el cambio automático de slide (0 para desactivar).',
      table: {
        category: 'Attributes',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    pageChange: {
      description: 'Evento que se dispara al cambiar de página.',
      table: {
        category: 'Events',
      },
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
  render: args => ({
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
  render: args => ({
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

export const MixedContent: Story = {
  args: {
    value: CAROUSEL_MIXED_ITEMS,
    circular: true,
  },
  render: args => ({
    props: {
      ...args,
      listItems: LIST_ITEMS_WITH_ICONS,
    },
    template: `
      <div style="max-width: 450px; margin: auto; padding: 20px;">
        <dcx-ng-carousel 
          [value]="value"
          [circular]="circular"
          [showIndicators]="true"
        >
          <ng-template #item let-data>
            <div style="display: flex; align-items: center; justify-content: center; min-height: 240px; padding: 16px;">
              <div style="width: 100%; max-width: 320px;">
                @switch (data.type) {
                  @case ('list') {
                    <h3 style="margin: 0 0 12px 0;">{{ data.title }}</h3>
                    <dcx-ng-list [items]="listItems"
                    [selectable]="true"
                    (selectionChanged)="onSelectionChanged($event)"></dcx-ng-list>
                  }
                  @case ('radio') {
                    <h3 style="margin: 0 0 12px 0;">{{ data.title }}</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      <dcx-ng-radio [name]="'group-' + data.id" [value]="'1'" label="Basic option"></dcx-ng-radio>
                      <dcx-ng-radio [name]="'group-' + data.id" [value]="'2'" label="Pro option"></dcx-ng-radio>
                      <dcx-ng-radio [name]="'group-' + data.id" [value]="'3'" label="Premium option"></dcx-ng-radio>
                    </div>
                  }
                  @default {
                    <dcx-ng-card
                      [title]="data.title"
                      [interactive]="true"
                    >
                    </dcx-ng-card>
                  }
                }
              </div>
            </div>
          </ng-template>
        </dcx-ng-carousel>
      </div>
    `,
  }),
};

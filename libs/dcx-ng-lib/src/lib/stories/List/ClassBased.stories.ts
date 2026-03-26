import {
  DcxListItem,
  DcxNgChipComponent,
  DcxNgListComponent,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_SUBLISTS,
  MULTI_SELECT_LIST_ITEMS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgListComponent> = {
  title: 'DCXLibrary/Components/List',
  component: DcxNgListComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
    selectable: { control: 'boolean' },
    multiSelect: { control: 'boolean' },
  },
  args: {
    items: SIMPLE_LIST_ITEMS,
    selectable: false,
    multiSelect: false,
  },
  decorators: [
    story => {
      const sc = story();

      return {
        template: `
        <div class="story-wrapper">
          ${sc.template}
        </div>
      `,
        props: sc.props,
        styles: [
          `
        .story-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: 'Inter', sans-serif;
        }
        `,
        ],
      };
    },
  ],
};

export default meta;
type Story = StoryObj<DcxNgListComponent>;

export const Simple: Story = {
  render: args => ({
    props: args,
    template: `
        <h3>Lista simple sin iconos</h3>
        <dcx-ng-list [items]="items" [selectable]="selectable" [multiSelect]="multiSelect"></dcx-ng-list>
        <div>
          Total items: <strong>{{ items?.length ?? 0 }}</strong>
        </div>
    `,
    styleUrls: ['story.scss'],
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_ICONS,
    },
    template: `
      <h3>Lista con iconos</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
  `,
  }),
};

export const WithSubLists: Story = {
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_SUBLISTS,
    },
    template: `
      <h3>Lista con sublistas</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
    `,
  }),
};

export const Selectable: Story = {
  render: () => ({
    props: {
      items: SELECTABLE_LIST_ITEMS,
      selectedItem: null as any,
      onItemSelected(event: any) {
        this['selectedItem'] = event;
      },
      onItemDeselected(_event: any) {
        this['selectedItem'] = null;
      },
    },
    template: `
      <h3>Lista seleccionable</h3>
      <dcx-ng-list 
        [items]="items" 
        [selectable]="true"
        (itemSelected)="onItemSelected($event)"
        (itemDeselected)="onItemDeselected($event)">
      </dcx-ng-list>
      @if (selectedItem) {
        <div>
          <strong>Seleccionado:</strong> {{ selectedItem.item.text || selectedItem.item }} (index: {{ selectedItem.index }})
        </div>
      }
    `,
  }),
};

export const MultiSelectable: Story = {
  render: () => ({
    props: {
      items: MULTI_SELECT_LIST_ITEMS,
      selected: [] as { item: DcxListItem; index: number }[],
      onSelectionChanged($event: { item: DcxListItem; index: number }[]) {
        this['selected'] = $event;
      },
    },
    template: `
        <style>
          strong {margin-right: 10px};
        </style>

        <h3>Lista con multiselección</h3>
        <dcx-ng-list
          [items]="items" 
          [selectable]="true"
          [multiSelect]="true"
          (selectionChanged)="onSelectionChanged($event)">
        </dcx-ng-list>
        @if (selected.length > 0) {
          <div class="selected">
            <strong>Seleccionados ({{ selected.length }}):</strong>
            @for (selected of selected; track selected.index) {
              <span>{{selected.item.text}}</span>
              <span>{{ $last ? '' : ', ' }}</span>
            }
          </div>
        }
    `,
  }),
};

import { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgListComponent,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_SUBLISTS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
  MULTI_SELECT_LIST_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';

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
};

export default meta;
type Story = StoryObj<DcxNgListComponent>;

export const Simple: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="story">
        <h3>Lista simple sin iconos</h3>
        <dcx-ng-list [items]="items" [selectable]="selectable" [multiSelect]="multiSelect"></dcx-ng-list>
        <div>
          Total items: <strong>{{ items?.length ?? 0 }}</strong>
        </div>
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
      <div>
        <h3>Lista con iconos</h3>
        <dcx-ng-list [items]="items"></dcx-ng-list>
      </div>
    `,
  }),
};

export const WithSubLists: Story = {
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_SUBLISTS,
    },
    template: `
      <div>
        <h3>Lista con sublistas</h3>
        <dcx-ng-list [items]="items"></dcx-ng-list>
      </div>
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
      <div>
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
      </div>
    `,
  }),
};

export const MultiSelectable: Story = {
  render: () => ({
    props: {
      items: MULTI_SELECT_LIST_ITEMS,
      selectedItems: [] as any[],
      onItemSelected(event: any) {
        this['selectedItems'] = [...this['selectedItems'], event];
      },
      onItemDeselected(event: any) {
        this['selectedItems'] = this['selectedItems'].filter(
          (i: any) => i.index !== event.index,
        );
      },
    },
    template: `
      <div>
        <h3>Lista con multiselección</h3>
        <dcx-ng-list 
          [items]="items" 
          [selectable]="true"
          [multiSelect]="true"
          (itemSelected)="onItemSelected($event)"
          (itemDeselected)="onItemDeselected($event)">
        </dcx-ng-list>
        @if (selectedItems.length > 0) {
          <div>
            <strong>Seleccionados ({{ selectedItems.length }}):</strong>
            @for (selected of selectedItems; track selected.index) {
              <span>{{ selected.item.text }}</span>{{ $last ? '' : ', ' }}
            }
          </div>
        }
      </div>
    `,
  }),
};

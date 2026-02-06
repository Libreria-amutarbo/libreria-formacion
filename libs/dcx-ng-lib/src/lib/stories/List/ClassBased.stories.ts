import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgListComponent, LIST_ITEMS_WITH_ICONS, LIST_ITEMS_WITH_SUBLISTS, SELECTABLE_LIST_ITEMS, SIMPLE_LIST_ITEMS } from '@dcx-ng-components/dcx-ng-lib';


const meta: Meta<DcxNgListComponent> = {
  title: 'DCXLibrary/List/Class based',
  component: DcxNgListComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
    selectable: { control: 'boolean' },
  },
  args: {
    items: SIMPLE_LIST_ITEMS,
    selectable: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgListComponent>;

export const Simple: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div>
        <h3>Lista simple sin iconos</h3>
        <dcx-ng-list [items]="items"></dcx-ng-list>
        <div>
          Total items: <strong>{{ items?.length ?? 0 }}</strong>
        </div>
      </div>
    `,
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
        console.log('Item selected:', event);
      }
    },
    template: `
      <div>
        <h3>Lista seleccionable</h3>
        <dcx-ng-list 
          [items]="items" 
          [selectable]="true"
          (itemSelected)="onItemSelected($event)">
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

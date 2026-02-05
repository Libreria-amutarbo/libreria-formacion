import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgListComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgListComponent> = {
  title: 'DCXLibrary/List/Class based',
  component: DcxNgListComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
    selectable: { control: 'boolean' },
  },
  args: {
    items: ['Uno', 'Dos', 'Tres', 'Cuatro'],
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
      items: [
        { text: 'Home', icon: 'house-door' },
        { text: 'Settings', icon: 'gear' },
        { text: 'Profile', icon: 'person' },
        { text: 'Messages', icon: 'envelope' },
      ],
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
      items: [
        {
          text: 'Frutas',
          icon: 'basket',
          children: [
            { text: 'Manzana' },
            { text: 'Naranja' },
            { text: 'Plátano' },
          ]
        },
        {
          text: 'Verduras',
          icon: 'basket2',
          children: [
            { text: 'Zanahoria' },
            { text: 'Lechuga' },
          ]
        },
        {
          text: 'Lácteos',
          icon: 'cup',
        },
      ],
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
      items: [
        { text: 'Option 1', icon: 'check-circle' },
        { text: 'Option 2', icon: 'check-circle' },
        { text: 'Option 3', icon: 'check-circle' },
        { text: 'Option 4', icon: 'check-circle' },
      ],
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

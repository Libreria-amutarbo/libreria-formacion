import { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgListComponent,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_NESTED_SUBLISTS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
  MULTI_SELECT_LIST_ITEMS,
  LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
} from '@dcx-ng-components/dcx-ng-lib';

type ListSelectionEvent = { item: { text?: string }; index: number };

const meta: Meta<DcxNgListComponent> = {
  title: 'DCXLibrary/Components/List',
  component: DcxNgListComponent,
  tags: ['autodocs'],
  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description: 'Array de elementos que se renderizan en la lista',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxListItem[]' },
      },
    },
    selectable: {
      name: 'selectable',
      control: { type: 'boolean' },
      description: 'Habilita selección de elementos',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiSelect: {
      name: 'multiSelect',
      control: { type: 'boolean' },
      description:
        'Permite seleccionar múltiples elementos cuando selectable=true',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showChildrenIndicator: {
      name: 'showChildrenIndicator',
      control: { type: 'boolean' },
      description: 'Muestra un indicador visual cuando un item tiene hijos',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    renderChildren: {
      name: 'renderChildren',
      control: { type: 'boolean' },
      description: 'Renderiza listas anidadas para items con children',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    itemSelected: {
      name: 'itemSelected',
      action: 'itemSelected',
      description: 'Evento emitido al seleccionar un item',
      table: {
        category: 'Eventos',
        type: {
          summary: '(event: { item: DcxListItem; index: number }) => void',
        },
        defaultValue: { summary: '-' },
      },
    },
    itemDeselected: {
      name: 'itemDeselected',
      action: 'itemDeselected',
      description:
        'Evento emitido al deseleccionar un item en modo multi-select',
      table: {
        category: 'Eventos',
        type: {
          summary: '(event: { item: DcxListItem; index: number }) => void',
        },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {
    items: SIMPLE_LIST_ITEMS,
    selectable: true,
    multiSelect: false,
    showChildrenIndicator: false,
    renderChildren: true,
  },
};

export default meta;
type Story = StoryObj<DcxNgListComponent>;

export const Simple: Story = {
  render: args => ({
    props: { ...args },
    template: `
      <div style="max-width: 600px;">
        <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Vista General</div>
        <dcx-ng-list
          [items]="items"
          [selectable]="true"
          [multiSelect]="multiSelect"
          [showChildrenIndicator]="showChildrenIndicator"
          [renderChildren]="renderChildren"
          (itemSelected)="itemSelected($event)"
          (itemDeselected)="itemDeselected($event)">
        </dcx-ng-list>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: args => ({
    props: {
      ...args,
      items: LIST_ITEMS_WITH_ICONS,
    },
    template: `
      <div style="max-width: 600px;">
        <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Navegación con Iconos</div>
        <dcx-ng-list
          [items]="items"
          [selectable]="true"
          [multiSelect]="multiSelect"
          [showChildrenIndicator]="showChildrenIndicator"
          [renderChildren]="renderChildren"
          (itemSelected)="itemSelected($event)"
          (itemDeselected)="itemDeselected($event)">
        </dcx-ng-list>
      </div>
    `,
  }),
};

export const WithDescription: Story = {
  render: args => ({
    props: {
      ...args,
      items: LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
    },
    template: `
      <div style="max-width: 600px;">
        <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Información Detallada</div>
        <dcx-ng-list
          [items]="items"
          [selectable]="true"
          [multiSelect]="multiSelect"
          [showChildrenIndicator]="showChildrenIndicator"
          [renderChildren]="renderChildren"
          (itemSelected)="itemSelected($event)"
          (itemDeselected)="itemDeselected($event)">
        </dcx-ng-list>
      </div>
    `,
  }),
};

export const WithSubLists: Story = {
  render: args => ({
    props: {
      ...args,
      items: LIST_ITEMS_WITH_NESTED_SUBLISTS,
    },
    template: `
      <div style="max-width: 600px;">
        <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Jerarquía de Elementos</div>
        <dcx-ng-list
          [items]="items"
          [selectable]="true"
          [multiSelect]="multiSelect"
          [showChildrenIndicator]="showChildrenIndicator"
          [renderChildren]="renderChildren"
          (itemSelected)="itemSelected($event)"
          (itemDeselected)="itemDeselected($event)">
        </dcx-ng-list>
      </div>
    `,
  }),
};

export const Selectable: Story = {
  render: args => ({
    props: {
      ...args,
      items: SELECTABLE_LIST_ITEMS,
      selectedItem: null as ListSelectionEvent | null,
      onItemSelected(event: ListSelectionEvent) {
        this['selectedItem'] = event;
        this['itemSelected'](event);
      },
      onItemDeselected(event: ListSelectionEvent) {
        this['itemDeselected'](event);
      },
    },
    template: `
      <div style="max-width: 600px;">
        <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Selección Individual</div>
        <dcx-ng-list 
          [items]="items" 
          [selectable]="true"
          [multiSelect]="false"
          [showChildrenIndicator]="showChildrenIndicator"
          [renderChildren]="renderChildren"
          (itemSelected)="onItemSelected($event)"
          (itemDeselected)="onItemDeselected($event)">
        </dcx-ng-list>
        @if (selectedItem) {
          <div style="margin-top: 1rem; padding: 0.75rem; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae6fd; font-size: 13px; color: #0369a1;">
            <strong>Seleccionado:</strong> {{ selectedItem.item.text || selectedItem.item }} (index: {{ selectedItem.index }})
          </div>
        }
      </div>
    `,
  }),
};

export const MultiSelectable: Story = {
  render: args => ({
    props: {
      ...args,
      items: MULTI_SELECT_LIST_ITEMS,
      selectedItems: [] as ListSelectionEvent[],
      onItemSelected(event: ListSelectionEvent) {
        const exists = this['selectedItems'].find(
          (item: ListSelectionEvent) => item.index === event.index,
        );
        if (!exists) {
          this['selectedItems'] = [...this['selectedItems'], event];
        }
        this['itemSelected'](event);
      },
      onItemDeselected(event: ListSelectionEvent) {
        this['selectedItems'] = this['selectedItems'].filter(
          (item: ListSelectionEvent) => item.index !== event.index,
        );
        this['itemDeselected'](event);
      },
    },
    template: `
      <div style="max-width: 600px;">
        <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Selección Múltiple</div>
        <dcx-ng-list 
          [items]="items" 
          [selectable]="true"
          [multiSelect]="true"
          [showChildrenIndicator]="showChildrenIndicator"
          [renderChildren]="renderChildren"
          (itemSelected)="onItemSelected($event)"
          (itemDeselected)="onItemDeselected($event)">
        </dcx-ng-list>
        @if (selectedItems.length > 0) {
          <div style="margin-top: 1rem; padding: 1rem; border-top: 1px solid #f1f5f9;">
            <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">Elementos seleccionados ({{ selectedItems.length }}):</div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              @for (selected of selectedItems; track selected.index) {
                <span style="background: #eff6ff; color: #1d4ed8; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; border: 1px solid #dbeafe;">
                  {{ selected.item.text }}
                </span>
              }
            </div>
          </div>
        }
      </div>
    `,
  }),
};

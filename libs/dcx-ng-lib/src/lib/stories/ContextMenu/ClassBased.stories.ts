import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ContextMenuComponent } from '../../dcx-ng-components/dcx-ng-contextMenu/dcx-ng-contextMenu.component';
import { CommonModule } from '@angular/common';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { DcxNgFullTableComponent } from '../../dcx-ng-components/dcx-ng-full-table/dcx-ng-full-table.component';
import { DcxNgFullTableTemplateDirective } from '../../dcx-ng-components/dcx-ng-full-table/dcx-ng-full-table-template.directive';
import {
  CONTEXT_MENU_ITEMS_BASIC,
  CONTEXT_MENU_ITEM_SINGLE,
  CONTEXT_MENU_ITEMS_MANY,
  CONTEXT_MENU_ITEMS_WITH_ICONS,
  CONTEXT_MENU_ITEMS_ADVANCED,
  TABLE_HEADERS_WITH_ACTIONS,
  TABLE_DATA_WITH_ACTIONS,
  getRowContextMenuItems,
} from '../../core/mock';

const meta: Meta<ContextMenuComponent> = {
  title: 'DCXLibrary/ContextMenu/ClassBased',
  component: ContextMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ContextMenuComponent, DcxNgButtonComponent, DcxNgFullTableComponent, DcxNgFullTableTemplateDirective],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description: 'Array of menu items with label and action',
      table: {
        category: 'Attributes',
        type: { summary: 'ContextMenuItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    visible: {
      name: 'visible',
      control: { type: 'boolean' },
      description: 'Controls visibility of the context menu',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      name: 'position',
      control: { type: 'object' },
      description: 'Position of the context menu (x, y coordinates)',
      table: {
        category: 'Attributes',
        type: { summary: 'Position' },
        defaultValue: { summary: '{ x: 0, y: 0 }' },
      },
    },
    closeOnClickOutside: {
      name: 'closeOnClickOutside',
      control: { type: 'boolean' },
      description: 'Close menu when clicking outside',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closed: {
      name: 'closed',
      action: 'closed',
      description: 'Event emitted when the menu is closed',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    items: CONTEXT_MENU_ITEMS_BASIC,
    visible: false,
    position: { x: 0, y: 0 },
    closeOnClickOutside: true,
  },
};

export default meta;
type Story = StoryObj<ContextMenuComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <div 
          (click)="onOpenMenu($event)"
          (contextmenu)="onOpenMenu($event)"
          style="position: relative; width: 400px; height: 300px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
          <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
            <strong>Click anywhere in this area</strong> to open the context menu
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_BASIC,
  },
};


export const SingleItem: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <div 
          (click)="onOpenMenu($event)"
          (contextmenu)="onOpenMenu($event)"
          style="position: relative; width: 400px; height: 300px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
          <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
            <strong>Click here</strong> - Menu with single item
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEM_SINGLE,
  },
};

export const ManyItems: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <div 
          (click)="onOpenMenu($event)"
          (contextmenu)="onOpenMenu($event)"
          style="position: relative; width: 400px; height: 400px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
          <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
            <strong>Click here</strong> - Menu with multiple items
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_MANY,
  },
};

export const InTable: Story = {
  render: (args) => ({
    props: {
      ...args,
      activeMenuRow: -1,
      menuPosition: { x: 0, y: 0 },
      tableHeaders: TABLE_HEADERS_WITH_ACTIONS,
      tableData: TABLE_DATA_WITH_ACTIONS,
      onButtonClick(event: MouseEvent, row: any, rowIndex: number) {
        event.preventDefault();
        event.stopPropagation();
        
        const button = event.currentTarget as HTMLElement;
        const buttonRect = button.getBoundingClientRect();
        
        (this as any).menuPosition = {
          x: buttonRect.right + 5,
          y: buttonRect.top
        };
        
        (this as any).activeMenuRow = rowIndex;
      },
      onClosed() {
        (this as any).activeMenuRow = -1;
      },
      getRowActions: getRowContextMenuItems,
      onRowAction(event: any) {
      },
    },
    template: `
      <div class="table-container" style="position: relative; width: 100%; max-width: 800px;">
        <p style="margin: 0 0 16px 0; color: #666; user-select: none;">
          <strong>Click the button (⋮)</strong> in the Actions column to open context menu for each row
        </p>
        
        <dcx-ng-full-table
          [headers]="tableHeaders"
          [rows]="tableData"
          [showGrid]="true"
          [showStripped]="true"
          [scroll]="false"
          [paginator]="false"
          [showRowIndex]="true"
          [rowIndexLabel]="'#'"
          (rowAction)="onRowAction($event)">
          
          <ng-template dcxNgFullTableTemplate="actions" let-row let-key="key" let-rowIndex="rowIndex">
            <div style="position: relative; display: inline-block;" class="action-cell-{{rowIndex}}">
              <dcx-ng-button
                (buttonClick)="onButtonClick($event, row, rowIndex)"
                [label]="''"
                [ariaLabel]="'Open menu for ' + row.name"
                variant="icon"
                size="s"
                iconStart="three-dots-vertical">
              </dcx-ng-button>
              @if (activeMenuRow === rowIndex) {
                <dcx-ng-context-menu
                  [items]="getRowActions(row)"
                  [visible]="true"
                  [position]="menuPosition"
                  (closed)="onClosed()">
                </dcx-ng-context-menu>
              }
            </div>
          </ng-template>
          
        </dcx-ng-full-table>
      </div>
    `,
  }),
  args: {
    items: []
  },
};

export const WithIcons: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <div 
          (click)="onOpenMenu($event)"
          (contextmenu)="onOpenMenu($event)"
          style="position: relative; width: 400px; height: 300px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
          <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
            <strong>Click here</strong> - Menu with icons
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_WITH_ICONS,
  },
};

export const AdvancedMenu: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onOpenMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        (this as any).menuPosition = { 
          x: event.clientX, 
          y: event.clientY 
        };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div>
        <div 
          (click)="onOpenMenu($event)"
          (contextmenu)="onOpenMenu($event)"
          style="position: relative; width: 400px; height: 500px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
          <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
            <strong>Click here</strong> - Advanced menu with icons, separators, and disabled items
          </p>
        </div>
        <dcx-ng-context-menu
          [items]="items"
          [visible]="menuVisible"
          [position]="menuPosition"
          (closed)="onClosed()">
        </dcx-ng-context-menu>
      </div>
    `,
  }),
  args: {
    items: CONTEXT_MENU_ITEMS_ADVANCED,
  },
};

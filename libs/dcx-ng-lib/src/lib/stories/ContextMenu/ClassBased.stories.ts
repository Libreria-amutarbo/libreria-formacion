import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ContextMenuComponent } from '../../dcx-ng-components/dcx-ng-contextMenu/dcx-ng-contextMenu.component';
import { DcxContextMenuItem, DcxHeaderData } from '../../core/interfaces';
import { CommonModule } from '@angular/common';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { DcxNgFullTableComponent } from '../../dcx-ng-components/dcx-ng-full-table/dcx-ng-full-table.component';
import { DcxNgFullTableTemplateDirective } from '../../dcx-ng-components/dcx-ng-full-table/dcx-ng-full-table-template.directive';

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
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with label and action',
      table: {
        category: 'Attributes',
      },
    },
    visible: {
      control: 'boolean',
      description: 'Controls visibility of the context menu',
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: 'object',
      description: 'Position of the context menu (x, y coordinates)',
      table: {
        category: 'Attributes',
        defaultValue: { summary: '{ x: 0, y: 0 }' },
      },
    },
    closed: {
      action: 'closed',
      description: 'Event emitted when the menu is closed',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ContextMenuComponent>;

const mockItems: DcxContextMenuItem[] = [
  {
    label: 'Edit',
    action: () => ({}),
  },
  {
    label: 'Delete',
    action: () => ({}),
  },
  {
    label: 'Share',
    action: () => ({}),
  },
];

const basicItems: DcxContextMenuItem[] = [
  {
    label: 'Option 1',
    action: () => ({}),
  },
  {
    label: 'Option 2',
    action: () => ({}),
  },
];

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: true,
      menuPosition: { x: 50, y: 50 },
      onClick(event: MouseEvent) {
        event.stopPropagation();
        (this as any).menuPosition = { x: event.offsetX, y: event.offsetY };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div 
        (click)="onClick($event)"
        style="position: relative; width: 400px; height: 300px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
        <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
          <strong>Click anywhere in this area</strong> to open the context menu
        </p>
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
    items: mockItems,
  },
};


export const SingleItem: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onClick(event: MouseEvent) {
        event.stopPropagation();
        (this as any).menuPosition = { x: event.offsetX, y: event.offsetY };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div 
        (click)="onClick($event)"
        style="position: relative; width: 400px; height: 300px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
        <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
          <strong>Click here</strong> - Menu with single item
        </p>
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
    items: [
      {
        label: 'Single Option',
        action: () => ({}),
      },
    ],
  },
};

export const ManyItems: Story = {
  render: (args) => ({
    props: {
      ...args,
      menuVisible: false,
      menuPosition: { x: 50, y: 50 },
      onClick(event: MouseEvent) {
        event.stopPropagation();
        (this as any).menuPosition = { x: event.offsetX, y: event.offsetY };
        (this as any).menuVisible = true;
      },
      onClosed() {
        (this as any).menuVisible = false;
      },
    },
    template: `
      <div 
        (click)="onClick($event)"
        style="position: relative; width: 400px; height: 400px; border: 1px dashed #ccc; padding: 20px; cursor: pointer;">
        <p style="margin: 0 0 10px 0; color: #666; user-select: none;">
          <strong>Click here</strong> - Menu with multiple items
        </p>
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
    items: [
      { label: 'Open', action: () => ({}) },
      { label: 'Edit', action: () => ({}) },
      { label: 'Copy', action: () => ({}) },
      { label: 'Paste', action: () => ({}) },
      { label: 'Delete', action: () => ({}) },
      { label: 'Share', action: () => ({}) },
    ],
  },
};

export const InTable: Story = {
  render: (args) => ({
    props: {
      ...args,
      activeMenuRow: -1,
      menuPosition: { x: 0, y: 0 },
      tableHeaders: [
        { key: 'id', name: 'ID', sortable: false },
        { key: 'name', name: 'Name', sortable: true },
        { key: 'email', name: 'Email', sortable: true },
        { key: 'role', name: 'Role', sortable: false },
        { 
          key: 'actions', 
          name: 'Actions', 
          sortable: false,
          template: 'actions',
          align: 'center',
          frozenRight: true
        },
      ] as DcxHeaderData[],
      tableData: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
      ],
      onButtonClick(event: any, row: any, rowIndex: number) {
        const actionCell = document.querySelector('.action-cell-' + rowIndex) as HTMLElement;
        const tableContainer = document.querySelector('.table-container') as HTMLElement;
        
        if (actionCell && tableContainer) {
          const cellRect = actionCell.getBoundingClientRect();
          const containerRect = tableContainer.getBoundingClientRect();
          
          (this as any).menuPosition = {
            x: cellRect.left - containerRect.left + cellRect.width + 5,
            y: cellRect.top - containerRect.top
          };
        } else {
          (this as any).menuPosition = { x: 200, y: rowIndex * 50 };
        }
        
        (this as any).activeMenuRow = rowIndex;
      },
      onClosed() {
        (this as any).activeMenuRow = -1;
      },
      getRowActions(row: any) {
        return [
          { label: 'Edit ' + row.name, action: () => ({}) },
          { label: 'Delete ' + row.name, action: () => ({}) },
          { label: 'View Details', action: () => ({}) },
          { label: 'Send Email', action: () => ({}) },
        ];
      },
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

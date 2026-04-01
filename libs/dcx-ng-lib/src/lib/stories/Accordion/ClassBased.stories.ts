import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  DcxNgAccordionComponent,
  DcxNgButtonComponent,
  DcxNgListComponent,
  DcxNgInputComponent,
  DcxInputType,
  DcxAccordionTransitionList,
  DcxAccordionDefault,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsDisabled,
  DcxAccordionLargeContent,
  DcxAccordionItemsContentDisabled,
  LIST_ITEMS_MOCK,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgAccordionComponent> = {
  title: 'DCXLibrary/Components/Accordion',
  component: DcxNgAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DcxNgAccordionComponent,
        DcxNgButtonComponent,
        DcxNgListComponent,
        DcxNgInputComponent,
      ],
    }),
  ],
  tags: ['autodocs'],

  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description:
        'Array of accordion items with title, content, and optional properties',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxNgAccordionItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    transition: {
      name: 'transition',
      control: { type: 'select' },
      options: DcxAccordionTransitionList,
      description: 'Transition effect when expanding/collapsing items',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxAccordionTransition' },
        defaultValue: { summary: 'smooth' },
      },
    },
    closeOthers: {
      name: 'closeOthers',
      control: { type: 'boolean' },
      description:
        'When true, opening one item closes all others (accordion mode)',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    expandedIds: {
      name: 'expandedIds',
      control: { type: 'object' },
      description: 'Array of item IDs that should be expanded by default',
      table: {
        category: 'Attributes',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    itemToggled: {
      name: 'itemToggled',
      action: 'itemToggled',
      description: 'Event emitted when any item is toggled',
      table: {
        category: 'Events',
        type: { summary: '(item: DcxNgAccordionItem) => void' },
      },
    },
    itemExpanded: {
      name: 'itemExpanded',
      action: 'itemExpanded',
      description: 'Event emitted when an item is expanded',
      table: {
        category: 'Events',
        type: { summary: '(item: DcxNgAccordionItem) => void' },
      },
    },
    itemCollapsed: {
      name: 'itemCollapsed',
      action: 'itemCollapsed',
      description: 'Event emitted when an item is collapsed',
      table: {
        category: 'Events',
        type: { summary: '(item: DcxNgAccordionItem) => void' },
      },
    },
  },
  args: {
    items: DcxAccordionDefault,
    transition: 'smooth',
    closeOthers: true,
    expandedIds: [],
  },
};

export default meta;
type Story = StoryObj<DcxNgAccordionComponent>;

export const Default: Story = {
  args: {
    items: DcxAccordionDefault,
  },
};

export const WithIcons: Story = {
  args: {
    items: DcxAccordionItemsWithIcon,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: DcxAccordionItemsDisabled,
  },
};

export const WithContentDisabledItems: Story = {
  args: {
    items: DcxAccordionItemsContentDisabled,
  },
};

export const MultipleOpen: Story = {
  args: {
    items: DcxAccordionItemsWithExpanded,
    closeOthers: false,
  },
};

export const FastTransition: Story = {
  args: {
    items: DcxAccordionDefault,
    transition: 'fast',
  },
};

export const SlowTransition: Story = {
  args: {
    items: DcxAccordionDefault,
    transition: 'slow',
  },
};

export const NoTransition: Story = {
  args: {
    items: DcxAccordionDefault,
    transition: 'none',
  },
};

export const LargeContent: Story = {
  args: {
    items: DcxAccordionLargeContent,
  },
};

export const WithComponents: Story = {
  render: args => ({
    props: {
      ...args,
      buttonTemplate: null as any,
      formTemplate: null as any,
      listTemplate: null as any,
      listItems: [...LIST_ITEMS_MOCK],
      DcxInputType: DcxInputType,
      addItem() {
        const currentItems = this['listItems'] as string[];
        const newItemNumber = currentItems.length + 1;
        this['listItems'] = [...currentItems, `Item ${newItemNumber}`];
      },
      removeLastItem() {
        const currentItems = this['listItems'] as string[];
        if (currentItems.length > 0) {
          this['listItems'] = currentItems.slice(0, -1);
        }
      },
    },
    template: `
      <ng-template #buttonTemplate>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; padding: 8px 0;">
          <dcx-ng-button
            [label]="'Primary Action'"
            [variant]="'primary'"
            [size]="'m'">
          </dcx-ng-button>
          <dcx-ng-button
            [label]="'Secondary Action'"
            [variant]="'secondary'"
            [size]="'m'">
          </dcx-ng-button>
          <dcx-ng-button
            [label]="'Outline Action'"
            [variant]="'outline'"
            [size]="'m'">
          </dcx-ng-button>
        </div>
      </ng-template>

      <ng-template #formTemplate>
        <div style="display: flex; flex-direction: column; gap: 12px; padding: 8px 0;">
          <dcx-ng-input
            [label]="'Name'"
            [placeholder]="'Enter your name...'"
            [type]="DcxInputType.TEXT"
            [size]="'m'"
            [required]="true">
          </dcx-ng-input>
          
          <dcx-ng-input
            [label]="'Email'"
            [placeholder]="'Enter your email...'"
            [type]="DcxInputType.EMAIL"
            [size]="'m'"
            [required]="true">
          </dcx-ng-input>
          
          <dcx-ng-button
            [label]="'Submit'"
            [variant]="'primary'"
            [size]="'m'">
          </dcx-ng-button>
        </div>
      </ng-template>

      <ng-template #listTemplate>
        <div style="padding: 8px 0;">
          <dcx-ng-list [items]="listItems"></dcx-ng-list>
          
          <div style="margin-top: 12px; display: flex; gap: 8px;">
            <dcx-ng-button
              [label]="'Add Item'"
              [iconStart]="'plus'"
              [variant]="'primary'"
              [size]="'s'"
              (buttonClick)="addItem()">
            </dcx-ng-button>
            <dcx-ng-button
              [label]="'Remove Last'"
              [iconStart]="'trash'"
              [variant]="'outline'"
              [size]="'s'"
              (buttonClick)="removeLastItem()">
            </dcx-ng-button>
          </div>
        </div>
      </ng-template>

      <dcx-ng-accordion
        [items]="[
          {
            id: '1',
            title: 'Interactive Buttons',
            icon: 'hand-pointer',
            contentTemplate: buttonTemplate
          },
          {
            id: '2',
            title: 'Form Components',
            icon: 'file-text',
            contentTemplate: formTemplate
          },
          {
            id: '3',
            title: 'Dynamic List',
            icon: 'list',
            contentTemplate: listTemplate
          }
        ]"
        [transition]="'smooth'"
        [closeOthers]="true">
      </dcx-ng-accordion>
    `,
  }),
};

export const ExternalControl: Story = {
  render: args => ({
    props: {
      ...args,
    },
    template: `
      <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
        <dcx-ng-button 
          [label]="'Abrir Item 1'" 
          [variant]="'primary'" 
          (buttonClick)="externalAccordion.expandItemById('1')">
        </dcx-ng-button>
        
        <dcx-ng-button 
          [label]="'Abrir Item 2'" 
          [variant]="'secondary'" 
          (buttonClick)="externalAccordion.expandItemById('2')">
        </dcx-ng-button>

         <dcx-ng-button 
          [label]="'Cerrar Item 1'" 
          [variant]="'secondary'" 
          (buttonClick)="externalAccordion.collapseItemById('1')">
        </dcx-ng-button>
      </div>

      <dcx-ng-accordion 
        #externalAccordion 
        [items]="items" 
        [transition]="'smooth'">
      </dcx-ng-accordion>
    `,
  }),
  args: {
    items: DcxAccordionDefault,
  },
};

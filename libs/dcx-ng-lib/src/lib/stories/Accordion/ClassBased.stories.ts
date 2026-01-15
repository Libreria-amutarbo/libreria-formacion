import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  DcxNgAccordionComponent,
  DcxNgButtonComponent,
  DcxNgListComponent,
  DcxNgInputComponent,
  DcxInputType,
  DcxAccordionMock,
  ACCORDION_ITEMS_WITH_ICONS,
  ACCORDION_ITEMS_WITH_EXPANDED,
  ACCORDION_ITEMS_COMPLEX,
  ACCORDION_ITEMS_LARGE_CONTENT
} from '@dcx-ng-components/dcx-ng-lib';

const LIST_ITEMS_MOCK = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const meta: Meta<DcxNgAccordionComponent> = {
  title: 'DCXLibrary/Accordion/ClassBased',
  component: DcxNgAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgAccordionComponent, DcxNgButtonComponent, DcxNgListComponent, DcxNgInputComponent],
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
      description: 'Array of accordion items with title, content, and optional properties',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxNgAccordionItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    transition: {
      name: 'transition',
      control: { type: 'select' },
      options: ['smooth', 'fast', 'slow', 'none'],
      description: 'Transition effect when expanding/collapsing items',
      table: {
        category: 'Attributes',
        type: { summary: 'AccordionTransition' },
        defaultValue: { summary: 'smooth' },
      },
    },
    closeOthers: {
      name: 'closeOthers',
      control: { type: 'boolean' },
      description: 'When true, opening one item closes all others (accordion mode)',
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
    items: DcxAccordionMock,
    transition: 'smooth',
    closeOthers: true,
    expandedIds: [],
  },
};

export default meta;
type Story = StoryObj<DcxNgAccordionComponent>;

export const Default: Story = {
  args: {
    items: DcxAccordionMock,
  },
};

export const WithIcons: Story = {
  args: {
    items: ACCORDION_ITEMS_WITH_ICONS,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: ACCORDION_ITEMS_COMPLEX,
  },
};

export const MultipleOpen: Story = {
  args: {
    items: DcxAccordionMock,
    closeOthers: false,
  },
};

export const DefaultExpanded: Story = {
  args: {
    items: ACCORDION_ITEMS_WITH_EXPANDED,
    closeOthers: false,
  },
};

export const FastTransition: Story = {
  args: {
    items: DcxAccordionMock,
    transition: 'fast',
  },
};

export const SlowTransition: Story = {
  args: {
    items: DcxAccordionMock,
    transition: 'slow',
  },
};

export const NoTransition: Story = {
  args: {
    items: DcxAccordionMock,
    transition: 'none',
  },
};

export const LargeContent: Story = {
  args: {
    items: ACCORDION_ITEMS_LARGE_CONTENT,
  },
};

export const WithComponents: Story = {
  render: (args) => ({
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
      
      <div style="margin-top: 20px; padding: 16px; background: var(--background-info); border-radius: 8px;">
        <h4 style="margin: 0 0 8px 0;">💡 Using Components in Accordion</h4>
        <p style="margin: 0; font-size: 14px;">
          Each item uses <code>contentTemplate</code> to render Angular components 
          (dcx-ng-button) instead of plain HTML. This allows for full interactivity 
          and component reuse within accordion items.
        </p>
      </div>
    `,
  }),
};

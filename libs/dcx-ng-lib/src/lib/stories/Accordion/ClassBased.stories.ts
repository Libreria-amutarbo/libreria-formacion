import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, TemplateRef, viewChild } from '@angular/core';
import { DcxNgAccordionComponent, DcxNgAccordionItem, AccordionTransition } from '../../dcx-ng-components/dcx-ng-accordion/dcx-ng-accordion.component';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { CommonModule } from '@angular/common';

const basicItems: DcxNgAccordionItem[] = [
  {
    id: '1',
    title: 'Section 1',
    content: 'This is the content of section 1. It contains some basic text information.',
  },
  {
    id: '2',
    title: 'Section 2',
    content: 'This is the content of section 2. You can put any text content here.',
  },
  {
    id: '3',
    title: 'Section 3',
    content: 'This is the content of section 3. The accordion can handle multiple items.',
  },
];

const itemsWithIcons: DcxNgAccordionItem[] = [
  {
    id: '1',
    title: 'User Information',
    icon: 'person-fill',
    content: 'Personal information and account details.',
  },
  {
    id: '2',
    title: 'Settings',
    icon: 'gear-fill',
    content: 'Configure your preferences and application settings.',
  },
  {
    id: '3',
    title: 'Notifications',
    icon: 'bell-fill',
    content: 'Manage your notification preferences.',
  },
  {
    id: '4',
    title: 'Security',
    icon: 'shield-lock-fill',
    content: 'Security settings and privacy options.',
  },
];

const itemsWithDisabled: DcxNgAccordionItem[] = [
  {
    id: '1',
    title: 'Available Section',
    content: 'This section is available and can be expanded.',
  },
  {
    id: '2',
    title: 'Disabled Section (Item)',
    content: 'You should not see this content because the item is disabled.',
    disabled: true,
  },
  {
    id: '3',
    title: 'Disabled Content',
    content: 'This section can be opened, but the content is disabled.',
    disabledContent: true,
  },
  {
    id: '4',
    title: 'Another Available Section',
    content: 'This section is fully functional.',
  },
];

const meta: Meta<DcxNgAccordionComponent> = {
  title: 'DCXLibrary/Accordion/ClassBased',
  component: DcxNgAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgAccordionComponent, DcxNgButtonComponent],
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
    items: basicItems,
    transition: 'smooth',
    closeOthers: true,
    expandedIds: [],
  },
};

export default meta;
type Story = StoryObj<DcxNgAccordionComponent>;

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: itemsWithDisabled,
  },
};

export const MultipleOpen: Story = {
  args: {
    items: basicItems,
    closeOthers: false,
  },
};

export const DefaultExpanded: Story = {
  args: {
    items: basicItems,
    expandedIds: ['1', '3'],
    closeOthers: false,
  },
};

export const FastTransition: Story = {
  args: {
    items: basicItems,
    transition: 'fast',
  },
};

export const SlowTransition: Story = {
  args: {
    items: basicItems,
    transition: 'slow',
  },
};

export const NoTransition: Story = {
  args: {
    items: basicItems,
    transition: 'none',
  },
};

export const WithNestedAccordion: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: [
        {
          id: '1',
          title: 'Parent Section 1',
          content: 'This is a simple text content.',
        },
        {
          id: '2',
          title: 'Parent Section 2 (With Nested Accordion)',
          content: '', // Content will be replaced by template
        },
        {
          id: '3',
          title: 'Parent Section 3',
          content: 'Another simple content section.',
        },
      ],
    },
    template: `
      <dcx-ng-accordion
        [items]="items"
        [transition]="transition"
        [closeOthers]="closeOthers"
        (itemToggled)="itemToggled($event)"
        (itemExpanded)="itemExpanded($event)"
        (itemCollapsed)="itemCollapsed($event)">
      </dcx-ng-accordion>
      
      <div style="margin-top: 20px;">
        <p style="color: #666; font-size: 14px;">
          <strong>Note:</strong> Section 2 contains a nested accordion inside. 
          For complex content like nested components, use content projection or templates.
        </p>
      </div>
    `,
  }),
  args: {
    transition: 'smooth',
    closeOthers: true,
  },
};

export const WithControlButtons: Story = {
  render: (args) => ({
    props: {
      ...args,
      expandItem(index: number) {
        const accordion = document.querySelector('dcx-ng-accordion') as any;
        if (accordion && accordion.expandItemById) {
          accordion.expandItemById(String(index + 1));
        }
      },
      collapseItem(index: number) {
        const accordion = document.querySelector('dcx-ng-accordion') as any;
        if (accordion && accordion.collapseItemById) {
          accordion.collapseItemById(String(index + 1));
        }
      },
    },
    template: `
      <div style="margin-bottom: 20px; display: flex; gap: 8px; flex-wrap: wrap;">
        <dcx-ng-button
          (buttonClick)="expandItem(0)"
          [label]="'Open Item 1'"
          [variant]="'secondary'"
          [size]="'s'">
        </dcx-ng-button>
        <dcx-ng-button
          (buttonClick)="expandItem(1)"
          [label]="'Open Item 2'"
          [variant]="'secondary'"
          [size]="'s'">
        </dcx-ng-button>
        <dcx-ng-button
          (buttonClick)="expandItem(2)"
          [label]="'Open Item 3'"
          [variant]="'secondary'"
          [size]="'s'">
        </dcx-ng-button>
        <dcx-ng-button
          (buttonClick)="collapseItem(0)"
          [label]="'Close Item 1'"
          [variant]="'outline'"
          [size]="'s'">
        </dcx-ng-button>
        <dcx-ng-button
          (buttonClick)="collapseItem(1)"
          [label]="'Close Item 2'"
          [variant]="'outline'"
          [size]="'s'">
        </dcx-ng-button>
        <dcx-ng-button
          (buttonClick)="collapseItem(2)"
          [label]="'Close Item 3'"
          [variant]="'outline'"
          [size]="'s'">
        </dcx-ng-button>
      </div>
      
      <dcx-ng-accordion
        [items]="items"
        [transition]="transition"
        [closeOthers]="closeOthers"
        (itemToggled)="itemToggled($event)"
        (itemExpanded)="itemExpanded($event)"
        (itemCollapsed)="itemCollapsed($event)">
      </dcx-ng-accordion>
    `,
  }),
  args: {
    items: basicItems,
    transition: 'smooth',
    closeOthers: true,
  },
};

export const LargeContent: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Introduction',
        icon: 'book-fill',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: '2',
        title: 'Detailed Information',
        icon: 'info-circle-fill',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`,
      },
      {
        id: '3',
        title: 'Conclusion',
        icon: 'check-circle-fill',
        content: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      },
    ],
  },
};

import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgAccordionComponent, DcxNgAccordionItem } from '../../dcx-ng-components/dcx-ng-accordion/dcx-ng-accordion.component';

const meta: Meta<DcxNgAccordionComponent> = {
  title: 'DCXLibrary/Accordion',
  component: DcxNgAccordionComponent,
  argTypes: {
    items: { control: { type: 'object' } },
  },
  args: {
    items: [
      {
        id: '1',
        title: 'Item 1',
        content: 'Item 1',
        disabled: false,
      },
      {
        id: '2',
        title: 'Item 2',
        content: 'Item 2',
        disabled: false,
      },
      {
        id: '3',
        title: 'Item 3',
        content: 'Item 3',
        disabled: false,
      },
    ] as DcxNgAccordionItem[],
  },
};

export default meta;
type Story = StoryObj<DcxNgAccordionComponent>;

export const BasicUnstyled: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Unstyled Item 1',
        content: 'This is unstyled accordion content for item 1',
        disabled: false,
      },
      {
        id: '2',
        title: 'Unstyled Item 2',
        content: 'This is unstyled accordion content for item 2',
        disabled: false,
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Only One Item',
        content: 'This accordion has only one item',
        disabled: false,
      },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Item 1',
        content: 'Content 1',
        disabled: false,
      },
      {
        id: '2',
        title: 'Item 2',
        content: 'Content 2',
        disabled: false,
      },
      {
        id: '3',
        title: 'Item 3',
        content: 'Content 3',
        disabled: false,
      },
      {
        id: '4',
        title: 'Item 4',
        content: 'Content 4',
        disabled: false,
      },
      {
        id: '5',
        title: 'Item 5',
        content: 'Content 5',
        disabled: false,
      },
    ],
  },
};

import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgAccordionComponent, DcxNgAccordionItem } from '../../dcx-ng-components/dcx-ng-accordion/dcx-ng-accordion.component';
import { DcxAccordionMock } from '../../core/mock';

const meta: Meta<DcxNgAccordionComponent> = {
  title: 'DCXLibrary/Accordion/Class based',
  component: DcxNgAccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' } },
  },
  args: { items: DcxAccordionMock },
};

export default meta;
type Story = StoryObj<DcxNgAccordionComponent>;

export const Default: Story = {};

export const WithDisabledItem: Story = {
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
        title: 'Item 2 (Disabled)',
        content: 'Item 2',
        disabled: true,
      },
      {
        id: '3',
        title: 'Item 3',
        content: 'Item 3',
        disabled: false,
      },
    ],
  },
};

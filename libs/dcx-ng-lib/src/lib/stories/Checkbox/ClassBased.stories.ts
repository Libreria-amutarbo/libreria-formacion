import {
  DcxNgCheckboxComponent,
  DcxPosition,
  POSITION_LIST,
  SIZE_LIST,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgCheckboxComponent> = {
  title: 'DCXLibrary/Checkbox/ClassBased',
  component: DcxNgCheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    options: {
      name: 'options',
      control: { type: 'object' },
      description: 'Array de opciones para grupo de checkboxes',
      table: {
        category: 'Attributes',
        type: { summary: 'CheckboxOption[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
  args: {
    options: [
      {
        id: '1',
        value: true,
        label: 'Válido',
        labelPosition: 'left',
      },
    ],
  },
};
export default meta;

type Story = StoryObj<DcxNgCheckboxComponent>;

export const Default: Story = {
  args: {},
};

export const DisabledCheckbox: Story = {
  args: {
    options: [
      {
        id: '1',
        value: true,
        label: 'Válido',
        labelPosition: 'left',
        disabled: true,
      },
    ],
  },
};

export const WithErrorMessage: Story = {
  args: {},
};

export const Group: Story = {
  args: {
    options: [
      {
        id: '1',
        value: true,
        label: 'Válido',
        labelPosition: 'right',
      },
      {
        id: '2',
        value: false,
        label: 'Inválido',
        labelPosition: 'right',
      },
      {
        id: '3',
        value: null,
        label: 'Sin valor',
        labelPosition: 'right',
      },
    ],
  },
};

export const GroupWithDisabledOptions: Story = {
  name: 'Grupo con opciones deshabilitadas',
  args: {},
};

import { Meta, StoryObj } from '@storybook/angular';

type SelectOption = { value: string; label: string };

const meta: Meta = {
  title: 'DCXLibrary/Select/Unstyled',
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<{
  options: SelectOption[];
  disabled: boolean;
  placeholder: string;
  ariaLabel: string;
  selected?: string;
}>;

export const UnstyleSelect: Story = {
  render: args => ({
    props: args,
    template: `
      <select
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel"
        [(ngModel)]="selected"
        style="padding: 0.5rem 1rem; border: 2px solid gray;"
      >
       @if (placeholder) {
    <option [ngValue]="null" disabled hidden>
      {{ placeholder }}
    </option>
  }

  @for (option of options; track option.value) {
    <option
      [value]="option.value"
      [attr.aria-selected]="selected === option.value"
    >
      {{ option.label }}
    </option>
  }
</select>
    `,
  }),
  args: {
    placeholder: 'Select a option',
    ariaLabel: 'Unstyled select field',
    disabled: false,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    selected: '',
  },
};

import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

type SelectOption = { value: string; label: string };

const meta: Meta = {
  title: 'DCXLibrary/Select/Unstyled',
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<{
  options: SelectOption[];
  disabled: boolean;
  placeholder: string;
  ariaLabel: string;
  selected?: string | null;
}>;

export const UnstyleSelect: Story = {
  render: (args) => ({
    props: args,
    template: `
      <select
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel"
        [(ngModel)]="selected"
        style="padding:0.5rem 1rem; border:2px solid gray; border-radius:4px; width:240px;"
      >
        <option *ngIf="placeholder" [ngValue]="null" disabled hidden>{{ placeholder }}</option>

        <option *ngFor="let option of options" [value]="option.value" [attr.aria-selected]="selected === option.value">
          {{ option.label }}
        </option>
      </select>
    `,
  }),
  args: {
    placeholder: 'Select an option',
    ariaLabel: 'Unstyled select field',
    disabled: false,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    selected: null,
  },
};
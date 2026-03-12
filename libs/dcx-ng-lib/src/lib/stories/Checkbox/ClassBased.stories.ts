import { Component, signal } from '@angular/core';
import {
  DcxCheckbox,
  DcxCheckboxGroup,
  DcxDiferentsLabelPositionsCheck,
  DcxDisabledCheck,
  DcxErrorCheck,
  DcxNgCheckboxComponent,
  DcxRequiredCheck,
  DcxSingleCheck,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

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
    options: DcxSingleCheck,
  },
};
export default meta;

type Story = StoryObj<DcxNgCheckboxComponent>;

export const Default: Story = {
  args: {},
};

export const ErrorCheckBox: Story = {
  args: {
    options: DcxErrorCheck,
  },
};

export const DisabledCheckBox: Story = {
  args: { options: DcxDisabledCheck },
};

export const DiferentsLabelPositions: Story = {
  args: {
    options: DcxDiferentsLabelPositionsCheck,
  },
};

export const RequiredCheckbox: Story = {
  args: {
    options: DcxRequiredCheck,
  },
};

export const CheckboxGroup: Story = {
  args: {
    options: DcxCheckboxGroup,
  },
};

@Component({
  selector: 'dcx-ng-checkbox-example',
  standalone: true,
  imports: [DcxNgCheckboxComponent],
  template: `
  <dcx-ng-checkbox
    [options]="checkboxGroup()"
    (changeOptions)="changeLabel($event)"
  />
  `,
})
class DcxNgCheckboxExampleComponent {
  checkboxGroup = signal<DcxCheckbox[]>(DcxCheckboxGroup);

  changeLabel(checkbox: DcxCheckbox[]) {
    checkbox.map((cb: DcxCheckbox) => {
      switch (cb.value) {
        case true:
          cb.label = 'Válido';
          break;
        case false:
          cb.label = 'Inválido';
          break;
        case null:
        default:
          cb.label = 'Sin valor';
          break;
      }
    });
  }
}

export const CheckboxGroupWithChangeLabel: Story = {
  render: () => ({
    props: {},
    template: `<dcx-ng-checkbox-example/>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [DcxNgCheckboxExampleComponent],
    }),
  ],
};

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
  title: 'DCXLibrary/Components/Checkbox',
  component: DcxNgCheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    options: {
      name: 'options',
      control: { type: 'object' },
      description: 'Array de opciones para el grupo de checkboxes. Cada opción define id, value (true/false/null), label, labelPosition, disabled, required y error.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxCheckbox[]' },
        defaultValue: { summary: '[]' },
      },
    },
    errorIcon: {
      name: 'errorIcon',
      control: { type: 'text' },
      description: 'Nombre del icono (Bootstrap Icons) que se muestra junto al mensaje de error.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'exclamation-circle' },
      },
    },
    changeOptions: {
      name: 'changeOptions',
      description: 'Se emite cada vez que el usuario cambia el estado de algún checkbox. Devuelve el array completo de opciones actualizado.',
      table: {
        category: 'Eventos',
        type: { summary: '(options: DcxCheckbox[]) => void' },
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
  checkboxGroup = signal<DcxCheckbox[]>(DcxCheckboxGroup.map(cb => ({ ...cb })));

  changeLabel(checkbox: DcxCheckbox[]): void {
    const updated = checkbox.map(cb => ({
      ...cb,
      label: cb.value === true ? 'Válido' : cb.value === false ? 'Indeterminado' : 'Sin valor',
    }));
    this.checkboxGroup.set(updated);
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

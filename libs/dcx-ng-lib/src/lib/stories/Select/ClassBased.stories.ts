import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DcxNgSelectComponent } from '../../dcx-ng-components/dcx-ng-select/dcx-ng-select.component';

type SelectOption = { value: any; label: string };

type DcxSelectInputs = {
  options?: SelectOption[];
  placeholder?: string;
  areaLabel?: string;
  disabled?: boolean;
};

const meta: Meta<DcxNgSelectComponent> = {
  title: 'DCXLibrary/Select/Class based',
  component: DcxNgSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    areaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DcxNgSelectComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DcxSelectInputs>;

const optionList: SelectOption[] = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
];

/*
  Each story below renders a small reactive form containing a single dcx-ng-select
  so each example from your page is an independent story.
*/

export const BasicSelect: Story = {
  render: (args) => {
    const form = new FormGroup({ basic: new FormControl(null) });
    return {
      props: { ...args, form, optionList },
      template: `
        <form [formGroup]="form" style="width:360px;">
          <section style="margin:8px 0;">
            <h3>Basic Select</h3>
            <dcx-ng-select formControlName="basic" [options]="optionList" areaLabel="Basic select"></dcx-ng-select>
          </section>
        </form>
      `,
    };
  },
};

export const SelectWithPlaceholder: Story = {
  render: (args) => {
    const form = new FormGroup({ withPlaceholder: new FormControl(null) });
    return {
      props: { ...args, form, optionList },
      template: `
        <form [formGroup]="form" style="width:360px;">
          <section style="margin:8px 0;">
            <h3>Select with Placeholder</h3>
            <dcx-ng-select formControlName="withPlaceholder" [options]="optionList" placeholder="Please choose an option" areaLabel="Select with placeholder"></dcx-ng-select>
          </section>
        </form>
      `,
    };
  },
};

export const DisabledSelect: Story = {
  render: (args) => {
    const form = new FormGroup({
      disabled: new FormControl({ value: null, disabled: true }),
    });
    return {
      props: { ...args, form, optionList },
      template: `
        <form [formGroup]="form" style="width:360px;">
          <section style="margin:8px 0;">
            <h3>Disabled Select</h3>
            <dcx-ng-select formControlName="disabled" [options]="optionList" placeholder="This select is disabled" areaLabel="Disabled select"></dcx-ng-select>
          </section>
        </form>
      `,
    };
  },
};

export const SelectWithFormControlBinding: Story = {
  render: (args) => {
    const form = new FormGroup({
      preselected: new FormControl('2'),
    });
    return {
      props: { ...args, form, optionList },
      template: `
        <form [formGroup]="form" style="width:360px;">
          <section style="margin:8px 0;">
            <h3>Select with Form Control Binding</h3>
            <dcx-ng-select formControlName="preselected" [options]="optionList" placeholder="Select with form control binding" areaLabel="Select with form control"></dcx-ng-select>
          </section>
        </form>
      `,
    };
  },
};

export const SelectWithChangeEvent: Story = {
  render: (args) => {
    const form = new FormGroup({
      withChange: new FormControl(null),
    });

    form.get('withChange')?.valueChanges.subscribe((v) => {
      // demo logging
      // eslint-disable-next-line no-console
      console.log('New value selected: ', v);
    });

    return {
      props: { ...args, form, optionList },
      template: `
        <form [formGroup]="form" style="width:360px;">
          <section style="margin:8px 0;">
            <h3>Select with Change Event</h3>
            <dcx-ng-select formControlName="withChange" [options]="optionList" placeholder="Select to trigger change event" areaLabel="Select with change event"></dcx-ng-select>
            <p style="margin-top:8px; color:#666;">Check the console for change events</p>
          </section>
        </form>
      `,
    };
  },
};
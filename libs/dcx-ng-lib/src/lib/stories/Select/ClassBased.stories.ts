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

const optionList: SelectOption[] = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
];

const meta: Meta<DcxNgSelectComponent> = {
  title: 'DCXLibrary/Select/Class based',
  component: DcxNgSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    options: optionList,
    placeholder: 'Please choose an option',
    ariaLabel: 'Select',
    disabled: false,
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DcxNgSelectComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DcxSelectInputs>;

export const Default: Story = {
  render: (args) => {
    const disabledFlag = !!args.disabled;
    const form = new FormGroup({
      interactive: new FormControl({ value: null, disabled: disabledFlag }),
    });
    return {
      props: { ...args, form },
      template: `
        <form [formGroup]="form" style="width:360px;">
          <section style="margin:8px 0;">
            <dcx-ng-select
              formControlName="interactive"
              [options]="options"
              [placeholder]="placeholder"
              [areaLabel]="areaLabel"
              [attr.aria-label]="areaLabel"
              [disabled]="disabled">
            </dcx-ng-select>
          </section>
        </form>
      `,
    };
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const SelectShowcase: Story = {
  render: (args) => {
    const form1 = new FormGroup({ basic: new FormControl(null) });
    const form2 = new FormGroup({ withPlaceholder: new FormControl(null) });
    const form3 = new FormGroup({ disabled: new FormControl({ value: null, disabled: true }) });
    const form4 = new FormGroup({ preselected: new FormControl('2') });
    const form5 = new FormGroup({ withChange: new FormControl(null) });

    form5.get('withChange')?.valueChanges.subscribe((v) => {
      console.log('New value selected (showcase): ', v);
    });

    return {
      props: { optionList },
      template: `
        <div style="width:360px;">
          <!-- Basic -->
          <form [formGroup]="form1" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Basic Select</h4>
              <dcx-ng-select formControlName="basic" [options]="optionList" areaLabel="Basic select"></dcx-ng-select>
            </section>
          </form>

          <!-- With Placeholder (literal) -->
          <form [formGroup]="form2" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Select with Placeholder</h4>
              <dcx-ng-select formControlName="withPlaceholder" [options]="optionList" placeholder="Please choose an option" areaLabel="Select with placeholder"></dcx-ng-select>
            </section>
          </form>

          <!-- Disabled (literal) -->
          <form [formGroup]="form3" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Disabled Select</h4>
              <dcx-ng-select formControlName="disabled" [options]="optionList" placeholder="This select is disabled" areaLabel="Disabled select"></dcx-ng-select>
            </section>
          </form>

          <!-- Preselected binding -->
          <form [formGroup]="form4" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Select with Form Control Binding</h4>
              <dcx-ng-select formControlName="preselected" [options]="optionList" placeholder="Select with form control binding" areaLabel="Select with form control"></dcx-ng-select>
            </section>
          </form>

          <!-- Change event -->
          <form [formGroup]="form5" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Select with Change Event</h4>
              <dcx-ng-select formControlName="withChange" [options]="optionList" placeholder="Select to trigger change event" areaLabel="Select with change event"></dcx-ng-select>
              <p style="margin-top:8px; color:#666;">Check the console for change events</p>
            </section>
          </form>
        </div>
      `,
    };
  },
};

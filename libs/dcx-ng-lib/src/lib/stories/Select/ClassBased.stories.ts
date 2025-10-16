import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DcxNgSelectComponent } from '../../dcx-ng-components/dcx-ng-select/dcx-ng-select.component';

type SelectOption = { value: any; label: string };

type DcxSelectStoryArgs = {
  options?: SelectOption[];
  placeholder?: string;
  label?: string;
  ariaLabel?: string;

  initialValue?: string | null;
  isDisabled?: boolean;
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
    options: { control: 'object', description: 'Listado de opciones { value, label }' },
    placeholder: { control: 'text' },
    label: { control: 'text', description: 'Texto visible del label' },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible SOLO cuando no hay label visible',
    },
  },
  args: {
    options: optionList,
    placeholder: 'Please choose an option',
    label: 'Select',
    ariaLabel: '',
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DcxNgSelectComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<DcxSelectStoryArgs>;

export const Default: Story = {
  args: {
    initialValue: null,
    isDisabled: false,
  },
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'Valor inicial del FormControl (ej.: "2")',
      table: { category: 'Story only' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Deshabilita el FormControl (no es @Input del componente)',
      table: { category: 'Story only' },
    },
  },
  render: (args) => {
    const form = new FormGroup({
      interactive: new FormControl<string | null>({
        value: args.initialValue ?? null,
        disabled: !!args.isDisabled,
      }),
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
              [label]="label"
              [ariaLabel]="ariaLabel">
            </dcx-ng-select>
          </section>
        </form>
      `,
    };
  },
};

export const SelectShowcase: Story = {
  render: () => {
    const form1 = new FormGroup({ basic: new FormControl<string | null>(null) });
    const form2 = new FormGroup({ withPlaceholder: new FormControl<string | null>(null) });
    const form3 = new FormGroup({
      disabled: new FormControl<string | null>({ value: null, disabled: true }),
    });
    const form4 = new FormGroup({ preselected: new FormControl<string>('2') });
    const form5 = new FormGroup({ withChange: new FormControl<string | null>(null) });

    form5.get('withChange')?.valueChanges.subscribe((v) => {
      console.log('New value selected (showcase): ', v);
    });

    return {
      props: { optionList, form1, form2, form3, form4, form5 },
      template: `
        <div style="width:360px;">
          <!-- Basic -->
          <form [formGroup]="form1" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Basic Select</h4>
              <dcx-ng-select
                formControlName="basic"
                [options]="optionList"
                label="Basic select">
              </dcx-ng-select>
            </section>
          </form>

          <!-- With Placeholder -->
          <form [formGroup]="form2" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Select with Placeholder</h4>
              <dcx-ng-select
                formControlName="withPlaceholder"
                [options]="optionList"
                placeholder="Please choose an option"
                label="Select with placeholder">
              </dcx-ng-select>
            </section>
          </form>

          <!-- Disabled (por estado del FormControl) -->
          <form [formGroup]="form3" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Disabled Select</h4>
              <dcx-ng-select
                formControlName="disabled"
                [options]="optionList"
                placeholder="This select is disabled"
                label="Disabled select">
              </dcx-ng-select>
            </section>
          </form>

          <!-- Preselected binding -->
          <form [formGroup]="form4" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Select with Form Control Binding</h4>
              <dcx-ng-select
                formControlName="preselected"
                [options]="optionList"
                placeholder="Select with form control binding"
                label="Select with form control">
              </dcx-ng-select>
            </section>
          </form>

          <!-- Change event -->
          <form [formGroup]="form5" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Select with Change Event</h4>
              <dcx-ng-select
                formControlName="withChange"
                [options]="optionList"
                placeholder="Select to trigger change event"
                label="Select with change event">
              </dcx-ng-select>
              <p style="margin-top:8px; color:#666;">Check the console for change events</p>
            </section>
          </form>

          <!-- Sin label visible (solo aria-label) -->
          <form [formGroup]="form1" style="margin-bottom:12px;">
            <section style="margin:8px 0;">
              <h4>Accessible name only (no visible label)</h4>
              <dcx-ng-select
                formControlName="basic"
                [options]="optionList"
                placeholder="This select has no visible label"
                ariaLabel="Accessible only select">
              </dcx-ng-select>
            </section>
          </form>
        </div>
      `,
    };
  },
};

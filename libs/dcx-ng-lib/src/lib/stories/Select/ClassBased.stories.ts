import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import {
  CLEARABLE,
  DcxNgSelectComponent,
  DISABLED,
  ERRORICON,
  ERRORMESSAGE,
  ISINVALID,
  LABEL,
  OPTIONS,
  PLACEHOLDER,
  REQUIRED,
  SEARCHABLE,
  SPACING,
  SPACING_LIST,
  VALUEINPUT,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgSelectComponent> = {
  title: 'DCXLibrary/Select/Class based',
  component: DcxNgSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Texto visible del label',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: LABEL,
        },
      },
    },
    options: {
      description: 'Listado de opciones { value, label, boolean(opcional) }',
      options: OPTIONS,
      control: { type: 'object' },
      table: { category: 'Attributes' },
    },
    placeholder: {
      description:
        'Placeholder, opcional, para poner texto informativo en el select antes de la selección',
      control: 'text',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: PLACEHOLDER,
        },
      },
    },
    searchable: {
      description:
        'Editor de texto que nos permite buscar entre las opciones disponibles del select',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    clearable: {
      description: 'Botón que borra la opción seleccionada',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },

    disabled: {
      description: 'Selector deshabilitado',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    required: {
      description: 'Indica si el selector es requerido o no en un formulario',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isInvalid: {
      description: 'Indica si el select, o la opción seleccionada, es inválido',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    errorMessage: {
      description: 'Mensaje de error que aparece cuando el select es inválido',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: ERRORMESSAGE,
        },
      },
    },
    errorIcon: {
      description: 'Icono de error que aparece cuando el select es inválido',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: ERRORICON,
        },
      },
    },
    valueInput: {
      description: 'Opción seleccionada por defecto',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: '',
        },
      },
    },

    valueChange: {
      action: 'valueChange',
      description: 'Evento que se emite cuando se cambia el valor seleccionado',
      table: {
        category: 'Events',
        type: {
          summary: '(item: string | number | null) => void',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    spacing: {
      description: 'Tamaño del select',
      control: { type: 'select' },
      options: SPACING_LIST,
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: SPACING,
        },
      },
    },
    clear: {
      action: 'clear',
      description: 'Evento que se emite cuando se borra el valor seleccionado',
      table: {
        category: 'Events',
        type: {
          summary: '(item: void) => void',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
  args: {
    label: LABEL,
    options: OPTIONS,
    placeholder: PLACEHOLDER,
    searchable: SEARCHABLE,
    clearable: CLEARABLE,
    disabled: DISABLED,
    required: REQUIRED,
    isInvalid: ISINVALID,
    errorMessage: ERRORMESSAGE,
    errorIcon: ERRORICON,
    valueInput: VALUEINPUT,
    spacing: SPACING,
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

type Story = StoryObj<DcxNgSelectComponent>;

export const ClassBased: Story = {};

export const Searchable: Story = {
  args: {
    options: OPTIONS,
    searchable: true,
  },
};

export const SearchableWithClearable: Story = {
  args: {
    options: OPTIONS,
    searchable: true,
    clearable: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    options: OPTIONS,
    searchable: true,
    clearable: true,
    required: true,
  },
};

export const SelectWithError: Story = {
  args: {
    options: OPTIONS,
    searchable: true,
    clearable: true,
    required: true,
    isInvalid: true,
    errorMessage: 'Error',
  },
};

export const Spacing: Story = {
  render: args => ({
    props: {
      ...args,
    },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-select spacing="xs" placeholder="XS"></dcx-ng-select>
<dcx-ng-select spacing="s" placeholder="S"></dcx-ng-select>
<dcx-ng-select spacing="m" placeholder="M"></dcx-ng-select>
<dcx-ng-select spacing="l" placeholder="L"></dcx-ng-select>
        <dcx-ng-select spacing="xl" placeholder="XL"></dcx-ng-select>
      </div>
    `,
  }),
};

// export const SelectShowcase: Story = {
//   render: () => {
//     const form1 = new FormGroup({
//       basic: new FormControl<string | null>(null),
//     });
//     const form2 = new FormGroup({
//       withPlaceholder: new FormControl<string | null>(null),
//     });
//     const form3 = new FormGroup({
//       disabled: new FormControl<string | null>({ value: null, disabled: true }),
//     });
//     const form4 = new FormGroup({ preselected: new FormControl<string>('2') });
//     const form5 = new FormGroup({
//       withChange: new FormControl<string | null>(null),
//     });

//     form5.get('withChange')?.valueChanges.subscribe(v => {
//       console.log('New value selected (showcase): ', v);
//     });

//     return {
//       props: { OPTIONS, form1, form2, form3, form4, form5 },
//       template: `
//         <div style="width:360px;">
//           <!-- Basic -->
//           <form [formGroup]="form1" style="margin-bottom:12px;">
//             <section style="margin:8px 0;">
//               <h4>Basic Select</h4>
//               <dcx-ng-select
//                 formControlName="basic"
//                 [options]="optionList"
//                 label="Basic select">
//               </dcx-ng-select>
//             </section>
//           </form>

//           <!-- With Placeholder -->
//           <form [formGroup]="form2" style="margin-bottom:12px;">
//             <section style="margin:8px 0;">
//               <h4>Select with Placeholder</h4>
//               <dcx-ng-select
//                 formControlName="withPlaceholder"
//                 [options]="optionList"
//                 placeholder="Please choose an option"
//                 label="Select with placeholder">
//               </dcx-ng-select>
//             </section>
//           </form>

//           <!-- Disabled (por estado del FormControl) -->
//           <form [formGroup]="form3" style="margin-bottom:12px;">
//             <section style="margin:8px 0;">
//               <h4>Disabled Select</h4>
//               <dcx-ng-select
//                 formControlName="disabled"
//                 [options]="optionList"
//                 placeholder="This select is disabled"
//                 label="Disabled select">
//               </dcx-ng-select>
//             </section>
//           </form>

//           <!-- Preselected binding -->
//           <form [formGroup]="form4" style="margin-bottom:12px;">
//             <section style="margin:8px 0;">
//               <h4>Select with Form Control Binding</h4>
//               <dcx-ng-select
//                 formControlName="preselected"
//                 [options]="optionList"
//                 placeholder="Select with form control binding"
//                 label="Select with form control">
//               </dcx-ng-select>
//             </section>
//           </form>

//           <!-- Change event -->
//           <form [formGroup]="form5" style="margin-bottom:12px;">
//             <section style="margin:8px 0;">
//               <h4>Select with Change Event</h4>
//               <dcx-ng-select
//                 formControlName="withChange"
//                 [options]="optionList"
//                 placeholder="Select to trigger change event"
//                 label="Select with change event">
//               </dcx-ng-select>
//               <p style="margin-top:8px; color:#666;">Check the console for change events</p>
//             </section>
//           </form>

//           <!-- Sin label visible (solo aria-label) -->
//           <form [formGroup]="form1" style="margin-bottom:12px;">
//             <section style="margin:8px 0;">
//               <h4>Accessible name only (no visible label)</h4>
//               <dcx-ng-select
//                 formControlName="basic"
//                 [options]="optionList"
//                 placeholder="This select has no visible label"
//                 ariaLabel="Accessible only select">
//               </dcx-ng-select>
//             </section>
//           </form>
//         </div>
//       `,
//     };
//   },
// };

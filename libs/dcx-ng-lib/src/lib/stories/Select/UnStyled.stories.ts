import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

type SelectOption = { value: string; label: string };

type UnstyledArgs = {
  options: SelectOption[];
  /** Texto visible del label. Si está presente, NO se usará ariaLabel */
  label?: string;
  /** Nombre accesible SOLO cuando no hay label visible */
  ariaLabel?: string;
  /** Placeholder visible como opción deshabilitada/oculta */
  placeholder?: string;
  /** Deshabilita el select (nativo) */
  disabled?: boolean;
  /** Valor seleccionado (two-way con ngModel en la story) */
  selected?: string | null;
  /** (Interno) id opcional para asociar label/for con select/id */
  selectId?: string;
};

const meta: Meta<UnstyledArgs> = {
  title: 'DCXLibrary/Select/Unstyled',
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object', description: 'Listado de opciones { value, label }' },
    label: { control: 'text', description: 'Label visible del select' },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible SOLO si no hay label visible',
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    selected: {
      control: 'text',
      description: 'Valor seleccionado (vía ngModel en la story)',
      table: { category: 'Story state' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Versión **sin estilos** basada en `<select>` nativo. Incluye buenas prácticas de accesibilidad: ' +
          '`label` visible o `ariaLabel` si no hay label.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UnstyledArgs>;

export const Default: Story = {
  args: {
    label: 'Unstyled select',
    ariaLabel: '',
    placeholder: 'Select an option',
    disabled: false,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    selected: null,
  },
  render: (args) => {
    const selectId = args.selectId || `unstyled-select-${Math.random().toString(36).slice(2)}`;
    return {
      props: { ...args, selectId },
      template: `
        <div style="width:260px;">
          <!-- Label visible si se proporciona -->
          <label
            *ngIf="label"
            [attr.for]="selectId"
            style="display:block; margin-bottom:4px;"
          >
            {{ label }}
          </label>

          <select
            [id]="selectId"
            [disabled]="disabled"
            [attr.aria-label]="!label ? ariaLabel || null : null"
            [(ngModel)]="selected"
            style="padding:0.5rem 1rem; border:1px solid #ccc; border-radius:4px; width:100%;"
          >
            <option *ngIf="placeholder" [ngValue]="null" disabled hidden>
              {{ placeholder }}
            </option>

            <option *ngFor="let option of options" [value]="option.value">
              {{ option.label }}
            </option>
          </select>

          <p style="margin-top:8px; color:#666; font-size:12px;">
            Value: {{ selected || '—' }}
          </p>
        </div>
      `,
    };
  },
};

export const NoVisibleLabel_AccessibleOnly: Story = {
  args: {
    label: '',
    ariaLabel: 'Accessible only select',
    placeholder: 'This select has no visible label',
    disabled: false,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    selected: null,
  },
  render: (args) => {
    const selectId = args.selectId || `unstyled-select-${Math.random().toString(36).slice(2)}`;
    return {
      props: { ...args, selectId },
      template: `
        <div style="width:260px;">
          <!-- Sin label visible; accesible via aria-label -->
          <select
            [id]="selectId"
            [disabled]="disabled"
            [attr.aria-label]="!label ? ariaLabel || null : null"
            [(ngModel)]="selected"
            style="padding:0.5rem 1rem; border:1px solid #ccc; border-radius:4px; width:100%;"
          >
            <option *ngIf="placeholder" [ngValue]="null" disabled hidden>
              {{ placeholder }}
            </option>

            <option *ngFor="let option of options" [value]="option.value">
              {{ option.label }}
            </option>
          </select>

          <p style="margin-top:8px; color:#666; font-size:12px;">
            Value: {{ selected || '—' }}
          </p>
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled unstyled select',
    ariaLabel: '',
    placeholder: 'This select is disabled',
    disabled: true,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    selected: null,
  },
  render: Default.render,
};
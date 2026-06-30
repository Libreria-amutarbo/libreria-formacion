import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../../index';
import type { DcxCheckbox } from '../../../lib/core/interfaces/checkbox';

/* ───────── DATA ───────── */

const DcxSingleCheck: DcxCheckbox[] = [
  { id: '1', value: true, label: 'Checkbox único' },
];

const DcxErrorCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Checkbox erróneo',
    error: true,
    errorMessage: 'Checkbox con error',
  },
];

const DcxDisabledCheck: DcxCheckbox[] = [
  { id: '1', value: true, label: 'Checkbox deshabilitado', disabled: true },
];

const DcxDiferentsLabelPositionsCheck: DcxCheckbox[] = [
  { id: '1', value: true, label: 'Izquierda', labelPosition: 'left' },
  { id: '2', value: true, label: 'Derecha', labelPosition: 'right' },
];

const DcxRequiredCheck: DcxCheckbox[] = [
  { id: '1', value: true, label: 'Requerido', required: true },
];

const DcxCheckboxGroup: DcxCheckbox[] = [
  { id: '1', value: true, label: 'Válido' },
  { id: '2', value: false, label: 'Indeterminado' },
  { id: '3', value: null, label: 'Sin valor' },
];

/* ───────── HELPER SHOW CODE ───────── */

const withCode = (options: DcxCheckbox[]) => ({
  parameters: {
    docs: {
      source: {
        code: `<dcx-web-checkbox
  .options=${JSON.stringify(options, null, 2)}
></dcx-web-checkbox>`,
      },
    },
  },
});

/* ───────── META ───────── */

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Checkbox',
  component: 'dcx-web-checkbox',
  tags: ['autodocs'],

  render: (args, { updateArgs }) => {
    const handleChange = (e: CustomEvent<DcxCheckbox[]>) => {
      // ✅ CLAVE 1: clon profundo
      const updated = e.detail.map(o => ({ ...o }));

      // ✅ CLAVE 2: updateArgs (no mutar args)
      updateArgs({ options: updated });
    };

    return html`
      <dcx-web-checkbox
        .options=${args.options.map((o: DcxCheckbox) => ({ ...o }))}   <!-- ✅ CLAVE -->
        @changeOptions=${handleChange}
      ></dcx-web-checkbox>
    `;
  },
};

export default meta;
type Story = StoryObj;

/* ───────── STORIES ───────── */

export const Default: Story = {
  args: { options: DcxSingleCheck },
  ...withCode(DcxSingleCheck),
};

export const ErrorCheckBox: Story = {
  args: { options: DcxErrorCheck },
  ...withCode(DcxErrorCheck),
};

export const DisabledCheckBox: Story = {
  args: { options: DcxDisabledCheck },
  ...withCode(DcxDisabledCheck),
};

export const DiferentsLabelPositions: Story = {
  args: { options: DcxDiferentsLabelPositionsCheck },
  ...withCode(DcxDiferentsLabelPositionsCheck),
};

export const RequiredCheckbox: Story = {
  args: { options: DcxRequiredCheck },
  ...withCode(DcxRequiredCheck),
};

export const CheckboxGroup: Story = {
  args: { options: DcxCheckboxGroup },
  ...withCode(DcxCheckboxGroup),
};

/* ───────── DINÁMICO (IGUAL ANGULAR) ───────── */

export const CheckboxGroupWithChangeLabel: Story = {
  args: { options: DcxCheckboxGroup },

  render: (args, { updateArgs }) => {
    const handleChange = (e: CustomEvent<DcxCheckbox[]>) => {
      const updated = e.detail.map(cb => ({
        ...cb,
        label:
          cb.value === true
            ? 'Válido'
            : cb.value === false
            ? 'Indeterminado'
            : 'Sin valor',
      }));

      updateArgs({ options: updated });
    };

    return html`
      <dcx-web-checkbox
        .options=${args.options.map((o: DcxCheckbox) => ({ ...o }))}
        @changeOptions=${handleChange}
      ></dcx-web-checkbox>
    `;
  },

  ...withCode(DcxCheckboxGroup),
};

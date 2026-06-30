import { Meta, StoryObj } from '@storybook/web-components';
import '../../../index';
import type { DcxCheckbox } from '../../../lib/core/interfaces/checkbox';

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

const createInteractive = (initialOptions: DcxCheckbox[]) => {
  return () => {
    const el = document.createElement('dcx-web-checkbox');

    let options = initialOptions.map(o => ({ ...o }));

    el.options = options;

    el.addEventListener('changeOptions', (e: Event) => {
      const customEvent = e as CustomEvent<DcxCheckbox[]>;

      options = customEvent.detail.map((o: DcxCheckbox) => ({ ...o }));

      el.options = options; 
    });

    return el;
  };
};

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Checkbox',
  component: 'dcx-web-checkbox',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },

  argTypes: {
    options: {
      name: 'options',
      control: { type: 'object' },
      description:
        'Array de opciones para el grupo de checkboxes. Cada opción define id, value (true/false/null), label, labelPosition, disabled, required y error.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxCheckbox[]' },
        defaultValue: { summary: '[]' },
      },
    },

    errorIcon: {
      name: 'errorIcon',
      control: { type: 'text' },
      description:
        'Nombre del icono (Bootstrap Icons) que se muestra junto al mensaje de error.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'exclamation-circle' },
      },
    },

    changeOptions: {
      name: 'changeOptions',
      description:
        'Se emite cada vez que el usuario cambia el estado de algún checkbox. Devuelve el array completo de opciones actualizado.',
      table: {
        category: 'Eventos',
        type: { summary: '(options: DcxCheckbox[]) => void' },
      },
    },
  },

  args: {
    options: [
      { id: '1', value: true, label: 'Checkbox único' },
    ],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: createInteractive(DcxSingleCheck),
  ...withCode(DcxSingleCheck),
};

export const ErrorCheckBox: Story = {
  render: createInteractive(DcxErrorCheck),
  ...withCode(DcxErrorCheck),
};

export const DisabledCheckBox: Story = {
  render: createInteractive(DcxDisabledCheck),
  ...withCode(DcxDisabledCheck),
};

export const DiferentsLabelPositions: Story = {
  render: createInteractive(DcxDiferentsLabelPositionsCheck),
  ...withCode(DcxDiferentsLabelPositionsCheck),
};

export const RequiredCheckbox: Story = {
  render: createInteractive(DcxRequiredCheck),
  ...withCode(DcxRequiredCheck),
};

export const CheckboxGroup: Story = {
  render: createInteractive(DcxCheckboxGroup),
  ...withCode(DcxCheckboxGroup),
};

export const CheckboxGroupWithChangeLabel: Story = {
  render: () => {
    const el = document.createElement('dcx-web-checkbox');

    let options = DcxCheckboxGroup.map(o => ({
      ...o,
      labelPosition: 'right' as const,
    }));

    el.options = options;

    el.addEventListener('changeOptions', (e: Event) => {
      const customEvent = e as CustomEvent<DcxCheckbox[]>;

      options = customEvent.detail.map((cb: DcxCheckbox) => ({
        ...cb,
        label:
          cb.value === true
            ? 'Válido'
            : cb.value === false
            ? 'Indeterminado'
            : 'Sin valor',
        labelPosition: 'right' as const,
      }));

      el.options = options;
    });

    return el;
  },

  ...withCode(DcxCheckboxGroup),
};
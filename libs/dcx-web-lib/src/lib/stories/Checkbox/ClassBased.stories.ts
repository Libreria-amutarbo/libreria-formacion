import { Meta, StoryObj } from '@storybook/web-components';
import '../../../index';
import type { DcxCheckbox } from '../../core/interfaces/checkbox';

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
  {
    id: '1',
    value: true,
    label: 'Checkbox deshabilitado',
    disabled: true,
  },
];

const DcxDiferentsLabelPositionsCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Izquierda',
    labelPosition: 'left',
  },
  {
    id: '2',
    value: true,
    label: 'Derecha',
    labelPosition: 'right',
  },
];

const DcxRequiredCheck: DcxCheckbox[] = [
  {
    id: '1',
    value: true,
    label: 'Requerido',
    required: true,
  },
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

const renderCheckbox = (args: {
  options: DcxCheckbox[];
}) => {
  const el = document.createElement('dcx-web-checkbox');

  let options = args.options.map(option => ({
    ...option,
  }));

  el.options = options;

  el.addEventListener('changeOptions', (event: Event) => {
    const customEvent = event as CustomEvent<DcxCheckbox[]>;

    options = customEvent.detail.map(option => ({
      ...option,
    }));

    el.options = options;
  });

  return el;
};

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Checkbox',
  component: 'dcx-web-checkbox',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    options: {
      name: 'options',
      control: { type: 'object' },
      description:
        'Array de opciones del checkbox. Cada opción admite id, value, label, labelPosition, disabled, required, error y errorMessage.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'DcxCheckbox[]',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },

    changeOptions: {
      name: 'changeOptions',
      description:
        'Evento emitido cuando cambia el estado de uno o varios checkboxes.',
      table: {
        category: 'Eventos',
        type: {
          summary: '(options: DcxCheckbox[]) => void',
        },
      },
    },
  },

  args: {
    options: DcxSingleCheck,
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    options: DcxSingleCheck,
  },
  render: renderCheckbox,
  ...withCode(DcxSingleCheck),
};

export const ErrorCheckBox: Story = {
  args: {
    options: DcxErrorCheck,
  },
  render: renderCheckbox,
  ...withCode(DcxErrorCheck),
};

export const DisabledCheckBox: Story = {
  args: {
    options: DcxDisabledCheck,
  },
  render: renderCheckbox,
  ...withCode(DcxDisabledCheck),
};

export const DiferentsLabelPositions: Story = {
  args: {
    options: DcxDiferentsLabelPositionsCheck,
  },
  render: renderCheckbox,
  ...withCode(DcxDiferentsLabelPositionsCheck),
};

export const RequiredCheckbox: Story = {
  args: {
    options: DcxRequiredCheck,
  },
  render: renderCheckbox,
  ...withCode(DcxRequiredCheck),
};

export const CheckboxGroup: Story = {
  args: {
    options: DcxCheckboxGroup,
  },
  render: renderCheckbox,
  ...withCode(DcxCheckboxGroup),
};

export const CheckboxGroupWithChangeLabel: Story = {
  args: {
    options: DcxCheckboxGroup.map(option => ({
      ...option,
      labelPosition: 'right' as const,
    })),
  },

  render: () => {
    const el = document.createElement('dcx-web-checkbox');

    let options = DcxCheckboxGroup.map(option => ({
      ...option,
      labelPosition: 'right' as const,
    }));

    el.options = options;

    el.addEventListener('changeOptions', (event: Event) => {
      const customEvent = event as CustomEvent<DcxCheckbox[]>;

      options = customEvent.detail.map(option => ({
        ...option,
        label:
          option.value === true
            ? 'Válido'
            : option.value === false
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
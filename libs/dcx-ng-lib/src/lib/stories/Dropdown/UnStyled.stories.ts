import { Meta, StoryObj } from '@storybook/angular';
import { fn, userEvent, within, expect } from '@storybook/test';
import {
  DcxNgDropdownComponent,
  DropdownOptions,
} from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = {
  selectedKeyChange: fn(),
};

const meta: Meta<DcxNgDropdownComponent> = {
  title: 'DCXLibrary/Dropdown/Unstyled',
  component: DcxNgDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    dropdownOptions: { control: false },
    selectedKey: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    selectedKeyChange: { action: 'selectedKeyChange' },
  },
  args: {
    dropdownOptions: [
      { key: 'red', value: 'Rojo' },
      { key: 'green', value: 'Verde' },
      { key: 'blue', value: 'Azul' },
    ] as DropdownOptions[],
    selectedKey: null,
    placeholder: 'Selecciona color',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgDropdownComponent>;

export const Basic: Story = {
  render: args => ({
    props: {
      ...args,
      onSelectedKeyChange: (key: string | null) => {
        ActionsData.selectedKeyChange(key);
        (args as any).selectedKey = key;
      },
    },
    template: `
      <div style="display:grid; gap:8px; max-width:420px;">
        <dcx-ng-dropdown
          [dropdownOptions]="dropdownOptions"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [selectedKey]="selectedKey"
          (selectedKeyChange)="onSelectedKeyChange($event)"
        ></dcx-ng-dropdown>

        <div style="color:#6e7781;">
          Key seleccionada: <strong>{{ selectedKey ?? '(ninguna)' }}</strong>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  ...Basic,
  args: {
    disabled: true,
    selectedKey: 'green',
  },
};

export const WithPlaceholder: Story = {
  ...Basic,
  args: {
    selectedKey: null,
    placeholder: 'Elige una opción',
  },
};

export const NumericValues: Story = {
  ...Basic,
  args: {
    dropdownOptions: [
      { key: 'v16', value: 16 },
      { key: 'v17', value: 17 },
      { key: 'v18', value: 18 },
    ],
    placeholder: 'Elige versión',
    selectedKey: null,
  },
};

Basic.play = async ({ canvasElement, step, args }) => {
  const canvas = within(canvasElement);

  const trigger =
    (await canvas
      .findByRole('button', {
        name: new RegExp(
          args.selectedKey ? String(args.selectedKey) : args.placeholder,
          'i',
        ),
      })
      .catch(() => null)) || (await canvas.findByRole('button'));

  await step('Abrir dropdown', async () => {
    await userEvent.click(trigger);
  });

  const options = await canvas.findAllByRole('listitem');
  await step('Seleccionar opción', async () => {
    await userEvent.click(options[1]);
  });

  const text = await canvas.findByText(/Key seleccionada:/i);
  await step('Verificar cambio de selección', async () => {
    await expect(text.textContent).not.toMatch(/\(ninguna\)/i);
  });
};

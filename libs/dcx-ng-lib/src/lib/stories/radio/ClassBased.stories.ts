import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgRadioComponent } from '../../dcx-ng-components/dcx-ng-radio/dcx-ng-radio.component';

const meta: Meta<DcxNgRadioComponent> = {
  title: 'DCXLibrary/Radio/Class based',
  component: DcxNgRadioComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['s', 'm', 'l'],
    },
    disabled: { control: 'boolean' },
    unstyled: { control: 'boolean' },
    label: { control: 'text' },
    value: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DcxNgRadioComponent>;

export const Basico: Story = {
  args: {
    name: 'ejemplo',
    value: 'valor1',
    label: 'Basico',
    size: 'm',
    disabled: false,
    unstyled: false,
  },
};

export const Tamaños: Story = {
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-radio name="grupo" value="s" label="S" size="s"></dcx-ng-radio>
      <dcx-ng-radio name="grupo" value="m" label="M" size="m"></dcx-ng-radio>
      <dcx-ng-radio name="grupo" value="l" label="L" size="l"></dcx-ng-radio>
    `,
  }),
};

export const LabelLargo: Story = {
  args: {
    name: 'largo',
    value: 'valorLargo',
    label: 'Este es un radio con un label muy largo para comprobar el comportamiento del componente en casos de textos extensos.',
    size: 'm',
    disabled: false,
    unstyled: false,
  },
};

export const SinLabel: Story = {
  args: {
    name: 'sinlabel',
    value: 'valorSinLabel',
    label: '',
    size: 'm',
    disabled: false,
    unstyled: false,
  },
};

export const SeleccionadoPorDefecto: Story = {
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-radio name="grupoDefecto" value="seleccionado" label="Seleccionado" size="m" [ngModel]="'seleccionado'"></dcx-ng-radio>
      <dcx-ng-radio name="grupoDefecto" value="noSeleccionado" label="No seleccionado" size="m" [ngModel]="'seleccionado'"></dcx-ng-radio>
    `,
  }),
};
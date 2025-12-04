import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgCheckbox } from '../../dcx-ng-components/dcx-ng-checkbox/dcx-ng-checkbox.component';

const meta: Meta<DcxNgCheckbox> = {
    title: 'DCXLibrary/Checkbox/Without style',
    component: DcxNgCheckbox,
};
export default meta;

type Story = StoryObj<DcxNgCheckbox>;

export const Primary: Story = {
    args: {
        label: 'Acepto los términos',
        checked: false,
        errorMessage: 'Este campo es obligatorio',
        color: undefined,
    },
};

export const Accent: Story = {
    args: {
        label: 'Recibir notificaciones',
        checked: true,
        disabled: true,
        color: undefined,
    },
};

export const Error: Story = {
    args: {
        label: 'Campo con error',
        checked: false,
        errorMessage: 'Debes marcar esta opción',
        color: undefined,
    },
};

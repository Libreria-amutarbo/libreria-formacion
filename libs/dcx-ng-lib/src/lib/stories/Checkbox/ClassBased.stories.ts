import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgCheckbox } from '../../dcx-ng-components/dcx-ng-checkbox/dcx-ng-checkbox.component';

const meta: Meta<DcxNgCheckbox> = {
    title: 'DCXLibrary/Checkbox/ClassBased',
    component: DcxNgCheckbox,
};
export default meta;

type Story = StoryObj<DcxNgCheckbox>;

export const Primary: Story = {
    args: {
        label: 'Acepto los términos',
        color: 'primary',
        checked: false,
        errorMessage: 'Este campo es obligatorio',
    },
};

export const Accent: Story = {
    args: {
        label: 'Recibir notificaciones',
        color: 'accent',
        checked: true,
        disabled: true,
    },
};

export const Error: Story = {
    args: {
        label: 'Campo con error',
        color: 'error',
        checked: false,
        errorMessage: 'Debes marcar esta opción',
    },
};

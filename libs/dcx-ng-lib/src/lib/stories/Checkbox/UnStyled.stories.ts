import { DcxNgCheckboxComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';


const meta: Meta<DcxNgCheckboxComponent> = {
    title: 'DCXLibrary/Checkbox/Without style',
    component: DcxNgCheckboxComponent,
    argTypes: {
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl', 'auto'],
            description: 'Tamaño del checkbox',
        },
    },
};
export default meta;

type Story = StoryObj<DcxNgCheckboxComponent>;

export const Primary: Story = {
    args: {
        label: 'Acepto los términos',
        checked: false,
        errorMessage: 'Este campo es obligatorio',
        color: undefined,
        size: 'm',
    },
};

export const Accent: Story = {
    args: {
        label: 'Recibir notificaciones',
        checked: true,
        disabled: true,
        color: undefined,
        size: 'm',
    },
};

export const Error: Story = {
    args: {
        label: 'Campo con error',
        checked: false,
        errorMessage: 'Debes marcar esta opción',
        color: undefined,
        size: 'm',
    },
};

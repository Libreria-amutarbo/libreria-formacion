import { DcxNgCheckboxComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgCheckboxComponent> = {
    title: 'DCXLibrary/Checkbox/ClassBased',
    component: DcxNgCheckboxComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl',],
            description: 'Tamaño del checkbox',
        },
        color: {
            control: 'color',
            description: 'Color del checkbox',
        },
    },
};
export default meta;

type Story = StoryObj<DcxNgCheckboxComponent>;

export const Default: Story = {
    args: {
        label: 'Acepto los términos',
        color: 'primary',
        checked: false,
        errorMessage: '',
        disabled: false,
        size: 'm',
    },
};

export const Primary: Story = {
    args: {
        label: 'Checkbox Primary',
        color: 'primary',
        checked: false,
        size: 'm',
    },
};

export const GroupMultipleSelection: Story = {
    args: {
        groupLabel: 'Selecciona tus intereses',
        color: 'primary',
        multiple: true,
        disabled: false,
        size: 'm',
        options: [
            { value: 'sports', label: 'Deportes' },
            { value: 'music', label: 'Música' },
            { value: 'movies', label: 'Películas' },
            { value: 'reading', label: 'Lectura' },
        ],
        selectedValues: ['sports'],
    },
};

export const GroupSingleSelection: Story = {
    args: {
        groupLabel: 'Selecciona tu género favorito',
        color: 'accent',
        multiple: false,
        disabled: false,
        size: 'm',
        options: [
            { value: 'action', label: 'Acción' },
            { value: 'comedy', label: 'Comedia' },
            { value: 'drama', label: 'Drama' },
            { value: 'scifi', label: 'Ciencia Ficción' },
        ],
        selectedValues: ['comedy'],
    },
};

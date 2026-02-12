import { DcxNgCheckboxComponent, DcxPosition, POSITION_LIST, SIZE_LIST } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgCheckboxComponent> = {
    title: 'DCXLibrary/Checkbox/ClassBased',
    component: DcxNgCheckboxComponent,
    tags: ['autodocs'],
    parameters: {
        controls: { expanded: true },
    },
    argTypes: {
        label: {
            name: 'label',
            control: { type: 'text' },
            description: 'Texto del label del checkbox',
            table: {
                category: 'Attributes',
                type: { summary: 'string' },
                defaultValue: { summary: "-" },
            },
        },
        labelPosition: {
            name: 'labelPosition',
            control: 'select',
            options: POSITION_LIST,
            description: 'Posición del label respecto al checkbox',
            table: {
                category: 'Attributes',
                type: { summary: "DcxPosition" },
                defaultValue: { summary: 'right' },
            },
        },
        color: {
            name: 'color',
            control: 'color',
            description: 'Color del checkbox (personalizado)',
            table: {
                category: 'Attributes',
                type: { summary: 'string (hex color)' },
                defaultValue: { summary: '#1976d2' },
            },
        },
        size: {
            name: 'size',
            control: 'select',
            options: SIZE_LIST,
            description: 'Tamaño del checkbox según sistema de espaciado',
            table: {
                category: 'Attributes',
                type: { summary: "DcxSize" },
                defaultValue: { summary: 'm' },
            },
        },
        checked: {
            name: 'checked',
            control: { type: 'boolean' },
            description: 'Estado marcado/desmarcado del checkbox',
            table: {
                category: 'Attributes',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            name: 'disabled',
            control: { type: 'boolean' },
            description: 'Deshabilita la interacción con el checkbox',
            table: {
                category: 'Attributes',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        errorMessage: {
            name: 'errorMessage',
            control: { type: 'text' },
            description: 'Mensaje de error mostrado cuando el checkbox no está marcado',
            table: {
                category: 'Attributes',
                type: { summary: 'string' },
                defaultValue: { summary: '-' },
            },
        },
        groupLabel: {
            name: 'groupLabel',
            control: { type: 'text' },
            description: 'Label del grupo de checkboxes',
            table: {
                category: 'Attributes - Group',
                type: { summary: 'string' },
                defaultValue: { summary: '-' },
            },
        },
        options: {
            name: 'options',
            control: { type: 'object' },
            description: 'Array de opciones para grupo de checkboxes',
            table: {
                category: 'Attributes - Group',
                type: { summary: 'CheckboxOption[]' },
                defaultValue: { summary: '[]' },
            },
        },
        selectedValues: {
            name: 'selectedValues',
            control: { type: 'object' },
            description: 'Array de valores seleccionados en el grupo',
            table: {
                category: 'Attributes - Group',
                type: { summary: 'string[]' },
                defaultValue: { summary: '[]' },
            },
        },
        multiple: {
            name: 'multiple',
            control: { type: 'boolean' },
            description: 'Permite selección múltiple (true) o única (false) en grupos',
            table: {
                category: 'Attributes - Group',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        checkedChange: {
            name: 'checkedChange',
            action: 'checkedChange',
            description: 'Se emite cuando cambia el estado checked del checkbox individual',
            table: {
                category: 'Events',
                type: { summary: '(checked: boolean) => void' },
                defaultValue: { summary: '-' },
            },
        },
        selectionChange: {
            name: 'selectionChange',
            action: 'selectionChange',
            description: 'Se emite cuando cambia la selección en un grupo de checkboxes',
            table: {
                category: 'Events',
                type: { summary: '(selectedValues: string[]) => void' },
                defaultValue: { summary: '-' },
            },
        },
    },
    args: {
        label: 'Acepto los términos',
        color: '#1976d2',
        checked: false,
        disabled: false,
        size: 'm',
        labelPosition: 'right',
        errorMessage: '',
    },
};
export default meta;

type Story = StoryObj<DcxNgCheckboxComponent>;

export const Default: Story = {
    args: {
        label: 'Acepto los términos',
        color: '#1976d2',
        checked: false,
        errorMessage: '',
        disabled: false,
        size: 'm',
        labelPosition: 'right',
    },
};

export const Primary: Story = {
    args: {
        label: 'Checkbox Primary',
        labelPosition: 'right',
        color: '#1976d2',
        checked: false,
        size: 'm',
    },
};

export const DisabledCheckbox: Story = {
    args: {
        label: 'Checkbox Disabled',
        color: '#e91e63',
        checked: true,
        disabled: true,
        size: 'm',
    },
};

export const WithErrorMessage: Story = {
    args: {
        label: 'Acepto los términos',
        color: '#ef4444',
        checked: false,
        errorMessage: 'Debes aceptar los términos para continuar',
        disabled: false,
        size: 'm',
        labelPosition: 'right',
    },
};

export const GroupMultipleSelection: Story = {
    args: {
        groupLabel: 'Selecciona tus intereses',
        color: '#1976d2',
        multiple: true,
        disabled: false,
        size: 'm',
        options: [
            { value: 'sports', label: 'Deportes' },
            { value: 'music', label: 'Música' },
            { value: 'movies', label: 'Películas' },
            { value: 'reading', label: 'Lectura' },
        ],
    },
};

export const GroupSingleSelection: Story = {
    args: {
        groupLabel: 'Selecciona tu género favorito',
        color: '#e91e63',
        multiple: false,
        disabled: false,
        size: 'm',
        options: [
            { value: 'action', label: 'Acción' },
            { value: 'comedy', label: 'Comedia' },
            { value: 'drama', label: 'Drama' },
            { value: 'scifi', label: 'Ciencia Ficción' },
        ],
    },
};

export const GroupWithDisabledOptions: Story = {
    name: 'Grupo con opciones deshabilitadas',
    args: {
        groupLabel: '¿Qué deportes te gustan?',
        color: '#1976d2',
        multiple: true,
        disabled: false,
        size: 'm',
        options: [
            { value: 'futbol', label: 'Fútbol' },
            { value: 'baloncesto', label: 'Baloncesto', disabled: true },
            { value: 'tenis', label: 'Tenis' },
            { value: 'natacion', label: 'Natación' },
            { value: 'ciclismo', label: 'Ciclismo', disabled: true },
        ],
        selectedValues: ['futbol', 'tenis'],
    },
};

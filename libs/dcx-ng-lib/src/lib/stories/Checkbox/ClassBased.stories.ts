import { DcxNgCheckboxComponent } from '@dcx-ng-components/dcx-ng-lib';
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
                category: 'Atributos',
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
        labelPosition: {
            name: 'labelPosition',
            control: 'select',
            options: ['left', 'right'],
            description: 'Posición del label respecto al checkbox',
            table: {
                category: 'Atributos',
                type: { summary: "'left' | 'right'" },
                defaultValue: { summary: 'right' },
            },
        },
        color: {
            name: 'color',
            control: 'color',
            description: 'Color del checkbox (preset o personalizado)',
            table: {
                category: 'Atributos',
                type: { summary: "CheckBoxVariant | string ('primary' | 'accent' | 'error' | hex)" },
                defaultValue: { summary: 'primary' },
            },
        },
        size: {
            name: 'size',
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
            description: 'Tamaño del checkbox según sistema de espaciado',
            table: {
                category: 'Atributos',
                type: { summary: "DcxSize ('s' | 'm' | 'l' | 'xl')" },
                defaultValue: { summary: 'm' },
            },
        },
        checked: {
            name: 'checked',
            control: { type: 'boolean' },
            description: 'Estado marcado/desmarcado del checkbox',
            table: {
                category: 'Atributos',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            name: 'disabled',
            control: { type: 'boolean' },
            description: 'Deshabilita la interacción con el checkbox',
            table: {
                category: 'Atributos',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        errorMessage: {
            name: 'errorMessage',
            control: { type: 'text' },
            description: 'Mensaje de error mostrado cuando el checkbox no está marcado',
            table: {
                category: 'Atributos',
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
        groupLabel: {
            name: 'groupLabel',
            control: { type: 'text' },
            description: 'Label del grupo de checkboxes',
            table: {
                category: 'Atributos - Grupo',
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
        options: {
            name: 'options',
            control: { type: 'object' },
            description: 'Array de opciones para grupo de checkboxes',
            table: {
                category: 'Atributos - Grupo',
                type: { summary: 'CheckboxOption[]' },
                defaultValue: { summary: '[]' },
            },
        },
        selectedValues: {
            name: 'selectedValues',
            control: { type: 'object' },
            description: 'Array de valores seleccionados en el grupo',
            table: {
                category: 'Atributos - Grupo',
                type: { summary: 'string[]' },
                defaultValue: { summary: '[]' },
            },
        },
        multiple: {
            name: 'multiple',
            control: { type: 'boolean' },
            description: 'Permite selección múltiple (true) o única (false) en grupos',
            table: {
                category: 'Atributos - Grupo',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        checkedChange: {
            name: 'checkedChange',
            action: 'checkedChange',
            description: 'Se emite cuando cambia el estado checked del checkbox individual',
            table: {
                category: 'Eventos',
                type: { summary: '(checked: boolean) => void' },
                defaultValue: { summary: '-' },
            },
        },
        selectionChange: {
            name: 'selectionChange',
            action: 'selectionChange',
            description: 'Se emite cuando cambia la selección en un grupo de checkboxes',
            table: {
                category: 'Eventos',
                type: { summary: '(selectedValues: string[]) => void' },
                defaultValue: { summary: '-' },
            },
        },
    },
    args: {
        label: 'Acepto los términos',
        color: 'primary',
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
        color: 'primary',
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
    },
};

export const GroupWithDisabledOptions: Story = {
    name: 'Grupo con opciones deshabilitadas',
    args: {
        groupLabel: '¿Qué deportes te gustan?',
        color: 'primary',
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

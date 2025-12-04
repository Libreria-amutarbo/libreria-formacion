import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconFieldComponent } from '../../dcx-ng-components/dcx-ng-iconField/dcx-ng-iconField.component';
import { moduleMetadata } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';

type IconSize = 's' | 'm' | 'l' | 'xl';

const meta: Meta<DcxNgIconFieldComponent> = {
  title: 'DCXLibrary/IconField/UnStyled',
  component: DcxNgIconFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconComponent],
    }),
    // Decorador para reset de estilos con apariencia nativa
    (story, context) => {
      return {
        template: `
          <div class="unstyled-wrapper">
            <style>
              /* Reset global más agresivo */
              .unstyled-wrapper * {
                all: revert !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field,
              .unstyled-wrapper dcx-ng-icon-field *,
              .unstyled-wrapper dcx-ng-icon-field *:before,
              .unstyled-wrapper dcx-ng-icon-field *:after {
                all: revert !important;
                box-sizing: content-box !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                font: inherit !important;
                vertical-align: baseline !important;
                background: transparent !important;
                outline: 0 !important;
                box-shadow: none !important;
                transition: none !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-field-wrapper {
                display: block !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-field-container {
                position: relative !important;
                display: inline-block !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-field-input {
                /* Estilo de input completamente nativo */
                display: inline-block !important;
                padding: 1px 2px !important;
                border: 1px solid #a0a0a0 !important;
                border-top-color: #808080 !important;
                border-left-color: #808080 !important;
                background: white !important;
                color: black !important;
                font-family: sans-serif !important;
                font-size: 13px !important;
                width: 150px !important;
                height: 20px !important;
                line-height: normal !important;
                outline: none !important;
              }
              
              /* Override específico para el focus con máxima especificidad */
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-field-input:focus,
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-field-input:focus-visible,
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-field-input:focus-within {
                border: 1px solid #a0a0a0 !important;
                border-top-color: #808080 !important;
                border-left-color: #808080 !important;
                outline: none !important;
                box-shadow: none !important;
                background: white !important;
                color: black !important;
              }
              

              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-field-input:disabled {
                background-color: #f0f0f0 !important;
                color: #808080 !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-left,
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-right {
                position: absolute !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                color: #404040 !important;
                font-size: 12px !important;
                pointer-events: none !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-left {
                left: 3px !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-right {
                right: 3px !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-left ~ .dcx-icon-field-input {
                padding-left: 18px !important;
              }
              
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-right ~ .dcx-icon-field-input,
              .unstyled-wrapper dcx-ng-icon-field .dcx-icon-right + .dcx-icon-field-input {
                padding-right: 18px !important;
              }
            </style>
            <dcx-ng-icon-field 
              [placeholder]="placeholder"
              [iconLeft]="iconLeft"
              [iconRight]="iconRight"
              [iconSize]="iconSize"
              [disabled]="disabled"
              [value]="value">
            </dcx-ng-icon-field>
          </div>
        `,
        props: context.args,
      };
    },
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
IconField sin estilos personalizados: aspecto nativo del navegador con iconos básicos.
Ideal para cuando quieres tener control total sobre la apariencia visual.
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Texto placeholder del input.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    iconLeft: {
      control: { type: 'text' },
      description: 'Nombre del icono a mostrar a la izquierda.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    iconRight: {
      control: { type: 'text' },
      description: 'Nombre del icono a mostrar a la derecha.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    iconSize: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'] as IconSize[],
      description: 'Tamaño de los iconos.',
      table: {
        type: { summary: 'IconSize' },
        defaultValue: { summary: 'm' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado del campo.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor actual del campo.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
  args: {
    placeholder: 'Escribe aquí...',
    iconLeft: '',
    iconRight: '',
    iconSize: 'm',
    disabled: false,
    value: '',
  },
};

export default meta;
type Story = StoryObj<DcxNgIconFieldComponent>;

export const IconLeft: Story = {
  args: {
    placeholder: 'Buscar...',
    iconLeft: 'search',
  },
};

export const IconRight: Story = {
  args: {
    placeholder: 'Campo con icono derecho',
    iconRight: 'close',
  },
};

export const BothIcons: Story = {
  args: {
    placeholder: 'Campo con ambos iconos',
    iconLeft: 'search',
    iconRight: 'close',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Campo deshabilitado',
    iconLeft: 'search',
    disabled: true,
  },
};

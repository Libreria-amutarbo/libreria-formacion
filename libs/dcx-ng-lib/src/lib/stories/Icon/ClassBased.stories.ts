
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { SIZE_LIST, SIZE_DEFAULT, ICON_SPACING_LIST, ICON_SPACING_DEFAULT } from '../../core/defaults';
import { BOOTSTRAP_ICONS } from 'libs/dcx-ng-lib/.storybook/bootstrap-icons';
import { DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgIconComponent> = {
  title: 'DCXLibrary/Components/Icon',
  component: DcxNgIconComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgIconComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: SIZE_LIST,
      description: 'Tamaño del icono (s, m, l, xl)',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxSize' },
        defaultValue: { summary: 'l' },
      },
    },
    color: {
      control: 'color',
      description: 'Color del icono (hexadecimal o nombre CSS)',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: '#0058ab' },
      },
    },
    extraClass: {
      control: 'text',
      description: 'Clases CSS personalizadas para estilos adicionales',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    spacing: {
      control: 'select',
      options: ICON_SPACING_LIST,
      description: 'Espaciado externo del icono',
      table: {
        category: 'Attributes',
        type: { summary: 'IconSpacing' },
        defaultValue: { summary: 'none' },
      },
    },
  },
  args: {
    size: 'l',
    spacing: 'none',
    color: '#0058ab',
    extraClass: '',
  },
};
export default meta;

type Story = StoryObj<any>;

export const AllIcons: Story = {
  render: (args) => {
    const props = {
      size: args['size'],
      spacing: args['spacing'],
      color: args['color'],
      extraClass: args['extraClass'],
      icons: BOOTSTRAP_ICONS,
      onCopy: async (name: string) => {
        try {
          await navigator.clipboard.writeText(name);
          alert('Copiado al portapapeles')
        } catch {
          const ta = document.createElement('textarea');
          ta.value = name;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
      },
    };

    return {
      template: `
        <div style="
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px;
        ">
          <div style="
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            justify-content: center;
            justify-items: center;
            align-items: start;
          ">
            <div 
              *ngFor="let icon of icons"
              [class]="extraClass"
              (click)="onCopy(icon)"
              [title]="'Click para copiar: ' + icon"
              style="
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                padding: 8px;
              "
            >
              <dcx-ng-icon
                [name]="icon"
                [size]="size"
                [spacing]="spacing"
                [color]="color"
              ></dcx-ng-icon>

              <div style="
                font-size: 14px;
                color: #666;
                text-align: center;
                word-break: break-word;
              ">
                {{ icon }}
              </div>
            </div>
          </div>
        </div>
      `,
      props,
    };
  },
}
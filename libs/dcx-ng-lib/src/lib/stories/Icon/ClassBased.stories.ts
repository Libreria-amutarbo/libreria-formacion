import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  ICON_SIZE_LIST,
  ICON_SPACING_LIST,
} from '../../core/defaults';
import { BOOTSTRAP_ICONS } from 'libs/dcx-ng-lib/.storybook/bootstrap-icons';
import { DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgIconComponent> = {
  title: 'DCXLibrary/Components/Icon',
  component: DcxNgIconComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgIconComponent],
    }),
  ],
  args: {
    name: 'gear',
    size: 'm',
    spacing: 'none',
    // Azul corporativo en el showcase (a nivel de story, no del componente:
    // el componente por defecto hereda el color del contexto).
    color: '#0058ab',
    extraClass: '',
    ariaLabel: '',
  },
  argTypes: {
    name: {
      name: 'name',
      control: { type: 'text' },
      description:
        'Nombre del icono de Bootstrap Icons, sin el prefijo `bi-` (p.ej. `gear`, `search`, `heart`).',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '(requerido)' },
      },
    },
    size: {
      name: 'size',
      control: { type: 'select' },
      options: ICON_SIZE_LIST,
      description: 'Tamaño del icono. `auto` hereda el tamaño del contenedor.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxSize' },
        defaultValue: { summary: 'm' },
      },
    },
    spacing: {
      name: 'spacing',
      control: { type: 'select' },
      options: ICON_SPACING_LIST,
      description: 'Margen horizontal externo del icono.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxIconSpacing' },
        defaultValue: { summary: 'none' },
      },
    },
    color: {
      name: 'color',
      control: { type: 'color' },
      description:
        'Color del icono (hexadecimal o nombre CSS). Si se deja vacío, hereda el color del contexto (`currentColor`). Debe cumplir un contraste de al menos 3:1 frente al fondo.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '"" (hereda currentColor)' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      control: { type: 'text' },
      description:
        'Nombre accesible. Si se indica, el icono es significativo (`role="img"` + `aria-label`). Si se deja vacío, el icono es decorativo (`aria-hidden="true"`).',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    extraClass: {
      name: 'extraClass',
      control: { type: 'text' },
      description: 'Clases CSS personalizadas para estilos adicionales.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};
export default meta;

type Story = StoryObj<DcxNgIconComponent>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => ({
    props: { ...args, sizes: ICON_SIZE_LIST },
    template: `
      <div style="display:flex;align-items:flex-end;gap:1.5rem;">
        <div *ngFor="let s of sizes" style="display:flex;flex-direction:column;align-items:center;gap:.5rem;">
          <dcx-ng-icon [name]="name" [size]="s" [color]="color"></dcx-ng-icon>
          <small style="color:#666;">{{ s }}</small>
        </div>
      </div>
    `,
  }),
};

export const Spacing: Story = {
  render: (args) => ({
    props: { ...args, spacings: ICON_SPACING_LIST },
    template: `
      <div style="display:flex;flex-direction:column;gap:.75rem;">
        <div *ngFor="let sp of spacings" style="background:#f4f5f7;border-radius:6px;">
          <span style="background:#fff;">texto</span><dcx-ng-icon [name]="name" [size]="size" [spacing]="sp"></dcx-ng-icon><span style="background:#fff;">{{ sp }}</span>
        </div>
      </div>
    `,
  }),
};

export const Color: Story = {
  render: (args) => ({
    props: { ...args, colors: ['#0058ab', '#16a34a', '#dc2626', '#d97706'] },
    template: `
      <div style="display:flex;gap:1.5rem;">
        <dcx-ng-icon *ngFor="let c of colors" [name]="name" [size]="size" [color]="c"></dcx-ng-icon>
      </div>
    `,
  }),
};

export const Accessible: Story = {
  args: {
    name: 'gear',
    ariaLabel: 'Configuración',
  },
};

export const AllIcons: Story = {
  render: (args) => {
    const props = {
      size: args.size,
      spacing: args.spacing,
      color: args.color,
      extraClass: args.extraClass,
      icons: [...BOOTSTRAP_ICONS].sort((a, b) => a.localeCompare(b)),
      onCopy: async (name: string) => {
        try {
          await navigator.clipboard.writeText(name);
          alert('Copiado al portapapeles');
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
        <div style="max-width: 1200px; margin: 0 auto; padding: 16px;">
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
              style="cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px;"
            >
              <dcx-ng-icon
                [name]="icon"
                [size]="size"
                [spacing]="spacing"
                [color]="color"
              ></dcx-ng-icon>

              <div style="font-size: 14px; color: #666; text-align: center; word-break: break-word;">
                {{ icon }}
              </div>
            </div>
          </div>
        </div>
      `,
      props,
    };
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DcxNgBadgeComponent,
  DcxNgButtonComponent,
  DcxNgIconComponent,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgBadgeComponent> = {
  title: 'DCXLibrary/Components/Badge',
  component: DcxNgBadgeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgBadgeComponent, DcxNgButtonComponent, DcxNgIconComponent],
    }),
  ],
  args: {
    value: '2',
    severity: 'primary',
    size: 'md',
    ariaLabel: null,
    ariaHidden: false,
    role: null,
  },
  argTypes: {
    value: {
      name: 'value',
      control: { type: 'text' },
      description: 'Texto o número que muestra el badge. Si se deja vacío, el badge aparece como un punto indicador.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    severity: {
      name: 'severity',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warn', 'danger'],
      description: 'Variante de color semántico del badge.',
      table: {
        category: 'Atributos',
        type: { summary: 'BadgeSeverityType' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      name: 'size',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del badge.',
      table: {
        category: 'Atributos',
        type: { summary: 'BadgeSizeType' },
        defaultValue: { summary: 'md' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      control: { type: 'text' },
      description:
        'Etiqueta accesible explícita para lectores de pantalla. Si es `null`, se genera automáticamente como `"[valor], [severidad]"`. Sobreescribe el label por defecto.',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    ariaHidden: {
      name: 'ariaHidden',
      control: { type: 'boolean' },
      description:
        'Marca el badge como decorativo para lectores de pantalla. Usar cuando el elemento padre ya describe el estado (p.ej. un botón con `aria-label` que incluye el conteo).',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    role: {
      name: 'role',
      control: { type: 'select' },
      options: [null, 'status', 'alert'],
      description:
        'Rol ARIA para live regions. Usar `status` para contadores que cambian sin urgencia y `alert` para notificaciones urgentes que requieren atención inmediata.',
      table: {
        category: 'Atributos',
        type: { summary: '"status" | "alert" | null' },
        defaultValue: { summary: 'null' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgBadgeComponent>;

export const Default: Story = {
  args: {
    value: '2',
    severity: 'primary',
    size: 'md',
  },
};

export const Dot: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-badge severity="primary" />
        <dcx-ng-badge severity="danger" />
        <dcx-ng-badge severity="success" />
        <dcx-ng-badge severity="warn" />
      </div>
    `,
  }),
};

export const Severities: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-badge value="2" severity="primary" />
        <dcx-ng-badge value="6" severity="secondary" />
        <dcx-ng-badge value="8" severity="success" />
        <dcx-ng-badge value="4" severity="info" />
        <dcx-ng-badge value="9" severity="warn" />
        <dcx-ng-badge value="3" severity="danger" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap;">
        <dcx-ng-badge value="8" size="xl" severity="success" />
        <dcx-ng-badge value="6" size="lg" severity="warn" />
        <dcx-ng-badge value="4" size="md" severity="info" />
        <dcx-ng-badge value="2" size="sm" severity="primary" />
      </div>
    `,
  }),
};

export const OverlayIcon: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
        <div style="position:relative; display:inline-flex;">
          <dcx-ng-badge value="2" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;" />
          <dcx-ng-icon name="bell" size="xl" />
        </div>
        <div style="position:relative; display:inline-flex;">
          <dcx-ng-badge value="5" severity="danger" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;" />
          <dcx-ng-icon name="envelope" size="xl" />
        </div>
        <div style="position:relative; display:inline-flex;">
          <dcx-ng-badge severity="danger" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;" />
          <dcx-ng-icon name="calendar" size="xl" />
        </div>
      </div>
    `,
  }),
};

export const OverlayButton: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
        <div style="position:relative; display:inline-flex;">
          <dcx-ng-badge value="2" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;" [ariaHidden]="true" />
          <dcx-ng-button
            label="Notificaciones"
            variant="primary"
            size="m"
            icon iconName="bell"
            iconPosition="left"
            iconSize="m"
            ariaLabel="Notificaciones, 2 sin leer" />
        </div>
        <div style="position:relative; display:inline-flex;">
          <dcx-ng-badge value="4" severity="danger" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;" [ariaHidden]="true" />
          <dcx-ng-button
            label="Bandeja"
            variant="secondary"
            size="m"
            icon iconName="inbox"
            iconPosition="left"
            iconSize="m"
            ariaLabel="Bandeja, 4 mensajes sin leer" />
        </div>
      </div>
    `,
  }),
};

export const LiveCounter: Story = {
  render: () => ({
    props: {
      count: 0,
      increment() { this['count']++; },
      reset() { this['count'] = 0; },
    },
    template: `
      <p style="font-size:13px; color:#696e75; margin-bottom:12px;">
        Con <code>role="status"</code> el lector de pantalla anuncia el cambio de valor
        sin interrumpir al usuario.
      </p>
      <div style="display:flex; align-items:center; gap:16px;">
        <dcx-ng-badge [value]="count.toString()" severity="danger" role="status" />
        <button (click)="increment()" style="padding:6px 12px; cursor:pointer;">+1</button>
        <button (click)="reset()" style="padding:6px 12px; cursor:pointer;">Reset</button>
      </div>
    `,
  }),
};

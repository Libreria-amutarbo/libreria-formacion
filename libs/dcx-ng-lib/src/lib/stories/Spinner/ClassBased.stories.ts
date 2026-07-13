import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSpinnerComponent } from '../../dcx-ng-components/dcx-ng-spinner/dcx-ng-spinner.component';

const meta: Meta<DcxNgSpinnerComponent> = {
  title: 'DCXLibrary/Components/Spinner',
  component: DcxNgSpinnerComponent,
  tags: ['autodocs'],
  args: {
    size: 'm',
    title: 'Cargando…',
    description: 'Esto puede tardar unos segundos',
    wrapper: false,
    delay: 0,
    color: null,
    ariaLabel: null,
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Color del arco activo (hexadecimal o nombre CSS)',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
      description: 'Tamaño del spinner',
      table: {
        category: 'Atributos',
        type: { summary: "'s' | 'm' | 'l' | 'xl'" },
        defaultValue: { summary: 'm' },
      },
    },
    wrapper: {
      control: { type: 'boolean' },
      description: 'Si es true, el spinner se muestra como overlay sobre el contenido proyectado',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    delay: {
      control: { type: 'number' },
      description:
        'Milisegundos de espera antes de mostrar el spinner. Evita el parpadeo en operaciones muy rápidas; con 0 se muestra al instante.',
      table: {
        category: 'Atributos',
        defaultValue: { summary: '1300' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Texto visible junto al spinner',
      table: {
        category: 'Atributos',
        defaultValue: { summary: "''" },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Texto secundario visible bajo el título (solo en modo standalone)',
      table: {
        category: 'Atributos',
        defaultValue: { summary: "''" },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description:
        'Texto anunciado a lectores de pantalla. Tiene prioridad sobre title — útil cuando el texto anunciado debe ser distinto del visible (o cuando no hay texto visible en absoluto).',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgSpinnerComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <dcx-ng-spinner
        [size]="size"
        [wrapper]="wrapper"
        [delay]="delay"
        [title]="title"
        [color]="color"
        [ariaLabel]="ariaLabel"
        [description]="description">
      </dcx-ng-spinner>
    `,
  }),
  parameters: {
    controls: { expanded: true },
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <dcx-ng-spinner size="s" [delay]="0" ariaLabel="Cargando"></dcx-ng-spinner>
        <dcx-ng-spinner size="m" [delay]="0" ariaLabel="Cargando"></dcx-ng-spinner>
        <dcx-ng-spinner size="l" [delay]="0" ariaLabel="Cargando"></dcx-ng-spinner>
        <dcx-ng-spinner size="xl" [delay]="0" ariaLabel="Cargando"></dcx-ng-spinner>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const CustomColor: Story = {
  name: 'Color personalizado',
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <dcx-ng-spinner size="l" [delay]="0" ariaLabel="Cargando"></dcx-ng-spinner>
        <dcx-ng-spinner size="l" [delay]="0" color="#7c3aed" ariaLabel="Cargando"></dcx-ng-spinner>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const WithText: Story = {
  name: 'Con título y descripción',
  render: () => ({
    template: `
      <div style="display: flex; gap: 3rem; align-items: flex-start;">
        <dcx-ng-spinner size="l" [delay]="0" title="Cargando…"></dcx-ng-spinner>
        <dcx-ng-spinner
          size="l"
          [delay]="0"
          title="Procesando"
          description="Por favor, espera">
        </dcx-ng-spinner>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const SpinnerDelayShowcase: Story = {
  name: 'Con delay',
  args: {
    title: 'Cargando con retraso…',
    description: 'Este spinner solo aparece pasado 1 segundo',
    delay: 1000,
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-spinner
        [size]="size"
        [color]="color"
        [delay]="delay"
        [title]="title"
        [description]="description">
      </dcx-ng-spinner>
    `,
  }),
};

export const SpinnerWrapperShowcase: Story = {
  name: 'Modo wrapper (overlay)',
  args: {
    title: 'Cargando contenido…',
    wrapper: true,
    delay: 0,
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-spinner
        [size]="size"
        [color]="color"
        [delay]="delay"
        [wrapper]="wrapper"
        [title]="title">
        <div class="content-box">
          <h4>Contenido</h4>
          <p>
            Este es un ejemplo del contenido que se muestra bajo el spinner en
            modo wrapper.
          </p>
          <p>El spinner se superpone a este contenido como un overlay.</p>
        </div>
      </dcx-ng-spinner>
    `,
  }),
};

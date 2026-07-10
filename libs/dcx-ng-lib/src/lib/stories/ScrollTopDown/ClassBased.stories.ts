import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DcxNgScrollTopDownComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgScrollTopDownComponent> = {
  title: 'DCXLibrary/Components/ScrollTopDown',
  component: DcxNgScrollTopDownComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgScrollTopDownComponent],
    }),
  ],
  argTypes: {
    container: {
      control: 'object',
      description:
        'Contenedor HTML opcional para aplicar el scroll. Si no se provee, usa la ventana.',
      table: { category: 'Atributos' },
    },
    smooth: {
      control: 'boolean',
      description: 'Activa o desactiva el comportamiento de scroll suave.',
      table: { category: 'Atributos' },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Controla el tamaño visual del componente.',
      table: { category: 'Atributos' },
    },
    iconSize: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Tamaño de los iconos internos.',
      table: { category: 'Atributos' },
    },
    showTop: {
      control: 'boolean',
      description: 'Muestra u oculta el botón para subir.',
      table: { category: 'Atributos' },
    },
    showBottom: {
      control: 'boolean',
      description: 'Muestra u oculta el botón para bajar.',
      table: { category: 'Atributos' },
    },
    topLabel: {
      control: 'text',
      description: 'Etiqueta accesible para el botón de subir.',
      table: { category: 'Atributos' },
    },
    bottomLabel: {
      control: 'text',
      description: 'Etiqueta accesible para el botón de bajar.',
      table: { category: 'Atributos' },
    },
    topIcon: {
      control: 'text',
      description: 'Nombre del icono para subir.',
      table: { category: 'Atributos' },
    },
    bottomIcon: {
      control: 'text',
      description: 'Nombre del icono para bajar.',
      table: { category: 'Atributos' },
    },
    groupLabel: {
      control: 'text',
      description: 'Etiqueta accesible para el grupo de controles.',
      table: { category: 'Atributos' },
    },
  },
  args: {
    smooth: true,
    size: 'm',
    iconSize: 's',
    showTop: true,
    showBottom: true,
    topLabel: 'Ir arriba',
    bottomLabel: 'Ir abajo',
    topIcon: 'chevron-up',
    bottomIcon: 'chevron-down',
    groupLabel: 'Controles de desplazamiento',
  },
};

export default meta;
type Story = StoryObj<DcxNgScrollTopDownComponent>;

const longContent = `
  <p style="margin: 0 0 1rem;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere
    malesuada neque, ut luctus neque placerat a.
  </p>
`;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="min-height: 1200px; padding: 2rem; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);">
        <div style="max-width: 720px; margin: 0 auto; padding-right: 6rem;">
          <h2 style="margin-top: 0;">Window scroll demo</h2>
          <br>
          ${longContent.repeat(18)}
        </div>

        <dcx-ng-scroll-top-down
          [smooth]="smooth"
          [size]="size"
          [iconSize]="iconSize"
          [showTop]="showTop"
          [showBottom]="showBottom"
          [topLabel]="topLabel"
          [bottomLabel]="bottomLabel"
          [topIcon]="topIcon"
          [bottomIcon]="bottomIcon"
        />
      </div>
    `,
  }),
};

export const ScrollableContainer: Story = {
  name: 'Scrollable container',
  render: args => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: #f8fafc; min-height: 520px;">
        <div
          style="
            position: relative;
            max-width: 820px;
            margin: 0 auto;
            height: 420px;
            overflow: hidden;
            border: 1px solid #dbe4ee;
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
          "
        >
          <div
            #viewportRef
            style="
              height: 100%;
              overflow: auto;
              padding: 1.25rem;
            "
          >
            <h2 style="margin-top: 0;">Contenedor con scroll interno</h2>
            <br>
            ${longContent.repeat(20)}
          </div>

          <dcx-ng-scroll-top-down
            [container]="viewportRef"
            [smooth]="smooth"
            [size]="size"
            [iconSize]="iconSize"
            [showTop]="showTop"
            [showBottom]="showBottom"
            [topLabel]="topLabel"
            [bottomLabel]="bottomLabel"
            [topIcon]="topIcon"
            [bottomIcon]="bottomIcon"
            style="position: absolute; right: 1rem; bottom: 1rem;"
          />
        </div>
      </div>
    `,
  }),
};

const windowTemplate = `
  <div style="min-height: 1200px; padding: 2rem; background: #fff;">
    <div style="max-width: 720px; margin: 0 auto; padding-right: 6rem;">
      <h2 style="margin-top: 0;">Scroll demo</h2>
      <br>
      ${longContent.repeat(16)}
    </div>
    <dcx-ng-scroll-top-down
      [smooth]="smooth"
      [size]="size"
      [iconSize]="iconSize"
      [showTop]="showTop"
      [showBottom]="showBottom"
      [topLabel]="topLabel"
      [bottomLabel]="bottomLabel"
      [topIcon]="topIcon"
      [bottomIcon]="bottomIcon"
      [groupLabel]="groupLabel"
    />
  </div>
`;

export const TopOnly: Story = {
  name: 'Top only',
  args: {
    showBottom: false,
  },
  render: args => ({ props: args, template: windowTemplate }),
};

export const BottomOnly: Story = {
  name: 'Bottom only',
  args: {
    showTop: false,
  },
  render: args => ({ props: args, template: windowTemplate }),
};

export const ExtraLarge: Story = {
  name: 'Extra large (XL)',
  args: {
    size: 'xl',
    iconSize: 'm',
  },
  render: args => ({ props: args, template: windowTemplate }),
};

export const NoSmooth: Story = {
  name: 'Sin scroll suave',
  args: {
    smooth: false,
  },
  render: args => ({ props: args, template: windowTemplate }),
};

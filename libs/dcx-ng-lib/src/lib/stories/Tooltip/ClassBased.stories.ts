import { DcxNgButtonComponent, DcxNgIconComponent, DcxNgTooltipComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<DcxNgTooltipComponent> = {
  title: 'DCXLibrary/Components/Tooltip',
  component: DcxNgTooltipComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DcxNgButtonComponent, DcxNgIconComponent, DcxNgTooltipComponent],
    }),
  ],
  argTypes: {
    position: {
      name: 'position',
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Posición preferida del tooltip respecto al elemento envuelto.',
      table: {
        category: 'Atributos',
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
        defaultValue: { summary: 'top' },
      },
    },
    arrowAlignment: {
      name: 'arrowAlignment',
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Alineación de la flecha dentro del bocadillo.',
      table: {
        category: 'Atributos',
        type: { summary: "'left' | 'center' | 'right'" },
        defaultValue: { summary: 'center' },
      },
    },
    variant: {
      name: 'variant',
      control: 'select',
      options: ['default', 'primary'],
      description: 'Estilo visual del bocadillo.',
      table: {
        category: 'Atributos',
        type: { summary: "'default' | 'primary'" },
        defaultValue: { summary: 'default' },
      },
    },
    content: {
      name: 'content',
      control: 'text',
      description: 'Texto plano del tooltip.',
      table: { category: 'Atributos', type: { summary: 'string' } },
    },
    contentHtml: {
      name: 'contentHtml',
      control: 'text',
      description:
        'Contenido HTML del tooltip (formato: negrita, cursiva, párrafos). Los elementos interactivos (enlaces, botones, campos) se eliminan automáticamente — un tooltip no debe requerir interacción con su contenido.',
      table: { category: 'Atributos', type: { summary: 'string' } },
    },
    hideTooltipOnClick: {
      name: 'hideTooltipOnClick',
      control: 'boolean',
      description: 'Oculta el tooltip al hacer clic dentro del elemento envuelto.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgTooltipComponent>;

export const DefaultTooltip: Story = {
  args: {
    content: 'Tooltip por defecto',
    position: 'top',
    hideTooltipOnClick: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position" [hideTooltipOnClick]="hideTooltipOnClick">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const LeftTooltip: Story = {
  args: {
    position: 'left',
    content: 'Tooltip a la izquierda',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const RightTooltip: Story = {
  args: {
    position: 'right',
    content: 'Tooltip a la derecha',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const BottomTooltip: Story = {
  args: {
    position: 'bottom',
    content: 'Tooltip abajo',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};
export const TopTooltip: Story = {
  args: {
    position: 'top',
    content: 'Tooltip arriba',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

export const PrimaryTooltip: Story = {
  args: {
    content: 'Tooltip con variante primary',
    position: 'top',
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position" [variant]="variant">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

export const HideOnClickTooltip: Story = {
  args: {
    content: 'Tooltip arriba',
    hideTooltipOnClick: true,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [hideTooltipOnClick]="hideTooltipOnClick">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

export const LongContentTooltip: Story = {
  args: {
    content: 'Este es un contenido de tooltip muy largo que debería ajustarse correctamente y probar el sistema de posicionamiento inteligente con un texto más extenso que podría causar problemas cerca de los bordes del viewport.',
    position: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="height: 200px; position: relative; padding: 20px;">
      <div style="position: absolute; top: 40px; left: 20px;">
        <dcx-ng-tooltip [content]="content" [position]="position">
          <dcx-ng-button label="Contenido largo"></dcx-ng-button>
        </dcx-ng-tooltip>
      </div>
    </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: {
    content: 'Este es un icono con tooltip',
    position: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [content]="content" [position]="position">
        <dcx-ng-icon name="info-circle" size="l"></dcx-ng-icon>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

export const WithFormattedContent: Story = {
  args: {
    contentHtml: '<p><strong>Importante:</strong> revisa <em>todos</em> los campos</p>',
    position: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%; justify-content: center; align-items: center; display: flex; padding: 80px 0;">
      <dcx-ng-tooltip [contentHtml]="contentHtml" [position]="position">
        <dcx-ng-button label="Pasa el ratón o enfoca"></dcx-ng-button>
      </dcx-ng-tooltip>
    </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgCardComponent } from '../../dcx-ng-components/dcx-ng-card/dcx-ng-card.component';

const meta: Meta<DcxNgCardComponent> = {
  title: 'DCXLibrary/Card/Unstyled',
  component: DcxNgCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgCardComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Versión sin estilos del componente Card. Muestra la estructura básica sin CSS aplicado.',
      },
    },
  },
  argTypes: {
    header: {
      control: 'text',
      description: 'Título principal de la tarjeta',
    },
    subheader: {
      control: 'text',
      description: 'Subtítulo de la tarjeta',
    },
    iconClass: {
      control: 'text',
      description: 'Clase CSS para el icono del header',
    },
    closable: {
      control: 'boolean',
      description: 'Mostrar botón de cerrar en el header',
    },
    visible: {
      control: 'boolean',
      description: 'Controla la visibilidad de la tarjeta',
    },
  },
  args: {
    header: '',
    subheader: '',
    iconClass: '',
    closable: false,
    visible: true,
  },
};

export default meta;
type Story = StoryObj<DcxNgCardComponent>;

export const Default: Story = {
  args: {
    header: 'Título de la Tarjeta',
    subheader: 'Subtítulo descriptivo',
  },
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-card 
        [header]="header"
        [subheader]="subheader"
        [iconClass]="iconClass"
        [closable]="closable"
        [visible]="visible">
        <p>Esta es la versión sin estilos del componente Card.</p>
        <p>Solo muestra la estructura HTML básica sin CSS aplicado.</p>
        <p>Los estilos que ves son los estilos base del navegador.</p>
      </dcx-ng-card>
    `,
  }),
};

export const WithAllElements: Story = {
  args: {
    header: 'Tarjeta Completa',
    subheader: 'Con todos los elementos',
    iconClass: 'fas fa-star',
    closable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-card 
        [header]="header"
        [subheader]="subheader"
        [iconClass]="iconClass"
        [closable]="closable"
        [visible]="visible">
        <h4>Contenido de la tarjeta</h4>
        <p>Esta tarjeta muestra todos los elementos disponibles:</p>
        <ul>
          <li>Header con título</li>
          <li>Subtítulo</li>
          <li>Icono (si Font Awesome está disponible)</li>
          <li>Botón de cerrar</li>
          <li>Contenido del body</li>
          <li>Botones de acción en el footer</li>
        </ul>
        <p><strong>Nota:</strong> Sin estilos CSS aplicados, solo estructura HTML.</p>
      </dcx-ng-card>
    `,
  }),
};

export const MinimalContent: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-card 
        [header]="header"
        [subheader]="subheader"
        [iconClass]="iconClass"
        [closable]="closable"
        [visible]="visible">
        Contenido mínimo sin header ni configuración adicional.
      </dcx-ng-card>
    `,
  }),
};

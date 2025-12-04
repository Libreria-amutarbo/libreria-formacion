import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgCardComponent } from '../../dcx-ng-components/dcx-ng-card/dcx-ng-card.component';

const meta: Meta<DcxNgCardComponent> = {
  title: 'DCXLibrary/Card/Class based',
  component: DcxNgCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgCardComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Un componente de tarjeta versátil con header, body y footer personalizables.',
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
    onClose: {
      action: 'closed',
      description: 'Evento emitido al cerrar la tarjeta',
    },
    onAccept: {
      action: 'accepted',
      description: 'Evento emitido al hacer clic en Aceptar',
    },
    onCancel: {
      action: 'cancelled',
      description: 'Evento emitido al hacer clic en Cancelar',
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
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <dcx-ng-card 
          [header]="header"
          [subheader]="subheader"
          [iconClass]="iconClass"
          [closable]="closable"
          [visible]="visible"
          (onClose)="onClose($event)"
          (onAccept)="onAccept($event)"
          (onCancel)="onCancel($event)">
          <p>Este es el contenido por defecto de la tarjeta. Aquí puedes colocar cualquier contenido que necesites.</p>
        </dcx-ng-card>
      </div>
    `,
  }),
};

export const WithHeaderAndSubheader: Story = {
  args: {
    header: 'Título de la Tarjeta',
    subheader: 'Subtítulo descriptivo',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <dcx-ng-card 
          [header]="header"
          [subheader]="subheader"
          [iconClass]="iconClass"
          [closable]="closable"
          [visible]="visible"
          (onClose)="onClose($event)"
          (onAccept)="onAccept($event)"
          (onCancel)="onCancel($event)">
          <p>Contenido de la tarjeta con header y subheader.</p>
          <p>Puedes agregar múltiples párrafos y elementos.</p>
        </dcx-ng-card>
      </div>
    `,
  }),
};


export const WithIcon: Story = {
  args: {
    header: 'Configuración',
    subheader: 'Ajustes del sistema',
    iconClass: 'fas fa-cog',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <dcx-ng-card 
          [header]="header"
          [subheader]="subheader"
          [iconClass]="iconClass"
          [closable]="closable"
          [visible]="visible"
          (onClose)="onClose($event)"
          (onAccept)="onAccept($event)"
          (onCancel)="onCancel($event)">
          <p>Esta tarjeta incluye un icono en el header.</p>
          <p><strong>Nota:</strong> Necesitas Font Awesome para ver el icono correctamente.</p>
        </dcx-ng-card>
      </div>
    `,
  }),
};

export const Closable: Story = {
  args: {
    header: 'Notificación',
    subheader: 'Mensaje importante',
    closable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <dcx-ng-card 
          [header]="header"
          [subheader]="subheader"
          [iconClass]="iconClass"
          [closable]="closable"
          [visible]="visible"
          (onClose)="onClose($event)"
          (onAccept)="onAccept($event)"
          (onCancel)="onCancel($event)">
          <p>Esta tarjeta se puede cerrar usando el botón X en el header.</p>
          <p>Al hacer clic en el botón de cerrar, la tarjeta se ocultará.</p>
        </dcx-ng-card>
      </div>
    `,
  }),
};






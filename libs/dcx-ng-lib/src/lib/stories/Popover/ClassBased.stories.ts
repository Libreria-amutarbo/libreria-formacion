import { Component, input, output, viewChild } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  DcxNgPopoverComponent,
  DcxNgButtonComponent,
  DcxNgListComponent,
  DcxNgChipComponent,
  DcxNgDividerComponent,
} from '../../../index';

@Component({
  selector: 'dcx-ng-popover-story-wrapper',
  standalone: true,
  imports: [DcxNgPopoverComponent, DcxNgButtonComponent],
  template: `
    <div style="padding: 100px; display: flex; justify-content: center; position: relative;">
      <div #buttonContainer style="display: inline-block;">
        <dcx-ng-button
          [label]="buttonLabel()"
          [variant]="buttonVariant()"
          (buttonClick)="onButtonClick($event)"
        ></dcx-ng-button>
      </div>

      <dcx-ng-popover #popover (opened)="opened.emit()" (closed)="closed.emit()">
        @if (popoverTitle()) { <h3>{{ popoverTitle() }}</h3> }
        @if (popoverContent()) { <p>{{ popoverContent() }}</p> }
        <ng-content></ng-content>
      </dcx-ng-popover>
    </div>
  `,
})
class PopoverStoryWrapperComponent {
  readonly buttonLabel = input<string>('Open Popover');
  readonly buttonVariant = input<'primary' | 'secondary' | 'tertiary'>('primary');
  readonly popoverTitle = input<string>('');
  readonly popoverContent = input<string>('');
  readonly opened = output<void>();
  readonly closed = output<void>();

  popover = viewChild.required<DcxNgPopoverComponent>('popover');
  buttonContainer = viewChild.required<any>('buttonContainer');

  onButtonClick(event: Event): void {
    if (event && typeof (event as any).stopPropagation === 'function') {
      (event as any).stopPropagation();
    }
    const container = this.buttonContainer();
    if (container) {
      const targetEl = container.nativeElement || container;
      this.popover().toggle(event, targetEl);
    }
  }
}

const meta: Meta<PopoverStoryWrapperComponent> = {
  title: 'DCXLibrary/Components/Popover',
  component: PopoverStoryWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [PopoverStoryWrapperComponent, DcxNgPopoverComponent, DcxNgButtonComponent, DcxNgListComponent, DcxNgChipComponent, DcxNgDividerComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '`dcx-ng-popover` es un componente overlay que muestra contenido contextual al hacer clic en un elemento trigger. ' +
          'Soporta posicionamiento automático, cierre al hacer clic fuera o pulsar Escape, y proyección de contenido mediante `ng-content`.',
      },
    },
  },
  argTypes: {
    buttonLabel: {
      name: 'buttonLabel',
      control: 'text',
      description: 'Texto del botón que abre el popover',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Open Popover' },
      },
    },
    buttonVariant: {
      name: 'buttonVariant',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante visual del botón trigger',
      table: {
        category: 'Atributos',
        type: { summary: "'primary' | 'secondary' | 'tertiary'" },
        defaultValue: { summary: 'primary' },
      },
    },
    popoverTitle: {
      name: 'popoverTitle',
      control: 'text',
      description: 'Título que se muestra en la cabecera del popover',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    popoverContent: {
      name: 'popoverContent',
      control: 'text',
      description: 'Texto de contenido del popover. Se puede sustituir por contenido enriquecido via ng-content',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    opened: {
      name: 'opened',
      action: 'opened',
      description: 'Se emite cuando el popover se abre',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
        defaultValue: { summary: '-' },
      },
    },
    closed: {
      name: 'closed',
      action: 'closed',
      description: 'Se emite cuando el popover se cierra',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {
    buttonLabel: 'Open Popover',
    buttonVariant: 'primary',
    popoverTitle: 'Popover Title',
    popoverContent: 'This is the content inside the popover. It can be any HTML or Angular component.',
  },
};

export default meta;
type Story = StoryObj<PopoverStoryWrapperComponent>;

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-popover-story-wrapper
        [buttonLabel]="buttonLabel"
        [buttonVariant]="buttonVariant"
        [popoverTitle]="popoverTitle"
        [popoverContent]="popoverContent">
      </dcx-ng-popover-story-wrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Popover básico con título y contenido de texto. Haz clic en el botón para abrirlo.',
      },
    },
  },
};

export const WithRichContent: Story = {
  name: 'Rich Content',
  args: {
    buttonLabel: 'User Info',
    buttonVariant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-popover-story-wrapper [buttonLabel]="buttonLabel" [buttonVariant]="buttonVariant">
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 8px 0;">John Doe</h4>
          <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">Software Engineer</p>
          <p style="margin: 0; font-size: 12px; color: #999;">john.doe&#64;example.com</p>
        </div>
      </dcx-ng-popover-story-wrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Popover con contenido enriquecido: nombre, cargo y email. Ideal para mostrar información de usuario.',
      },
    },
  },
};

export const WithActions: Story = {
  name: 'With Actions',
  args: {
    buttonLabel: 'Options',
    buttonVariant: 'tertiary',
  },
  render: (args) => ({
    props: {
      ...args,
      actionItems: [
        { text: 'Edit', icon: 'pencil' },
        { text: 'Duplicate', icon: 'copy' },
        { divider: true },
        { text: 'Delete', icon: 'trash', variant: 'danger' },
      ],
    },
    template: `
      <dcx-ng-popover-story-wrapper [buttonLabel]="buttonLabel" [buttonVariant]="buttonVariant">
        <dcx-ng-list [items]="actionItems" [selectable]="true"></dcx-ng-list>
      </dcx-ng-popover-story-wrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Popover con lista de acciones. Puede usarse como menú contextual ligero.',
      },
    },
  },
};

export const WithComponents: Story = {
  name: 'With Components',
  args: {
    buttonLabel: 'Filtrar',
    buttonVariant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-popover-story-wrapper [buttonLabel]="buttonLabel" [buttonVariant]="buttonVariant">
        <div style="min-width: 260px;">
          <p style="margin: 0 0 8px 0; font-weight: 600;">Filtrar por etiqueta</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
            <dcx-ng-chip label="Angular" color="primary" variant="filter"></dcx-ng-chip>
            <dcx-ng-chip label="TypeScript" color="secondary" variant="filter"></dcx-ng-chip>
            <dcx-ng-chip label="Design System" color="primary" variant="filter"></dcx-ng-chip>
            <dcx-ng-chip label="Storybook" color="secondary" variant="filter"></dcx-ng-chip>
          </div>
          <dcx-ng-divider></dcx-ng-divider>
          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px;">
            <dcx-ng-button label="Limpiar" variant="tertiary" size="s"></dcx-ng-button>
            <dcx-ng-button label="Aplicar" variant="primary" size="s"></dcx-ng-button>
          </div>
        </div>
      </dcx-ng-popover-story-wrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Popover con componentes de la librería: chips de filtro, divider y botones de acción.',
      },
    },
  },
};

export const LongContent: Story = {
  name: 'Long Content',
  args: {
    buttonLabel: 'Ver detalles',
    buttonVariant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-popover-story-wrapper [buttonLabel]="buttonLabel" [buttonVariant]="buttonVariant">
        <h3>Descripción completa</h3>
        <p>Este componente permite mostrar información contextual de forma no intrusiva. Es ideal para tooltips enriquecidos, menús de acciones, detalles de usuario o cualquier contenido que deba aparecer al interactuar con un elemento de la interfaz.</p>
        <p>El popover se posiciona automáticamente respecto al elemento trigger y se cierra al hacer clic fuera o pulsando la tecla Escape. El ancho máximo está limitado para garantizar la legibilidad del contenido.</p>
      </dcx-ng-popover-story-wrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Popover con texto largo para verificar que el contenido no desborda el contenedor y se adapta correctamente al ancho máximo definido.',
      },
    },
  },
};

export const Interactive: Story = {
  name: 'Interactive',
  args: {
    buttonLabel: 'Click me',
    buttonVariant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <dcx-ng-popover-story-wrapper [buttonLabel]="buttonLabel" [buttonVariant]="buttonVariant">
        <h3>Interactive Demo</h3>
        <p>Interacciones disponibles:</p>
        <ul style="margin: 8px 0; padding-left: 20px;">
          <li>Clic fuera para cerrar</li>
          <li>Tecla Escape para cerrar</li>
        </ul>
      </dcx-ng-popover-story-wrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demo interactiva para probar las dos formas de cerrar el popover: ' +
          'clic fuera y tecla Escape.',
      },
    },
  },
};

import { Component, viewChild } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  DcxNgPopoverComponent,
  DcxNgButtonComponent,
} from '../../../index';

// Componente wrapper para manejar correctamente el toggle del popover
@Component({
  selector: 'dcx-ng-popover-story-wrapper',
  standalone: true,
  imports: [DcxNgPopoverComponent, DcxNgButtonComponent],
  template: `
    <div style="padding: 100px; display: flex; justify-content: center; position: relative;">
      <div #buttonContainer style="display: inline-block;">
        <dcx-ng-button
          [label]="buttonLabel"
          [variant]="buttonVariant"
          (buttonClick)="onButtonClick($event)"
        ></dcx-ng-button>
      </div>

      <dcx-ng-popover #popover>
        <ng-content></ng-content>
      </dcx-ng-popover>
    </div>
  `,
})
class PopoverStoryWrapperComponent {
  buttonLabel = 'Open Popover';
  buttonVariant: 'primary' | 'secondary' | 'tertiary' = 'primary';

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
      imports: [PopoverStoryWrapperComponent, DcxNgPopoverComponent, DcxNgButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`dcx-ng-popover` es un componente overlay que muestra contenido contextual al hacer clic en un elemento trigger. ' +
          'Soporta posicionamiento automático, cierre al hacer clic fuera o pulsar Escape, y proyección de contenido mediante `ng-content`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverStoryWrapperComponent>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <dcx-ng-popover-story-wrapper buttonLabel="Open Popover" buttonVariant="primary">
        <h3>Popover Title</h3>
        <p>This is the content inside the popover. It can be any HTML or Angular component.</p>
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
  render: () => ({
    template: `
      <dcx-ng-popover-story-wrapper buttonLabel="User Info" buttonVariant="secondary">
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
  render: () => ({
    template: `
      <dcx-ng-popover-story-wrapper buttonLabel="Options" buttonVariant="tertiary">
        <div style="min-width: 150px;">
          <div style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; cursor: pointer;">Edit</div>
          <div style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; cursor: pointer;">Duplicate</div>
          <div style="padding: 8px 0; cursor: pointer; color: #dc2626;">Delete</div>
        </div>
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

export const Interactive: Story = {
  name: 'Interactive',
  render: () => ({
    template: `
      <dcx-ng-popover-story-wrapper buttonLabel="Click me" buttonVariant="primary">
        <h3>Interactive Demo</h3>
        <p>Try these interactions:</p>
        <ul style="margin: 8px 0; padding-left: 20px;">
          <li>Click outside to close</li>
          <li>Press Escape to close</li>
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

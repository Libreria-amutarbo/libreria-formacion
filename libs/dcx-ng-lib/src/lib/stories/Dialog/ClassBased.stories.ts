import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Component, inject, OnInit, input, output } from '@angular/core';
import {
  DcxNgDialogComponent,
  DcxNgButtonComponent,
} from '@dcx-ng-components/dcx-ng-lib';
import { DIALOG_DEFAULT_ARGS } from '../../core/mock/dialog';
import { DialogService } from '../../services/dialog.service';
import { DcxDialogPosition, DIALOG_POSITION_LIST } from '../../core/interfaces';
import { fn } from '@storybook/test';

const ActionsData = { closeDialog: fn() };

@Component({
  selector: 'dcx-ng-dialog-story',
  standalone: true,
  imports: [DcxNgDialogComponent, DcxNgButtonComponent],
  template: `
    <dcx-ng-button label="Abrir dialog" variant="primary" (buttonClick)="open()" />

    <div style="min-height:50vh; display:grid; place-items:center;">
      <dcx-ng-dialog
        [dialogId]="dialogId()"
        [title]="title()"
        [showClose]="showClose()"
        [position]="position()"
        [closeOnBackdrop]="closeOnBackdrop()"
        (closeDialog)="onClose()"
      >
        <ng-template #dialogBody>
          <div [innerHTML]="bodyHtml()"></div>
        </ng-template>

        <ng-template #dialogFooter>
          <dcx-ng-button 
            label="Aceptar" 
            variant="primary" 
            (buttonClick)="closeDialogFromFooter()"
          />
        </ng-template>
      </dcx-ng-dialog>
    </div>

  `,
})
class StoryHostDcxDialogComponent implements OnInit {
  dialogId = input<string | undefined>(undefined);
  title = input<string>('');
  visible = input<boolean>(false);
  showClose = input<boolean>(true);
  position = input<DcxDialogPosition>('center');
  closeOnBackdrop = input<boolean>(true);
  bodyHtml = input<string>('');
  footerHtml = input<string>('');

  closeDialog = output<void>();

  private readonly dialog = inject(DialogService);

  ngOnInit() {
    if (this.visible() && this.dialogId()) {
      this.dialog.open(this.dialogId()!);
    }
  }

  open(data?: unknown) {
    const id = this.dialogId();
    if (id) this.dialog.open(id, data);
  }

  closeDialogFromFooter() {
    const id = this.dialogId();
    if (id) this.dialog.close(id);
  }

  onClose() {
    ActionsData.closeDialog();
    this.closeDialog.emit();
  }
}

const meta: Meta<StoryHostDcxDialogComponent> = {
  title: 'DCXLibrary/Dialog/ClassBased',
  component: StoryHostDcxDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [StoryHostDcxDialogComponent],
      providers: [DialogService],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: [
          'El contenido se pasa por ng-template (#dialogBody, #dialogFooter).',
          '⚠️ El HTML inyectado con [innerHTML] no compila eventos Angular; para interacción, usa elementos Angular reales o botones externos.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    dialogId: {
      control: 'text',
      description: 'Id para integrarse con DialogService en modo servicio.',
      table: { category: 'Behavior', type: { summary: 'string' } },
    },
    title: {
      control: 'text',
      description: 'Título del diálogo.',
      table: {
        category: 'Templates',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    visible: {
      control: 'boolean',
      description:
        'Solo para **abrir por defecto** en esta story. El ciclo de vida real se gestiona por servicio.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showClose: {
      control: 'boolean',
      description: 'Muestra/oculta el botón de cierre en el header.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    position: {
      control: 'select',
      options: DIALOG_POSITION_LIST,
      description: 'Posiciona el diálogo aplicando clases CSS dialog--pos-*.',
      table: {
        category: 'Appearance',
        type: { summary: 'DcxDialogPosition' },
        defaultValue: { summary: 'center' },
      },
    },
    bodyHtml: {
      control: 'text',
      description: 'HTML del cuerpo (se inyecta en #dialogBody).',
      table: {
        category: 'Templates',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    footerHtml: {
      control: 'text',
      description:
        '⚠️ HTML del footer (solo referencia). No se actualiza en tiempo real porque los componentes Angular no se compilan con [innerHTML]. En esta demo, el footer está hardcodeado con un botón funcional.',
      table: {
        category: 'Templates',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Permite cerrar el diálogo al hacer clic en el backdrop.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeDialog: {
      action: 'closeDialog',
      description: 'Se emite al pulsar cerrar (X / backdrop / botones).',
      table: { category: 'Events' },
    },
  },
  args: DIALOG_DEFAULT_ARGS,
};

export default meta;
type Story = StoryObj<StoryHostDcxDialogComponent>;

export const ClassBased: Story = {
  args: DIALOG_DEFAULT_ARGS,
  render: args => ({
    moduleMetadata: {
      imports: [StoryHostDcxDialogComponent],
      providers: [DialogService],
    },
    props: {
      dialogId: args.dialogId,
      title: args.title,
      showClose: args.showClose,
      position: args.position,
      bodyHtml: args.bodyHtml,
      footerHtml: args.footerHtml,
      closeOnBackdrop: args.closeOnBackdrop,
      visible: args.visible,
    },
    template: `
      <dcx-ng-dialog-story
        [dialogId]="dialogId"
        [title]="title"
        [showClose]="showClose"
        [position]="position"
        [bodyHtml]="bodyHtml"
        [footerHtml]="footerHtml"
        [closeOnBackdrop]="closeOnBackdrop"
        [visible]="visible"
      />
    `,
  }),
};

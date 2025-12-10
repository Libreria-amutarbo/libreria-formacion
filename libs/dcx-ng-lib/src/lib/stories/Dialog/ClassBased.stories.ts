import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnInit,
} from '@angular/core';
import {
  DcxNgDialogComponent,
  DcxNgButtonComponent,
} from '@dcx-ng-components/dcx-ng-lib';
import { DialogService } from '../../services/dialog.service';
import { DcxDialogPosition } from '../../core/interfaces';
import { fn } from '@storybook/test';

const ActionsData = { closeDialog: fn() };

@Component({
  selector: 'dcx-ng-dialog',
  standalone: true,
  imports: [DcxNgDialogComponent, DcxNgButtonComponent],
  template: `
    <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
      <button type="button" (click)="open()">Abrir dialog</button>
    </div>

    <div style="min-height:50vh; display:grid; place-items:center;">
      <dcx-ng-dialog
        [dialogId]="dialogId"
        [title]="title"
        [showClose]="showClose"
        [position]="position"
        [closeOnBackdrop]="closeOnBackdrop"
        (closeDialog)="onClose()"
      >
        <ng-template #dialogBody>
          <div [innerHTML]="bodyHtml"></div>
        </ng-template>

        @if (footerHtml) {
          <ng-template #dialogFooter>
            <div [innerHTML]="footerHtml"></div>
          </ng-template>
        }
      </dcx-ng-dialog>
    </div>
  `,
})
class StoryHostDcxDialogComponent implements OnInit {
  @Input() dialogId?: string;
  @Input() title = '';
  @Input() visible?: boolean;
  @Input() showClose = true;
  @Input() position: DcxDialogPosition = 'center';
  @Input() closeOnBackdrop = true;
  @Input() bodyHtml = '';
  @Input() footerHtml = '';

  @Output() closeDialog = new EventEmitter<void>();

  private dialog = inject(DialogService);

  ngOnInit() {
    if (this.visible && this.dialogId) {
      this.dialog.open(this.dialogId);
    }
  }

  open(data?: unknown) {
    if (this.dialogId) this.dialog.open(this.dialogId, data);
  }

  close() {
    if (this.dialogId) this.dialog.close(this.dialogId);
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
    visible: {
      control: 'boolean',
      description:
        'Solo para **abrir por defecto** en esta story. El ciclo de vida real se gestiona por servicio.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean | undefined' },
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
      options: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
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
        'HTML del pie (opcional). Si está vacío, no se renderiza #dialogFooter.',
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
  args: {
    showClose: true,
    position: 'center',
    title: 'Diálogo',
    bodyHtml: '',
    footerHtml: '',
    closeOnBackdrop: true,
    visible: false,
  },
};

export default meta;
type Story = StoryObj<StoryHostDcxDialogComponent>;

export const ClassBased: Story = {
  args: {
    dialogId: 'dialog-playground',
    title: 'Diálogo',
    showClose: true,
    position: 'center',
    bodyHtml: `<p>Este es un mensaje informativo dentro del diálogo.</p>`,
    footerHtml: ``,
    closeOnBackdrop: true,
    visible: false,
  },
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
      <story-host-dcx-dialog
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

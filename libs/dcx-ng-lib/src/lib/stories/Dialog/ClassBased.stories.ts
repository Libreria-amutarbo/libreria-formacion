import { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgDialogComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgDialogComponent> = {
  title: 'DCXLibrary/Dialog/ClassBased',
  component: DcxNgDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    visible: { control: 'boolean' },
  },
  args: {
    title: 'Información importante',
    visible: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgDialogComponent>;

export const DialogPlainText: Story = {
  parameters: {
    docs: {
      story: {
        height: '150px',
      },
    },
  },
  render: args => ({
    imports: [CommonModule, DcxNgDialogComponent],
    props: {
      title: args.title,
      visible: args.visible,
      handleCloseInfo() {
        this['visible'] = false;
      },
    },
    template: `
      <div style="display:grid; gap:16px; max-width:640px;">
        <button (click)="visible = true">Abrir diálogo informativo</button>
        <dcx-ng-dialog
          [title]="title"
          [visible]="visible"
          (onClose)="handleCloseInfo()"
        >
          <div dialog-body>
            <p>Este es un mensaje informativo dentro del diálogo.</p>
          </div>
          <div dialog-footer>
            <button (click)="handleCloseInfo()">Cerrar</button>
          </div>
        </dcx-ng-dialog>
      </div>
    `,
  }),
};

export const DialogWithTemplates: Story = {
  parameters: {
    docs: {
      story: {
        height: '200px',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    visible: { control: 'boolean' },
  },
  args: {
    title: 'Confirmación',
    visible: false,
  },
  render: args => ({
    imports: [CommonModule, DcxNgDialogComponent],
    props: {
      title: args.title,
      visible: args.visible,
      handleCloseConfirm() {
        this['visible'] = false;
      },
      handleCancel() {
        alert('Cancelado');
        this['visible'] = false;
      },
      handleAccept() {
        alert('Aceptado');
        this['visible'] = false;
      },
    },
    template: `
      <div style="display:grid; gap:16px; max-width:640px;">
        <button (click)="visible = true">Abrir confirmación</button>
        <dcx-ng-dialog
          [title]="title"
          [visible]="visible"
          (onClose)="handleCloseConfirm()"
        >
          <ng-template #dialogBody>
            <p>¿Estás seguro de que quieres continuar?</p>
          </ng-template>
          <ng-template #dialogFooter>
            <button (click)="handleCancel()">Cancelar</button>
            <button (click)="handleAccept()">Aceptar</button>
          </ng-template>
        </dcx-ng-dialog>
      </div>
    `,
  }),
};

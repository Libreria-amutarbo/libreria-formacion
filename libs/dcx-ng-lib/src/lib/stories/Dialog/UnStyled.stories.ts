import { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgDialogComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgDialogComponent> = {
  title: 'DCXLibrary/Dialog/Unstyled',
  component: DcxNgDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    visible: { control: 'boolean' },
  },
  args: {
    title: 'Título del diálogo',
    visible: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgDialogComponent>;

export const Basic: Story = {
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
      handleClose() {
        this['visible'] = false;
      },
    },
    template: `
      <div style="display:grid; gap:16px; max-width:640px;">
        <button (click)="visible = true">Abrir diálogo</button>
        <dcx-ng-dialog
          [title]="title"
          [visible]="visible"
          (onClose)="handleClose()"
        >
          <div dialog-body>Contenido por defecto del diálogo</div>
          <div dialog-footer>
            <button (click)="handleClose()">Cerrar</button>
          </div>
        </dcx-ng-dialog>
      </div>
    `,
  }),
};

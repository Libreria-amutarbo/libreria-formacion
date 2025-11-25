import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgDialogComponent } from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgDialogComponent> = {
  title: 'DCXLibrary/Dialog/Class based',
  component: DcxNgDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    visible: { control: 'boolean' },
  },
  args: {
    title: 'Título del diálogo',
    visible: true,
  },
};

export default meta;
type Story = StoryObj<DcxNgDialogComponent>;

export const ClassBasedDemo: Story = {
  render: args => {
    return {
      props: {
        ...args,
      },
      template: `
        <div style="display:grid; gap:8px; max-width:640px;">
          <button (click)="visible=true">Abrir diálogo</button>
          <dcx-ng-dialog [title]="title" [visible]="visible" (onClose)="visible=false">
            <div dialog-body>Este es el contenido del diálogo</div>
            <div dialog-footer>
              <button (click)="visible=false">Cerrar</button>
            </div>
          </dcx-ng-dialog>
        </div>
      `,
    };
  },
};

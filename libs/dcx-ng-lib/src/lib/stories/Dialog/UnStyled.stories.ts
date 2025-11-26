import { Meta, StoryObj } from '@storybook/angular';
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
    visible: true,
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
    props: { ...args },
    template: `
      <dcx-ng-dialog [title]="title" [visible]="visible" (onClose)="visible=false">
        <div dialog-body>Contenido por defecto del diálogo</div>
        <div dialog-footer>
          <button (click)="visible=false">Cerrar</button>
        </div>
      </dcx-ng-dialog>
    `,
  }),
};

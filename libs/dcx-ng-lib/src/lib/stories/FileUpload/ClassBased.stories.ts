import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgFileUploadComponent } from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = {
  fileSelected: fn(),
  uploadClicked: fn(),
};

const meta: Meta<DcxNgFileUploadComponent> = {
  title: 'DCXLibrary/Components/FileUpload',
  component: DcxNgFileUploadComponent,
  tags: ['autodocs'],
  args: {
    label: 'Choose file',
    accept: '',
    disabled: false,
    placeholder: 'No file selected',
    fileSelected: ActionsData.fileSelected,
    uploadClicked: ActionsData.uploadClicked,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del botón para abrir el selector de archivos',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'Choose file' },
      },
    },
    accept: {
      control: { type: 'text' },
      description: 'Tipos de archivo permitidos (ejemplo: .pdf,.doc,image/*).',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita la selección de archivos',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto mostrado cuando todavía no hay archivo seleccionado',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'No file selected' },
      },
    },
    fileSelected: {
      action: 'fileSelected',
      description: 'Evento emitido al seleccionar (o limpiar) un archivo',
      table: {
        category: 'Events',
        type: { summary: '(file: File | null) => void' },
        defaultValue: { summary: '-' },
      },
    },
    uploadClicked: {
      action: 'uploadClicked',
      description:
        'Evento emitido al pulsar el botón Upload (emite el archivo seleccionado)',
      table: {
        category: 'Events',
        type: { summary: '(file: File | null) => void' },
        defaultValue: { summary: '-' },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgFileUploadComponent>;

export const Default: Story = {};

export const AcceptImagesOnly: Story = {
  args: {
    label: 'Select image',
    accept: 'image/*',
    placeholder: 'No image selected',
  },
};

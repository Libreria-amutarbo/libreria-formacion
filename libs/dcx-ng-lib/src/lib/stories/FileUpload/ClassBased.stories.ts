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
    dragAndDrop: false,
    dropzoneSize: 'small',
    multiple: false,
    autoUpload: false,
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
      control: 'boolean',
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
        type: { summary: '(file: File | File[] | null) => void' },
        defaultValue: { summary: '-' },
      },
    },
    dragAndDrop: {
      control: 'boolean',
      description: 'Activa/desactiva la zona de drag and drop',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dropzoneSize: {
      control: { type: 'select' },
      options: ['small', 'large'],
      description: 'Define el tamaño visual del área de drag and drop',
      table: {
        category: 'Attributes',
        type: { summary: "'small' | 'large'" },
        defaultValue: { summary: 'small' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Permite seleccionar y subir múltiples archivos a la vez',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoUpload: {
      control: 'boolean',
      description:
        'Si está activo, sube automáticamente al seleccionar/soltar archivo (oculta botón Upload manual)',
      table: {
        category: 'Attributes',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    uploadClicked: {
      action: 'uploadClicked',
      description:
        'Evento emitido al pulsar el botón Upload (emite un archivo o lista de archivos según `multiple`)',
      table: {
        category: 'Events',
        type: { summary: '(file: File | File[] | null) => void' },
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

export const AutoUpload: Story = {
  args: {
    label: 'Browse',
    accept: 'image/*',
    autoUpload: true,
    dragAndDrop: false,
    dropzoneSize: 'small',
    placeholder: 'No file selected',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Modo auto upload: al seleccionar archivo, se emite `uploadClicked` automáticamente sin usar el botón manual.',
      },
    },
  },
};

export const DragAndDrop: Story = {
  args: {
    label: 'Choose file',
    dragAndDrop: true,
    dropzoneSize: 'small',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Puedes arrastrar y soltar un archivo sobre la zona punteada o usar el botón para seleccionarlo. El componente detecta el estado drag-over y muestra el nombre del archivo seleccionado. Esta opción se activa con el input `dragAndDrop`.',
      },
    },
  },
};

export const LargeDropzone: Story = {
  args: {
    label: 'Choose file',
    dragAndDrop: true,
    dropzoneSize: 'large',
    placeholder: 'No file selected',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Muestra una zona de drag and drop grande con icono y layout centrado para casos de uso más visuales.',
      },
    },
  },
};

export const MultipleFiles: Story = {
  args: {
    label: 'Choose files',
    multiple: true,
    dragAndDrop: true,
    dropzoneSize: 'large',
    placeholder: 'No files selected',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Permite seleccionar o arrastrar varios archivos a la vez y muestra todos los nombres en el componente.',
      },
    },
  },
};

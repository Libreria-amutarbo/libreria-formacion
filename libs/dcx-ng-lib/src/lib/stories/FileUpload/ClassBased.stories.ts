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
      description: 'Texto del botón para abrir el selector de archivos.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Choose file' },
      },
    },
    accept: {
      control: { type: 'text' },
      description:
        'Tipos de archivo permitidos (ejemplo: .pdf,.doc,image/*). Vacío significa que se aceptan todos.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita la selección de archivos y la subida.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto mostrado cuando no hay archivo seleccionado.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'No file selected' },
      },
    },
    dragAndDrop: {
      control: 'boolean',
      description: 'Activa la zona de arrastre de archivos.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dropzoneSize: {
      control: { type: 'select' },
      options: ['small', 'large'],
      description: 'Tamaño visual de la zona de arrastre.',
      table: {
        category: 'Atributos',
        type: { summary: "'small' | 'large'" },
        defaultValue: { summary: 'small' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Permite seleccionar y subir múltiples archivos a la vez.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoUpload: {
      control: 'boolean',
      description:
        'Emite `uploadClicked` automáticamente al seleccionar el archivo, sin botón manual.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fileSelected: {
      action: 'fileSelected',
      description: 'Se emite al seleccionar o limpiar un archivo.',
      table: {
        category: 'Eventos',
        type: { summary: '(file: File | File[] | null) => void' },
      },
    },
    uploadClicked: {
      action: 'uploadClicked',
      description:
        'Se emite al pulsar el botón Upload o al seleccionar con `autoUpload` activo.',
      table: {
        category: 'Eventos',
        type: { summary: '(file: File | File[] | null) => void' },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Campo de selección de archivos con soporte de botón clásico y zona de arrastre. Admite filtrado por tipo, selección múltiple y subida automática. Implementa validación de tipo MIME/extensión con mensaje de error.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          'Filtra la selección para aceptar únicamente imágenes. Si se elige un archivo no permitido, se muestra un mensaje de error.',
      },
    },
  },
};

export const AutoUpload: Story = {
  args: {
    label: 'Browse',
    autoUpload: true,
    dragAndDrop: false,
    dropzoneSize: 'small',
    placeholder: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Al seleccionar archivo, se emite `uploadClicked` automáticamente sin usar el botón manual.',
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
          'Activa la zona de arrastre compacta. El componente detecta el estado drag-over y muestra el nombre del archivo seleccionado.',
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
          'Zona de arrastre grande con icono y layout centrado para casos de uso más visuales.',
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
          'Permite seleccionar o arrastrar varios archivos y muestra todos los nombres en el componente.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'No file selected',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Estado deshabilitado: el botón y la zona de arrastre no responden a la interacción.',
      },
    },
  },
};

export const WithValidationError: Story = {
  args: {
    label: 'Select image',
    accept: 'image/*',
    dragAndDrop: true,
    dropzoneSize: 'large',
    placeholder: 'No image selected',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Para ver el error de validación, arrastra o selecciona un archivo con formato no permitido (por ejemplo un PDF). El componente rechaza el archivo y muestra el mensaje de error.',
      },
    },
  },
};

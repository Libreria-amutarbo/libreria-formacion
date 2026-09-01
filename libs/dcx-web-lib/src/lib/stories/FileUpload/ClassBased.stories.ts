import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';
import '../../dcx-web-components/dcx-web-file-upload/dcx-web-file-upload.component';
import { DCXFILE_UPLOAD_DROPZONE_SIZES } from '../../core/defaults';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/FileUpload',
  component: 'dcx-web-file-upload',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component:
          'Campo de selección de archivos con soporte de botón clásico y zona de arrastre. Admite filtrado por tipo, selección múltiple y subida automática. Implementa validación de tipo MIME/extensión con mensaje de error.',
      },
    },
  },

  argTypes: {
    label: {
      control: 'text',
      description: 'Texto del botón para abrir el selector de archivos.',
      table: {
        category: 'Atributos',
      },
    },

    accept: {
      control: 'text',
      description:
        'Tipos de archivo permitidos (ejemplo: .pdf,.doc,image/*). Vacío significa que se aceptan todos.',
      table: {
        category: 'Atributos',
      },
    },

    disabled: {
      control: 'boolean',
      description: 'Deshabilita la selección de archivos y la subida.',
      table: {
        category: 'Atributos',
      },
    },

    placeholder: {
      control: 'text',
      description: 'Texto mostrado cuando no hay archivo seleccionado.',
      table: {
        category: 'Atributos',
      },
    },

    dragAndDrop: {
      control: 'boolean',
      description: 'Activa la zona de arrastre de archivos.',
      table: {
        category: 'Atributos',
      },
    },

    dropzoneSize: {
      control: 'select',
      options: DCXFILE_UPLOAD_DROPZONE_SIZES,
      description: 'Tamaño visual de la zona de arrastre.',
      table: {
        category: 'Atributos',
      },
    },

    multiple: {
      control: 'boolean',
      description: 'Permite seleccionar varios archivos.',
      table: {
        category: 'Atributos',
      },
    },

    autoUpload: {
      control: 'boolean',
      description:
        'Emite uploadClicked automáticamente al seleccionar el archivo.',
      table: {
        category: 'Atributos',
      },
    },

    fileSelected: {
      action: 'fileSelected',
      description: 'Se emite al seleccionar o limpiar un archivo.',
      table: {
        category: 'Eventos',
      },
    },

    uploadClicked: {
      action: 'uploadClicked',
      description:
        'Se emite al pulsar el botón Upload o cuando autoUpload está activo.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    label: 'Choose file',
    accept: '',
    disabled: false,
    dragAndDrop: false,
    dropzoneSize: 'small',
    multiple: false,
    autoUpload: false,
    placeholder: 'No file selected',
  },

  render: args => html`
    <dcx-web-file-upload
      label=${args.label}
      accept=${args.accept}
      placeholder=${args.placeholder}
      .dropzoneSize=${args.dropzoneSize}
      .dragAndDrop=${args.dragAndDrop}
      .autoUpload=${args.autoUpload}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
    >
    </dcx-web-file-upload>
  `,
};

export default meta;

type Story = StoryObj;

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
          'Activa la zona de arrastre grande. El componente detecta el estado drag-over y muestra el nombre del archivo seleccionado.',
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

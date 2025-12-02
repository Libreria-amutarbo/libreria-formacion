import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgMessageComponent } from '../../dcx-ng-components/dcx-ng-message/dcx-ng-message.component';
import { moduleMetadata } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';
import { DcxMessageType } from '../../core/interfaces/message';

const meta: Meta<DcxNgMessageComponent> = {
  title: 'DCXLibrary/Message/Without style',
  component: DcxNgMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Esta versión del componente Message muestra la estructura HTML pura sin estilos aplicados.
Es útil para entender la semántica del componente y como base para implementar estilos personalizados.

### Estructura HTML generada:
\`\`\`html
<div class="message__container [type]" aria-role="[role]">
  <!-- Icono condicional -->
  <dcx-ng-icon *ngIf="icon"></dcx-ng-icon>
  
  <!-- Contenido del mensaje -->
  <div class="message__container__body">
    <h2 *ngIf="title">{{ title }}</h2>
    <p>{{ body }}</p>
    <a *ngIf="link" [href]="link">{{ link }}</a>
  </div>
  
  <!-- Botón cerrar condicional -->
  <button *ngIf="showClose" type="button">
    <dcx-ng-icon name="close"></dcx-ng-icon>
  </button>
</div>
\`\`\`

### Clases CSS aplicadas:
- \`message__container\`: Contenedor principal
- \`[type]\`: Clase del tipo de mensaje (notification, error, warning, success)
- \`message__container__body\`: Contenedor del contenido
- \`message__container__title\`: Título del mensaje
- \`message__container__paragraph\`: Párrafo del contenido
- \`icon__container\`: Contenedor del icono
- \`icon__container__close\`: Botón de cerrar

### Atributos de accesibilidad:
- \`aria-role\`: Define el rol semántico del mensaje
- \`type="button"\`: Especifica el tipo de botón para el cierre
        `,
      },
    },
  },
  argTypes: {
    body: {
      control: { type: 'text' },
      description: 'Contenido principal del mensaje (obligatorio)',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    type: {
      control: { type: 'select' },
      options: ['notification', 'error', 'warning', 'success'] as DcxMessageType[],
      description: 'Tipo de mensaje que define la clase CSS y el rol ARIA',
      table: {
        type: { summary: 'MessageType' },
        defaultValue: { summary: 'notification' },
        category: 'Styling',
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Título opcional renderizado como h2',
      table: {
        type: { summary: 'string | undefined' },
        category: 'Content',
      },
    },
    link: {
      control: { type: 'text' },
      description: 'URL opcional renderizada como enlace',
      table: {
        type: { summary: 'string | undefined' },
        category: 'Content',
      },
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Controla la renderización del icono',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Visual',
      },
    },
    showClose: {
      control: { type: 'boolean' },
      description: 'Controla la renderización del botón cerrar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Interactive',
      },
    },
  },
  args: {
    body: 'Mensaje sin estilos - estructura HTML pura',
    type: 'notification',
    title: undefined,
    link: undefined,
    icon: false,
    showClose: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgMessageComponent>;

export const BasicStructure: Story = {
  args: {
    body: 'Estructura HTML básica sin elementos opcionales',
    type: 'notification',
  },
  parameters: {
    docs: {
      description: {
        story: `
Muestra la estructura HTML más simple del componente:
\`\`\`html
<div class="message__container notification" aria-role="notification">
  <div class="message__container__body">
    <p class="message__container__paragraph">Contenido del mensaje</p>
  </div>
</div>
\`\`\`
        `,
      },
    },
  },
};

export const WithTitle: Story = {
  args: {
    body: 'Contenido del mensaje con título renderizado como h2',
    type: 'notification',
    title: 'Título del mensaje',
  },
  parameters: {
    docs: {
      description: {
        story: `
Estructura HTML con título:
\`\`\`html
<div class="message__container notification" aria-role="notification">
  <div class="message__container__body">
    <h2 class="message__container__title">Título del mensaje</h2>
    <p class="message__container__paragraph">Contenido del mensaje</p>
  </div>
</div>
\`\`\`
        `,
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    body: 'Mensaje con icono renderizado condicionalmente',
    type: 'notification',
    icon: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Estructura HTML con icono:
\`\`\`html
<div class="message__container notification" aria-role="notification">
  <dcx-ng-icon class="icon__container" name="info" size="m" color="inherit"></dcx-ng-icon>
  <div class="message__container__body">
    <p class="message__container__paragraph">Contenido del mensaje</p>
  </div>
</div>
\`\`\`
        `,
      },
    },
  },
};

export const WithCloseButton: Story = {
  args: {
    body: 'Mensaje con botón de cerrar accesible',
    type: 'notification',
    showClose: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Estructura HTML con botón cerrar:
\`\`\`html
<div class="message__container notification" aria-role="notification">
  <div class="message__container__body">
    <p class="message__container__paragraph">Contenido del mensaje</p>
  </div>
  <button class="icon__container__close" type="button">
    <dcx-ng-icon name="close" size="m" color="inherit"></dcx-ng-icon>
  </button>
</div>
\`\`\`
        `,
      },
    },
  },
};

export const WithLink: Story = {
  args: {
    body: 'Mensaje con enlace externo incluido',
    type: 'notification',
    link: 'https://ejemplo.com/documentacion',
  },
  parameters: {
    docs: {
      description: {
        story: `
Estructura HTML con enlace:
\`\`\`html
<div class="message__container notification" aria-role="notification">
  <div class="message__container__body">
    <p class="message__container__paragraph">Contenido del mensaje</p>
    <a href="https://ejemplo.com/documentacion">https://ejemplo.com/documentacion</a>
  </div>
</div>
\`\`\`
        `,
      },
    },
  },
};

export const CompleteStructure: Story = {
  args: {
    body: 'Estructura HTML completa con todos los elementos opcionales',
    type: 'warning',
    title: 'Estructura Completa',
    link: 'https://ejemplo.com/ayuda',
    icon: true,
    showClose: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Estructura HTML completa:
\`\`\`html
<div class="message__container warning" aria-role="warning">
  <dcx-ng-icon class="icon__container" name="info" size="m" color="inherit"></dcx-ng-icon>
  <div class="message__container__body">
    <h2 class="message__container__title">Estructura Completa</h2>
    <p class="message__container__paragraph">Estructura HTML completa</p>
    <a href="https://ejemplo.com/ayuda">https://ejemplo.com/ayuda</a>
  </div>
  <button class="icon__container__close" type="button">
    <dcx-ng-icon name="close" size="m" color="inherit"></dcx-ng-icon>
  </button>
</div>
\`\`\`

**Elementos incluidos:**
- Contenedor principal con clases semánticas
- Icono condicional al inicio
- Título como h2 semántico
- Párrafo de contenido
- Enlace navegacional
- Botón de cierre interactivo
        `,
      },
    },
  },
};

export const NotificationType: Story = {
  args: {
    body: 'Mensaje de notificación sin estilos',
    type: 'notification',
    title: 'Notificación',
    icon: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Clase CSS aplicada:** \`notification\`  
**Rol ARIA:** \`notification\`

La diferencia principal está en los atributos de clase y accesibilidad, 
no en la estructura HTML.
        `,
      },
    },
  },
};

export const ErrorType: Story = {
  args: {
    body: 'Mensaje de error sin estilos',
    type: 'error',
    title: 'Error',
    icon: true,
    showClose: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Clase CSS aplicada:** \`error\`  
**Rol ARIA:** \`error\`

Mismo HTML que otros tipos, pero con diferentes atributos semánticos.
        `,
      },
    },
  },
};

export const WarningType: Story = {
  args: {
    body: 'Mensaje de advertencia sin estilos',
    type: 'warning',
    title: 'Advertencia',
    icon: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Clase CSS aplicada:** \`warning\`  
**Rol ARIA:** \`warning\`

La estructura HTML es idéntica, cambian solo los identificadores semánticos.
        `,
      },
    },
  },
};

export const SuccessType: Story = {
  args: {
    body: 'Mensaje de éxito sin estilos',
    type: 'success',
    title: 'Éxito',
    icon: true,
    showClose: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Clase CSS aplicada:** \`success\`  
**Rol ARIA:** \`success\`

Estructura HTML consistente con semántica específica para el tipo de mensaje.
        `,
      },
    },
  },
};

export const StructurePlayground: Story = {
  args: {
    body: 'Experimenta con la estructura HTML del componente',
    type: 'notification',
    title: 'Playground Sin Estilos',
    link: 'https://ejemplo.com',
    icon: true,
    showClose: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Usa los controles para experimentar con diferentes combinaciones y observar
cómo cambia la estructura HTML generada. Esto es especialmente útil para:

- **Desarrolladores**: Entender la estructura DOM
- **Diseñadores**: Ver elementos disponibles para estilizar
- **Testers**: Verificar elementos de accesibilidad
- **Implementadores**: Comprender clases CSS disponibles

**Inspecciona el HTML generado** usando las herramientas de desarrollo del navegador
para ver exactamente qué elementos se renderizan condicionalmente.
        `,
      },
    },
  },
};

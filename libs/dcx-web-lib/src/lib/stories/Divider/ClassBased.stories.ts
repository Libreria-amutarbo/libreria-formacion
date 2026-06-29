import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../../index';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Divider',
  component: 'dcx-web-divider',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '`dcx-web-divider` es un separador visual flexible para estructurar contenido. ' +
          'Soporta orientación horizontal y vertical, tamaños predefinidos (`s`, `m`, `l`, `xl`, `auto`), ' +
          'estilos de línea sólida, punteada y discontinua, y personalización completa de color y grosor. ' +
          'Los divisores sin `label` ni `aria-label` se ocultan automáticamente a los lectores de pantalla.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Dirección del divisor.',
      table: { category: 'Atributos' },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl', 'auto'],
      description: 'Longitud del divisor. `auto` rellena el contenedor padre.',
      table: { category: 'Atributos' },
    },
    type: {
      control: 'select',
      options: ['default', 'dot', 'dash'],
      description: 'Estilo visual de la línea: sólida, punteada o discontinua.',
      table: { category: 'Atributos' },
    },
    thickness: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Grosor de la línea en unidades `rem`.',
      table: { category: 'Atributos' },
    },
    color: {
      control: 'color',
      description: 'Color de la línea.',
      table: { category: 'Atributos' },
    },
    label: {
      control: 'text',
      description:
        'Texto visible centrado entre dos líneas. Cuando se establece, el divisor cambia a la variante con etiqueta.',
      table: { category: 'Atributos' },
    },
  },
  args: {
    size: 'auto',
    orientation: 'horizontal',
    type: 'default',
    color: '#d1d5db',
    thickness: 0.25,
    label: '',
  },
  render: (args) => html`
    <dcx-web-divider
      orientation=${args.orientation}
      size=${args.size}
      type=${args.type}
      thickness=${args.thickness}
      color=${args.color}
      label=${args.label || ''}
    ></dcx-web-divider>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Usa el panel de controles para configurar interactivamente orientación, tamaño, color, grosor y tipo.',
      },
    },
  },
};


export const HorizontalSizes: Story = {
  name: 'Horizontal — Todos los tamaños',
  parameters: {
    docs: {
      description: {
        story:
          'Divisores horizontales en todos los tamaños disponibles: `s` (5rem), `m` (15rem), `l` (30rem), `xl` (35rem) y `auto` (ancho del contenedor).',
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <span style="font-size:12px;color:#888">size="s"</span>
      <dcx-web-divider size="s" color="#0058ab"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="m"</span>
      <dcx-web-divider size="m" color="#0058ab"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="l"</span>
      <dcx-web-divider size="l" color="#0058ab"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="xl"</span>
      <dcx-web-divider size="xl" color="#0058ab"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="auto"</span>
      <dcx-web-divider size="auto" color="#0058ab"></dcx-web-divider>
    </div>
  `,
};

export const VerticalSizes: Story = {
  name: 'Vertical — Todos los tamaños',
  parameters: {
    docs: {
      description: {
        story:
          'Divisores verticales en todos los tamaños. El contenedor padre debe tener altura definida.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:row;align-items:flex-end;gap:48px;padding:16px;height:600px;">
  
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">s (5rem)</span>
      <dcx-web-divider size="s" orientation="vertical" color="#0058ab"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">m (15rem)</span>
      <dcx-web-divider size="m" orientation="vertical" color="#0058ab"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">l (30rem)</span>
      <dcx-web-divider size="l" orientation="vertical" color="#0058ab"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">xl (35rem)</span>
      <dcx-web-divider size="xl" orientation="vertical" color="#0058ab"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">auto</span>
      <dcx-web-divider size="auto" orientation="vertical" color="#0058ab"></dcx-web-divider>
    </div>

  </div>

  `,
};

export const AllTypes: Story = {
  name: 'Todos los tipos',
  parameters: {
    docs: {
      description: {
        story:
          'Los tres estilos de línea disponibles: `default` (sólida), `dot` (punteada) y `dash` (discontinua).',
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
      <span style="font-size:12px;color:#888">type="default" — sólida</span>
      <dcx-web-divider type="default" color="#0058ab"></dcx-web-divider>

      <span style="font-size:12px;color:#888">type="dot" — punteada</span>
      <dcx-web-divider type="dot" color="#0058ab"></dcx-web-divider>

      <span style="font-size:12px;color:#888">type="dash" — discontinua</span>
      <dcx-web-divider type="dash" color="#0058ab"></dcx-web-divider>
    </div>
  `,
};

export const ThicknessVariants: Story = {
  name: 'Variantes de grosor',
  parameters: {
    docs: {
      description: {
        story:
          'El input `thickness` controla el grosor en `rem`. Se muestran ejemplos en horizontal y vertical.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:48px;padding:16px;">
      
      <div style="display:flex;flex-direction:column;gap:20px;flex:1;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">
          Horizontal
        </span>

        <span style="font-size:12px;color:#888">thickness=0.1</span>
        <dcx-web-divider thickness="0.1" color="#0058ab"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.25</span>
        <dcx-web-divider thickness="0.25" color="#0058ab"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.4</span>
        <dcx-web-divider thickness="0.4" color="#0058ab"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.8</span>
        <dcx-web-divider thickness="0.8" color="#0058ab"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:row;gap:32px;height:200px;align-items:stretch;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">
          Vertical
        </span>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.1</span>
          <dcx-web-divider thickness="0.1" orientation="vertical" color="#0058ab"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.25</span>
          <dcx-web-divider thickness="0.25" orientation="vertical" color="#0058ab"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.4</span>
          <dcx-web-divider thickness="0.4" orientation="vertical" color="#0058ab"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.8</span>
          <dcx-web-divider thickness="0.8" orientation="vertical" color="#0058ab"></dcx-web-divider>
        </div>

      </div>

    </div>
  `,
};

export const ColorVariants: Story = {
  name: 'Variantes de color',
  parameters: {
    docs: {
      description: {
        story:
          'El input `color` acepta cualquier valor CSS. Los divisores sin label son decorativos.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:32px;padding:16px;">
      
      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">
          Horizontal
        </span>

        <dcx-web-divider color="#e6f0ff"></dcx-web-divider>
        <dcx-web-divider color="#cfe0ff"></dcx-web-divider>
        <dcx-web-divider color="#b8d1ff"></dcx-web-divider>
        <dcx-web-divider color="#8ab1ff"></dcx-web-divider>
        <dcx-web-divider color="#5c8fff"></dcx-web-divider>
        <dcx-web-divider color="#2e6fff"></dcx-web-divider>
        <dcx-web-divider color="#155fff"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:row;gap:12px;height:180px;align-items:stretch;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">
          Vertical
        </span>

        <dcx-web-divider orientation="vertical" color="#e6f0ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#cfe0ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#b8d1ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#8ab1ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#5c8fff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#2e6fff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#155fff"></dcx-web-divider>
      </div>
    </div>
  `,
};

export const LabeledDividers: Story = {
  name: 'Con etiqueta — Horizontal y Vertical',
  parameters: {
    docs: {
      description: {
        story:
          'Divisores con etiqueta centrada. En vertical, la etiqueta se rota y se mantiene centrada.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:48px;padding:24px;">
      
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:12px;color:#888">
          orientation="horizontal"
        </span>
        <dcx-web-divider label="Título de sección" color="#0058ab"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:12px;color:#888">
          orientation="vertical" (altura acotada por el padre)
        </span>

        <div style="display:flex;height:200px;gap:16px;">
          <p style="margin:0;align-self:center;">Contenido izquierdo</p>
          <dcx-web-divider orientation="vertical" label="o" color="#0058ab"></dcx-web-divider>
          <p style="margin:0;align-self:center;">Contenido derecho</p>
        </div>
      </div>

    </div>
  `,
};
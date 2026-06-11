import { DcxNgDividerComponent, tokens } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';
import { argTypesDivider } from './utils';

const meta: Meta<DcxNgDividerComponent> = {
  title: 'DCXLibrary/Components/Divider',
  component: DcxNgDividerComponent,
  tags: ['autodocs'],
  argTypes: argTypesDivider,
  parameters: {
    docs: {
      description: {
        component:
          '`dcx-ng-divider` es un separador visual flexible para estructurar contenido. ' +
          'Soporta orientación horizontal y vertical, tamaños predefinidos (`s`, `m`, `l`, `xl`, `auto`), ' +
          'estilos de línea sólida, punteada y discontinua, y personalización completa de color y grosor. ' +
          'Los divisores sin `label` ni `ariaLabel` se ocultan automáticamente a los lectores de pantalla.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgDividerComponent>;

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
  args: {
    size: 'auto',
    orientation: 'horizontal',
    type: 'default',
    color: tokens.background.pressed,
    thickness: 0.25,
    ariaLabel: 'Separador de sección',
    label: '',
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
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
        <span style="font-size:12px;color:#888">size="s"</span>
        <dcx-ng-divider size="s" ariaLabel="Pequeño" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="m"</span>
        <dcx-ng-divider size="m" ariaLabel="Mediano" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="l"</span>
        <dcx-ng-divider size="l" ariaLabel="Grande" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="xl"</span>
        <dcx-ng-divider size="xl" ariaLabel="Extra grande" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">size="auto"</span>
        <dcx-ng-divider size="auto" ariaLabel="Auto" color="${tokens.background.primary}"></dcx-ng-divider>
      </div>
    `,
  }),
};

export const VerticalSizes: Story = {
  name: 'Vertical — Todos los tamaños',
  parameters: {
    docs: {
      description: {
        story:
          'Divisores verticales en todos los tamaños. El contenedor padre debe tener altura definida para que el divisor sea visible.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:row;align-items:flex-end;gap:48px;padding:16px;height:600px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">s (5rem)</span>
          <dcx-ng-divider size="s" orientation="vertical" ariaLabel="Pequeño" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">m (15rem)</span>
          <dcx-ng-divider size="m" orientation="vertical" ariaLabel="Mediano" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">l (30rem)</span>
          <dcx-ng-divider size="l" orientation="vertical" ariaLabel="Grande" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">xl (35rem)</span>
          <dcx-ng-divider size="xl" orientation="vertical" ariaLabel="Extra grande" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
          <span style="font-size:12px;color:#888">auto</span>
          <dcx-ng-divider size="auto" orientation="vertical" ariaLabel="Auto" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
      </div>
    `,
  }),
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
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
        <span style="font-size:12px;color:#888">type="default" — sólida</span>
        <dcx-ng-divider size="auto" type="default" ariaLabel="Sólida" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">type="dot" — punteada</span>
        <dcx-ng-divider size="auto" type="dot" ariaLabel="Punteada" color="${tokens.background.primary}"></dcx-ng-divider>
        <span style="font-size:12px;color:#888">type="dash" — discontinua</span>
        <dcx-ng-divider size="auto" type="dash" ariaLabel="Discontinua" color="${tokens.background.primary}"></dcx-ng-divider>
      </div>
    `,
  }),
};

export const ThicknessVariants: Story = {
  name: 'Variantes de grosor',
  parameters: {
    docs: {
      description: {
        story:
          'El input `thickness` controla el grosor en `rem`. Se muestran valores representativos en horizontal y vertical.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:48px;padding:16px;">
        <div style="display:flex;flex-direction:column;gap:20px;flex:1;">
          <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">Horizontal</span>
          <span style="font-size:12px;color:#888">thickness=0.1</span>
          <dcx-ng-divider [thickness]="0.1" ariaLabel="Grosor 0.1" color="${tokens.background.primary}"></dcx-ng-divider>
          <span style="font-size:12px;color:#888">thickness=0.25 (default)</span>
          <dcx-ng-divider [thickness]="0.25" ariaLabel="Grosor 0.25" color="${tokens.background.primary}"></dcx-ng-divider>
          <span style="font-size:12px;color:#888">thickness=0.4</span>
          <dcx-ng-divider [thickness]="0.4" ariaLabel="Grosor 0.4" color="${tokens.background.primary}"></dcx-ng-divider>
          <span style="font-size:12px;color:#888">thickness=0.8</span>
          <dcx-ng-divider [thickness]="0.8" ariaLabel="Grosor 0.8" color="${tokens.background.primary}"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:row;gap:32px;height:200px;align-items:stretch;">
          <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">Vertical</span>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;">
            <span style="font-size:12px;color:#888">0.1</span>
            <dcx-ng-divider [thickness]="0.1" orientation="vertical" ariaLabel="Vertical 0.1" color="${tokens.background.primary}"></dcx-ng-divider>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;">
            <span style="font-size:12px;color:#888">0.25</span>
            <dcx-ng-divider [thickness]="0.25" orientation="vertical" ariaLabel="Vertical 0.25" color="${tokens.background.primary}"></dcx-ng-divider>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;">
            <span style="font-size:12px;color:#888">0.4</span>
            <dcx-ng-divider [thickness]="0.4" orientation="vertical" ariaLabel="Vertical 0.4" color="${tokens.background.primary}"></dcx-ng-divider>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;">
            <span style="font-size:12px;color:#888">0.8</span>
            <dcx-ng-divider [thickness]="0.8" orientation="vertical" ariaLabel="Vertical 0.8" color="${tokens.background.primary}"></dcx-ng-divider>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ColorVariants: Story = {
  name: 'Variantes de color',
  parameters: {
    docs: {
      description: {
        story:
          'El input `color` acepta cualquier valor CSS. Se muestra una escala de azules en horizontal y vertical. Los divisores sin `ariaLabel` ni `label` tienen `aria-hidden="true"` automáticamente.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:32px;padding:16px;">
        <div style="display:flex;flex-direction:column;gap:12px;flex:1;">
          <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">Horizontal</span>
          <dcx-ng-divider color="#e6f0ff"></dcx-ng-divider>
          <dcx-ng-divider color="#cfe0ff"></dcx-ng-divider>
          <dcx-ng-divider color="#b8d1ff"></dcx-ng-divider>
          <dcx-ng-divider color="#8ab1ff"></dcx-ng-divider>
          <dcx-ng-divider color="#5c8fff"></dcx-ng-divider>
          <dcx-ng-divider color="#2e6fff"></dcx-ng-divider>
          <dcx-ng-divider color="#155fff"></dcx-ng-divider>
        </div>
        <div style="display:flex;flex-direction:row;gap:12px;height:180px;align-items:stretch;">
          <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">Vertical</span>
          <dcx-ng-divider orientation="vertical" color="#e6f0ff"></dcx-ng-divider>
          <dcx-ng-divider orientation="vertical" color="#cfe0ff"></dcx-ng-divider>
          <dcx-ng-divider orientation="vertical" color="#b8d1ff"></dcx-ng-divider>
          <dcx-ng-divider orientation="vertical" color="#8ab1ff"></dcx-ng-divider>
          <dcx-ng-divider orientation="vertical" color="#5c8fff"></dcx-ng-divider>
          <dcx-ng-divider orientation="vertical" color="#2e6fff"></dcx-ng-divider>
          <dcx-ng-divider orientation="vertical" color="#155fff"></dcx-ng-divider>
        </div>
      </div>
    `,
  }),
};

export const LabeledDividers: Story = {
  name: 'Con etiqueta — Horizontal y Vertical',
  parameters: {
    docs: {
      description: {
        story:
          'Divisores con etiqueta centrada en ambas orientaciones. El texto se centra entre dos líneas decorativas y hereda el color del divisor. En vertical, la etiqueta rota lateralmente.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:48px;padding:24px;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:12px;color:#888">orientation="horizontal"</span>
          <dcx-ng-divider
            label="Título de sección"
            color="${tokens.background.primary}"
            size="auto"
          ></dcx-ng-divider>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:12px;color:#888">orientation="vertical" (altura acotada por el padre)</span>
          <div style="display:flex;flex-direction:row;height:200px;align-items:stretch;gap:16px;">
            <p style="margin:0;align-self:center;">Contenido izquierdo</p>
            <dcx-ng-divider
              label="o"
              orientation="vertical"
              color="${tokens.background.primary}"
            ></dcx-ng-divider>
            <p style="margin:0;align-self:center;">Contenido derecho</p>
          </div>
        </div>
      </div>
    `,
  }),
};

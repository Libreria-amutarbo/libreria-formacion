import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { BOOTSTRAP_ICONS } from '../../../../.storybook/bootstrap-icons';

import '../../../index';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Icon',
  component: 'dcx-web-icon',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Nombre del icono de Bootstrap Icons, sin el prefijo `bi-` (p.ej. `gear`, `search`, `heart`).',
      table: {
        category: 'Atributos',
      },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl', 'auto'],
      description: 'Tamaño del icono. `auto` hereda el tamaño del contenedor.',
      table: {
        category: 'Atributos',
      },
    },
    spacing: {
      control: 'select',
      options: ['none', 'compact', 'spacious'],
      description: 'Margen horizontal externo del icono.',
      table: {
        category: 'Atributos',
      },
    },
    color: {
      control: 'color',
      description: 'Color del icono (hexadecimal o nombre CSS). Si se deja vacío, usa el azul corporativo.',
      table: {
        category: 'Atributos',
      },
    },
    extraClass: {
      control: 'text',
      description: 'Clases CSS adicionales.',
      table: {
        category: 'Atributos',
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible. Si se indica, el icono es significativo (`role="img"` + `aria-label`). Si se deja vacío, el icono es decorativo.',
      table: {
        category: 'Atributos',
      },
    },
  },
  args: {
    name: 'gear',
    size: 'm',
    spacing: 'none',
    color: '',
    extraClass: '',
    ariaLabel: '',
  },
  render: (args) => html`
    <dcx-web-icon
      name=${args.name}
      size=${args.size}
      spacing=${args.spacing}
      color=${args.color || ''}
      extra-class=${args.extraClass || ''}
      aria-label=${args.ariaLabel || ''}
    ></dcx-web-icon>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    name: 'gear',
  },
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display:flex;align-items:flex-end;gap:1.5rem;">
      ${['s', 'm', 'l', 'xl'].map(
        (size) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem;">
            <dcx-web-icon name=${args.name} size=${size} color=${args.color || ''}></dcx-web-icon>
            <small style="color:#666;">${size}</small>
          </div>
        `
      )}
    </div>
  `,
};

export const Spacing: Story = {
  render: (args) => html`
    <div style="display:flex;flex-direction:column;gap:.75rem;">
      ${['none', 'compact', 'spacious'].map(
        (sp) => html`
          <div style="background:#f4f5f7;border-radius:6px;padding:4px;">
            <span style="background:#fff;">texto</span><dcx-web-icon name=${args.name} size=${args.size} spacing=${sp}></dcx-web-icon><span style="background:#fff;">${sp}</span>
          </div>
        `
      )}
    </div>
  `,
};

export const Color: Story = {
  render: (args) => html`
    <div style="display:flex;gap:1.5rem;">
      ${['#0058ab', '#16a34a', '#dc2626', '#d97706'].map(
        (c) => html`
          <dcx-web-icon name=${args.name} size=${args.size} color=${c}></dcx-web-icon>
        `
      )}
    </div>
  `,
};

export const Accessible: Story = {
  args: {
    name: 'gear',
    ariaLabel: 'Configuración',
  },
};

export const AllIcons: Story = {
  render: (args) => {
    const sortedIcons = [...BOOTSTRAP_ICONS].sort((a, b) => a.localeCompare(b));
    const onCopy = async (name: string) => {
      try {
        await navigator.clipboard.writeText(name);
        alert('Copiado al portapapeles');
      } catch {
        const ta = document.createElement('textarea');
        ta.value = name;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    };

    return html`
      <div style="max-width: 1200px; margin: 0 auto; padding: 16px;">
        <div style="
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          justify-content: center;
          justify-items: center;
          align-items: start;
        ">
          ${sortedIcons.map(
            (icon) => html`
              <div
                @click=${() => onCopy(icon)}
                title=${`Click para copiar: ${icon}`}
                style="cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px;"
              >
                <dcx-web-icon
                  name=${icon}
                  size=${args.size}
                  spacing=${args.spacing}
                  color=${args.color || ''}
                ></dcx-web-icon>
                <div style="font-size: 14px; color: #666; text-align: center; word-break: break-word;">
                  ${icon}
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  },
};

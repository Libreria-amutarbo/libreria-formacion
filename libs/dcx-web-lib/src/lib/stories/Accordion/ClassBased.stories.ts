import { html, nothing } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import '../../dcx-web-components/dcx-web-accordion/dcx-web-accordion.component';
import {
  DcxAccordionDefault,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsDisabled,
  DcxAccordionItemsContentDisabled,
  DcxAccordionLargeContent,
  DcxAccordionItemsWithDescription,
  LIST_ITEMS_MOCK,
} from '../../core/defaults';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Accordion',
  component: 'dcx-web-accordion',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Lista de items del acordeón.',
      table: { category: 'Atributos' },
    },
    transition: {
      control: 'select',
      options: ['smooth', 'fast', 'slow', 'none'],
      description: 'Velocidad de la animación al expandir o colapsar.',
      table: { category: 'Atributos' },
    },
    closeOthers: {
      control: 'boolean',
      description: 'Si es true, abrir un panel cierra el resto.',
      table: { category: 'Atributos' },
    },
    variant: {
      control: 'select',
      options: ['default', 'flush'],
      description: 'Variante visual del acordeón.',
      table: { category: 'Atributos' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta accesible para el elemento raíz.',
      table: { category: 'Atributos' },
    },
  },
  args: {
    items: DcxAccordionDefault,
    transition: 'smooth',
    closeOthers: true,
    variant: 'default',
  },
  render: args => html`
    <dcx-web-accordion
      .items=${args.items}
      transition=${args.transition}
      ?closeOthers=${args.closeOthers}
      variant=${args.variant}
      aria-label=${args.ariaLabel || ''}
    ></dcx-web-accordion>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    items: DcxAccordionDefault,
  },
};

export const WithIcons: Story = {
  args: {
    items: DcxAccordionItemsWithIcon,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: DcxAccordionItemsDisabled,
  },
};

export const WithContentDisabledItems: Story = {
  args: {
    items: DcxAccordionItemsContentDisabled,
  },
};

export const MultipleOpen: Story = {
  args: {
    items: DcxAccordionItemsWithExpanded,
    closeOthers: false,
  },
};

export const FastTransition: Story = {
  args: {
    items: DcxAccordionDefault,
    transition: 'fast',
  },
};

export const SlowTransition: Story = {
  args: {
    items: DcxAccordionDefault,
    transition: 'slow',
  },
};

export const NoTransition: Story = {
  args: {
    items: DcxAccordionDefault,
    transition: 'none',
  },
};

export const LargeContent: Story = {
  args: {
    items: DcxAccordionLargeContent,
  },
};

export const WithDescription: Story = {
  args: {
    items: DcxAccordionItemsWithDescription,
  },
};

const styles = html`
  <style>
    .api-btn {
      padding: 8px 12px;
      background: #0058ab;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      font-family: sans-serif;
    }
    .api-btn:hover {
      background: #003d7a;
    }
  </style>
`;

export const WithComponents: Story = {
  render: () => {
    const listItems = [...LIST_ITEMS_MOCK];

    const buttonTemplate = () => html`
      <div style="display: flex; gap: 8px; flex-wrap: wrap; padding: 8px 0;">
        <button class="api-btn">Primary Action</button>
        <button class="api-btn" style="background:#696e75;">Secondary Action</button>
      </div>
    `;

    const formTemplate = () => html`
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 8px 0; max-width: 320px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <label style="font-size:12px; font-weight:600;">Nombre</label>
          <input type="text" placeholder="Escribe tu nombre..." style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <label style="font-size:12px; font-weight:600;">Email</label>
          <input type="email" placeholder="tu@email.com" style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px;" />
        </div>
        <button class="api-btn">Enviar</button>
      </div>
    `;

    const listTemplate = () => html`
      <div style="padding: 8px 0;">
        <ul style="margin: 0 0 12px 0; padding-left: 20px;">
          ${listItems.map(item => html`<li>${item}</li>`)}
        </ul>
        <div style="display: flex; gap: 8px;">
          <button class="api-btn" @click=${() => {
            listItems.push(`Item ${listItems.length + 1}`);
            const listEl = document.querySelector('#story-list-container');
            if (listEl) {
              listEl.innerHTML = listItems
                .map(item => `<li>${item}</li>`)
                .join('');
            }
          }}>Añadir</button>
          <button class="api-btn" style="background:#696e75;" @click=${() => {
            if (listItems.length > 0) {
              listItems.pop();
              const listEl = document.querySelector('#story-list-container');
              if (listEl) {
                listEl.innerHTML = listItems
                  .map(item => `<li>${item}</li>`)
                  .join('');
              }
            }
          }}>Eliminar último</button>
        </div>
      </div>
    `;

    const items = [
      {
        id: '1',
        title: 'Interactive Buttons',
        icon: 'hand-pointer',
        contentTemplate: buttonTemplate,
      },
      {
        id: '2',
        title: 'Form Components',
        icon: 'file-text',
        contentTemplate: formTemplate,
      },
      {
        id: '3',
        title: 'Dynamic List',
        icon: 'list',
        contentTemplate: () => html`
          <div style="padding: 8px 0;">
            <ul id="story-list-container" style="margin: 0 0 12px 0; padding-left: 20px;">
              ${listItems.map(item => html`<li>${item}</li>`)}
            </ul>
            <div style="display: flex; gap: 8px;">
              <button class="api-btn" @click=${() => {
                listItems.push(`Item ${listItems.length + 1}`);
                const listEl = document.querySelector('#story-list-container');
                if (listEl) {
                  listEl.innerHTML = listItems
                    .map(item => `<li>${item}</li>`)
                    .join('');
                }
              }}>Añadir</button>
              <button class="api-btn" style="background:#696e75;" @click=${() => {
                if (listItems.length > 0) {
                  listItems.pop();
                  const listEl = document.querySelector(
                    '#story-list-container',
                  );
                  if (listEl) {
                    listEl.innerHTML = listItems
                      .map(item => `<li>${item}</li>`)
                      .join('');
                  }
                }
              }}>Eliminar último</button>
            </div>
          </div>
        `,
      },
    ];

    return html`
      ${styles}
      <dcx-web-accordion .items=${items}></dcx-web-accordion>
    `;
  },
};

export const ExternalControl: Story = {
  render: args => {
    let expandedMap: Record<string, boolean> = {};

    const onToggled = (e: any) => {
      const item = e.detail;
      const acc = document.querySelector(
        'dcx-web-accordion#external-acc',
      ) as any;
      if (!acc) return;
      const next: Record<string, boolean> = {};
      next[item.id] = acc.isExpanded(item.id);
      expandedMap = next;

      args.items.forEach((it: any) => {
        const btn = document.querySelector(
          `#btn-ext-${it.id}`,
        ) as HTMLButtonElement;
        if (btn) {
          btn.textContent = expandedMap[it.id]
            ? `Cerrar: ${it.title}`
            : `Abrir: ${it.title}`;
          btn.className = expandedMap[it.id] ? 'api-btn' : 'api-btn secondary';
          btn.style.background = expandedMap[it.id] ? '#0058ab' : '#696e75';
        }
      });
    };

    const toggle = (id: string) => {
      const acc = document.querySelector(
        'dcx-web-accordion#external-acc',
      ) as any;
      if (!acc) return;
      if (acc.isExpanded(id)) {
        acc.collapseItemById(id);
      } else {
        acc.expandItemById(id);
      }
    };

    return html`
      ${styles}
      <p style="font-size:13px;color:#696e75;margin-bottom:12px">
        Los botones controlan el acordeón desde fuera mediante referencias de plantilla.
        Abre un panel haciendo clic en el botón <strong>o</strong> directamente en la cabecera.
      </p>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
        ${args.items.map((item: any) => {
          if (item.disabled) return nothing;
          return html`
              <button
                id="btn-ext-${item.id}"
                class="api-btn"
                style="background: #696e75;"
                @click=${() => toggle(item.id)}
              >
                Abrir: ${item.title}
              </button>
            `;
        })}
      </div>

      <dcx-web-accordion
        id="external-acc"
        .items=${args.items}
        .transition=${args.transition}
        @itemToggled=${onToggled}
      ></dcx-web-accordion>
    `;
  },
  args: {
    items: DcxAccordionDefault,
  },
};

export const ExpandCollapseAll: Story = {
  render: args => html`
    ${styles}
    <p style="font-size:13px;color:#696e75;margin-bottom:12px">
      Usa los botones para expandir o colapsar todos los paneles de golpe.
      Funciona independientemente de <code>closeOthers</code>.
    </p>

    <div style="display:flex; gap:8px; margin-bottom:16px;">
      <button
        class="api-btn"
        @click=${() => {
          const acc = document.querySelector(
            'dcx-web-accordion#all-acc',
          ) as any;
          acc?.expandAll();
        }}
      >
        Expandir todo
      </button>
      <button
        class="api-btn"
        style="background: #696e75;"
        @click=${() => {
          const acc = document.querySelector(
            'dcx-web-accordion#all-acc',
          ) as any;
          acc?.collapseAll();
        }}
      >
        Colapsar todo
      </button>
    </div>

    <dcx-web-accordion
      id="all-acc"
      .items=${args.items}
      ?closeOthers=${false}
    ></dcx-web-accordion>
  `,
  args: {
    items: DcxAccordionDefault,
  },
};

export const Flush: Story = {
  args: {
    items: DcxAccordionItemsWithIcon,
    variant: 'flush',
  },
};

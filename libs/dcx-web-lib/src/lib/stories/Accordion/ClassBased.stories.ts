import { html, nothing } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import '../../dcx-web-components/dcx-web-accordion/dcx-web-accordion.component';
import '../../dcx-web-components/dcx-web-button/dcx-web-button.component';
import {
  DcxAccordionDefault,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsDisabled,
  DcxAccordionItemsContentDisabled,
  DcxAccordionLargeContent,
  DcxAccordionItemsWithDescription,
  LIST_ITEMS_MOCK,
  DcxAccordionTransitionList,
  DcxAccordionVariantList,
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
      options: DcxAccordionTransitionList,
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
      options: DcxAccordionVariantList,
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
      .closeOthers=${args.closeOthers}
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

export const WithComponents: Story = {
  render: () => {
    const listItems = [...LIST_ITEMS_MOCK];

    const buttonTemplate = () => html`
      <div style="display: flex; gap: var(--sp-2, 8px); flex-wrap: wrap; padding: var(--sp-2, 8px) 0;">
        <dcx-web-button label="Primary Action" variant="primary"></dcx-web-button>
        <dcx-web-button label="Secondary Action" variant="secondary"></dcx-web-button>
        <dcx-web-button label="Outline Action" variant="terciary"></dcx-web-button>
      </div>
    `;

    const formTemplate = () => html`
      <div style="display: flex; flex-direction: column; gap: var(--sp-3, 12px); padding: var(--sp-2, 8px) 0; max-width: 320px;">
        <div style="display: flex; flex-direction: column; gap: var(--sp-1, 4px);">
          <label style="font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600);">Nombre</label>
          <input type="text" placeholder="Escribe tu nombre..." style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--sp-1, 4px);">
          <label style="font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600);">Email</label>
          <input type="email" placeholder="tu@email.com" style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <dcx-web-button label="Enviar" variant="primary"></dcx-web-button>
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
          <div style="padding: var(--sp-2, 8px) 0;">
            <ul id="story-list-container" style="margin: 0 0 var(--sp-3, 12px) 0; padding-left: var(--sp-5, 20px);">
              ${listItems.map(item => html`<li>${item}</li>`)}
            </ul>
            <div style="display: flex; gap: var(--sp-2, 8px);">
              <dcx-web-button
                label="Añadir"
                variant="primary"
                @click=${(evt: Event) => {
                  listItems.push(`Item ${listItems.length + 1}`);
                  const root = (
                    evt.target as HTMLElement
                  ).getRootNode() as DocumentFragment;
                  const listEl = root.querySelector('#story-list-container');
                  if (listEl) {
                    listEl.innerHTML = listItems
                      .map(item => `<li>${item}</li>`)
                      .join('');
                  }
                }}
              ></dcx-web-button>
              <dcx-web-button
                label="Eliminar último"
                variant="secondary"
                @click=${(evt: Event) => {
                  if (listItems.length > 0) {
                    listItems.pop();
                    const root = (
                      evt.target as HTMLElement
                    ).getRootNode() as DocumentFragment;
                    const listEl = root.querySelector('#story-list-container');
                    if (listEl) {
                      listEl.innerHTML = listItems
                        .map(item => `<li>${item}</li>`)
                        .join('');
                    }
                  }
                }}
              ></dcx-web-button>
            </div>
          </div>
        `,
      },
    ];

    return html`
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
        const btn = document.querySelector(`#btn-ext-${it.id}`) as any;
        if (btn) {
          btn.label = expandedMap[it.id]
            ? `Cerrar: ${it.title}`
            : `Abrir: ${it.title}`;
          btn.variant = expandedMap[it.id] ? 'primary' : 'secondary';
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
      <p style="font-size:13px;color:var(--text-muted, #696e75);margin-bottom:var(--sp-3, 12px)">
        Los botones controlan el acordeón desde fuera mediante referencias de plantilla.
        Abre un panel haciendo clic en el botón <strong>o</strong> directamente en la cabecera.
      </p>

      <div style="display:flex; gap:var(--sp-2, 8px); margin-bottom:var(--sp-4, 16px); flex-wrap:wrap;">
        ${args.items.map((item: any) => {
          if (item.disabled) return nothing;
          return html`
              <dcx-web-button
                id="btn-ext-${item.id}"
                label="Abrir: ${item.title}"
                variant="secondary"
                @click=${() => toggle(item.id)}
              ></dcx-web-button>
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
    <p style="font-size:13px;color:var(--text-muted, #696e75);margin-bottom:var(--sp-3, 12px)">
      Usa los botones para expandir o colapsar todos los paneles de golpe.
      Funciona independientemente de <code>closeOthers</code>.
    </p>

    <div style="display:flex; gap:var(--sp-2, 8px); margin-bottom:var(--sp-4, 16px);">
      <dcx-web-button
        label="Expandir todo"
        variant="primary"
        @click=${() => {
          const acc = document.querySelector(
            'dcx-web-accordion#all-acc',
          ) as any;
          acc?.expandAll();
        }}
      ></dcx-web-button>
      <dcx-web-button
        label="Colapsar todo"
        variant="secondary"
        @click=${() => {
          const acc = document.querySelector(
            'dcx-web-accordion#all-acc',
          ) as any;
          acc?.collapseAll();
        }}
      ></dcx-web-button>
    </div>

    <dcx-web-accordion
      id="all-acc"
      .items=${args.items}
      .closeOthers=${false}
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

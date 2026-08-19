import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-list/dcx-web-list.component';

import {
  LIST_ENABLED_DISABLED_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
  LIST_ITEMS_WITH_SUBLISTS,
  MULTI_SELECT_LIST_ITEMS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
  DANGER_LIST_ITEMS,
} from '../../core/defaults/list';

import type { DcxListItem } from '../../core/interfaces/list';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/List',
  component: 'dcx-web-list',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    items: {
      control: 'object',
      description: 'Array de elementos renderizados por la lista.',
      table: {
        category: 'Atributos',
      },
    },

    selectable: {
      control: 'boolean',
      description: 'Permite seleccionar elementos.',
      table: {
        category: 'Atributos',
      },
    },

    multiSelect: {
      control: 'boolean',
      description: 'Permite selección múltiple.',
      table: {
        category: 'Atributos',
      },
    },

    showChildrenIndicator: {
      control: 'boolean',
      description: 'Muestra indicador visual para elementos hijos.',
      table: {
        category: 'Atributos',
      },
    },

    renderChildren: {
      control: 'boolean',
      description: 'Renderiza listas anidadas.',
      table: {
        category: 'Atributos',
      },
    },

    externalSelection: {
      control: 'boolean',
      description: 'La selección es gestionada externamente.',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible del contenedor.',
      table: {
        category: 'Atributos',
      },
    },

    itemSelected: {
      action: 'itemSelected',
      description: 'Emitido al seleccionar un elemento.',
      table: {
        category: 'Eventos',
      },
    },

    itemDeselected: {
      action: 'itemDeselected',
      description: 'Emitido al deseleccionar un elemento.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    items: SIMPLE_LIST_ITEMS,
    selectable: false,
    multiSelect: false,
    showChildrenIndicator: false,
    renderChildren: true,
    externalSelection: false,
    ariaLabel: 'Lista de elementos',
  },

  render: args => html`
    <dcx-web-list
      .items=${args.items}
      .selectable=${args.selectable}
      .multiSelect=${args.multiSelect}
      .showChildrenIndicator=${args.showChildrenIndicator}
      .renderChildren=${args.renderChildren}
      .externalSelection=${args.externalSelection}
      aria-label=${args.ariaLabel}
    >
    </dcx-web-list>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    items: LIST_ITEMS_WITH_ICONS,
    selectable: true,
  },
};

export const WithDescription: Story = {
  args: {
    items: LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
    selectable: true,
  },
};

export const WithSubLists: Story = {
  args: {
    items: LIST_ITEMS_WITH_SUBLISTS,
    selectable: true,
    showChildrenIndicator: true,
  },
};

export const Selectable: Story = {
  render: () => {
    const updateStatus = (e: Event) => {
      const { item, index } = (
        e as CustomEvent<{ item: DcxListItem; index: number }>
      ).detail;
      const el = document.getElementById('selectable-status');
      if (el)
        el.textContent = `Seleccionado: ${item.text ?? item.label} (index: ${index})`;
    };

    return html`
      <div>
        <dcx-web-list
          .items=${SELECTABLE_LIST_ITEMS}
          .selectable=${true}
          @itemSelected=${updateStatus}
        ></dcx-web-list>
        <p
          id="selectable-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--background-color, #f3f4f6);
            border-radius: var(--r-md, 6px);
            border-left: 3px solid #0058ab;
          "
        >
          Seleccionado: —
        </p>
      </div>
    `;
  },
};

export const MultiSelectable: Story = {
  render: () => {
    const selected = new Map<number, string>();

    const onSelected = (e: Event) => {
      const { item, index } = (
        e as CustomEvent<{ item: DcxListItem; index: number }>
      ).detail;
      selected.set(index, item.text ?? item.label ?? '');
      updateStatus();
    };

    const onDeselected = (e: Event) => {
      const { index } = (e as CustomEvent<{ index: number }>).detail;
      selected.delete(index);
      updateStatus();
    };

    const updateStatus = () => {
      const el = document.getElementById('multi-status');
      if (!el) return;
      if (selected.size === 0) {
        el.textContent = 'Elementos seleccionados: —';
      } else {
        const names = [...selected.values()].join(', ');
        el.textContent = `Elementos seleccionados (${selected.size}): ${names}`;
      }
    };

    return html`
      <div>
        <dcx-web-list
          .items=${MULTI_SELECT_LIST_ITEMS}
          .selectable=${true}
          .multiSelect=${true}
          @itemSelected=${onSelected}
          @itemDeselected=${onDeselected}
        ></dcx-web-list>
        <p
          id="multi-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--bg-disabled, #f3f4f6);
            border-radius: 6px;
            border-left: 3px solid #0058ab;
          "
        >
          Elementos seleccionados: —
        </p>
      </div>
    `;
  },
};

export const Dividers: Story = {
  args: {
    items: LIST_ITEMS_WITH_DIVIDER,
  },
};

export const DisabledItems: Story = {
  args: {
    items: LIST_ENABLED_DISABLED_ITEMS,
    selectable: true,
  },
};

export const Danger: Story = {
  args: {
    items: DANGER_LIST_ITEMS,
    selectable: true,
  },
};

export const ExternalControl: Story = {
  render: () => {
    const updateStatus = (e: Event) => {
      const { index } = (e as CustomEvent<{ item: DcxListItem; index: number }>)
        .detail;
      const el = document.getElementById('external-status');
      if (el) el.textContent = `Índice emitido: ${index}`;
    };

    return html`
      <div>
        <dcx-web-list
          .items=${SELECTABLE_LIST_ITEMS}
          .selectable=${true}
          .externalSelection=${true}
          @itemSelected=${updateStatus}
        ></dcx-web-list>
        <p
          id="external-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--bg-disabled, #f3f4f6);
            border-radius: var(--r-mdm, 6px);
            border-left: 3px solid #0058ab;
          "
        >
          Índice emitido: —
        </p>
      </div>
    `;
  },
};

export const CustomTemplate: Story = {
  render: () => html`
    <dcx-web-list
      .items=${LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION}
      .selectable=${true}
      .itemTemplate=${({
        item,
        selected,
      }: {
        item: DcxListItem;
        selected: boolean;
      }) => html`
        <div
          style="
            display:flex;
            align-items:center;
            gap: var(--sp-3, 12px);
            padding:12px 16px;
          "
        >
          <span
            style="font-weight: var(--fw-semibold, 600);"
          >
            ${item.text}
          </span>

          <span
            style="
              font-size: var(--fs-xs, 11px);
              color:#64748b;
            "
          >
            ${item.description}
          </span>

          ${
            selected
              ? html`
                <span
                  style="
                    margin-left:auto;
                    color:#0369a1;
                    font-weight: var(--fw-bold, 700);
                  "
                >
                  ✓
                </span>
              `
              : ''
          }
        </div>
      `}
    >
    </dcx-web-list>
  `,
};

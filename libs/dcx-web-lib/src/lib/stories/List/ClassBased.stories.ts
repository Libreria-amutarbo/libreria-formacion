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
} from '../../core/defaults/list';

import type {
  DcxListItem,
} from '../../core/interfaces/list';

const DANGER_LIST_ITEMS: DcxListItem[] = [
  {
    id: 'edit',
    text: 'Editar',
    icon: 'pencil',
  },
  {
    id: 'duplicate',
    text: 'Duplicar',
    icon: 'files',
  },
  {
    id: 'delete',
    text: 'Eliminar',
    icon: 'trash',
    variant: 'danger',
  },
];

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
      description:
        'Array de elementos renderizados por la lista.',
      table: {
        category: 'Atributos',
      },
    },

    selectable: {
      control: 'boolean',
      description:
        'Permite seleccionar elementos.',
      table: {
        category: 'Atributos',
      },
    },

    multiSelect: {
      control: 'boolean',
      description:
        'Permite selección múltiple.',
      table: {
        category: 'Atributos',
      },
    },

    showChildrenIndicator: {
      control: 'boolean',
      description:
        'Muestra indicador visual para elementos hijos.',
      table: {
        category: 'Atributos',
      },
    },

    renderChildren: {
      control: 'boolean',
      description:
        'Renderiza listas anidadas.',
      table: {
        category: 'Atributos',
      },
    },

    externalSelection: {
      control: 'boolean',
      description:
        'La selección es gestionada externamente.',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      description:
        'Nombre accesible del contenedor.',
      table: {
        category: 'Atributos',
      },
    },

    itemSelected: {
      action: 'itemSelected',
      description:
        'Emitido al seleccionar un elemento.',
      table: {
        category: 'Eventos',
      },
    },

    itemDeselected: {
      action: 'itemDeselected',
      description:
        'Emitido al deseleccionar un elemento.',
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
    items:
      LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
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
  args: {
    items: SELECTABLE_LIST_ITEMS,
    selectable: true,
  },
};

export const MultiSelectable: Story = {
  args: {
    items: MULTI_SELECT_LIST_ITEMS,
    selectable: true,
    multiSelect: true,
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
  args: {
    items: SELECTABLE_LIST_ITEMS,
    selectable: true,
    externalSelection: true,
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
            gap:12px;
            padding:12px 16px;
          "
        >
          <span
            style="font-weight:600;"
          >
            ${item.text}
          </span>

          <span
            style="
              font-size:11px;
              color:#64748b;
            "
          >
            ${item.description}
          </span>

          ${selected
            ? html`
                <span
                  style="
                    margin-left:auto;
                    color:#0369a1;
                    font-weight:700;
                  "
                >
                  ✓
                </span>
              `
            : ''}
        </div>
      `}
    >
    </dcx-web-list>
  `,
};
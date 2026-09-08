import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../dcx-web-components/dcx-web-picklist/dcx-web-picklist.component';

import {
  PICKLIST_AVAILABLE_COURSES,
  PICKLIST_SELECTED_COURSES,
} from '../../core/fixtures/picklist';

import type { DcxPickListItem } from '../../core/interfaces/picklist';

const setListState = (event: Event, side: 'source' | 'target') => {
  const element = event.currentTarget as HTMLElement & {
    source?: DcxPickListItem[];
    target?: DcxPickListItem[];
  };

  const detail = (event as CustomEvent<DcxPickListItem[]>).detail ?? [];

  if (side === 'source') {
    element.source = [...detail];
    return;
  }

  element.target = [...detail];
};

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/PickList',
  component: 'dcx-web-picklist',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    source: {
      control: 'object',
      description: 'Elementos disponibles del panel origen.',
      table: { category: 'Atributos', type: { summary: 'DcxPickListItem[]' } },
    },
    target: {
      control: 'object',
      description: 'Elementos del panel destino.',
      table: { category: 'Atributos', type: { summary: 'DcxPickListItem[]' } },
    },
    sourceHeader: {
      control: 'text',
      description: 'Título del panel origen.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Disponibles' },
      },
    },
    targetHeader: {
      control: 'text',
      description: 'Título del panel destino.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Seleccionados' },
      },
    },
    filterBy: {
      control: 'text',
      description: 'Campo o campos separados por coma para filtrar.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    showSourceFilter: {
      control: 'boolean',
      description: 'Muestra el buscador del panel origen.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTargetFilter: {
      control: 'boolean',
      description: 'Muestra el buscador del panel destino.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    sourceFilterPlaceholder: {
      control: 'text',
      description: 'Placeholder del buscador origen.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Filtrar disponibles' },
      },
    },
    targetFilterPlaceholder: {
      control: 'text',
      description: 'Placeholder del buscador destino.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Filtrar seleccionados' },
      },
    },
    scrollHeight: {
      control: 'text',
      description: 'Altura máxima de cada lista antes de hacer scroll.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '14rem' },
      },
    },
    dragdrop: {
      control: 'boolean',
      description:
        'Activa reordenación y transferencia por arrastrar y soltar.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    responsive: {
      control: 'boolean',
      description: 'Apila los paneles en pantallas estrechas.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desactiva toda la interacción.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showSourceControls: {
      control: 'boolean',
      description: 'Muestra los controles de reordenar del panel origen.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showTargetControls: {
      control: 'boolean',
      description: 'Muestra los controles de reordenar del panel destino.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    keepSelection: {
      control: 'boolean',
      description: 'Mantiene la selección tras transferir elementos.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    itemTemplate: {
      control: false,
      description: 'Plantilla personalizada para renderizar cada ítem.',
      table: {
        category: 'Atributos',
        type: { summary: '(context) => TemplateResult' },
      },
    },
    sourceChange: {
      action: 'sourceChange',
      description: 'Se emite cuando cambia el panel origen.',
      table: {
        category: 'Eventos',
        type: { summary: '(items: DcxPickListItem[]) => void' },
      },
    },
    targetChange: {
      action: 'targetChange',
      description: 'Se emite cuando cambia el panel destino.',
      table: {
        category: 'Eventos',
        type: { summary: '(items: DcxPickListItem[]) => void' },
      },
    },
    sourceSelect: {
      action: 'sourceSelect',
      description: 'Se emite al cambiar la selección del panel origen.',
      table: {
        category: 'Eventos',
        type: { summary: '(event: DcxPickListSelectionEvent) => void' },
      },
    },
    targetSelect: {
      action: 'targetSelect',
      description: 'Se emite al cambiar la selección del panel destino.',
      table: {
        category: 'Eventos',
        type: { summary: '(event: DcxPickListSelectionEvent) => void' },
      },
    },
    sourceFilter: {
      action: 'sourceFilter',
      description: 'Se emite al filtrar el panel origen.',
      table: {
        category: 'Eventos',
        type: { summary: '(event: DcxPickListFilterEvent) => void' },
      },
    },
    targetFilter: {
      action: 'targetFilter',
      description: 'Se emite al filtrar el panel destino.',
      table: {
        category: 'Eventos',
        type: { summary: '(event: DcxPickListFilterEvent) => void' },
      },
    },
  },

  args: {
    source: PICKLIST_AVAILABLE_COURSES.slice(0, 4),
    target: PICKLIST_SELECTED_COURSES.slice(0, 1),
    sourceHeader: 'Disponibles',
    targetHeader: 'Seleccionados',
    filterBy: '',
    showSourceFilter: false,
    showTargetFilter: false,
    sourceFilterPlaceholder: 'Filtrar disponibles',
    targetFilterPlaceholder: 'Filtrar seleccionados',
    scrollHeight: '14rem',
    dragdrop: false,
    responsive: true,
    disabled: false,
    showSourceControls: true,
    showTargetControls: true,
    keepSelection: false,
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => html`
    <dcx-web-picklist
      sourceHeader=${args.sourceHeader}
      targetHeader=${args.targetHeader}
      .source=${args.source}
      .target=${args.target}
      .filterBy=${args.filterBy}
      .showSourceFilter=${args.showSourceFilter}
      .showTargetFilter=${args.showTargetFilter}
      .sourceFilterPlaceholder=${args.sourceFilterPlaceholder}
      .targetFilterPlaceholder=${args.targetFilterPlaceholder}
      scrollHeight=${args.scrollHeight}
      .dragdrop=${args.dragdrop}
      .responsive=${args.responsive}
      .disabled=${args.disabled}
      .showSourceControls=${args.showSourceControls}
      .showTargetControls=${args.showTargetControls}
      .keepSelection=${args.keepSelection}
      @sourceChange=${(event: Event) => setListState(event, 'source')}
      @targetChange=${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  `,
};

export const Filter: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    sourceHeader: 'Cursos disponibles',
    targetHeader: 'Plan formativo',
    filterBy: 'label,description,category',
    showSourceFilter: true,
    showTargetFilter: true,
    sourceFilterPlaceholder: 'Buscar cursos',
    targetFilterPlaceholder: 'Buscar seleccionados',
    dragdrop: true,
    scrollHeight: '20rem',
  },
  render: args => html`
    <dcx-web-picklist
      sourceHeader=${args.sourceHeader}
      targetHeader=${args.targetHeader}
      .source=${args.source}
      .target=${args.target}
      .filterBy=${args.filterBy}
      .showSourceFilter=${args.showSourceFilter}
      .showTargetFilter=${args.showTargetFilter}
      .sourceFilterPlaceholder=${args.sourceFilterPlaceholder}
      .targetFilterPlaceholder=${args.targetFilterPlaceholder}
      scrollHeight=${args.scrollHeight}
      .dragdrop=${args.dragdrop}
      .responsive=${args.responsive}
      .disabled=${args.disabled}
      .showSourceControls=${args.showSourceControls}
      .showTargetControls=${args.showTargetControls}
      @sourceChange=${(event: Event) => setListState(event, 'source')}
      @targetChange=${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  `,
};

export const CustomTemplate: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    sourceHeader: 'Cursos disponibles',
    targetHeader: 'Plan formativo',
    filterBy: 'label,description,category',
    dragdrop: true,
    scrollHeight: '20rem',
  },
  render: args => html`
    <dcx-web-picklist
      sourceHeader=${args.sourceHeader}
      targetHeader=${args.targetHeader}
      .source=${args.source}
      .target=${args.target}
      .filterBy=${args.filterBy}
      scrollHeight=${args.scrollHeight}
      .dragdrop=${args.dragdrop}
      .itemTemplate=${({
        item,
        selected,
      }: {
        item: DcxPickListItem;
        selected: boolean;
      }) => html`
        <div
          style="display:grid; grid-template-columns: 2.5rem minmax(0, 1fr) auto; align-items:center; gap:0.75rem; width:100%; min-width:0; box-sizing:border-box; padding:0.5rem 0.75rem; border-radius:var(--r-md,6px); ${selected ? 'background: rgba(0, 88, 171, 0.04);' : 'background: transparent;'}"
        >
          <span
            style="display:inline-flex; align-items:center; justify-content:center; width:2.25rem; height:2.25rem; border-radius:var(--r-md,6px); background: var(--color-info-bg, #eff6ff); color: var(--bg-primary, #0058ab); font-weight:var(--fw-bold, 700); flex-shrink:0;"
          >
            ${String(item.label ?? '')
              .charAt(0)
              .toUpperCase()}
          </span>
          <span style="display:flex; min-width:0; flex-direction:column; overflow:hidden;">
            <strong style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-dark, #2a2e33);">${item.label}</strong>
            <small style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-muted, #696e75);">${item.description ?? ''}</small>
          </span>
          ${selected ? html`<span style="display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; white-space:nowrap; padding:0.125rem 0.5rem; border-radius:999px; background:rgba(34, 197, 94, 0.12); color:var(--color-success, #16a34a); font-size: var(--fs-xs, 11px); font-weight: var(--fw-bold, 700); line-height:1.2;">Incluido</span>` : null}
        </div>
      `}
      @sourceChange=${(event: Event) => setListState(event, 'source')}
      @targetChange=${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  `,
};

export const Disabled: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES.slice(0, 4),
    target: PICKLIST_SELECTED_COURSES.slice(0, 1),
    disabled: true,
  },
  render: args => html`
    <dcx-web-picklist
      sourceHeader=${args.sourceHeader}
      targetHeader=${args.targetHeader}
      .source=${args.source}
      .target=${args.target}
      .disabled=${args.disabled}
      @sourceChange=${(event: Event) => setListState(event, 'source')}
      @targetChange=${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  `,
};

export const ItemDisabled: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES.map((item, index) => ({
      ...item,
      disabled: index === 1,
    })),
    target: PICKLIST_SELECTED_COURSES,
  },
  render: args => html`
    <dcx-web-picklist
      sourceHeader=${args.sourceHeader}
      targetHeader=${args.targetHeader}
      .source=${args.source}
      .target=${args.target}
      .showControls=${args.showSourceControls}
      @sourceChange=${(event: Event) => setListState(event, 'source')}
      @targetChange=${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  `,
};

export const WithoutControls: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    showSourceControls: false,
    showTargetControls: false,
    dragdrop: true,
  },
  render: args => html`
    <dcx-web-picklist
      sourceHeader=${args.sourceHeader}
      targetHeader=${args.targetHeader}
      .source=${args.source}
      .target=${args.target}
      .showSourceControls=${args.showSourceControls}
      .showTargetControls=${args.showTargetControls}
      .dragdrop=${args.dragdrop}
      @sourceChange=${(event: Event) => setListState(event, 'source')}
      @targetChange=${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  `,
};

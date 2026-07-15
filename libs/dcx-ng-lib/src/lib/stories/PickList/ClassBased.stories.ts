import { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgPickListComponent,
  DcxPickListItem,
  PICKLIST_AVAILABLE_COURSES,
  PICKLIST_SELECTED_COURSES,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgPickListComponent> = {
  title: 'DCXLibrary/Components/PickList',
  component: DcxNgPickListComponent,
  tags: ['autodocs'],
  argTypes: {
    source: {
      name: 'source',
      control: { type: 'object' },
      description: 'Elementos disponibles de la lista origen.',
      table: { category: 'Atributos', type: { summary: 'DcxPickListItem[]' }, defaultValue: { summary: '[]' } },
    },
    target: {
      name: 'target',
      control: { type: 'object' },
      description: 'Elementos de la lista destino.',
      table: { category: 'Atributos', type: { summary: 'DcxPickListItem[]' }, defaultValue: { summary: '[]' } },
    },
    sourceHeader: {
      name: 'sourceHeader',
      control: { type: 'text' },
      description: 'Título del panel origen.',
      table: { category: 'Atributos', type: { summary: 'string' }, defaultValue: { summary: 'Disponibles' } },
    },
    targetHeader: {
      name: 'targetHeader',
      control: { type: 'text' },
      description: 'Título del panel destino.',
      table: { category: 'Atributos', type: { summary: 'string' }, defaultValue: { summary: 'Seleccionados' } },
    },
    filterBy: {
      name: 'filterBy',
      control: { type: 'text' },
      description: 'Campo o campos separados por coma para filtrar.',
      table: { category: 'Atributos', type: { summary: 'string' }, defaultValue: { summary: "''" } },
    },
    showSourceFilter: {
      name: 'showSourceFilter',
      control: { type: 'boolean' },
      description: 'Muestra el buscador del panel origen.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showTargetFilter: {
      name: 'showTargetFilter',
      control: { type: 'boolean' },
      description: 'Muestra el buscador del panel destino.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    sourceFilterPlaceholder: {
      name: 'sourceFilterPlaceholder',
      control: { type: 'text' },
      description: 'Placeholder del buscador origen.',
      table: { category: 'Atributos', type: { summary: 'string' }, defaultValue: { summary: 'Filtrar disponibles' } },
    },
    targetFilterPlaceholder: {
      name: 'targetFilterPlaceholder',
      control: { type: 'text' },
      description: 'Placeholder del buscador destino.',
      table: { category: 'Atributos', type: { summary: 'string' }, defaultValue: { summary: 'Filtrar seleccionados' } },
    },
    scrollHeight: {
      name: 'scrollHeight',
      control: { type: 'text' },
      description: 'Altura máxima de cada lista antes de hacer scroll.',
      table: { category: 'Atributos', type: { summary: 'string' }, defaultValue: { summary: '14rem' } },
    },
    dragdrop: {
      name: 'dragdrop',
      control: { type: 'boolean' },
      description: 'Activa reordenación y transferencia por arrastrar y soltar.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    responsive: {
      name: 'responsive',
      control: { type: 'boolean' },
      description: 'Apila los paneles en pantallas estrechas.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    disabled: {
      name: 'disabled',
      control: { type: 'boolean' },
      description: 'Desactiva toda la interacción del componente.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showSourceControls: {
      name: 'showSourceControls',
      control: { type: 'boolean' },
      description: 'Muestra los controles de reordenar del panel origen.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    showTargetControls: {
      name: 'showTargetControls',
      control: { type: 'boolean' },
      description: 'Muestra los controles de reordenar del panel destino.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    keepSelection: {
      name: 'keepSelection',
      control: { type: 'boolean' },
      description: 'Mantiene la selección tras transferir elementos.',
      table: { category: 'Atributos', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    sourceChange: {
      name: 'sourceChange',
      action: 'sourceChange',
      description: 'Se emite cuando cambian los elementos del panel origen.',
      table: { category: 'Eventos', type: { summary: '(items: DcxPickListItem[]) => void' } },
    },
    targetChange: {
      name: 'targetChange',
      action: 'targetChange',
      description: 'Se emite cuando cambian los elementos del panel destino.',
      table: { category: 'Eventos', type: { summary: '(items: DcxPickListItem[]) => void' } },
    },
    moveToTarget: {
      name: 'moveToTarget',
      action: 'moveToTarget',
      description: 'Se emite al mover los seleccionados a destino.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListMoveEvent) => void' } },
    },
    moveAllToTarget: {
      name: 'moveAllToTarget',
      action: 'moveAllToTarget',
      description: 'Se emite al mover todos los elementos a destino.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListMoveEvent) => void' } },
    },
    moveToSource: {
      name: 'moveToSource',
      action: 'moveToSource',
      description: 'Se emite al mover los seleccionados a origen.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListMoveEvent) => void' } },
    },
    moveAllToSource: {
      name: 'moveAllToSource',
      action: 'moveAllToSource',
      description: 'Se emite al mover todos los elementos a origen.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListMoveEvent) => void' } },
    },
    sourceReorder: {
      name: 'sourceReorder',
      action: 'sourceReorder',
      description: 'Se emite al reordenar el panel origen.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListReorderEvent) => void' } },
    },
    targetReorder: {
      name: 'targetReorder',
      action: 'targetReorder',
      description: 'Se emite al reordenar el panel destino.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListReorderEvent) => void' } },
    },
    sourceSelect: {
      name: 'sourceSelect',
      action: 'sourceSelect',
      description: 'Se emite al cambiar la selección del panel origen.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListSelectionEvent) => void' } },
    },
    targetSelect: {
      name: 'targetSelect',
      action: 'targetSelect',
      description: 'Se emite al cambiar la selección del panel destino.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListSelectionEvent) => void' } },
    },
    sourceFilter: {
      name: 'sourceFilter',
      action: 'sourceFilter',
      description: 'Se emite al filtrar el panel origen.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListFilterEvent) => void' } },
    },
    targetFilter: {
      name: 'targetFilter',
      action: 'targetFilter',
      description: 'Se emite al filtrar el panel destino.',
      table: { category: 'Eventos', type: { summary: '(e: DcxPickListFilterEvent) => void' } },
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
    dragdrop: false,
    scrollHeight: '14rem',
  },
};

export default meta;
type Story = StoryObj<DcxNgPickListComponent>;

export const Default: Story = {
  render: args => ({
    props: {
      ...args,
      sourceValue: [...(args.source as DcxPickListItem[])],
      targetValue: [...(args.target as DcxPickListItem[])],
      updateSource(items: DcxPickListItem[]) {
        this['sourceValue'] = items;
        this['sourceChange'](items);
      },
      updateTarget(items: DcxPickListItem[]) {
        this['targetValue'] = items;
        this['targetChange'](items);
      },
    },
    template: `
      <div style="max-width: 1180px;">
        <dcx-ng-picklist
          [source]="sourceValue"
          [target]="targetValue"
          [sourceHeader]="sourceHeader"
          [targetHeader]="targetHeader"
          [filterBy]="filterBy"
          [showSourceFilter]="showSourceFilter"
          [showTargetFilter]="showTargetFilter"
          [sourceFilterPlaceholder]="sourceFilterPlaceholder"
          [targetFilterPlaceholder]="targetFilterPlaceholder"
          [scrollHeight]="scrollHeight"
          [dragdrop]="dragdrop"
          [disabled]="disabled"
          (sourceChange)="updateSource($event)"
          (targetChange)="updateTarget($event)"
          (moveToTarget)="moveToTarget($event)"
          (moveToSource)="moveToSource($event)">
        </dcx-ng-picklist>
      </div>
    `,
  }),
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
  render: args => ({
    props: {
      ...args,
      sourceValue: [...(args.source as DcxPickListItem[])],
      targetValue: [...(args.target as DcxPickListItem[])],
      updateSource(items: DcxPickListItem[]) {
        this['sourceValue'] = items;
      },
      updateTarget(items: DcxPickListItem[]) {
        this['targetValue'] = items;
      },
    },
    template: `
      <div style="max-width: 1180px;">
        <dcx-ng-picklist
          [source]="sourceValue"
          [target]="targetValue"
          [sourceHeader]="sourceHeader"
          [targetHeader]="targetHeader"
          [filterBy]="filterBy"
          [showSourceFilter]="showSourceFilter"
          [showTargetFilter]="showTargetFilter"
          [sourceFilterPlaceholder]="sourceFilterPlaceholder"
          [targetFilterPlaceholder]="targetFilterPlaceholder"
          [scrollHeight]="scrollHeight"
          [dragdrop]="dragdrop"
          (sourceChange)="updateSource($event)"
          (targetChange)="updateTarget($event)">
        </dcx-ng-picklist>
      </div>
    `,
  }),
};

export const CustomTemplate: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    sourceHeader: 'Cursos disponibles',
    targetHeader: 'Plan formativo',
    filterBy: 'label,description,category',
    showSourceFilter: false,
    showTargetFilter: false,
    dragdrop: true,
    scrollHeight: '20rem',
  },
  render: args => ({
    props: {
      ...args,
      sourceValue: [...(args.source as DcxPickListItem[])],
      targetValue: [...(args.target as DcxPickListItem[])],
      updateSource(items: DcxPickListItem[]) {
        this['sourceValue'] = items;
      },
      updateTarget(items: DcxPickListItem[]) {
        this['targetValue'] = items;
      },
    },
    template: `
      <div style="max-width: 1180px;">
        <dcx-ng-picklist
          [source]="sourceValue"
          [target]="targetValue"
          [sourceHeader]="sourceHeader"
          [targetHeader]="targetHeader"
          [filterBy]="filterBy"
          [showSourceFilter]="true"
          [showTargetFilter]="true"
          [dragdrop]="dragdrop"
          [scrollHeight]="scrollHeight"
          (sourceChange)="updateSource($event)"
          (targetChange)="updateTarget($event)">
          <ng-template #item let-item let-selected="selected">
            <div style="display:flex; align-items:center; gap:var(--sp-3, 12px); width:100%; padding:var(--sp-2, 8px) var(--sp-3, 12px);">
              <span style="display:inline-flex; width:var(--sp-8, 32px); height:var(--sp-8, 32px); align-items:center; justify-content:center; border-radius:var(--r-md, 6px); background:var(--color-info-bg, #eff6ff); color:var(--bg-primary, #0058ab); font-weight:var(--fw-bold, 700);">
                {{ item.label.charAt(0) }}
              </span>
              <span style="display:flex; flex-direction:column; min-width:0; flex:1;">
                <strong style="font-size:var(--fs-sm, 12px);">{{ item.label }}</strong>
                <small style="color:var(--text-muted, #696e75);">{{ item.description }}</small>
              </span>
              @if (selected) {
                <span style="font-size:var(--fs-xs, 11px); font-weight:var(--fw-bold, 700); color:var(--bg-primary, #0058ab);">Activo</span>
              }
            </div>
          </ng-template>
        </dcx-ng-picklist>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    source: PICKLIST_AVAILABLE_COURSES,
  },
};

export const ItemDisabled: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES.map((item, index) => ({
      ...item,
      disabled: index === 1,
    })),
    target: PICKLIST_SELECTED_COURSES,
  },
};

export const WithoutControls: Story = {
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    showSourceControls: false,
    showTargetControls: false,
    dragdrop: true,
  },
  render: args => ({
    props: {
      ...args,
      sourceValue: [...(args.source as DcxPickListItem[])],
      targetValue: [...(args.target as DcxPickListItem[])],
      updateSource(items: DcxPickListItem[]) {
        this['sourceValue'] = items;
      },
      updateTarget(items: DcxPickListItem[]) {
        this['targetValue'] = items;
      },
    },
    template: `
      <div style="max-width: 1180px;">
        <dcx-ng-picklist
          [source]="sourceValue"
          [target]="targetValue"
          [sourceHeader]="sourceHeader"
          [targetHeader]="targetHeader"
          [showSourceControls]="showSourceControls"
          [showTargetControls]="showTargetControls"
          [dragdrop]="dragdrop"
          (sourceChange)="updateSource($event)"
          (targetChange)="updateTarget($event)">
        </dcx-ng-picklist>
      </div>
    `,
  }),
};

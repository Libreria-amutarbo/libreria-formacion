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
      control: { type: 'object' },
      description: 'Elementos disponibles de la lista origen',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxPickListItem[]' },
      },
    },
    target: {
      control: { type: 'object' },
      description: 'Elementos de la lista destino',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxPickListItem[]' },
      },
    },
    filterBy: {
      control: { type: 'text' },
      description: 'Campo o campos separados por coma para filtrar',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
      },
    },
    dragdrop: {
      control: { type: 'boolean' },
      description: 'Activa reordenacion y transferencia por drag/drop',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    sourceChange: {
      action: 'sourceChange',
      table: { category: 'Eventos' },
    },
    targetChange: {
      action: 'targetChange',
      table: { category: 'Eventos' },
    },
    moveToTarget: {
      action: 'moveToTarget',
      table: { category: 'Eventos' },
    },
    moveToSource: {
      action: 'moveToSource',
      table: { category: 'Eventos' },
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

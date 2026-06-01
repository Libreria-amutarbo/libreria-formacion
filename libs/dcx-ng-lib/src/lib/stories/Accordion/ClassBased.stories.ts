import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  DcxNgAccordionComponent,
  DcxNgAccordionItem,
  DcxNgButtonComponent,
  DcxNgListComponent,
  DcxNgInputComponent,
  DcxInputType,
  DcxAccordionTransitionList,
  DcxAccordionVariantList,
  DcxAccordionDefault,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsDisabled,
  DcxAccordionLargeContent,
  DcxAccordionItemsContentDisabled,
  DcxAccordionItemsWithDescription,
  LIST_ITEMS_MOCK,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgAccordionComponent> = {
  title: 'DCXLibrary/Components/Accordion',
  component: DcxNgAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DcxNgAccordionComponent,
        DcxNgButtonComponent,
        DcxNgListComponent,
        DcxNgInputComponent,
      ],
    }),
  ],
  tags: ['autodocs'],

  argTypes: {
    items: {
      name: 'items',
      control: { type: 'object' },
      description:
        'Lista de items del acordeón. Cada item define al menos un `id` y un `title`; el resto de propiedades son opcionales.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxNgAccordionItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    transition: {
      name: 'transition',
      control: { type: 'select' },
      options: DcxAccordionTransitionList,
      description: 'Velocidad de la animación al expandir o colapsar los paneles.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxAccordionTransition' },
        defaultValue: { summary: 'smooth' },
      },
    },
    closeOthers: {
      name: 'closeOthers',
      control: { type: 'boolean' },
      description:
        'Si es `true`, abrir un panel cierra automáticamente el resto (modo acordeón estándar).',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    expandedIds: {
      name: 'expandedIds',
      control: { type: 'object' },
      description:
        'Array de IDs de los items que deben estar abiertos al inicializar el componente. Si se deja vacío, se usa la propiedad `expanded` de cada item.',
      table: {
        category: 'Atributos',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    variant: {
      name: 'variant',
      control: { type: 'select' },
      options: DcxAccordionVariantList,
      description:
        'Variante visual. `default` muestra un card con borde y esquinas redondeadas. `flush` elimina el borde exterior y el border-radius para incrustar el acordeón dentro de otro contenedor.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxAccordionVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      control: { type: 'text' },
      description:
        'Etiqueta accesible para el elemento raíz del acordeón. Usar cuando haya varios acordeones en la misma página para que los lectores de pantalla puedan distinguirlos.',
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    itemToggled: {
      name: 'itemToggled',
      action: 'itemToggled',
      description: 'Se emite cada vez que un item cambia de estado (se abre o se cierra).',
      table: {
        category: 'Eventos',
        type: { summary: '(item: DcxNgAccordionItem) => void' },
      },
    },
    itemExpanded: {
      name: 'itemExpanded',
      action: 'itemExpanded',
      description: 'Se emite cuando un item se expande.',
      table: {
        category: 'Eventos',
        type: { summary: '(item: DcxNgAccordionItem) => void' },
      },
    },
    itemCollapsed: {
      name: 'itemCollapsed',
      action: 'itemCollapsed',
      description: 'Se emite cuando un item se colapsa.',
      table: {
        category: 'Eventos',
        type: { summary: '(item: DcxNgAccordionItem) => void' },
      },
    },
    expandAll: {
      name: 'expandAll()',
      description:
        'Expande todos los items no deshabilitados de golpe. Funciona independientemente del valor de `closeOthers`.',
      control: false,
      table: {
        category: 'Métodos',
        type: { summary: '() => void' },
      },
    },
    collapseAll: {
      name: 'collapseAll()',
      description: 'Colapsa todos los items actualmente abiertos.',
      control: false,
      table: {
        category: 'Métodos',
        type: { summary: '() => void' },
      },
    },
    expandItemById: {
      name: 'expandItemById(id)',
      description: 'Expande programáticamente el item con el ID indicado.',
      control: false,
      table: {
        category: 'Métodos',
        type: { summary: '(id: string) => void' },
      },
    },
    collapseItemById: {
      name: 'collapseItemById(id)',
      description: 'Colapsa programáticamente el item con el ID indicado.',
      control: false,
      table: {
        category: 'Métodos',
        type: { summary: '(id: string) => void' },
      },
    },
    isExpanded: {
      name: 'isExpanded(id)',
      description: 'Devuelve `true` si el item con el ID indicado está actualmente expandido.',
      control: false,
      table: {
        category: 'Métodos',
        type: { summary: '(id: string) => boolean' },
      },
    },
  },
  args: {
    items: DcxAccordionDefault,
    transition: 'smooth',
    closeOthers: true,
    expandedIds: [],
  },
};

export default meta;
type Story = StoryObj<DcxNgAccordionComponent>;

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
  render: args => ({
    props: {
      ...args,
      buttonTemplate: null as any,
      formTemplate: null as any,
      listTemplate: null as any,
      listItems: [...LIST_ITEMS_MOCK],
      DcxInputType: DcxInputType,
      addItem() {
        const currentItems = this['listItems'] as string[];
        const newItemNumber = currentItems.length + 1;
        this['listItems'] = [...currentItems, `Item ${newItemNumber}`];
      },
      removeLastItem() {
        const currentItems = this['listItems'] as string[];
        if (currentItems.length > 0) {
          this['listItems'] = currentItems.slice(0, -1);
        }
      },
    },
    template: `
      <ng-template #buttonTemplate>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; padding: 8px 0;">
          <dcx-ng-button
            [label]="'Primary Action'"
            [variant]="'primary'"
            [size]="'m'">
          </dcx-ng-button>
          <dcx-ng-button
            [label]="'Secondary Action'"
            [variant]="'secondary'"
            [size]="'m'">
          </dcx-ng-button>
          <dcx-ng-button
            [label]="'Outline Action'"
            [variant]="'outline'"
            [size]="'m'">
          </dcx-ng-button>
        </div>
      </ng-template>

      <ng-template #formTemplate>
        <div style="display: flex; flex-direction: column; gap: 12px; padding: 8px 0;">
          <dcx-ng-input
            [label]="'Name'"
            [placeholder]="'Enter your name...'"
            [type]="DcxInputType.TEXT"
            [size]="'m'"
            [required]="true">
          </dcx-ng-input>
          
          <dcx-ng-input
            [label]="'Email'"
            [placeholder]="'Enter your email...'"
            [type]="DcxInputType.EMAIL"
            [size]="'m'"
            [required]="true">
          </dcx-ng-input>
          
          <dcx-ng-button
            [label]="'Submit'"
            [variant]="'primary'"
            [size]="'m'">
          </dcx-ng-button>
        </div>
      </ng-template>

      <ng-template #listTemplate>
        <div style="padding: 8px 0;">
          <dcx-ng-list [items]="listItems"></dcx-ng-list>
          
          <div style="margin-top: 12px; display: flex; gap: 8px;">
            <dcx-ng-button
              [label]="'Add Item'"
              [variant]="'primary'"
              [size]="'s'"
              (buttonClick)="addItem()">
            </dcx-ng-button>
            <dcx-ng-button
              [label]="'Remove Last'"
              [variant]="'secondary'"
              [size]="'s'"
              (buttonClick)="removeLastItem()">
            </dcx-ng-button>
          </div>
        </div>
      </ng-template>

      <dcx-ng-accordion
        [items]="[
          {
            id: '1',
            title: 'Interactive Buttons',
            icon: 'hand-pointer',
            contentTemplate: buttonTemplate
          },
          {
            id: '2',
            title: 'Form Components',
            icon: 'file-text',
            contentTemplate: formTemplate
          },
          {
            id: '3',
            title: 'Dynamic List',
            icon: 'list',
            contentTemplate: listTemplate
          }
        ]"
        [transition]="'smooth'"
        [closeOthers]="true">
      </dcx-ng-accordion>
    `,
  }),
};

export const ExternalControl: Story = {
  render: args => ({
    props: {
      ...args,
      // Mirror of the accordion's expanded state for button labels.
      // Updated via (itemToggled) so it stays in sync even when headers
      // are clicked directly inside the accordion.
      expandedMap: {} as Record<string, boolean>,
      onItemToggled(item: DcxNgAccordionItem) {
        const wasOpen = !!this['expandedMap'][item.id];
        // When closeOthers=true opening one item closes the rest.
        // Rebuild the map from scratch: clear all, then toggle this one.
        const next: Record<string, boolean> = {};
        next[item.id] = !wasOpen;
        this['expandedMap'] = next;
      },
      isExp(id: string): boolean {
        return !!this['expandedMap'][id];
      },
      toggle(acc: DcxNgAccordionComponent, id: string): void {
        if (this['isExp'](id)) {
          acc.collapseItemById(id);
        } else {
          acc.expandItemById(id);
        }
      },
    },
    template: `
      <p style="font-size:13px;color:#696e75;margin-bottom:12px">
        Los botones controlan el acordeón desde fuera mediante referencias de plantilla.
        Abre un panel haciendo clic en el botón <strong>o</strong> directamente en la cabecera.
      </p>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
        @for (item of items; track item.id) {
          @if (!item.disabled) {
            <dcx-ng-button
              [label]="isExp(item.id) ? 'Cerrar: ' + item.title : 'Abrir: ' + item.title"
              [variant]="isExp(item.id) ? 'primary' : 'secondary'"
              (buttonClick)="toggle(acc, item.id)">
            </dcx-ng-button>
          }
        }
      </div>

      <dcx-ng-accordion
        #acc
        [items]="items"
        [transition]="'smooth'"
        (itemToggled)="onItemToggled($event)">
      </dcx-ng-accordion>
    `,
  }),
  args: {
    items: DcxAccordionDefault,
  },
};

export const ExpandCollapseAll: Story = {
  render: args => ({
    props: {
      ...args,
      updateState(acc: DcxNgAccordionComponent) {
        // no-op — just ensures (itemToggled) triggers CD so button labels update
        void acc;
      },
    },
    template: `
      <p style="font-size:13px;color:#696e75;margin-bottom:12px">
        Usa los botones para expandir o colapsar todos los paneles de golpe.
        Funciona independientemente de <code>closeOthers</code>.
      </p>

      <div style="display:flex; gap:8px; margin-bottom:16px;">
        <dcx-ng-button
          label="Expandir todo"
          variant="primary"
          (buttonClick)="acc.expandAll(); updateState(acc)">
        </dcx-ng-button>
        <dcx-ng-button
          label="Colapsar todo"
          variant="secondary"
          (buttonClick)="acc.collapseAll(); updateState(acc)">
        </dcx-ng-button>
      </div>

      <dcx-ng-accordion
        #acc
        [items]="items"
        [closeOthers]="false"
        (itemToggled)="updateState(acc)">
      </dcx-ng-accordion>
    `,
  }),
  args: {
    items: DcxAccordionDefault,
    closeOthers: false,
  },
};

export const Flush: Story = {
  args: {
    items: DcxAccordionItemsWithIcon,
    variant: 'flush',
  },
};

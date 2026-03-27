import {
  DcxListItem,
  DcxNgChipComponent,
  DcxNgListComponent,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_SUBLISTS,
  MULTI_SELECT_LIST_ITEMS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';
import {
  Meta,
  StoryObj,
  moduleMetadata,
  componentWrapperDecorator,
} from '@storybook/angular';

const meta: Meta<DcxNgListComponent> = {
  title: 'DCXLibrary/Components/List',
  component: DcxNgListComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**\`dcx-ng-list\`** es un componente flexible para renderizar listas de elementos a partir de un array de objetos \`DcxListItem\`.

Cada ítem puede contener texto, descripción, icono, elementos hijos (sublistas), dividers y estado deshabilitado.

### Inputs
| Input | Tipo | Por defecto | Descripción |
|---|---|---|---|
| \`items\` | \`DcxListItem[]\` | — | Array de elementos a renderizar |
| \`selectable\` | \`boolean\` | \`false\` | Activa la selección de ítems |
| \`multiSelect\` | \`boolean\` | \`false\` | Permite selección múltiple (requiere \`selectable\`) |
| \`showChildrenIndicator\` | \`boolean\` | \`false\` | Muestra un indicador visual en ítems que contienen sublistas |
| \`renderChildren\` | \`boolean\` | \`true\` | Renderiza los ítems hijos anidados bajo su ítem padre |

### Outputs
| Output | Payload | Descripción |
|---|---|---|
| \`itemSelected\` | \`{ item, index }\` | Emitido al seleccionar un ítem |
| \`itemDeselected\` | \`{ item, index }\` | Emitido al deseleccionar un ítem |
| \`selectionChanged\` | \`{ item, index }[]\` | Emitido en cualquier cambio de selección (simple o múltiple) con el array actualizado de ítems seleccionados |
        `,
      },
    },
  },
  argTypes: {
    items: { control: { type: 'object' } },
    selectable: { control: 'boolean' },
    multiSelect: { control: 'boolean' },
    showChildrenIndicator: { control: 'boolean' },
    renderChildren: { control: 'boolean' },
  },
  args: {
    items: SIMPLE_LIST_ITEMS,
    selectable: false,
    multiSelect: false,
    showChildrenIndicator: false,
    renderChildren: true,
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgChipComponent],
    }),
    componentWrapperDecorator(
      story => `
        <style>
          .story-wrapper {
            display: flex;
            flex-direction: column;
            gap: 20px;
            font-family: 'Inter', sans-serif;
          }
        </style>
        <div class="story-wrapper">${story}</div>
      `,
    ),
  ],
};

export default meta;
type Story = StoryObj<DcxNgListComponent>;

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Lista básica sin iconos ni interacción. Útil para mostrar colecciones de texto plano. Acepta los controles `selectable` y `multiSelect` del panel de Storybook para explorar comportamientos en vivo.',
      },
    },
  },
  render: args => ({
    props: args,
    template: `
        <h3>Lista simple sin iconos</h3>
        <dcx-ng-list [items]="items" [selectable]="selectable" [multiSelect]="multiSelect"></dcx-ng-list>
        <div>
          Total items: <strong>{{ items?.length ?? 0 }}</strong>
        </div>
    `,
    styleUrls: ['story.scss'],
  }),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Lista cuyos ítems incluyen un icono a la izquierda del texto. El icono se define mediante la propiedad `icon` de `DcxListItem`, usando nombres de Material Icons.',
      },
    },
  },
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_ICONS,
    },
    template: `
      <h3>Lista con iconos</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
  `,
  }),
};

export const WithSubLists: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Lista con anidamiento de sublistas. Los ítems padre contienen una propiedad `children: DcxListItem[]` que el componente renderiza de forma anidada bajo su padre. Usa `showChildrenIndicator` para mostrar un icono indicador y `renderChildren` para controlar si los hijos se renderizan.',
      },
    },
  },
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_SUBLISTS,
    },
    template: `
      <h3>Lista con sublistas</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
    `,
  }),
};

export const Selectable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Lista en modo selección simple (`selectable: true`). Al pulsar un ítem se emite `itemSelected` con el ítem y su índice; volver a pulsarlo emite `itemDeselected`. Solo puede haber un ítem activo a la vez.',
      },
    },
  },
  render: () => ({
    props: {
      items: SELECTABLE_LIST_ITEMS,
      selectedItem: null as any,
      onItemSelected(event: any) {
        this['selectedItem'] = event;
      },
      onItemDeselected(_event: any) {
        this['selectedItem'] = null;
      },
    },
    template: `
      <h3>Lista seleccionable</h3>
      <dcx-ng-list 
        [items]="items" 
        [selectable]="true"
        (itemSelected)="onItemSelected($event)"
        (itemDeselected)="onItemDeselected($event)">
      </dcx-ng-list>
      @if (selectedItem) {
        <div>
          <strong>Seleccionado:</strong> {{ selectedItem.item.text || selectedItem.item }} (index: {{ selectedItem.index }})
        </div>
      }
    `,
  }),
};

export const MultiSelectable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Lista en modo multiselección (`selectable: true`, `multiSelect: true`). Cada vez que cambia la selección se emite `selectionChanged` con el array completo de ítems seleccionados. Los ítems activos se muestran como chips debajo de la lista.',
      },
    },
  },
  render: () => ({
    props: {
      items: MULTI_SELECT_LIST_ITEMS,
      selected: [] as { item: DcxListItem; index: number }[],
      onSelectionChanged($event: { item: DcxListItem; index: number }[]) {
        this['selected'] = $event;
      },
    },
    template: `
        <style>
          strong {margin-right: 10px;}
          .separator {margin-right: 5px;}
        </style>

        <h3>Lista con multiselección</h3>
        <dcx-ng-list
          [items]="items" 
          [selectable]="true"
          [multiSelect]="true"
          (selectionChanged)="onSelectionChanged($event)">
        </dcx-ng-list>
        @if (selected.length > 0) {
          <div class="selected">
            <strong>Seleccionados ({{ selected.length }}):</strong>
            @for (selected of selected; track selected.index) {
              <dcx-ng-chip [label]="selected.item.text" color="primary"></dcx-ng-chip>
              <span class="separator">{{$last ? '' : ','}}</span>
            }
          </div>
        }
    `,
  }),
};

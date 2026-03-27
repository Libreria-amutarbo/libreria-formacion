import {
  DcxListItem,
  DcxNgChipComponent,
  DcxNgListComponent,
  DEFAULT_LIST_ITEMS,
  LIST_ENABLED_DISABLED_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
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
**\`dcx-ng-list\`** is a flexible component for rendering lists of items from an array of \`DcxListItem\` objects.

Each item can contain text, description, icon, child elements (sublists), dividers, and disabled state.

### Inputs
| Input | Type | Default | Description |
|---|---|---|---|
| \`items\` | \`DcxListItem[]\` | — | Array of items to render |
| \`selectable\` | \`boolean\` | \`false\` | Enables item selection |
| \`multiSelect\` | \`boolean\` | \`false\` | Allows multiple selection (requires \`selectable\`) |
| \`showChildrenIndicator\` | \`boolean\` | \`false\` | Shows a visual indicator on items that contain sublists |
| \`renderChildren\` | \`boolean\` | \`true\` | Renders child items nested under their parent |

### Outputs
| Output | Payload | Description |
|---|---|---|
| \`itemSelected\` | \`{ item, index }\` | Emitted when an item is selected |
| \`itemDeselected\` | \`{ item, index }\` | Emitted when an item is deselected |
| \`selectionChanged\` | \`{ item, index }[]\` | Emitted on any selection change (single or multiple) with the updated array of selected items |
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
    items: DEFAULT_LIST_ITEMS,
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

export const Example: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example story with many of the component features.',
      },
    },
  },
  render: args => ({
    props: args,
    template: `
        <h3>Interactive Example</h3>
        <dcx-ng-list 
          [items]="items" 
          [selectable]="selectable" 
          [multiSelect]="multiSelect"
          [showChildrenIndicator]="showChildrenIndicator"
          [renderChildren]="renderChildren">
        </dcx-ng-list>
        <div>
          Total items: <strong>{{ items?.length ?? 0 }}</strong>
        </div>
    `,
    styleUrls: ['story.scss'],
  }),
};

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Simple list without icons or sublists.',
      },
    },
  },
  render: () => ({
    props: {
      items: SIMPLE_LIST_ITEMS,
    },
    template: `
      <h3>Simple List</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
      <div>
        Total items: <strong>{{ items?.length ?? 0 }}</strong>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "List whose items include an icon to the left of the text. The icon is defined via the `icon` property of `DcxListItem`, using Material Icons names.",
      },
    },
  },
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_ICONS,
    },
    template: `
      <h3>List with Icons</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
  `,
  }),
};

export const WithSubLists: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "List with nested sublists. Parent items have a `children: DcxListItem[]` property rendered as nested lists under their parent. Use `showChildrenIndicator` to display an indicator icon and `renderChildren` to control whether children are rendered.",
      },
    },
  },
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_SUBLISTS,
    },
    template: `
      <h3>List with Sublists</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
    `,
  }),
};

export const Selectable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "List in single selection mode (`selectable: true`). Clicking an item emits `itemSelected` with the item and its index; clicking it again emits `itemDeselected`. Only one item can be active at a time.",
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
      <h3>Selectable List</h3>
      <dcx-ng-list 
        [items]="items" 
        [selectable]="true"
        (itemSelected)="onItemSelected($event)"
        (itemDeselected)="onItemDeselected($event)">
      </dcx-ng-list>
      @if (selectedItem) {
        <div>
          <strong>Selected:</strong> {{ selectedItem.item.text || selectedItem.item }} (index: {{ selectedItem.index }})
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
          "List in multi-selection mode (`selectable: true`, `multiSelect: true`). Every time the selection changes, `selectionChanged` is emitted with the full array of selected items. Active items are shown as chips below the list.",
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

        <h3>Multi-Selectable List</h3>
        <dcx-ng-list
          [items]="items" 
          [selectable]="true"
          [multiSelect]="true"
          (selectionChanged)="onSelectionChanged($event)">
        </dcx-ng-list>
        @if (selected.length > 0) {
          <div class="selected">
            <strong>Selected ({{ selected.length }}):</strong>
            @for (selected of selected; track selected.index) {
              <dcx-ng-chip [label]="selected.item.text" color="primary"></dcx-ng-chip>
              <span class="separator">{{$last ? '' : ','}}</span>
            }
          </div>
        }
    `,
  }),
};

export const WithDividers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'List using `divider: true` items as visual section separators. Divider items render a thin horizontal line and are not interactive.',
      },
    },
  },
  render: () => ({
    props: {
      items: LIST_ITEMS_WITH_DIVIDER,
    },
    template: `
      <h3>List with Dividers</h3>
      <dcx-ng-list [items]="items"></dcx-ng-list>
    `,
  }),
};

export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'List showing how `disabled: true` items look and behave. Disabled items are rendered with reduced opacity and are not clickable or keyboard-focusable.',
      },
    },
  },
  render: () => ({
    props: {
      items: LIST_ENABLED_DISABLED_ITEMS,
    },
    template: `
      <h3>List with Disabled Items</h3>
      <dcx-ng-list [items]="items" [selectable]="true"></dcx-ng-list>
    `,
  }),
};

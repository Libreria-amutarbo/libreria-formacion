import { Component, signal } from '@angular/core';
import {
  DcxNgButtonComponent,
  DcxNgCardComponent,
  DcxNgSelectComponent,
  DcxNgTabsComponent,
  DcxTabItemDefault,
  DcxTabItemScroll,
  DcxTabItemWithBadges,
  DcxTabItemWithComponents,
  DcxTabItemWithDisabled,
  DcxTabItemWithIcons,
  TABS_VARIANT_LIST,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgTabsComponent> = {
  title: 'DCXLibrary/Components/Tabs',
  component: DcxNgTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      name: 'variant',
      control: { type: 'select' },
      options: TABS_VARIANT_LIST,
      description: 'Variante visual de los tabs.',
      table: {
        category: 'Atributos',
        type: { summary: '"line" | "pill" | "brand" | "subtle"' },
        defaultValue: { summary: 'line' },
      },
    },
    tabs: {
      name: 'tabs',
      options: DcxTabItemDefault,
      control: 'object',
      description: 'Array de tabs (id, label, disabled?, icon?, badge?).',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxTabItem[]' },
      },
    },
    activeTabId: {
      name: 'activeTabId',
      control: 'text',
      description: 'ID del tab actualmente seleccionado.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'tab1' },
      },
    },
    hasControls: {
      name: 'hasControls',
      description: 'Opción para mostrar botones de control numerados.',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      name: 'ariaLabel',
      description:
        'Nombre accesible del grupo de pestañas (aria-label del tablist). Recomendado cuando hay varios grupos de pestañas en la misma página.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    tabChange: {
      name: 'tabChange',
      action: 'tabChange',
      description: 'Evento que se emite cuando se selecciona un tab.',
      table: {
        category: 'Eventos',
        type: {
          summary: '(tabId: string) => void',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
  args: {
    tabs: DcxTabItemDefault,
    activeTabId: 'tab1',
    hasControls: false,
    variant: 'line',
  },
};

export default meta;
type Story = StoryObj<DcxNgTabsComponent>;

export const Default: Story = {};

export const BrandTabs: Story = {
  args: {
    tabs: DcxTabItemDefault,
    variant: 'brand',
  },
  name: 'Brand (fondo primario)',
};

export const PillTabs: Story = {
  args: {
    tabs: DcxTabItemDefault,
    variant: 'pill',
  },
  name: 'Pill',
};

export const SubtleTabs: Story = {
  args: {
    tabs: DcxTabItemDefault,
    variant: 'subtle',
  },
  name: 'Subtle',
};

export const DisabledTabs: Story = {
  args: {
    tabs: DcxTabItemWithDisabled,
  },
};

export const TabsWithIcons: Story = {
  args: {
    tabs: DcxTabItemWithIcons,
  },
};

export const TabsWithBadges: Story = {
  args: {
    tabs: DcxTabItemWithBadges,
  },
};

export const TabsWithScroll: Story = {
  args: {
    tabs: DcxTabItemScroll,
  },
};

export const TabsWithControls: Story = {
  args: {
    hasControls: true,
  },
};

@Component({
  selector: 'dcx-ng-tabs-story-wrapper',
  standalone: true,
  imports: [
    DcxNgTabsComponent,
    DcxNgButtonComponent,
    DcxNgSelectComponent,
    DcxNgCardComponent,
  ],
  template: `
  <dcx-ng-tabs
    [tabs]="tabItemWithComponents"
    [activeTabId]="selectedTabIdContent()"
    (tabChange)="onTabChange($event)"
  ></dcx-ng-tabs>
  <section>
    @switch (selectedTabIdContent()) {
      @case ('button') {
        <dcx-ng-button [label]="'Button'"></dcx-ng-button>
      }
      @case ('select') {
        <dcx-ng-select></dcx-ng-select>
      }
      @case ('card') {
        <dcx-ng-card></dcx-ng-card>
      }
    }
  </section>
  `,
})
class DcxNgTabsWrapperComponent {
  tabItemWithComponents = DcxTabItemWithComponents;
  selectedTabIdContent = signal<string>('button');

  onTabChange(tabId: string): void {
    this.selectedTabIdContent.set(tabId);
  }
}
export const TabsWithContentComponents: Story = {
  render: () => ({
    props: {},
    template: `<dcx-ng-tabs-story-wrapper/>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [DcxNgTabsWrapperComponent],
    }),
  ],
};

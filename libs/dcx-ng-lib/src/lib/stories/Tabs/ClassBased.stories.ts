import { Component, signal } from '@angular/core';
import {
  DcxNgButtonComponent,
  DcxNgCardComponent,
  DcxNgSelectComponent,
  DcxNgTabsComponent,
  DcxTabItemDefault,
  DcxTabItemScroll,
  DcxTabItemWithComponents,
  DcxTabItemWithDisabled,
  DcxTabItemWithIcons,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgTabsComponent> = {
  title: 'DCXLibrary/Components/Tabs',
  component: DcxNgTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['line', 'pill', 'brand'],
      description: 'Variante visual de los tabs',
      table: {
        category: 'Attributes',
        type: { summary: '"line" | "pill" | "brand"' },
        defaultValue: { summary: 'line' },
      },
    },
    tabs: {
      options: DcxTabItemDefault,
      control: 'object',
      description: 'Array de tabs con id, label y contenido',
      table: {
        category: 'Attributes',
        type: { summary: 'DcxTabItem[]' },
      },
    },
    activeTabId: {
      control: 'text',
      description: 'ID del tab actualmente seleccionado',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'tab1' },
      },
    },
    hasControls: {
      description: 'Opción para poner botones de control',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    tabChange: {
      action: 'tabChange',
      description: 'Evento que se emite cuando se selecciona un tab',
      table: {
        category: 'Events',
        type: {
          summary: '(string) => void',
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
  name: 'Brand (primary background)',
};

export const PillTabs: Story = {
  args: {
    tabs: DcxTabItemDefault,
    variant: 'pill',
  },
  name: 'Pill',
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
  selector: 'dcx-ng-page-tabs',
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
    template: `<dcx-ng-page-tabs/>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [DcxNgTabsWrapperComponent],
    }),
  ],
};

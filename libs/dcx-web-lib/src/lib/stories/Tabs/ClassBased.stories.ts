import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-tabs/dcx-web-tabs.component';
import '../../dcx-web-components/dcx-web-button/dcx-web-button.component';
import '../../dcx-web-components/dcx-web-select/dcx-web-select.component';
import '../../dcx-web-components/dcx-web-card/dcx-web-card.component';

import {
  DcxTabItemDefault,
  DcxTabItemScroll,
  DcxTabItemWithBadges,
  DcxTabItemWithComponents,
  DcxTabItemWithDisabled,
  DcxTabItemWithIcons,
  TABS_VARIANT_LIST,
} from '../../core/defaults/tabs';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Tabs',
  component: 'dcx-web-tabs',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array de tabs (id, label, disabled?, icon?, badge?).',
      table: {
        category: 'Atributos',
      },
    },

    activeTabId: {
      control: 'text',
      description: 'ID del tab actualmente seleccionado.',
      table: {
        category: 'Atributos',
      },
    },

    variant: {
      control: 'select',
      options: TABS_VARIANT_LIST,
      description: 'Variante visual de los tabs.',
      table: {
        category: 'Atributos',
      },
    },

    hasControls: {
      control: 'boolean',
      description: 'Mostrar controles numerados.',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible del grupo de pestañas.',
      table: {
        category: 'Atributos',
      },
    },

    tabChange: {
      action: 'tabChange',
      description: 'Emitido cuando cambia la pestaña activa.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    tabs: DcxTabItemDefault,
    activeTabId: 'tab1',
    hasControls: false,
    variant: 'line',
    ariaLabel: 'Ejemplo de tabs',
  },

  render: args => {
    return html`
      <dcx-web-tabs
        .tabs=${args.tabs}
        .activeTabId=${args.activeTabId}
        .variant=${args.variant}
        .hasControls=${args.hasControls}
        aria-label=${args.ariaLabel ?? ''}
        @tabChange=${(e: CustomEvent<string>) => {
          const target = e.currentTarget as any;

          target.activeTabId = e.detail;
        }}
      >
      </dcx-web-tabs>
    `;
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const BrandTabs: Story = {
  name: 'Brand (fondo primario)',

  args: {
    tabs: DcxTabItemDefault,
    variant: 'brand',
  },
};

export const PillTabs: Story = {
  name: 'Pill',

  args: {
    tabs: DcxTabItemDefault,
    variant: 'pill',
  },
};

export const SubtleTabs: Story = {
  name: 'Subtle',

  args: {
    tabs: DcxTabItemDefault,
    variant: 'subtle',
  },
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
    tabs: DcxTabItemDefault,
    hasControls: true,
  },
};

export const TabsWithContentComponents: Story = {
  render: () => {
    const wrapper = document.createElement('div');

    let activeTabId = 'button';

    const renderStory = () => {
      wrapper.innerHTML = '';

      const tabs = document.createElement('dcx-web-tabs') as any;

      tabs.tabs = DcxTabItemWithComponents;

      tabs.activeTabId = activeTabId;

      tabs.setAttribute('aria-label', 'Tabs con contenido de componentes');

      tabs.addEventListener('tabChange', (event: Event) => {
        activeTabId = (event as CustomEvent<string>).detail;

        renderStory();
      });

      let content: HTMLElement;

      switch (activeTabId) {
        case 'select':
          content = document.createElement('dcx-web-select');
          break;

        case 'card':
          content = document.createElement('dcx-web-card');
          break;

        case 'button':
        default:
          content = document.createElement('dcx-web-button');

          content.setAttribute('label', 'Button');
          break;
      }

      tabs.appendChild(content);

      wrapper.appendChild(tabs);
    };

    renderStory();

    return wrapper;
  },
};

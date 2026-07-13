import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { CAROUSEL_DEFAULT_ITEMS, CAROUSEL_MIXED_ITEMS } from '../../core/defaults/carousel';
import '../../../index';

const defaultItemTemplate = (data: any) => html`
  <div style="border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-lg, 8px); padding: var(--sp-4, 16px); background: var(--bg-default, #fff); width: 100%; box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.06)); box-sizing: border-box;">
    <dcx-web-chip label=${data.tag} size="s" style="margin-bottom: 8px; display: inline-block;"></dcx-web-chip>
    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: var(--text-dark, #2a2e33);">${data.title}</h3>
    <p style="margin: 0; font-size: 14px; color: var(--text-muted, #696e75);">${data.description}</p>
  </div>
`;

const verticalItemTemplate = (data: any) => html`
  <div style="border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-lg, 8px); padding: var(--sp-4, 16px); background: var(--bg-default, #fff); width: 100%; height: 100%; box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.06)); box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;">
    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: var(--text-dark, #2a2e33);">${data.title}</h3>
    <p style="margin: 0; font-size: 14px; color: var(--text-muted, #696e75);">${data.description}</p>
  </div>
`;

const CAROUSEL_WEB_MIXED_ITEMS = [
  { id: 1, title: 'Sección Acordeón', type: 'accordion' },
  { id: 2, title: 'Formulario de Opciones', type: 'checkbox' },
  { id: 3, title: 'Etiquetas e Indicadores', type: 'chips-badges' },
];

let checkboxOptionsState = [
  { id: '1', value: true, label: 'Opción Básica (Web Component)' },
  { id: '2', value: false, label: 'Opción Pro (Web Component)' },
  { id: '3', value: null, label: 'Opción Premium (Web Component)' }
];

const mixedItemTemplate = (data: any) => {
  if (data.type === 'accordion') {
    const accordionItems = [
      { id: '1', title: 'Panel 1 (Web Component)', content: 'Contenido del panel 1 hecho con Web Component Accordion.' },
      { id: '2', title: 'Panel 2 (Web Component)', content: 'Contenido del panel 2 hecho con Web Component Accordion.' }
    ];
    return html`
      <div style="width: 100%; box-sizing: border-box; text-align: left;">
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: var(--text-dark, #2a2e33);">${data.title}</h3>
        <dcx-web-accordion .items=${accordionItems} closeOthers></dcx-web-accordion>
      </div>
    `;
  }
  if (data.type === 'checkbox') {
    return html`
      <div style="width: 100%; box-sizing: border-box; text-align: left;">
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: var(--text-dark, #2a2e33);">${data.title}</h3>
        <dcx-web-checkbox
          .options=${checkboxOptionsState}
          @changeOptions=${(e: CustomEvent) => {
            checkboxOptionsState = e.detail;
            const checkboxEl = e.target as HTMLElement;
            const carousel = checkboxEl.closest('dcx-web-carousel');
            if (carousel) {
              carousel.requestUpdate();
            }
          }}
        ></dcx-web-checkbox>
      </div>
    `;
  }
  if (data.type === 'chips-badges') {
    return html`
      <div style="width: 100%; box-sizing: border-box; text-align: left;">
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: var(--text-dark, #2a2e33);">${data.title}</h3>
        <div style="display: flex; gap: 8px; align-items: center;">
          <dcx-web-chip label="Chip 1" color="primary"></dcx-web-chip>
          <dcx-web-chip label="Chip 2" color="success"></dcx-web-chip>
        </div>
      </div>
    `;
  }
  return html`
    <div style="border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-lg, 8px); padding: var(--sp-4, 16px); background: var(--bg-default, #fff); width: 100%; box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.06)); box-sizing: border-box;">
      <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: var(--text-dark, #2a2e33);">${data.title}</h3>
    </div>
  `;
};

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Carousel',
  component: 'dcx-web-carousel',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'Array de elementos a mostrar en el carousel.',
      table: {
        category: 'Atributos',
      },
    },
    circular: {
      control: 'boolean',
      description: 'Indica si el carousel es infinito.',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Dirección del desplazamiento del carousel.',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'horizontal' },
      },
    },
    showNavigators: {
      control: 'boolean',
      description: 'Muestra u oculta los botones de navegación.',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'true' },
      },
    },
    showIndicators: {
      control: 'boolean',
      description: 'Muestra u oculta los indicadores de página.',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'true' },
      },
    },
    autoplayInterval: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Tiempo en milisegundos para el cambio automático de slide (0 para desactivar).',
      table: {
        category: 'Atributos',
        defaultValue: { summary: '0' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Nombre accesible de la región del carousel (atributo aria-label).',
      table: {
        category: 'Atributos',
        defaultValue: { summary: 'Carousel' },
      },
    },
  },
  args: {
    value: CAROUSEL_DEFAULT_ITEMS,
    circular: false,
    orientation: 'horizontal',
    showNavigators: true,
    showIndicators: true,
    autoplayInterval: 0,
    ariaLabel: 'Carousel',
  },
  render: (args: any) => {
    const isVertical = args.orientation === 'vertical';
    const containerStyle = `
      max-width: ${isVertical ? '400px' : '450px'};
      height: ${isVertical ? '600px' : 'auto'};
      margin: auto;
      padding: 20px;
    `;
    const itemTpl = args.itemTemplate || (isVertical ? verticalItemTemplate : defaultItemTemplate);

    return html`
      <div style=${containerStyle}>
        <dcx-web-carousel
          .value=${args.value}
          ?circular=${args.circular}
          .orientation=${args.orientation}
          ?show-navigators=${args.showNavigators}
          ?show-indicators=${args.showIndicators}
          .autoplayInterval=${args.autoplayInterval}
          .ariaLabel=${args.ariaLabel}
          .itemTemplate=${itemTpl}
          style="${isVertical ? 'height: 100%;' : ''}"
        >
        </dcx-web-carousel>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const AutoplayCircular: Story = {
  args: {
    circular: true,
    autoplayInterval: 3000,
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const MixedContent: Story = {
  args: {
    value: CAROUSEL_WEB_MIXED_ITEMS,
    circular: true,
  },
  render: (args: any) => {
    return html`
      <div style="max-width: 450px; margin: auto; padding: 20px;">
        <dcx-web-carousel
          .value=${args.value}
          ?circular=${args.circular}
          ?show-indicators=${true}
          .itemTemplate=${mixedItemTemplate}
        >
        </dcx-web-carousel>
      </div>
    `;
  },
};

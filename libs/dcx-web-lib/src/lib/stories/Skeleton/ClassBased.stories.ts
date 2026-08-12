import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-skeleton/dcx-web-skeleton.component';
import '../../dcx-web-components/dcx-web-card/dcx-web-card.component';

import type {
  DcxSkeletonAnimation,
  DcxSkeletonShape,
} from '../../core/interfaces/skeleton';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Skeleton',
  component: 'dcx-web-skeleton',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    shape: {
      control: 'select',
      options: ['rectangle', 'circle'],
      description: 'Forma visual del placeholder.',
      table: {
        category: 'Atributos',
      },
    },

    width: {
      control: 'text',
      description: 'Ancho CSS. Se ignora cuando size tiene valor.',
      table: {
        category: 'Atributos',
      },
    },

    height: {
      control: 'text',
      description: 'Alto CSS. Se ignora cuando size tiene valor.',
      table: {
        category: 'Atributos',
      },
    },

    size: {
      control: 'text',
      description: 'Tamaño único para ancho y alto.',
      table: {
        category: 'Atributos',
      },
    },

    borderRadius: {
      control: 'text',
      description: 'Radio CSS para rectángulos.',
      table: {
        category: 'Atributos',
      },
    },

    animation: {
      control: 'select',
      options: ['wave', 'none'],
      description: 'Animación visual del placeholder.',
      table: {
        category: 'Atributos',
      },
    },
  },

  args: {
    shape: 'rectangle' as DcxSkeletonShape,
    width: '100%',
    height: '1rem',
    size: null,
    borderRadius: null,
    animation: 'wave' as DcxSkeletonAnimation,
  },

  render: args => html`
    <div style="max-width:32rem;">
      <dcx-web-skeleton
        shape=${args.shape}
        width=${args.width}
        height=${args.height}
        size=${args.size ?? ''}
        borderRadius=${args.borderRadius ?? ''}
        animation=${args.animation}
      >
      </dcx-web-skeleton>
    </div>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Shapes: Story = {
  render: args => html`
    <div
      style="
        display:grid;
        gap: var(--sp-4, 16px);
        max-width:34rem;
      "
    >
      <dcx-web-skeleton
        width="20rem"
        height="1rem"
        animation=${args.animation}>
      </dcx-web-skeleton>

      <dcx-web-skeleton
        width="14rem"
        height="1rem"
        borderRadius="16px"
        animation=${args.animation}>
      </dcx-web-skeleton>

      <div
        style="
          display:flex;
          gap: var(--sp-3, 12px);
          align-items:center;
        "
      >
        <dcx-web-skeleton size="2rem" animation=${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton size="3rem" animation=${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton size="4rem" animation=${args.animation}></dcx-web-skeleton>

        <dcx-web-skeleton shape="circle" size="2rem" animation=${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton shape="circle" size="3rem" animation=${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton shape="circle" size="4rem" animation=${args.animation}></dcx-web-skeleton>
      </div>
    </div>
  `,
};

export const TextLines: Story = {
  name: 'Líneas de texto',

  render: args => html`
    <div
      style="
        display:grid;
        gap:var(--sp-2, 8px);
        max-width:28rem;
      "
    >
      <dcx-web-skeleton width="100%" height="0.875rem" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="94%" height="0.875rem" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="82%" height="0.875rem" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="64%" height="0.875rem" animation=${args.animation}></dcx-web-skeleton>
    </div>
  `,
};

export const Avatar: Story = {
  render: args => html`
    <div
      style="
        display:flex;
        gap: var(--sp-4, 16px);
        align-items:center;
      "
    >
      <dcx-web-skeleton shape="circle" size="1.5rem" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="2.5rem" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="3.5rem" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="4.5rem" animation=${args.animation}></dcx-web-skeleton>
    </div>
  `,
};

export const CardPlaceholder: Story = {
  render: args => html`
    <div role="status" aria-busy="true">
      <span
        style="
          position:absolute;
          width:1px;
          height:1px;
          overflow:hidden;
          clip:rect(0 0 0 0);
        "
      >
        Cargando…
      </span>

      <dcx-web-card
        .image=${null}
        ?bordered=${true}
        .shadow=${1}
        align="start"
        maxContentWidth="24rem"
        interactive=${true}
      >
        <div slot="header" style="display:flex;gap:12px;align-items:center;">
          <dcx-web-skeleton shape="circle" size="3rem" animation=${args.animation}></dcx-web-skeleton>

          <div style="display:grid;gap:8px;flex:1;">
            <dcx-web-skeleton width="70%" animation=${args.animation}></dcx-web-skeleton>
            <dcx-web-skeleton width="42%" height="0.75rem" animation=${args.animation}></dcx-web-skeleton>
          </div>
        </div>

        <div slot="content">
          <dcx-web-skeleton
            width="100%"
            height="9rem"
            borderRadius="8px"
            animation=${args.animation}>
          </dcx-web-skeleton>
        </div>

        <div
          slot="footer"
          style="
            display:flex;
            justify-content:space-between;
            gap:var(--sp-3, 12px);
          "
        >
          <dcx-web-skeleton width="5rem" height="2rem" animation=${args.animation}></dcx-web-skeleton>
          <dcx-web-skeleton width="5rem" height="2rem" animation=${args.animation}></dcx-web-skeleton>
        </div>
      </dcx-web-card>
    </div>
  `,
};

export const ListPlaceholder: Story = {
  render: args => html`
    <div
      role="status"
      aria-busy="true"
      style="
        display:grid;
        gap:var(--sp-4,16px);
        max-width:28rem;
      "
    >
      <span
        style="
          position:absolute;
          width:1px;
          height:1px;
          overflow:hidden;
          clip:rect(0 0 0 0);
        "
      >
        Cargando…
      </span>

      ${[1, 2, 3, 4].map(
        () => html`
          <div
            style="
              display:flex;
              align-items:center;
              gap: var(--sp-3,12px);
            "
          >
            <dcx-web-skeleton shape="circle" size="3rem" animation=${args.animation}></dcx-web-skeleton>

            <div
              style="
                display:grid;
                gap: var(--sp-2,8px);
                flex:1;
              "
            >
              <dcx-web-skeleton width="100%" height="0.875rem" animation=${args.animation}></dcx-web-skeleton>
              <dcx-web-skeleton width="72%" height="0.875rem" animation=${args.animation}></dcx-web-skeleton>
            </div>
          </div>
        `,
      )}
    </div>
  `,
};

export const NoAnimation: Story = {
  args: {
    animation: 'none',
  },

  render: args => html`
    <div
      style="
        display:grid;
        gap:var(--sp-2,8px);
        max-width:28rem;
      "
    >
      <dcx-web-skeleton width="100%" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="82%" animation=${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="64%" animation=${args.animation}></dcx-web-skeleton>
    </div>
  `,
};

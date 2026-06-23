import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Card',
  component: 'dcx-web-card',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    image: { control: 'text' },
    imageAlt: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
    },
    maxContentWidth: { control: 'text' },
    maxImageWidth: { control: 'text' },
    accent: { control: 'boolean' },
    bordered: { control: 'boolean' },
    borderWidth: { control: 'number' },
    borderStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double', 'none'],
    },
    shadow: {
      control: 'select',
      options: [0, 1, 2, 3],
    },
    interactive: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    image: 'https://picsum.photos/360/240',
    imageAlt: 'Card image',
    title: 'Título de la carta',
    subtitle: 'Subtítulo de la carta',
    layout: 'vertical',
    align: 'center',
    size: 's',
    maxContentWidth: '560px',
    maxImageWidth: '100%',
    accent: false,
    bordered: false,
    borderWidth: 1,
    borderStyle: 'solid',
    shadow: 1,
    interactive: true,
    disabled: false,
  },
  render: (args) => html`
    <dcx-web-card
      .image=${args.image}
      imageAlt=${args.imageAlt}
      title=${args.title}
      subtitle=${args.subtitle}
      layout=${args.layout}
      align=${args.align}
      size=${args.size}
      maxContentWidth=${args.maxContentWidth}
      maxImageWidth=${args.maxImageWidth}
      ?accent=${args.accent}
      ?bordered=${args.bordered}
      borderWidth=${args.borderWidth}
      borderStyle=${args.borderStyle}
      shadow=${args.shadow}
      ?interactive=${args.interactive}
      ?disabled=${args.disabled}
    >
      <div slot="content">
        Este es el contenido de la carta pasado a través del slot.
      </div>
      <div slot="footer">
        <button>Acción</button>
      </div>
    </dcx-web-card>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    layout: 'horizontal',
    maxContentWidth: '600px',
    maxImageWidth: '200px',
  },
};

export const AccentTop: Story = {
  args: {
    accent: true,
  },
};

export const Bordered: Story = {
  args: {
    bordered: true,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

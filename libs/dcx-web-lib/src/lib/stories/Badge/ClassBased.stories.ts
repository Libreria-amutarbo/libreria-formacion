import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Badge',
  component: 'dcx-web-badge',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Valor del badge (texto o número)',
      table: {
        category: 'Atributos',
      },
    },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warn', 'danger'],
      description: 'Severidad o color semántico del badge',
      table: {
        category: 'Atributos',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del badge',
      table: {
        category: 'Atributos',
      },
    },
  },
  args: {
    value: '2',
    severity: 'primary',
    size: 'md',
  },
  render: (args) => html`
    <dcx-web-badge
      value=${args.value || ''}
      severity=${args.severity}
      size=${args.size}
    ></dcx-web-badge>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: '2',
    severity: 'primary',
    size: 'md',
  },
};

export const Dot: Story = {
  args: {
    value: '',
    severity: 'primary',
    size: 'md',
  },
};

export const SuccessLarge: Story = {
  args: {
    value: '8',
    severity: 'success',
    size: 'lg',
  },
};

export const DangerSmall: Story = {
  args: {
    value: '99+',
    severity: 'danger',
    size: 'sm',
  },
};

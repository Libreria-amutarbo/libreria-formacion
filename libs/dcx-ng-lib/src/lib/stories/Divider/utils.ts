import { ArgTypes } from '@storybook/angular';
import { tokens } from '../../core/mock/colors';

export const argTypesDivider: ArgTypes = {
  orientation: {
    control: 'select',
    options: ['horizontal', 'vertical'],
    description: 'Sets the direction of the divider line.',
    table: {
      category: 'Appearance',
      type: { summary: 'horizontal | vertical' },
      defaultValue: { summary: 'horizontal' },
    },
  },
  size: {
    control: 'select',
    options: ['s', 'm', 'l', 'xl', 'auto'],
    description: 'Controls the length of the divider. `auto` fills the parent container.',
    table: {
      category: 'Appearance',
      type: { summary: 's | m | l | xl | auto' },
      defaultValue: { summary: 'auto' },
    },
  },
  color: {
    control: 'color',
    description: 'Color of the divider line. Accepts any valid CSS color value.',
    table: {
      category: 'Appearance',
      type: { summary: 'string' },
      defaultValue: { summary: tokens.background.primary },
    },
  },
  thickness: {
    control: { type: 'number', min: 0, max: 20, step: 0.2 },
    description: 'Thickness of the divider line in rem units.',
    table: {
      category: 'Appearance',
      type: { summary: 'number' },
      defaultValue: { summary: '0.25' },
    },
  },
  ariaLabel: {
    control: 'text',
    description: 'Accessible label for screen readers.',
    table: {
      category: 'Accessibility',
      type: { summary: 'string' },
      defaultValue: { summary: 'Divider' },
    },
  },
  type: {
    control: 'select',
    options: ['default', 'dot', 'dash'],
    description: 'Visual style of the divider line.',
    table: {
      category: 'Appearance',
      type: { summary: 'default | dot | dash' },
      defaultValue: { summary: 'default' },
    },
  },
};

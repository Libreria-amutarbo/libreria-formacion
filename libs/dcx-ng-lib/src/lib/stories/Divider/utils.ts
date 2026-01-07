import { DcxSize, DividerOrientation } from '../../core/interfaces';
import { ArgTypes } from '@storybook/angular';
import { tokens } from '../../core/mock/colors';

export const builderDivider = (
  size: DcxSize,
  ariaLabel: string,
  orientation: DividerOrientation = 'horizontal',
) => {
  return {
    args: {
      size,
      ariaLabel,
      orientation,
      thickness: 0.25,
      color: tokens.background.primary,
    },
  };
};

export const argTypesDivider: ArgTypes = {
  orientation: {
    control: 'select',
    options: ['horizontal', 'vertical'],
    table: { category: 'Attributes' },
  },
  size: {
    control: 'select',
    options: ['s', 'm', 'l', 'xl', 'auto'],
    table: { category: 'Attributes' },
  },
  color: {
    control: 'color',
    defaultValue: tokens.background.primary,
    table: { category: 'Attributes' },
  },
  thickness: {
    control: { type: 'number', min: 0, max: 20, step: 0.2 },
    defaultValue: 0.25,
    table: { category: 'Attributes' },
  },
  ariaLabel: {
    control: 'text',
    defaultValue: 'Divider',
    table: { category: 'Attributes' },
  },
  type: {
    control: 'select',
    options: ['default', 'dot'],
    table: { category: 'Attributes' },
  },
};

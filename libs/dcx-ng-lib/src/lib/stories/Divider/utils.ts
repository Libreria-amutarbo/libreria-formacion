import { DcxSize, DividerOrientation } from "../../core/interfaces"
import { ArgTypes } from '@storybook/angular';

export const builderDivider = (
  size: DcxSize,
  ariaLabel: string,
  orientation: DividerOrientation = 'horizontal') => {
  return {
    args: {
      size,
      ariaLabel,
      orientation,
      thickness: 0.25,
      color: '#0056b3',
    },
  }
};

export const argTypesDivider: ArgTypes = {
  orientation: {
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
  size: {
    control: 'select',
    options: ['s', 'm', 'l', 'xl', 'auto'],
  },
  color: {
    control: 'color',
    defaultValue: '#0056b3',
  },
  thickness: {
    control: { type: 'number', min: 0, max: 20, step: 0.2 },
    defaultValue: 0.25,
  },
  ariaLabel: {
    control: 'text',
    defaultValue: 'Divider',
  },
  type: {
    control: 'select',
    options: ['default', 'dot'],
  },
};
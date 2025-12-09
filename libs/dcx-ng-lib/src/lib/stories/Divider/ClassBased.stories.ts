import { DcxNgDividerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta } from '@storybook/angular';
import { argTypesDivider, builderDivider } from './utils';

const meta: Meta<DcxNgDividerComponent> = {
  title: 'DCXLibrary/Divider/ClassBased',
  component: DcxNgDividerComponent,
  tags: ['autodocs'],
  argTypes: argTypesDivider
};

export default meta;

export const HorizontalSmall = builderDivider('s', 'Horizontal Divider Small');
export const HorizontalMedium = builderDivider('m', 'Horizontal Divider Medium');
export const HorizontalLarge = builderDivider('l', 'Horizontal Divider Large');

export const VerticalSmall = builderDivider('s', 'Vertical Divider Small', 'vertical');
export const VerticalMedium = builderDivider('m', 'Vertical Divider Medium', 'vertical');
export const VerticalLarge = builderDivider('l', 'Vertical Divider Large', 'vertical');
import { DcxNgDividerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta } from '@storybook/angular';
import { argTypesDivider, builderDivider } from './utils';

const meta: Meta<DcxNgDividerComponent> = {
  title: 'DCXLibrary/Divider/Without style',
  component: DcxNgDividerComponent,
  tags: ['autodocs'],
  argTypes: argTypesDivider
};

export default meta;

export const UnstyledHorizontal = builderDivider('m', 'Horizontal Divider Medium')
export const UnstyledVertical = builderDivider('m', 'Vertical Divider Medium')

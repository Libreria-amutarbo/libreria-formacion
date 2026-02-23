import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconFieldComponent } from '../../dcx-ng-components/dcx-ng-iconField/dcx-ng-iconField.component';
import { moduleMetadata } from '@storybook/angular';

import { Component, input } from '@angular/core';
import { DcxNgInputComponent } from '../../dcx-ng-components/dcx-ng-input/dcx-ng-input.component';
import { DcxPosition } from '../../core/interfaces';

const meta: Meta<DcxNgIconFieldComponent> = {
  title: 'DCXLibrary/IconField/Class based',
  component: DcxNgIconFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      description: 'Icono por defecto',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'Search' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posición del icono',
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'left' },
      },
    },
  },
  args: {
    iconName: 'search',
    iconPosition: 'left',
  },
};

export default meta;
type Story = StoryObj<DcxNgIconFieldComponent>;

export const ClassBased: Story = {};

@Component({
  selector: 'dcx-ng-sb-icon-field',
  standalone: true,
  imports: [DcxNgIconFieldComponent, DcxNgInputComponent],
  template: `
  <dcx-ng-icon-field iconSize="m" [iconPosition]="iconPosition()"
   [iconName]="'search'" (iconClick)="onIconClick()">
    <dcx-ng-input
      [placeholder]="'Icon Field con icono a la izquierda'"
    ></dcx-ng-input>
  </dcx-ng-icon-field>
  `,
})
class DcxNgIconFieldWrapperComponent {
  iconPosition = input<DcxPosition>('left');
  isClickable = input(false);
  onIconClick() {
    if (this.isClickable()) alert('Icono clickado');
  }
}

export const IconInLeftPosition = {
  render: () => ({
    props: {},
    template: `<dcx-ng-sb-icon-field/>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconFieldWrapperComponent],
    }),
  ],
};

export const IconInRightPosition = {
  render: () => ({
    props: {},
    template: `<dcx-ng-sb-icon-field [iconPosition]="'right'"/>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconFieldWrapperComponent],
    }),
  ],
};

export const IconClickable = {
  render: () => ({
    props: {},
    template: `<dcx-ng-sb-icon-field [isClickable]="true"/>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconFieldWrapperComponent],
    }),
  ],
};

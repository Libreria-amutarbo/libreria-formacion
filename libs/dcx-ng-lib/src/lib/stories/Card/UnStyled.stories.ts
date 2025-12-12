import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgCardComponent } from '../../dcx-ng-components/dcx-ng-card/dcx-ng-card.component';

const meta: Meta<DcxNgCardComponent> = {
  title: 'DCXLibrary/Card/Unstyled',
  component: DcxNgCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgCardComponent],
    }),
  ],
  render: args => ({ props: args }),
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    image: null, // sin imagen
    layout: 'vertical',
    bordered: false, // sin borde
    borderWidth: 0,
    interactive: false,
    disabled: false,
    size: 'm',
    align: 'start',
  },
};
export default meta;

type Story = StoryObj<DcxNgCardComponent>;

// ---------------------------------------------
// Default unstyled
// ---------------------------------------------
export const Unstyled: Story = {
  render: args => ({
    props: args,
    template: `
      <ui-card [title]="title" [subtitle]="subtitle">
        <p>Este es contenido de ejemplo para la card sin estilos aplicados.</p>
      </ui-card>
    `,
  }),
};

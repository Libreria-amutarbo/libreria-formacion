import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSliderComponent } from '../../dcx-ng-components/dcx-ng-slider/dcx-ng-slider.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<DcxNgSliderComponent> = {
  title: 'DCXLibrary/Slider/UnStyled',
  component: DcxNgSliderComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgSliderComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Slider sin estilos: aspecto nativo del navegador, sin personalización visual.
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Valor actual del slider',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    step: {
      control: { type: 'number' },
      description: 'Incremento entre valores',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    value: 10,
    step: 1,
  },
};

export default meta;
type Story = StoryObj<DcxNgSliderComponent>;

export const Default: Story = {
  args: {
    value: 10,
    step: 1,
    vertical: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider horizontal sin estilos.'
      }
    }
  }
};


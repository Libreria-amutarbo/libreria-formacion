import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSliderComponent } from '../../dcx-ng-components/dcx-ng-slider/dcx-ng-slider.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<DcxNgSliderComponent> = {
  title: 'DCXLibrary/Slider/ClassBased',
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
El componente Slider permite seleccionar valores numéricos de forma visual, tanto horizontal como vertical.
Soporta personalización de paso, orientación y muestra el valor en tiempo real.

### Uso básico
\`\`\`html
<dcx-ng-slider [value]="10" [step]="1"></dcx-ng-slider>
\`\`\`

### Vertical
\`\`\`html
<dcx-ng-slider [value]="50" [step]="5" [vertical]="true"></dcx-ng-slider>
\`\`\`
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
        story: 'Slider horizontal por defecto.'
      }
    }
  }
};

export const Vertical: Story = {
  args: {
    value: 50,
    step: 5,
    vertical: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider en orientación vertical.'
      }
    }
  }
};
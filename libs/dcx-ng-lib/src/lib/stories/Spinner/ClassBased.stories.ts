import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DcxNgSpinnerComponent } from '../../dcx-ng-components/dcx-ng-spinner/dcx-ng-spinner.component';

const meta: Meta<DcxNgSpinnerComponent> = {
  title: 'DCXLibrary/Spinner/Class based',
  component: DcxNgSpinnerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  args: {
    size: 'm',
    wrapper: false,
    delay: 0,
    label: '',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: 'Size of the spinner',
      table: {
        category: 'props',
        defaultValue: { summary: 'm' },
      },
    },
    wrapper: {
      control: { type: 'boolean' },
      description: 'Whether the spinner acts as an overlay on content',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
      },
    },
    delay: {
      control: { type: 'number' },
      description: 'Delay in milliseconds before showing the spinner',
      table: {
        category: 'props',
        defaultValue: { summary: '0' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Descriptive text that accompanies the spinner',
      table: {
        category: 'props',
        defaultValue: { summary: "''" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgSpinnerComponent>;

const styles = `
  <style>
    .story-root { padding: 2rem; font-family: Arial, Helvetica, sans-serif; }
    .interactive-block { margin-bottom: 2rem; }
    .showcase { margin-top: 2rem; }
    .size-examples { display:flex; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem; }
    .size-examples > div { text-align:center; min-width:90px; }
    .size-examples p { margin:0 0 0.75rem 0; color:#666; }
    .wrapper-example { max-width:800px; margin-top:1rem; }
    .content-box { padding:1.5rem; border:1px solid #ddd; border-radius:4px; background:#fafafa; }
  </style>
`;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      ${styles}
      <div class="story-root">

        <section class="interactive-block">
          <dcx-ng-spinner
            [size]="size"
            [wrapper]="wrapper"
            [delay]="delay"
            [label]="label">
          </dcx-ng-spinner>
        </section>
        `,
  }),
  parameters: {
    controls: { expanded: true },
  },
};

export const SpinnerShowcase: Story = {
  render: (args) => ({
    props: args,
    template: `
      ${styles}
      <div class="story-root">

        <section class="showcase">
          <h3>Showcase</h3>

          <div class="size-examples">
            <div>
              <p>Extra small</p>
              <dcx-ng-spinner size="xs"></dcx-ng-spinner>
            </div>
            <div>
              <p>Small</p>
              <dcx-ng-spinner size="s"></dcx-ng-spinner>
            </div>
            <div>
              <p>Medium (default)</p>
              <dcx-ng-spinner size="m"></dcx-ng-spinner>
            </div>
            <div>
              <p>Large</p>
              <dcx-ng-spinner size="l"></dcx-ng-spinner>
            </div>
            <div>
              <p>Extra large</p>
              <dcx-ng-spinner size="xl"></dcx-ng-spinner>
            </div>
          </div>

          <h4>With custom delay (1000ms)</h4>
          <dcx-ng-spinner [delay]="1000" label="Loading with delay..."></dcx-ng-spinner>

          <div class="wrapper-example">
            <h4>Wrapper mode (content with overlay)</h4>
            <dcx-ng-spinner [wrapper]="true" label="Loading content...">
              <div class="content-box">
                <h5>Wrapper Content</h5>
                <p>Ejemplo de contenido cubierto por el spinner en modo wrapper.</p>
              </div>
            </dcx-ng-spinner>
          </div>
        </section>

      </div>
    `,
  }),
};

import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSpinnerComponent } from '../../dcx-ng-components/dcx-ng-spinner/dcx-ng-spinner.component';

const meta: Meta<DcxNgSpinnerComponent> = {
  title: 'DCXLibrary/Spinner/Class based',
  component: DcxNgSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: 'Size of the spinner',
    },
    wrapper: {
      control: 'boolean',
      description: 'Whether the spinner should act as an overlay on content',
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the spinner',
    },
    label: {
      control: 'text',
      description: 'Descriptive text that accompanies the spinner',
    }
  },
};

export default meta;
type Story = StoryObj<DcxNgSpinnerComponent>;

// Template común para los estilos
const styles = `
  <style>
    .spinner-container {
      padding: 2rem;
    }
    .spinner-container h2, .spinner-container h3 {
      margin-bottom: 1.5rem;
    }
    .size-examples {
      display: flex;
      gap: 2rem;
      margin-bottom: 3rem;
    }
    .size-examples > div {
      text-align: center;
    }
    .size-examples p {
      margin-bottom: 1rem;
      color: #666;
    }
    .wrapper-example {
      max-width: 600px;
      margin-top: 1rem;
    }
    .content-box {
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f9f9f9;
    }
    .content-box h4 {
      margin-bottom: 1rem;
    }
    .content-box p {
      margin-bottom: 0.5rem;
    }
  </style>
`;

export const SpinnerShowcase: Story = {
  render: () => ({
    template: `
      ${styles}
      <h2>Spinner Showcase</h2>

      <div class="spinner-container">
        <h3>Available Sizes</h3>
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

        <h3>With custom delay (1000ms)</h3>
        <dcx-ng-spinner [delay]="1000" label="Loading with delay..."></dcx-ng-spinner>
        
        <div class="wrapper-example">
          <h3>Wrapper mode (content with overlay)</h3>
          <dcx-ng-spinner [wrapper]="true" label="Loading content...">
            <div class="content-box">
              <h4>Wrapper Content</h4>
              <p>This is an example of content displayed below the spinner when in wrapper mode.</p>
              <p>The spinner will be shown as an overlay on this content.</p>
            </div>
          </dcx-ng-spinner>
        </div>
      </div>
    `
  })
};

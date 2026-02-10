import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgSpinnerComponent } from '../../dcx-ng-components/dcx-ng-spinner/dcx-ng-spinner.component';

const meta: Meta<DcxNgSpinnerComponent> = {
  title: 'DCXLibrary/Spinner/Class based',
  component: DcxNgSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: 'Size of the spinner',
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'm' },
      },
    },
    wrapper: {
      control: { type: 'boolean' },
      description: 'Whether the spinner acts as an overlay on content',
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
    },
    delay: {
      control: { type: 'number' },
      description: 'Delay in milliseconds before showing the spinner',
      table: {
        category: 'Attributes',
        defaultValue: { summary: '0' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Descriptive text that accompanies the spinner',
      table: {
        category: 'Attributes',
        defaultValue: { summary: "''" },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Descriptive text that accompanies the spinner',
      table: {
        category: 'Attributes',
        defaultValue: { summary: "''" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgSpinnerComponent>;

export const Default: Story = {
  args: {
    size: 'm',
    title: 'Loading...',
    description: 'Please wait',
    wrapper: false,
    delay: 0,
    color: null,
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-spinner
        [size]="size"
        [wrapper]="wrapper"
        [delay]="delay"
        [title]="title"
        [color]="color"
        [description]="description">
      </dcx-ng-spinner>
    `,
  }),
  parameters: {
    controls: { expanded: true },
  },
};

export const SpinnerDelayShowcase: Story = {
  args: {
    size: 'm',
    title: 'Loading with delay...',
    description: 'This spinner appears after 1 second',
    wrapper: false,
    delay: 1000,
    color: null,
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-spinner 
        [size]="size" 
        [color]="color" 
        [delay]="delay" 
        [title]="title"
        [description]="description">
      </dcx-ng-spinner>
    `,
  }),
};

export const SpinnerWrapperShowcase: Story = {
  args: {
    size: 'm',
    title: 'Loading content...',
    description: 'Please wait while we load',
    wrapper: true,
    delay: 0,
    color: null,
  },
  render: args => ({
    props: args,
    template: `
      <dcx-ng-spinner 
        [size]="size" 
        [color]="color" 
        [wrapper]="wrapper" 
        [title]="title"
        [description]="description">
        <div class="content-box">
          <h4>Wrapper Content</h4>
          <p>
            This is an example of content displayed below the spinner when in
            wrapper mode.
          </p>
          <p>The spinner will be shown as an overlay on this content.</p>
        </div>
      </dcx-ng-spinner>
    `,
  }),
};

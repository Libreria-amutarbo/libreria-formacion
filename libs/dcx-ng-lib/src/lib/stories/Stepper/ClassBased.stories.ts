import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import {
  DcxNgStepperComponent,
  STEPPER_BASIC_STEPS,
  STEPPER_WITH_COMPLETED,
  STEPPER_WITH_DISABLED,
  STEPPER_WITH_ERROR,
  STEPPER_WITH_OPTIONAL,
  STEPPER_WITH_ICONS,
  ICON_SIZE_LIST,
  LAYOUT_LIST,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgStepperComponent> = {
  title: 'DCXLibrary/Components/Stepper',
  component: DcxNgStepperComponent,
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'Array of step items to display',
      control: 'object',
    },
    activeStepId: {
      description: 'ID of the currently active step',
      control: 'text',
    },
    orientation: {
      description: 'Layout orientation of the stepper',
      control: 'radio',
      options: LAYOUT_LIST,
    },
    linear: {
      description:
        'The linear property enforces sequential step navigation (only proceed when current step is complete) when true, or allows free navigation between any steps when false',
      control: 'boolean',
    },
    showStepNumbers: {
      description: 'Whether to show step numbers in indicators',
      control: 'boolean',
    },
    size: {
      description: 'Size of the stepper component',
      control: 'radio',
      options: ICON_SIZE_LIST,
    },
    stepChange: {
      description: 'Emitted when active step changes',
      action: 'stepChange',
    },
    stepClick: {
      description: 'Emitted when a step is clicked',
      action: 'stepClick',
    },
  },
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    orientation: 'horizontal',
    linear: false,
    showStepNumbers: true,
    size: 'm',
    stepChange: fn(),
    stepClick: fn(),
  },
};

export default meta;
type Story = StoryObj<DcxNgStepperComponent>;

export const Default: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
  },
};

export const Vertical: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    orientation: 'vertical',
  },
};

export const Linear: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    linear: true,
  },
};

export const WithCompletedSteps: Story = {
  args: {
    steps: STEPPER_WITH_COMPLETED,
    activeStepId: '3',
  },
};

export const WithDisabledSteps: Story = {
  args: {
    steps: STEPPER_WITH_DISABLED,
    activeStepId: '1',
  },
};

export const WithErrorSteps: Story = {
  args: {
    steps: STEPPER_WITH_ERROR,
    activeStepId: '2',
  },
};

export const WithOptionalSteps: Story = {
  args: {
    steps: STEPPER_WITH_OPTIONAL,
    activeStepId: '1',
  },
};

export const Small: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    size: 's',
  },
};

export const Large: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    size: 'l',
  },
};

export const WithoutNumbers: Story = {
  args: {
    steps: STEPPER_WITH_ICONS,
    activeStepId: '1',
    showStepNumbers: false,
  },
};

export const Interactive: Story = {
  args: {
    steps: STEPPER_BASIC_STEPS,
    activeStepId: '1',
    orientation: 'horizontal',
    linear: false,
    showStepNumbers: true,
    size: 'm',
    stepChange: fn(),
    stepClick: fn(),
  },
};

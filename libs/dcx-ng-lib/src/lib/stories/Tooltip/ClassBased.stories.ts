import { Meta, StoryObj } from '@storybook/angular';
import { DcxNgTooltipComponent, TooltipPosition } from '../../dcx-ng-components/dcx-ng-tooltip/dcx-ng-tooltip.component';

const meta: Meta<DcxNgTooltipComponent> = {
  title: 'DCXLibrary/Tooltip/ClassBased',
  component: DcxNgTooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    content: {
      control: 'text',
      description: 'Content of the tooltip',
      defaultValue: 'This is a tooltip',
    },
    hideTooltipOnClick: {
      control: 'boolean',
      description: 'Whether the tooltip should hide when clicking',
      defaultValue: false,
    },

  },
};

export default meta;
type Story = StoryObj<DcxNgTooltipComponent>;

const styles = `
  <style>
.tooltip-container {
  position: relative;
  display: inline-block;
  background-color: red;
}

.dcx-ng-tooltip {
  --tooltip-bg-color: black;
  --tooltip-text-color: white;
  --tooltip-padding: 8px 12px;
  --tooltip-border-radius: 4px;
  --tooltip-font-size: 12px;
  --tooltip-arrow-size: 6px;
  --tooltip-max-width: 250px;

  background-color: var(--tooltip-bg-color);
  color: var(--tooltip-text-color);
  border-radius: var(--tooltip-border-radius);
  padding: var(--tooltip-padding);
  font-size: var(--tooltip-font-size);
  max-width: var(--tooltip-max-width);
  width: max-content;
  word-wrap: break-word;
  position: absolute;
  z-index: 1000;
  animation: fade-in linear 0.2s;

  // Posición TOP
  &--top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: var(--tooltip-arrow-size);
    position: absolute;

    .tooltip-arrow {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 4px 4px 0 4px;
      border-color: var(--tooltip-bg-color) transparent transparent transparent;
    }
  }

  // Posición BOTTOM
  &--bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--tooltip-arrow-size);

    .tooltip-arrow {
      top: -4px;
      left: 50%;
      transform: translateX(-50%) rotateX(180deg);
      border-width: 4px 4px 0 4px;
      border-color: var(--tooltip-bg-color) transparent transparent transparent;
    }
  }

  // Posición LEFT
  &--left {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: var(--tooltip-arrow-size);

    .tooltip-arrow {
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      border-width: 4px 0 4px 4px;
      border-color: transparent transparent transparent var(--tooltip-bg-color);
    }
  }

  // Posición RIGHT
  &--right {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: var(--tooltip-arrow-size);

    .tooltip-arrow {
      left: -4px;
      top: 50%;
      transform: translateY(-50%);
      border-width: 4px 4px 4px 0;
      border-color: transparent var(--tooltip-bg-color) transparent transparent;
    }
  }
}

.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  content: '';
  display: block;
}

// RESPONSIVE
@media (max-width: 768px) {
  .dcx-ng-tooltip {
    --tooltip-max-width: 200px;
    --tooltip-font-size: 11px;
  }
} 

// ANIMACIONES
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

  </style>
`;

export const DefaultTooltip: Story = {
  args: {
    content: 'This is a tooltip',
  },
};
export const LeftTooltip: Story = {
  args: {
    position: TooltipPosition.LEFT,
    content: 'Tooltip on the left',
  },
};
export const RightTooltip: Story = {
  args: {
    position: TooltipPosition.RIGHT,
    content: 'Tooltip on the right',
  },
};
export const BottomTooltip: Story = {
  args: {
    position: TooltipPosition.BOTTOM,
    content: 'Tooltip on the bottom',
  },
};
export const TopTooltip: Story = {
  args: {
    position: TooltipPosition.TOP,
    content: 'Tooltip on the top',
  },
};
export const HideOnClickTooltip: Story = {
  args: {
    content: 'Tooltip on the top',
    hideTooltipOnClick: true,
  },
};
import { Meta, StoryObj } from '@storybook/angular';
import { palette } from '../../core/mock/colors';

interface GridStory {
  columns: number;
  gap: string;
}

const meta: Meta<GridStory> = {
  title: 'DCXLibrary/Utilities/Grid System',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      name: 'Columns',
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of columns to display',
      table: {
        category: 'Configuration',
        defaultValue: { summary: '3' },
      },
    },
    gap: {
      name: 'Gap',
      control: { type: 'select' },
      options: ['none', 'xs', 's', 'm', 'l', 'xl'],
      description: 'Gap between grid items',
      table: {
        category: 'Configuration',
        defaultValue: { summary: 'm' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<GridStory>;

const createGridItem = (index: number) => `
  <div style="background: ${palette.primary[100]}; padding: 1rem; border-radius: 4px; text-align: center; border: 2px solid ${palette.primary[400]}; color: ${palette.grey[700]}">
    Item ${index}
  </div>
`;

const createCol = (classes: string, content: string) => `
  <div class="dcx-col ${classes}">
    ${content}
  </div>
`;

const createColsWithFor = (
  count: number,
  classes: string,
  startIndex = 1,
  suffix = ''
) => {
  let html = '';

  for (let i = 0; i < count; i++) {
    html += createCol(classes, `${createGridItem(startIndex + i)}${suffix}`);
  }

  return html;
};

export const BasicGrid: Story = {
  args: {
    columns: 3,
    gap: 'm',
  },
  render: (args) => ({
    props: {
      span: Math.max(1, Math.floor(12 / args.columns)),
    },
    template: `
      <div class="dcx-grid dcx-grid--gap-${args.gap}">
        ${createColsWithFor(9, `dcx-col--${Math.max(1, Math.floor(12 / args.columns))}`)}
      </div>
    `,
  }),
};

export const DifferentColumnSizes: Story = {
  render: () => ({
    template: `
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Different Column Sizes</h3>
        <div class="dcx-grid dcx-grid--gap-m">
          ${createCol(
      'dcx-col--12',
      `<div style="background: ${palette.primary[200]}; padding: 1rem; border-radius: 4px; text-align: center; border: 2px solid ${palette.primary[400]}; color: ${palette.grey[700]}">
              Full Width (12 cols)
            </div>`
    )}
          ${createColsWithFor(2, 'dcx-col--6', 1, ' <br>(6 cols)')}
          ${createColsWithFor(3, 'dcx-col--4', 3, ' <br>(4 cols)')}
          ${createColsWithFor(1, 'dcx-col--3', 6, ' <br>(3 cols)')}
          ${createColsWithFor(1, 'dcx-col--9', 7, ' <br>(9 cols)')}
        </div>
      </div>
    `,
  }),
};

export const GapVariations: Story = {
  render: () => {
    const gaps = [
      { key: 'none', label: 'No Gap' },
      { key: 's', label: 'Small Gap' },
      { key: 'm', label: 'Medium Gap (default)' },
      { key: 'l', label: 'Large Gap' },
      { key: 'xl', label: 'Extra Large Gap' },
    ];

    let sections = '';

    for (const gap of gaps) {
      sections += `
        <h4 style="margin: 1rem 0 0.5rem;">${gap.label}</h4>
        <div class="dcx-grid dcx-grid--gap-${gap.key}">
          ${createColsWithFor(4, 'dcx-col--3')}
        </div>
      `;
    }

    return {
      template: `
        <div style="margin-bottom: 2rem;">
          <h3 style="margin-bottom: 1rem;">Gap Variations</h3>
          ${sections}
        </div>
      `,
    };
  },
};

export const AlignmentOptions: Story = {
  render: () => {
    const alignments = [
      {
        label: 'Align Start',
        className: 'dcx-grid--align-start',
        style: `min-height: 150px; background: ${palette.grey[100]};`,
      },
      {
        label: 'Align Center',
        className: 'dcx-grid--align-center',
        style: `min-height: 150px; background: ${palette.grey[100]};`,
      },
      {
        label: 'Align End',
        className: 'dcx-grid--align-end',
        style: `min-height: 150px; background: ${palette.grey[100]};`,
      },
      {
        label: 'Justify Center',
        className: 'dcx-grid--justify-center',
        style: '',
      },
    ];

    let sections = '';

    for (const alignment of alignments) {
      sections += `
        <h4 style="margin: 1rem 0 0.5rem;">${alignment.label}</h4>
        <div class="dcx-grid dcx-grid--gap-m ${alignment.className}" style="${alignment.style}">
          ${createColsWithFor(3, 'dcx-col--4')}
        </div>
      `;
    }

    return {
      template: `
        <div style="margin-bottom: 2rem;">
          <h3 style="margin-bottom: 1rem;">Alignment Options</h3>
          ${sections}
        </div>
      `,
    };
  },
};

export const ComplexLayout: Story = {
  render: () => ({
    template: `
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Complex Layout Example</h3>
        <div class="dcx-grid dcx-grid--gap-m">
          ${createCol(
      'dcx-col--12',
      `<div style="background: ${palette.primary[100]}; padding: 1.5rem; border-radius: 4px; text-align: center; border: 2px solid ${palette.primary[400]}; color: ${palette.grey[700]}">
              <strong>Header (Full Width)</strong>
            </div>`
    )}
          ${createCol(
      'dcx-col--12 dcx-col--md-3',
      `<div style="background: ${palette.primary[200]}; padding: 1.5rem; border-radius: 4px; min-height: 200px; border: 2px solid ${palette.primary[500]}; color: ${palette.grey[700]}">
              <strong>Sidebar</strong><br>(12 cols mobile, 3 cols tablet+)
            </div>`
    )}
          ${createCol(
      'dcx-col--12 dcx-col--md-9',
      `<div class="dcx-grid dcx-grid--gap-m">
              ${createColsWithFor(6, 'dcx-col--12 dcx-col--sm-6 dcx-col--lg-4')}
            </div>`
    )}
          ${createCol(
      'dcx-col--12',
      `<div style="background: ${palette.grey[200]}; padding: 1.5rem; border-radius: 4px; text-align: center; border: 2px solid ${palette.grey[400]}; color: ${palette.grey[700]}">
              <strong>Footer (Full Width)</strong>
            </div>`
    )}
        </div>
      </div>
    `,
  }),
};

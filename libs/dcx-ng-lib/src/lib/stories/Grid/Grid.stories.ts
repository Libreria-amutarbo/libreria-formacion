import { Meta, StoryObj } from '@storybook/angular';

interface GridStory {
  columns: number;
  gap: string;
}

const meta: Meta<GridStory> = {
  title: 'DCXLibrary/Grid System',
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
  <div style="background: #e0e7ff; padding: 1rem; border-radius: 4px; text-align: center; border: 2px solid #818cf8;">
    Item ${index}
  </div>
`;

export const BasicGrid: Story = {
  args: {
    columns: 3,
    gap: 'm',
  },
  render: (args) => ({
    template: `
      <div class="dcx-grid dcx-grid--gap-${args.gap}">
        ${Array.from({ length: 9 }, (_, i) => `
          <div class="dcx-col--${12 / args.columns}">
            ${createGridItem(i + 1)}
          </div>
        `).join('')}
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
          <div class="dcx-col--12">
            <div style="background: #dbeafe; padding: 1rem; border-radius: 4px; text-align: center; border: 2px solid #60a5fa;">
              Full Width (12 cols)
            </div>
          </div>
          <div class="dcx-col--6">
            ${createGridItem(1) + ' <br>(6 cols)'}
          </div>
          <div class="dcx-col--6">
            ${createGridItem(2) + ' <br>(6 cols)'}
          </div>
          <div class="dcx-col--4">
            ${createGridItem(3) + ' <br>(4 cols)'}
          </div>
          <div class="dcx-col--4">
            ${createGridItem(4) + ' <br>(4 cols)'}
          </div>
          <div class="dcx-col--4">
            ${createGridItem(5) + ' <br>(4 cols)'}
          </div>
          <div class="dcx-col--3">
            ${createGridItem(6) + ' <br>(3 cols)'}
          </div>
          <div class="dcx-col--9">
            ${createGridItem(7) + ' <br>(9 cols)'}
          </div>
        </div>
      </div>
    `,
  }),
};

export const GapVariations: Story = {
  render: () => ({
    template: `
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Gap Variations</h3>
        
        <h4 style="margin: 1rem 0 0.5rem;">No Gap</h4>
        <div class="dcx-grid dcx-grid--gap-none">
          ${Array.from({ length: 4 }, (_, i) => `
            <div class="dcx-col--3">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Small Gap</h4>
        <div class="dcx-grid dcx-grid--gap-s">
          ${Array.from({ length: 4 }, (_, i) => `
            <div class="dcx-col--3">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Medium Gap (default)</h4>
        <div class="dcx-grid dcx-grid--gap-m">
          ${Array.from({ length: 4 }, (_, i) => `
            <div class="dcx-col--3">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Large Gap</h4>
        <div class="dcx-grid dcx-grid--gap-l">
          ${Array.from({ length: 4 }, (_, i) => `
            <div class="dcx-col--3">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Extra Large Gap</h4>
        <div class="dcx-grid dcx-grid--gap-xl">
          ${Array.from({ length: 4 }, (_, i) => `
            <div class="dcx-col--3">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>
      </div>
    `,
  }),
};

export const AlignmentOptions: Story = {
  render: () => ({
    template: `
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Alignment Options</h3>
        
        <h4 style="margin: 1rem 0 0.5rem;">Align Start</h4>
        <div class="dcx-grid dcx-grid--gap-m dcx-grid--align-start" style="min-height: 150px; background: #f3f4f6;">
          ${Array.from({ length: 3 }, (_, i) => `
            <div class="dcx-col--4">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Align Center</h4>
        <div class="dcx-grid dcx-grid--gap-m dcx-grid--align-center" style="min-height: 150px; background: #f3f4f6;">
          ${Array.from({ length: 3 }, (_, i) => `
            <div class="dcx-col--4">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Align End</h4>
        <div class="dcx-grid dcx-grid--gap-m dcx-grid--align-end" style="min-height: 150px; background: #f3f4f6;">
          ${Array.from({ length: 3 }, (_, i) => `
            <div class="dcx-col--4">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Justify Center</h4>
        <div class="dcx-grid dcx-grid--gap-m dcx-grid--justify-center">
          ${Array.from({ length: 3 }, (_, i) => `
            <div class="dcx-col--4">
              ${createGridItem(i + 1)}
            </div>
          `).join('')}
        </div>
      </div>
    `,
  }),
};

export const ComplexLayout: Story = {
  render: () => ({
    template: `
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Complex Layout Example</h3>
        <div class="dcx-grid dcx-grid--gap-m">
          <div class="dcx-col--12">
            <div style="background: #fef3c7; padding: 1.5rem; border-radius: 4px; text-align: center; border: 2px solid #fbbf24;">
              <strong>Header (Full Width)</strong>
            </div>
          </div>
          <div class="dcx-col--12 dcx-col--md-3">
            <div style="background: #ddd6fe; padding: 1.5rem; border-radius: 4px; min-height: 200px; border: 2px solid #a78bfa;">
              <strong>Sidebar</strong><br>(12 cols mobile, 3 cols tablet+)
            </div>
          </div>
          <div class="dcx-col--12 dcx-col--md-9">
            <div class="dcx-grid dcx-grid--gap-m">
              ${Array.from({ length: 6 }, (_, i) => `
                <div class="dcx-col--12 dcx-col--sm-6 dcx-col--lg-4">
                  ${createGridItem(i + 1)}
                </div>
              `).join('')}
            </div>
          </div>
          <div class="dcx-col--12">
            <div style="background: #fce7f3; padding: 1.5rem; border-radius: 4px; text-align: center; border: 2px solid #f472b6;">
              <strong>Footer (Full Width)</strong>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

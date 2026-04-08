import { Meta, StoryObj } from '@storybook/angular';

const tk = {
  bgPrimary: 'var(--bg-primary, #0058ab)',
  bgPrimaryHover: 'var(--bg-primary-hover, #004080)',
  bgSurface: 'var(--bg-surface, #f4f5f7)',
  bgDefault: 'var(--bg-default, #ffffff)',
  textDark: 'var(--text-dark, #2a2e33)',
  textMuted: 'var(--text-muted, #696e75)',
  textWhite: 'var(--text-white, #ffffff)',
  borderDefault: 'var(--border-default, #2a2e33)',
  radiusSm: 'var(--r-sm, 4px)',
  radiusLg: 'var(--r-lg, 8px)',
  fsXs: 'var(--fs-xs, 11px)',
  fsBase: 'var(--fs-base, 14px)',
  fsMd: 'var(--fs-md, 16px)',
  fwSemibold: 'var(--fw-semibold, 600)',
  fwBold: 'var(--fw-bold, 700)',
  sp2: 'var(--sp-2, 8px)',
  sp3: 'var(--sp-3, 12px)',
  sp4: 'var(--sp-4, 16px)',
  sp6: 'var(--sp-6, 24px)',
  sp8: 'var(--sp-8, 32px)',
  sp10: 'var(--sp-10, 40px)',
  shadowSm: 'var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06))',
};

const FONT = "var(--ff-base, 'Inter', sans-serif)";

interface GridStory {
  items: number;
  columns: number;
  gap: string;
}

const meta: Meta<GridStory> = {
  title: 'DCXLibrary/Utilities/Grid System',
  tags: ['autodocs'],
  argTypes: {
    items: {
      name: 'Items',
      control: { type: 'number', min: 1, max: 48 },
      description: 'Number of grid items to display',
      table: {
        category: 'Configuration',
        defaultValue: { summary: '9' },
      },
    },
    columns: {
      name: 'Columns',
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of columns to display (clamped to items)',
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
  <div style="
    background: ${tk.bgPrimary};
    padding: ${tk.sp4};
    border-radius: ${tk.radiusSm};
    text-align: center;
    border: 1px solid ${tk.bgPrimaryHover};
    color: ${tk.textWhite};
    font-weight: ${tk.fwSemibold};
    font-size: ${tk.fsXs};
    font-family: ${FONT};
    opacity: 0.9;
  ">
    col-${index}
  </div>
`;

const createGridHighlightItem = (
  label: string,
  variant: 'primary' | 'surface',
) => `
  <div style="
    padding: ${tk.sp4};
    border-radius: ${tk.radiusSm};
    text-align: center;
    font-weight: ${tk.fwSemibold};
    font-size: ${tk.fsBase};
    font-family: ${FONT};
    ${
      variant === 'surface'
        ? `background: ${tk.bgSurface}; border: 1px solid ${tk.borderDefault}; color: ${tk.textMuted};`
        : `background: ${tk.bgPrimary}; border: 1px solid ${tk.bgPrimaryHover}; color: ${tk.textWhite};`
    }
  ">
    ${label}
  </div>
`;

const createCol = (classes: string, content: string) => `
  <div class="dcx-col ${classes}">
    ${content}
  </div>
`;

const createDesignCell = (
  label: string,
  flex: number,
  variant: 'primary' | 'surface' = 'primary',
  opacity = 0.85,
) => `
  <div
    style="
      flex: ${flex};
      height: calc(${tk.sp3} * 3);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${tk.radiusSm};
      font-size: ${tk.fsXs};
      font-weight: ${tk.fwSemibold};
      font-family: ${FONT};
      ${
        variant === 'surface'
          ? `background: ${tk.bgSurface}; border: 1px solid ${tk.borderDefault}; color: ${tk.textMuted};`
          : `background: ${tk.bgPrimary}; color: ${tk.textWhite}; opacity: ${opacity};`
      }
    "
  >
    ${label}
  </div>
`;

const createDesignRow = (cells: string, marginBottom = true) => `
  <div style="display: flex; gap: ${tk.sp2}; margin-bottom: ${marginBottom ? tk.sp2 : '0'};">
    ${cells}
  </div>
`;

const createColsWithFor = (
  count: number,
  classes: string,
  startIndex = 1,
  suffix = '',
) => {
  let html = '';

  for (let i = 0; i < count; i++) {
    html += createCol(classes, `${createGridItem(startIndex + i)}${suffix}`);
  }

  return html;
};

const createBasicGridItems = (count: number) => {
  let html = '';

  for (let i = 0; i < count; i++) {
    html += createGridItem(i + 1);
  }

  return html;
};

export const BasicGrid: Story = {
  args: {
    items: 9,
    columns: 3,
    gap: 'm',
  },
  render: args => {
    const safeItems = Math.max(1, Math.floor(args.items));
    const safeColumns = Math.max(1, Math.floor(args.columns));
    const effectiveColumns = Math.min(safeColumns, safeItems);

    return {
      template: `
        <div class="dcx-grid dcx-grid--gap-${args.gap}" style="grid-template-columns: repeat(${effectiveColumns}, minmax(0, 1fr));">
          ${createBasicGridItems(safeItems)}
        </div>
      `,
    };
  },
};

export const DesignGridLayout: Story = {
  name: 'Grid Layout',
  parameters: {
    docs: {
      description: {},
    },
  },
  render: () => ({
    template: `
      <section
        style="
          background: ${tk.bgDefault};
          border-radius: ${tk.radiusLg};
          padding: ${tk.sp4};
          font-family: ${FONT};
          box-shadow: ${tk.shadowSm};
        "
      >
        <h3 style="margin: 0 0 ${tk.sp4}; font-family: ${FONT}; font-size: ${tk.fsMd}; font-weight: ${tk.fwBold}; color: ${tk.textDark};">12 columns — example of distribution</h3>

        ${createDesignRow(
          new Array(12)
            .fill(0)
            .map((_, i) =>
              createDesignCell(
                'col-1',
                1,
                'primary',
                0.85 + (i % 2 === 0 ? 0.05 : 0),
              ),
            )
            .join(''),
        )}

        ${createDesignRow(
          [
            createDesignCell('col-4', 4, 'primary', 1),
            createDesignCell('col-4', 4, 'surface'),
            createDesignCell('col-4', 4, 'primary', 0.7),
          ].join(''),
        )}

        ${createDesignRow(
          [
            createDesignCell('col-3', 3, 'primary', 1),
            createDesignCell('col-6', 6, 'surface'),
            createDesignCell('col-3', 3, 'primary', 0.7),
          ].join(''),
        )}

        ${createDesignRow(
          [
            createDesignCell('col-8', 8, 'primary', 1),
            createDesignCell('col-4', 4, 'surface'),
          ].join(''),
          false,
        )}
      </section>
    `,
  }),
};

export const DifferentColumnSizes: Story = {
  render: () => ({
    template: `
      <div style="margin-bottom: ${tk.sp8}; font-family: ${FONT};">
        <div class="dcx-grid dcx-grid--gap-m">
          ${createCol(
            'dcx-col--12',
            createGridHighlightItem('col-12', 'primary'),
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
        <h4 style="margin: ${tk.sp4} 0 ${tk.sp2}; font-family: ${FONT}; font-size: ${tk.fsBase}; font-weight: ${tk.fwSemibold}; color: ${tk.textDark};">${gap.label}</h4>
        <div class="dcx-grid dcx-grid--gap-${gap.key}">
          ${createColsWithFor(4, 'dcx-col--3')}
        </div>
      `;
    }

    return {
      template: `
        <div style="margin-bottom: ${tk.sp8}; font-family: ${FONT};">
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
        style: `min-height: calc(${tk.sp10} * 4); background: ${tk.bgSurface}; border: 1px solid ${tk.borderDefault}; border-radius: ${tk.radiusSm};`,
      },
      {
        label: 'Align Center',
        className: 'dcx-grid--align-center',
        style: `min-height: calc(${tk.sp10} * 4); background: ${tk.bgSurface}; border: 1px solid ${tk.borderDefault}; border-radius: ${tk.radiusSm};`,
      },
      {
        label: 'Align End',
        className: 'dcx-grid--align-end',
        style: `min-height: calc(${tk.sp10} * 4); background: ${tk.bgSurface}; border: 1px solid ${tk.borderDefault}; border-radius: ${tk.radiusSm};`,
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
        <h4 style="margin: ${tk.sp4} 0 ${tk.sp2}; font-family: ${FONT}; font-size: ${tk.fsBase}; font-weight: ${tk.fwSemibold}; color: ${tk.textDark};">${alignment.label}</h4>
        <div class="dcx-grid dcx-grid--gap-m ${alignment.className}" style="${alignment.style}">
          ${createColsWithFor(3, 'dcx-col--4')}
        </div>
      `;
    }

    return {
      template: `
        <div style="margin-bottom: ${tk.sp8}; font-family: ${FONT};">
          ${sections}
        </div>
      `,
    };
  },
};

export const ComplexLayout: Story = {
  render: () => ({
    template: `
      <div style="margin-bottom: ${tk.sp8}; font-family: ${FONT};">
        <div class="dcx-grid dcx-grid--gap-m">
          ${createCol(
            'dcx-col--12',
            createGridHighlightItem(
              '<strong>Header (Full Width)</strong>',
              'primary',
            ),
          )}
          ${createCol(
            'dcx-col--12 dcx-col--md-3',
            `<div style="background: ${tk.bgSurface}; padding: ${tk.sp6}; border-radius: ${tk.radiusSm}; min-height: calc(${tk.sp10} * 5); border: 1px solid ${tk.borderDefault}; color: ${tk.textMuted}; font-family: ${FONT}; font-weight: ${tk.fwSemibold}; font-size: ${tk.fsBase};">
              <strong>Sidebar</strong><br>(12 cols mobile, 3 cols tablet+)
            </div>`,
          )}
          ${createCol(
            'dcx-col--12 dcx-col--md-9',
            `<div class="dcx-grid dcx-grid--gap-m">
              ${createColsWithFor(6, 'dcx-col--12 dcx-col--sm-6 dcx-col--lg-4')}
            </div>`,
          )}
          ${createCol(
            'dcx-col--12',
            createGridHighlightItem(
              '<strong>Footer (Full Width)</strong>',
              'primary',
            ),
          )}
        </div>
      </div>
    `,
  }),
};

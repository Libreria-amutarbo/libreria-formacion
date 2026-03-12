import { palette, tokens } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';



type PaletteGroup = 'primary' | 'grey' | 'base';

interface ColorStoryArgs {
    group: PaletteGroup;
    columns: number;
}

const meta: Meta<ColorStoryArgs> = {
    title: 'DCXLibrary/Utilities/Color System',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        controls: { expanded: true },
    },
    argTypes: {
        group: {
            control: { type: 'select' },
            options: ['primary', 'grey', 'base'],
            description: 'Color palette group to render',
            table: {
                category: 'Attributes',
                type: { summary: "'primary' | 'grey' | 'base'" },
                defaultValue: { summary: 'primary' },
            },
        },
        columns: {
            control: { type: 'number', min: 1, max: 6 },
            description: 'Columns used in swatches layout',
            table: {
                category: 'Attributes',
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<ColorStoryArgs>;

const createSwatch = (name: string, value: string, dark = false) => `
  <div style="border: 1px solid ${palette.grey[200]}; border-radius: 8px; overflow: hidden; background: ${palette.base.white};">
    <div style="background: ${value}; color: ${dark ? palette.base.white : palette.grey[700]}; padding: 1rem; min-height: 72px; display: flex; align-items: end; font-weight: 600;">
      ${name}
    </div>
    <div style="padding: 0.75rem; color: ${palette.grey[600]}; border-top: 1px solid ${palette.grey[200]}; font-family: monospace; font-size: 0.8rem;">
      ${value}
    </div>
  </div>
`;

const createCol = (span: number, content: string) => `
  <div class="dcx-col dcx-col--${span}">${content}</div>
`;

const buildPaletteGrid = (group: PaletteGroup, columns: number) => {
    const safeColumns = Math.max(1, Math.min(columns, 6));
    const span = Math.max(1, Math.floor(12 / safeColumns));
    let html = '';

    for (const key in palette[group]) {
        const value = palette[group][key as unknown as keyof (typeof palette)[PaletteGroup]];
        const dark = Number(key) >= 500;
        html += createCol(span, createSwatch(`${group}.${key}`, value, dark));
    }

    return `<div class="dcx-grid dcx-grid--gap-m">${html}</div>`;
};

const buildSemanticGrid = () => {
    let html = '';

    for (const key in palette.semantic) {
        html += createCol(4, createSwatch(`semantic.${key}`, palette.semantic[key as keyof typeof palette.semantic], false));
    }

    html += createCol(4, createSwatch('base.white', palette.base.white, false));

    return `<div class="dcx-grid dcx-grid--gap-m">${html}</div>`;
};

const buildColorNameMap = () => {
    const colorNameMap = new Map<string, string>();

    for (const group in palette) {
        const groupValue = palette[group as keyof typeof palette] as Record<string, string>;

        for (const tone in groupValue) {
            const value = groupValue[tone];
            colorNameMap.set(value.toLowerCase(), `palette.${group}.${tone}`);
        }
    }

    return colorNameMap;
};

const colorNameMap = buildColorNameMap();

const getColorName = (value: string) => {
    return colorNameMap.get(value.toLowerCase()) ?? value;
};

const buildTokenTable = (title: string, section: Record<string, string>) => {
    let rows = '';

    for (const key in section) {
        const tokenValue = section[key];

        rows += `
      <div style="display: flex; justify-content: space-between; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid ${palette.grey[200]}; color: ${palette.grey[700]};">
        <span>${key}</span>
        <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
          <span style="width: 12px; height: 12px; border-radius: 999px; background: ${tokenValue}; border: 1px solid ${palette.grey[300]}; display: inline-block;"></span>
          <code style="font-family: monospace; color: ${palette.grey[600]};">${getColorName(tokenValue)}</code>
        </span>
      </div>
    `;
    }

    return `
    <div style="border: 1px solid ${palette.grey[200]}; border-radius: 8px; background: ${palette.base.white}; padding: 1rem;">
      <h4 style="margin: 0 0 0.75rem; color: ${palette.grey[700]};">${title}</h4>
      ${rows}
    </div>
  `;
};

export const PalettePreview: Story = {
    args: {
        group: 'primary',
        columns: 4,
    },
    render: (args) => ({
        template: `
      <section>
        <h3 style="margin: 0 0 1rem; color: ${palette.grey[700]};">Palette Preview: ${args.group}</h3>
        ${buildPaletteGrid(args.group, args.columns)}
      </section>
    `,
    }),
};

export const SemanticPalette: Story = {
    render: () => ({
        template: `
      <section>
        <h3 style="margin: 0 0 1rem; color: ${palette.grey[700]};">Semantic Colors</h3>
        ${buildSemanticGrid()}
      </section>
    `,
    }),
};

export const NeutralPalette: Story = {
    render: () => ({
        template: `
      <section>
        <h3 style="margin: 0 0 1rem; color: ${palette.grey[700]};">Grey + White</h3>
        <div class="dcx-grid dcx-grid--gap-m">
          ${createCol(3, createSwatch('grey.100', palette.grey[100], false))}
          ${createCol(3, createSwatch('grey.200', palette.grey[200], false))}
          ${createCol(3, createSwatch('grey.300', palette.grey[300], false))}
          ${createCol(3, createSwatch('grey.400', palette.grey[400], false))}
          ${createCol(3, createSwatch('grey.500', palette.grey[500], true))}
          ${createCol(3, createSwatch('grey.600', palette.grey[600], true))}
          ${createCol(3, createSwatch('grey.700', palette.grey[700], true))}
          ${createCol(3, createSwatch('base.white', palette.base.white, false))}
        </div>
      </section>
    `,
    }),
};

export const TokenReference: Story = {
    render: () => ({
        template: `
      <section>
        <h3 style="margin: 0 0 1rem; color: ${palette.grey[700]};">Token Reference</h3>
        <div class="dcx-grid dcx-grid--gap-m">
          <div class="dcx-col dcx-col--6">${buildTokenTable('text-', tokens.text)}</div>
          <div class="dcx-col dcx-col--6">${buildTokenTable('background-', tokens.background)}</div>
          <div class="dcx-col dcx-col--6">${buildTokenTable('content-', tokens.content)}</div>
          <div class="dcx-col dcx-col--6">${buildTokenTable('border-', tokens.border)}</div>
        </div>
      </section>
    `,
    }),
};

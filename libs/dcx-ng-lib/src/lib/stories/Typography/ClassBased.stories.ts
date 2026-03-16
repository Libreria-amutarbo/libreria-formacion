import { Meta, StoryObj } from '@storybook/angular';

enum FontFamily {
  Primary = 'primary',
  Secondary = 'secondary',
  System = 'system',
  Monospace = 'monospace',
}

type FontFamilyType = `${FontFamily}`;

interface TypographyStoryArgs {
  fontFamily: FontFamilyType;
  sampleText: string;
}

const meta: Meta<TypographyStoryArgs> = {
  title: 'DCXLibrary/Utilities/Typography System',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    fontFamily: {
      control: { type: 'select' },
      options: Object.values(FontFamily),
      description: 'Font family applied to typography previews',
      table: {
        category: 'Attributes',
        type: { summary: "'primary' | 'secondary' | 'system' | 'monospace'" },
        defaultValue: { summary: 'primary' },
      },
    },
    sampleText: {
      control: { type: 'text' },
      description: 'Sample text rendered in typography examples',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'Capgemini acelera la transformación digital con innovación y tecnología.' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TypographyStoryArgs>;

const getFontFamilyVar = (fontFamily: FontFamilyType) => {
  const map: Record<FontFamilyType, string> = {
    [FontFamily.Primary]: 'var(--font-family-primary)',
    [FontFamily.Secondary]: 'var(--font-family-secondary)',
    [FontFamily.System]: 'var(--font-family-system)',
    [FontFamily.Monospace]: 'var(--font-family-monospace)',
  };

  return map[fontFamily];
};

const createScaleItem = (
  label: string,
  fontSizeVar: string,
  lineHeightVar: string,
  text: string,
  familyVar: string
) => `
  <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--color-border);">
    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 0.25rem; font-family: var(--font-family-monospace);">
      ${label} · ${fontSizeVar} / ${lineHeightVar}
    </div>
    <div style="font-family: ${familyVar}; font-size: var(${fontSizeVar}); line-height: var(${lineHeightVar}); color: var(--color-text-primary);">
      ${text}
    </div>
  </div>
`;

const createWeightItem = (
  label: string,
  weightVar: string,
  text: string,
  familyVar: string
) => `
  <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--color-border);">
    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 0.25rem; font-family: var(--font-family-monospace);">
      ${label} · ${weightVar}
    </div>
    <div style="font-family: ${familyVar}; font-weight: var(${weightVar}); font-size: var(--font-size-body-large); line-height: var(--line-height-normal); color: var(--color-text-primary);">
      ${text}
    </div>
  </div>
`;

const createSpacingItem = (
  label: string,
  lineHeightVar: string,
  letterSpacingVar: string,
  text: string,
  familyVar: string
) => `
  <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--color-border);">
    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 0.25rem; font-family: var(--font-family-monospace);">
      ${label} · ${lineHeightVar} / ${letterSpacingVar}
    </div>
    <div style="font-family: ${familyVar}; font-size: var(--font-size-body); line-height: var(${lineHeightVar}); letter-spacing: var(${letterSpacingVar}); color: var(--color-text-primary);">
      ${text}
    </div>
  </div>
`;

const createFamilyItem = (label: string, familyVar: string, text: string) => `
  <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--color-border);">
    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 0.25rem; font-family: var(--font-family-monospace);">
      ${label} · ${familyVar}
    </div>
    <div style="font-family: ${familyVar}; font-size: var(--font-size-body-large); line-height: var(--line-height-normal); color: var(--color-text-primary);">
      ${text}
    </div>
  </div>
`;

export const TypeScale: Story = {
  args: {
    fontFamily: FontFamily.Primary,
    sampleText: 'Capgemini acelera la transformación digital con innovación y tecnología.',
  },
  render: (args) => {
    const familyVar = getFontFamilyVar(args.fontFamily);
    const scale = [
      { label: 'H1', size: '--font-size-h1', line: '--line-height-tight' },
      { label: 'H2', size: '--font-size-h2', line: '--line-height-tight' },
      { label: 'H3', size: '--font-size-h3', line: '--line-height-tight' },
      { label: 'H4', size: '--font-size-h4', line: '--line-height-normal' },
      { label: 'Body Large', size: '--font-size-body-large', line: '--line-height-normal' },
      { label: 'Body', size: '--font-size-body', line: '--line-height-normal' },
      { label: 'Body Small', size: '--font-size-body-small', line: '--line-height-normal' },
      { label: 'Caption', size: '--font-size-caption', line: '--line-height-normal' },
      { label: 'Overline', size: '--font-size-overline', line: '--line-height-normal' },
    ];

    let items = '';
    for (const item of scale) {
      items += createScaleItem(item.label, item.size, item.line, args.sampleText, familyVar);
    }

    return {
      template: `
        <section>
          <h3 style="margin: 0 0 1rem; color: var(--color-text-primary);">Type Scale</h3>
          <div style="border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface); padding: 1rem;">
            ${items}
          </div>
        </section>
      `,
    };
  },
};

export const FontWeights: Story = {
  args: {
    fontFamily: FontFamily.Primary,
    sampleText: 'Capgemini acompaña a sus clientes en su estrategia de negocio y TI.',
  },
  render: (args) => {
    const familyVar = getFontFamilyVar(args.fontFamily);
    const weights = [
      { label: 'Light', weight: '--font-weight-light' },
      { label: 'Regular', weight: '--font-weight-regular' },
      { label: 'Medium', weight: '--font-weight-medium' },
      { label: 'Semibold', weight: '--font-weight-semibold' },
      { label: 'Bold', weight: '--font-weight-bold' },
    ];

    let items = '';
    for (const weight of weights) {
      items += createWeightItem(weight.label, weight.weight, args.sampleText, familyVar);
    }

    return {
      template: `
        <section>
          <h3 style="margin: 0 0 1rem; color: var(--color-text-primary);">Font Weights</h3>
          <div style="border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface); padding: 1rem;">
            ${items}
          </div>
        </section>
      `,
    };
  },
};

export const FontFamilies: Story = {
  args: {
    sampleText: 'Capgemini impulsa experiencias digitales consistentes en todos los canales.',
    fontFamily: FontFamily.Primary,
  },
  render: (args) => {
    const families: Array<{ label: string; value: FontFamilyType }> = [
      { label: 'Primary', value: FontFamily.Primary },
      { label: 'Secondary', value: FontFamily.Secondary },
      { label: 'System', value: FontFamily.System },
      { label: 'Monospace', value: FontFamily.Monospace },
    ];

    let items = '';
    for (const family of families) {
      items += createFamilyItem(
        family.label,
        getFontFamilyVar(family.value),
        args.sampleText
      );
    }

    return {
      template: `
      <section>
        <h3 style="margin: 0 0 1rem; color: var(--color-text-primary);">Font Families</h3>
        <div style="border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface); padding: 1rem;">
        ${items}
        </div>
      </section>
      `,
    };
  },
};

export const LineHeightAndLetterSpacing: Story = {
  args: {
    fontFamily: FontFamily.Primary,
    sampleText: 'Equipos globales de Capgemini diseñan soluciones escalables y sostenibles.',
  },
  render: (args) => {
    const familyVar = getFontFamilyVar(args.fontFamily);
    const spacing = [
      { label: 'Tight + Tight', line: '--line-height-tight', letter: '--letter-spacing-tight' },
      { label: 'Normal + Normal', line: '--line-height-normal', letter: '--letter-spacing-normal' },
      { label: 'Relaxed + Wide', line: '--line-height-relaxed', letter: '--letter-spacing-wide' },
      { label: 'Relaxed + Wider', line: '--line-height-relaxed', letter: '--letter-spacing-wider' },
    ];

    let items = '';
    for (const item of spacing) {
      items += createSpacingItem(item.label, item.line, item.letter, args.sampleText, familyVar);
    }

    return {
      template: `
        <section>
          <h3 style="margin: 0 0 1rem; color: var(--color-text-primary);">Line Height & Letter Spacing</h3>
          <div style="border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface); padding: 1rem;">
            ${items}
          </div>
        </section>
      `,
    };
  },
};

export const NewUserComponentExample: Story = {
  args: {
    fontFamily: FontFamily.Primary,
    sampleText: 'Capgemini acelera la transformación digital con innovación y tecnología.',
  },
  render: (args) => {
    const familyVar = getFontFamilyVar(args.fontFamily);

    return {
      template: `
        <section>
          <h3 style="margin: 0 0 0.5rem; color: var(--color-text-primary);">Quick Start: Tipografía en un componente</h3>
          <p style="margin: 0 0 1rem; color: var(--color-text-secondary);">
            Ejemplo simple para una persona nueva en la librería: copia HTML + SCSS y sustituye tus textos.
          </p>

          <div style="border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-surface); padding: 1rem; margin-bottom: 1rem;">
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); font-family: var(--font-family-monospace); margin-bottom: 0.5rem;">
              Resultado visual
            </div>

            <article style="display: grid; gap: 0.5rem; font-family: ${familyVar};">
              <span style="font-size: var(--font-size-h3); line-height: var(--line-height-tight); font-weight: var(--font-weight-semibold); color: var(--color-text-primary);">
                Portal de Componentes DCX
              </span>
              <span style="font-size: var(--font-size-body); line-height: var(--line-height-normal); font-weight: var(--font-weight-regular); color: var(--color-text-primary);">
                Guía rápida para integrar tipografía corporativa en nuevas pantallas.
              </span>
              <span style="font-size: var(--font-size-caption); line-height: var(--line-height-normal); letter-spacing: var(--letter-spacing-wide); color: var(--color-text-secondary);">
                Actualizado por UX/UI · marzo 2026
              </span>
            </article>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); font-family: var(--font-family-monospace); margin-bottom: 0.5rem;">
                my-component.html
              </div>
              <pre ngNonBindable style="margin: 0; background: #0f172a; color: #e2e8f0; border-radius: 6px; padding: 0.75rem; overflow: auto; font-size: 0.75rem;"><code>&lt;article class="summary-card"&gt;
  &lt;h3 class="summary-card__title"&gt;Portal de Componentes DCX&lt;/h3&gt;
  &lt;p class="summary-card__description"&gt;
    Guía rápida para integrar tipografía corporativa en nuevas pantallas.
  &lt;/p&gt;
  &lt;span class="summary-card__meta"&gt;Actualizado por UX/UI · marzo 2026&lt;/span&gt;
&lt;/article&gt;</code></pre>
            </div>

            <div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); font-family: var(--font-family-monospace); margin-bottom: 0.5rem;">
                my-component.scss
              </div>
              <pre ngNonBindable style="margin: 0; background: #0f172a; color: #e2e8f0; border-radius: 6px; padding: 0.75rem; overflow: auto; font-size: 0.75rem;"><code>.summary-card &#123;
  display: grid;
  gap: 0.5rem;
  font-family: var(--font-family-primary);

  &__title &#123;
    font-size: var(--font-size-h3);
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-semibold);
  &#125;

  &__description &#123;
    font-size: var(--font-size-body);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-regular);
  &#125;

  &__meta &#123;
    font-size: var(--font-size-caption);
    line-height: var(--line-height-normal);
    letter-spacing: var(--letter-spacing-wide);
  &#125;
&#125;</code></pre>
            </div>
          </div>
        </section>
      `,
    };
  },
};

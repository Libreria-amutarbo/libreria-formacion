import { CAPGEMINI_THEME_TOKENS, DcxNgThemeGeneratorComponent, ThemeGeneratorActions } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';



const meta: Meta<DcxNgThemeGeneratorComponent> = {
  title: 'DCXLibrary/Utilities/Theme Generator',
  component: DcxNgThemeGeneratorComponent,
  tags: ['autodocs'],
  argTypes: {
    tokens: {
      control: 'object',
      description:
        'Lista de tokens a mostrar y editar. Por defecto usa los tokens Capgemini.',
      table: { category: 'Attributes' },
    },
    downloadFileName: {
      control: 'text',
      description: 'Nombre del archivo CSS al descargar.',
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'theme-client.css' },
      },
    },
    themeChanged: {
      action: 'themeChanged',
      description:
        'Emite la lista de tokens cada vez que se modifica un valor.',
      table: { category: 'Eventos', type: { summary: 'ThemeToken[]' } },
    },
    cssGenerated: {
      action: 'cssGenerated',
      description: 'Emite el CSS generado al copiar o descargar.',
      table: { category: 'Eventos', type: { summary: 'string' } },
    },
  },
  args: {
    tokens: CAPGEMINI_THEME_TOKENS,
    downloadFileName: 'theme-client.css',
    themeChanged: ThemeGeneratorActions.themeChanged,
    cssGenerated: ThemeGeneratorActions.cssGenerated,
  },
  parameters: {
    controls: { expanded: true },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<DcxNgThemeGeneratorComponent>;

export const Default: Story = {};

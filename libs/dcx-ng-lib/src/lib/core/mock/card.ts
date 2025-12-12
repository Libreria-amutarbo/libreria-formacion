import { Story } from 'storybook/internal/csf';
import { BorderStyleCard, ShadowPresetCard } from '../interfaces/card';
import { DcxAlign, DcxLayout, DcxSize } from '../interfaces';
import { ALIGN_DEFAULT, LAYOUT_DEFAULT, SIZE_DEFAULT } from './generic';

export const TITLE_DEFAULT = 'Título de la carta';

export const SUBTITLE = 'Subtítulo de la carta';

export const IMAGE = 'https://picsum.photos/360/240';

export const IMAGE_ALT = '-';

export const MAX_CONTENT_WIDTH = '560px';

export const MAX_IMAGE_WIDTH = '100%';

export const BORDERED = false;

export const BORDER_WIDTH = 1;

export const BORDER_STYLE_DEFAULT: BorderStyleCard = 'solid';
export const BORDER_STYLE_LIST: BorderStyleCard[] = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'none',
];

export const INTERACTIVE = true;

export const DISABLED = false;

export const SHADOW_DEFAULT: ShadowPresetCard = 1;
export const SHADOW_LIST: ShadowPresetCard[] = [0, 1, 2, 3];

export const DEFAULTARGS = {
  align: ALIGN_DEFAULT,
  bordered: BORDERED,
  borderStyle: BORDER_STYLE_DEFAULT,
  borderWidth: BORDER_WIDTH,
  disabled: DISABLED,
  image: IMAGE,
  imageAlt: IMAGE_ALT,
  interactive: INTERACTIVE,
  layout: LAYOUT_DEFAULT,
  maxContentWidth: MAX_CONTENT_WIDTH,
  maxImageWidth: MAX_IMAGE_WIDTH,
  shadow: SHADOW_DEFAULT,
  size: SIZE_DEFAULT,
  subtitle: SUBTITLE,
  title: TITLE_DEFAULT,
};

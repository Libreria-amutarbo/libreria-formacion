import { Story } from 'storybook/internal/csf';
import { Variant } from '../interfaces/card';

export const TITLE = 'Título de la carta';

export const SUBTITLE = 'Subtítulo de la carta';

export const IMAGE = 'https://picsum.photos/360/240';

export const IMAGE_ALT = '-';

export const VARIANTLIST: Variant[] = ['elevated', 'outlined', 'subtle'];
export const VARIANT: Variant = 'outlined';

export const LAYOUT: 'vertical' | 'horizontal' = 'vertical';

export const ALIGN: 'start' | 'center' | 'end' = 'center';

export const SIZE: 'sm' | 'md' | 'lg' = 'md';

export const MAX_CONTENT_WIDTH = '560px';

export const MAX_IMAGE_WIDTH = '100%';

export const BORDERED = false;

export const BORDER_WIDTH = 1;

export const BORDER_STYLE: 'solid' | 'dashed' | 'dotted' | 'double' | 'none' =
  'solid';

export const BORDER_COLOR = '#CCBABA';

export const INTERACTIVE = true;

export const DISABLED = false;

export const SHADOW: 0 | 1 | 2 | 3 | 'custom' = 1;

export const DEFAULTARGS = {
  title: TITLE,
  subtitle: SUBTITLE,
  image: IMAGE,
  imageAlt: IMAGE_ALT,
  variant: VARIANT,
  layout: LAYOUT,
  align: ALIGN,
  size: SIZE,
  maxContentWidth: MAX_CONTENT_WIDTH,
  maxImageWidth: MAX_IMAGE_WIDTH,
  bordered: BORDERED,
  borderWidth: BORDER_WIDTH,
  borderStyle: BORDER_STYLE,
  borderColor: BORDER_COLOR,
  interactive: INTERACTIVE,
  disabled: DISABLED,
  shadow: SHADOW,
};

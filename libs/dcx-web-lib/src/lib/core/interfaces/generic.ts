export const DCX_SIZES = ['s', 'm', 'l', 'xl', 'auto'] as const;
export type DcxSize = typeof DCX_SIZES[number];

export const DCX_POSITIONS = ['top', 'bottom', 'left', 'right'] as const;
export type DcxPosition = typeof DCX_POSITIONS[number];

export const DCX_LAYOUTS = ['vertical', 'horizontal'] as const;
export type DcxLayout = typeof DCX_LAYOUTS[number];

export const DCX_ALIGNS = ['start', 'center', 'end'] as const;
export type DcxAlign = typeof DCX_ALIGNS[number];

export const DCX_SPACINGS = ['xs', 's', 'm', 'l', 'xl'] as const;
export type DcxSpacing = typeof DCX_SPACINGS[number];

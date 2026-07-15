export const CAROUSEL_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export type DcxCarouselOrientation = (typeof CAROUSEL_ORIENTATIONS)[number];

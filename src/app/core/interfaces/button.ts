export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'icon';

export const ICON_POSITION = {
    start: 'start',
    end: 'end',
};

export type IconPosition = typeof ICON_POSITION[keyof typeof ICON_POSITION];
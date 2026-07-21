export type DcxButtonType = 'button' | 'submit' | 'reset';
export type DcxButtonVariant = 'primary' | 'secondary' | 'terciary' | 'danger' | 'icon-only' | 'text';
export declare const ICON_POSITION: {
    readonly left: "left";
    readonly right: "right";
    readonly top: "top";
    readonly bottom: "bottom";
};
export type DcxIconPosition = (typeof ICON_POSITION)[keyof typeof ICON_POSITION];

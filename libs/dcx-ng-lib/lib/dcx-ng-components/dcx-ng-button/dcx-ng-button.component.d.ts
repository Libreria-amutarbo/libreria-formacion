import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary' | 'link' | 'icon';
type ButtonSize = 'small' | 'medium' | 'large' | 'block';
type IconSize = 's' | 'm' | 'l' | 'xl';
type IconSpacing = 'none' | 'compact' | 'spacious';
export declare const ICON_POSITION: {
    readonly start: "start";
    readonly end: "end";
};
export type IconPosition = typeof ICON_POSITION[keyof typeof ICON_POSITION];
export declare class DcxNgButtonComponent {
    label: string;
    ariaLabel: string;
    type: ButtonType;
    disabled: boolean;
    variant?: ButtonVariant;
    size: ButtonSize;
    class: string;
    iconName?: string;
    iconPosition: IconPosition;
    iconSize?: IconSize;
    iconSpacing: IconSpacing;
    iconColor: string;
    set icon(_legacy: string);
    buttonClick: EventEmitter<{
        clicked: boolean;
    }>;
    readonly IconPos: {
        readonly start: "start";
        readonly end: "end";
    };
    get computedAriaLabel(): string | null;
    private readonly sizeToIconMap;
    get effectiveIconSize(): IconSize;
    get buttonClasses(): string;
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgButtonComponent, "dcx-ng-button", never, { "label": { "alias": "label"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "type": { "alias": "type"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "class": { "alias": "class"; "required": false; }; "iconName": { "alias": "iconName"; "required": false; }; "iconPosition": { "alias": "iconPosition"; "required": false; }; "iconSize": { "alias": "iconSize"; "required": false; }; "iconSpacing": { "alias": "iconSpacing"; "required": false; }; "iconColor": { "alias": "iconColor"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, { "buttonClick": "buttonClick"; }, never, ["dcx-ng-icon", "[button-trailing]"], true, never>;
}
export {};

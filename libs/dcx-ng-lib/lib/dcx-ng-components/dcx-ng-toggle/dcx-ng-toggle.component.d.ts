import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
type ToggleSize = 'small' | 'medium' | 'large';
export declare enum TogglePosition {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}
export declare class DcxNgToggleComponent {
    checked: boolean;
    disabled: boolean;
    label: string | null;
    size: ToggleSize;
    color: string;
    ariaLabel: string;
    textPosition: TogglePosition;
    toggled: EventEmitter<boolean>;
    get ariaLabelBinding(): string;
    get sizeClasses(): string;
    toggle(): void;
    handleKeyboardToggle(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgToggleComponent, "dcx-ng-toggle", never, { "checked": { "alias": "checked"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; "size": { "alias": "size"; "required": false; }; "color": { "alias": "color"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "textPosition": { "alias": "textPosition"; "required": false; }; }, { "toggled": "toggled"; }, never, never, true, never>;
}
export {};

import { EventEmitter, Signal } from '@angular/core';
import * as i0 from "@angular/core";
export declare enum ThemeColors {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    INFO = "info",
    GRAY = "gray",
    GRAY_LIGHT = "gray-light"
}
export type ChipType = 'label-only' | 'with-icon' | 'with-image';
export type ThemeColorsType = `${ThemeColors}`;
interface DcxNgChipComponentInputs {
    label: Signal<string>;
    color: Signal<ThemeColorsType>;
    removable: Signal<boolean>;
    icon: Signal<string>;
    image: Signal<string>;
}
export declare class DcxNgChipComponent implements DcxNgChipComponentInputs {
    label: import("@angular/core").InputSignal<string>;
    color: import("@angular/core").InputSignal<"primary" | "secondary" | "error" | "success" | "warning" | "info" | "gray" | "gray-light">;
    removable: import("@angular/core").InputSignal<boolean>;
    icon: import("@angular/core").InputSignal<string>;
    image: import("@angular/core").InputSignal<string>;
    onRemove: EventEmitter<void>;
    readonly ThemeColors: typeof ThemeColors;
    readonly ChipTypeValues: {
        LABEL_ONLY: "label-only";
        WITH_ICON: "with-icon";
        WITH_IMAGE: "with-image";
    };
    chipType: Signal<ChipType>;
    get chipClasses(): string;
    handleRemove(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgChipComponent, "dcx-ng-chip", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "removable": { "alias": "removable"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "image": { "alias": "image"; "required": false; "isSignal": true; }; }, { "onRemove": "onRemove"; }, never, never, true, never>;
}
export {};

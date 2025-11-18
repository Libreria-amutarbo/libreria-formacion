import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare enum InputType {
    TEXT = "text",
    NUMBER = "number",
    EMAIL = "email",
    PASSWORD = "password",
    SEARCH = "search",
    TEL = "tel",
    URL = "url"
}
export declare enum InputSize {
    SMALL = "s",
    MEDIUM = "m",
    LARGE = "l",
    EXTRA_LARGE = "xl",
    AUTO = "auto"
}
export interface ErrorMessage {
    type: string;
    message: string;
}
export declare class DcxNgInputComponent implements OnInit, OnChanges, OnDestroy {
    type: InputType;
    placeholder: string | null;
    size: InputSize;
    disabled: boolean;
    required: boolean;
    label: string | null;
    errorMessages: ErrorMessage[];
    set value(val: string);
    valueChange: EventEmitter<string>;
    inputControl: FormControl;
    isFocused: boolean;
    inputId: string;
    private destroy$;
    constructor();
    ngOnDestroy(): void;
    ngOnInit(): void;
    setupFormControl(): void;
    private setupValueChanges;
    ngOnChanges(changes: SimpleChanges): void;
    getErrorMessage(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgInputComponent, "dcx-ng-input", never, { "type": { "alias": "type"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "size": { "alias": "size"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "label": { "alias": "label"; "required": false; }; "errorMessages": { "alias": "errorMessages"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}

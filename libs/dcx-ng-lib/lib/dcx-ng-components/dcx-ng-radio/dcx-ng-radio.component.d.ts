import { FormControl } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
type RadioSize = 's' | 'm' | 'l';
export declare class DcxNgRadioComponent implements ControlValueAccessor {
    name: string;
    value: string | null;
    label: string | null;
    disabled: boolean;
    size: RadioSize;
    ariaLabel: string;
    unstyled: boolean;
    formControl: FormControl<string>;
    onChange: (value: string | null) => void;
    onTouched: () => void;
    private cdr;
    constructor();
    get isChecked(): boolean;
    get sizeClass(): string;
    get ariaLabelBinding(): string;
    onInputChange(value: string | null): void;
    writeValue(value: string | null): void;
    registerOnChange(fn: (value: string | null) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgRadioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgRadioComponent, "dcx-ng-radio", never, { "name": { "alias": "name"; "required": false; }; "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "size": { "alias": "size"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "unstyled": { "alias": "unstyled"; "required": false; }; }, {}, never, never, true, never>;
}
export {};

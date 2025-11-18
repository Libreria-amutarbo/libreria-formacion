import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
interface SelectOptions {
    value: any;
    label: string;
}
export declare class DcxNgSelectComponent implements ControlValueAccessor {
    options: SelectOptions[];
    placeholder: string;
    /** Texto visible encima del select */
    label: string;
    /** Nombre accesible (solo si NO hay label visible) */
    ariaLabel: string;
    /** id único para asociar <label for> con <select id> */
    selectId: string;
    disabled: boolean;
    value: any;
    private onChange;
    private onTouched;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    handleChange(event: Event): void;
    handleBlur(): void;
    trackByValue(_index: number, option: SelectOptions): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgSelectComponent, "dcx-ng-select", never, { "options": { "alias": "options"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "label": { "alias": "label"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; }, {}, never, never, true, never>;
}
export {};

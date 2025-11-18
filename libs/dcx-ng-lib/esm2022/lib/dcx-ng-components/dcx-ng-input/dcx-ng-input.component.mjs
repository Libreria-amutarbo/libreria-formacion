import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export var InputType;
(function (InputType) {
    InputType["TEXT"] = "text";
    InputType["NUMBER"] = "number";
    InputType["EMAIL"] = "email";
    InputType["PASSWORD"] = "password";
    InputType["SEARCH"] = "search";
    InputType["TEL"] = "tel";
    InputType["URL"] = "url";
})(InputType || (InputType = {}));
export var InputSize;
(function (InputSize) {
    InputSize["SMALL"] = "s";
    InputSize["MEDIUM"] = "m";
    InputSize["LARGE"] = "l";
    InputSize["EXTRA_LARGE"] = "xl";
    InputSize["AUTO"] = "auto";
})(InputSize || (InputSize = {}));
export class DcxNgInputComponent {
    type = InputType.TEXT;
    placeholder = null;
    size = InputSize.MEDIUM;
    disabled = false;
    required = false;
    label = null;
    errorMessages = [];
    set value(val) {
        if (this.inputControl) {
            this.inputControl.setValue(val, { emitEvent: false });
        }
    }
    valueChange = new EventEmitter();
    inputControl = new FormControl('');
    isFocused = false;
    inputId;
    destroy$ = new Subject();
    constructor() {
        this.inputId = `dcx-input-${Math.random().toString(36).substr(2, 9)}`;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnInit() {
        this.setupFormControl();
        this.setupValueChanges();
    }
    setupFormControl() {
        const validators = [];
        // Agregar validadores de formato primero para que tengan prioridad
        if (this.type === InputType.EMAIL) {
            validators.push(Validators.email);
        }
        if (this.type === InputType.NUMBER) {
            // Patrón más estricto que no permite números terminados en punto decimal
            validators.push(Validators.pattern(/^-?(?:\d+(?:\.\d+)?|\.\d+)$/));
        }
        // Agregar required al final para que los errores de formato tengan prioridad
        if (this.required) {
            validators.push(Validators.required);
        }
        this.inputControl = new FormControl('', validators);
        if (this.disabled) {
            this.inputControl.disable();
        }
    }
    setupValueChanges() {
        this.inputControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
            this.valueChange.emit(value);
        });
    }
    ngOnChanges(changes) {
        if (changes['required'] || changes['type'] || changes['disabled']) {
            this.setupFormControl();
        }
    }
    getErrorMessage() {
        if (!this.inputControl.errors) {
            return null;
        }
        const value = this.inputControl.value;
        // Si hay contenido pero es inválido, priorizar errores de formato
        if (value && value.trim() !== '') {
            console.log(value);
            if (this.inputControl.hasError('pattern') && this.type === InputType.NUMBER) {
                return this.errorMessages.find(msg => msg.type === 'pattern')?.message || 'Formato numérico inválido';
            }
            if (this.inputControl.hasError('email')) {
                return this.errorMessages.find(msg => msg.type === 'email')?.message || 'Formato correo inválido';
            }
        }
        // Si está vacío o solo tiene espacios, mostrar error required
        if (this.inputControl.hasError('required')) {
            return this.errorMessages.find(msg => msg.type === 'required')?.message || 'Campo obligatorio';
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgInputComponent, isStandalone: true, selector: "dcx-ng-input", inputs: { type: "type", placeholder: "placeholder", size: "size", disabled: "disabled", required: "required", label: "label", errorMessages: "errorMessages" }, outputs: { valueChange: "valueChange" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"input-container\">\r\n  @if (label) {\r\n    <label [for]=\"inputId\" class=\"input-label\">\r\n      {{ label }}\r\n      @if (required) {\r\n        <span class=\"required-icon\" aria-hidden=\"true\">*</span>\r\n        <span class=\"visually-hidden\">(required)</span>\r\n      }\r\n    </label>\r\n  }\r\n\r\n  <input\r\n    [id]=\"inputId\"\r\n    class=\"dcx-ng-input\"\r\n    [class.disabled]=\"disabled\"\r\n    [type]=\"type\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"inputControl\"\r\n    [ngClass]=\"'dcx-ng-input-size--' + size\"\r\n    [class.required]=\"inputControl.touched && !isFocused && required && !inputControl.value\"\r\n    [class.invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-required]=\"required\"\r\n    [attr.aria-invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-label]=\"label || placeholder\"\r\n  />\r\n\r\n  @if (inputControl.invalid && inputControl.touched) {\r\n    <span class=\"invalid-message\">{{ getErrorMessage() }}</span>\r\n  }\r\n</div>\r\n", styles: ["p{font-size:var(--font-size-body-large)}.input-container{display:flex;flex-direction:column;gap:var(--spacing-xs);margin-bottom:var(--spacing-m)}.dcx-ng-input{box-sizing:content-box;--input-height: var(--spacing-s);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m);border-radius:var(--border-radius-sm);background-color:var(--color-background);border:2px solid var(--color-primary-light);color:var(--color-text-primary);height:var(--input-height);width:calc(var(--input-width) * 5);font-size:var(--input-font-size);padding:var(--input-padding-vertical) var(--input-padding-horizontal)}.dcx-ng-input-size--s{--input-height: var(--spacing-xs);--input-width: var(--spacing-s);--input-font-size: var(--font-size-body-small);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-s)}.dcx-ng-input-size--m{--input-height: var(--spacing-xs);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--l{--input-height: var(--spacing-s);--input-width: var(--spacing-l);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--xl{--input-height: var(--spacing-s);--input-width: var(--spacing-xl);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--auto{--input-height: var(--spacing-s);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m);width:calc(100% - var(--input-padding-horizontal) * 2)}.dcx-ng-input--no-styles{background-color:transparent;border:2px solid black;color:#000}.dcx-ng-input:focus{border:2px solid var(--color-primary);background-color:var(--color-gray-lighter);outline:none}.required{border:2px solid var(--color-error)}.required-icon{color:var(--color-error);font-size:var(--font-size-body-small)}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.disabled{background-color:var(--color-gray-light);border:2px solid var(--color-primary-light);color:var(--color-text-disabled);pointer-events:none}.invalid{border:2px solid var(--color-error);color:var(--color-error)}.invalid-message{width:auto;color:var(--color-error);font-size:var(--font-size-body-small)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-input', standalone: true, imports: [CommonModule, ReactiveFormsModule], template: "<div class=\"input-container\">\r\n  @if (label) {\r\n    <label [for]=\"inputId\" class=\"input-label\">\r\n      {{ label }}\r\n      @if (required) {\r\n        <span class=\"required-icon\" aria-hidden=\"true\">*</span>\r\n        <span class=\"visually-hidden\">(required)</span>\r\n      }\r\n    </label>\r\n  }\r\n\r\n  <input\r\n    [id]=\"inputId\"\r\n    class=\"dcx-ng-input\"\r\n    [class.disabled]=\"disabled\"\r\n    [type]=\"type\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"inputControl\"\r\n    [ngClass]=\"'dcx-ng-input-size--' + size\"\r\n    [class.required]=\"inputControl.touched && !isFocused && required && !inputControl.value\"\r\n    [class.invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-required]=\"required\"\r\n    [attr.aria-invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-label]=\"label || placeholder\"\r\n  />\r\n\r\n  @if (inputControl.invalid && inputControl.touched) {\r\n    <span class=\"invalid-message\">{{ getErrorMessage() }}</span>\r\n  }\r\n</div>\r\n", styles: ["p{font-size:var(--font-size-body-large)}.input-container{display:flex;flex-direction:column;gap:var(--spacing-xs);margin-bottom:var(--spacing-m)}.dcx-ng-input{box-sizing:content-box;--input-height: var(--spacing-s);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m);border-radius:var(--border-radius-sm);background-color:var(--color-background);border:2px solid var(--color-primary-light);color:var(--color-text-primary);height:var(--input-height);width:calc(var(--input-width) * 5);font-size:var(--input-font-size);padding:var(--input-padding-vertical) var(--input-padding-horizontal)}.dcx-ng-input-size--s{--input-height: var(--spacing-xs);--input-width: var(--spacing-s);--input-font-size: var(--font-size-body-small);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-s)}.dcx-ng-input-size--m{--input-height: var(--spacing-xs);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--l{--input-height: var(--spacing-s);--input-width: var(--spacing-l);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--xl{--input-height: var(--spacing-s);--input-width: var(--spacing-xl);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--auto{--input-height: var(--spacing-s);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m);width:calc(100% - var(--input-padding-horizontal) * 2)}.dcx-ng-input--no-styles{background-color:transparent;border:2px solid black;color:#000}.dcx-ng-input:focus{border:2px solid var(--color-primary);background-color:var(--color-gray-lighter);outline:none}.required{border:2px solid var(--color-error)}.required-icon{color:var(--color-error);font-size:var(--font-size-body-small)}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.disabled{background-color:var(--color-gray-light);border:2px solid var(--color-primary-light);color:var(--color-text-disabled);pointer-events:none}.invalid{border:2px solid var(--color-error);color:var(--color-error)}.invalid-message{width:auto;color:var(--color-error);font-size:var(--font-size-body-small)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], errorMessages: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGN4LW5nLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvZGN4LW5nLWxpYi9zcmMvbGliL2RjeC1uZy1jb21wb25lbnRzL2RjeC1uZy1pbnB1dC9kY3gtbmctaW5wdXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kY3gtbmctbGliL3NyYy9saWIvZGN4LW5nLWNvbXBvbmVudHMvZGN4LW5nLWlucHV0L2RjeC1uZy1pbnB1dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFM0MsTUFBTSxDQUFOLElBQVksU0FRWDtBQVJELFdBQVksU0FBUztJQUNuQiwwQkFBYSxDQUFBO0lBQ2IsOEJBQWlCLENBQUE7SUFDakIsNEJBQWUsQ0FBQTtJQUNmLGtDQUFxQixDQUFBO0lBQ3JCLDhCQUFpQixDQUFBO0lBQ2pCLHdCQUFXLENBQUE7SUFDWCx3QkFBVyxDQUFBO0FBQ2IsQ0FBQyxFQVJXLFNBQVMsS0FBVCxTQUFTLFFBUXBCO0FBRUQsTUFBTSxDQUFOLElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNuQix3QkFBVyxDQUFBO0lBQ1gseUJBQVksQ0FBQTtJQUNaLHdCQUFXLENBQUE7SUFDWCwrQkFBa0IsQ0FBQTtJQUNsQiwwQkFBYSxDQUFBO0FBQ2Ys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QUFDLElBQUksS0FBSyxVQUFVLENBQUMsRUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUM7UUFDakcsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzt3R0FsR1UsbUJBQW1COzRGQUFuQixtQkFBbUIsc1NDcENoQyxpakNBOEJBLDJwRkRFWSxZQUFZLDRIQUFFLG1CQUFtQjs7NEZBSWhDLG1CQUFtQjtrQkFQL0IsU0FBUzsrQkFDRSxjQUFjLGNBQ1osSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDO3dEQU1uQyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQU9JLFdBQVc7c0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgZW51bSBJbnB1dFR5cGUge1xyXG4gIFRFWFQgPSAndGV4dCcsXHJcbiAgTlVNQkVSID0gJ251bWJlcicsXHJcbiAgRU1BSUwgPSAnZW1haWwnLFxyXG4gIFBBU1NXT1JEID0gJ3Bhc3N3b3JkJyxcclxuICBTRUFSQ0ggPSAnc2VhcmNoJyxcclxuICBURUwgPSAndGVsJyxcclxuICBVUkwgPSAndXJsJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBJbnB1dFNpemUge1xyXG4gIFNNQUxMID0gJ3MnLFxyXG4gIE1FRElVTSA9ICdtJyxcclxuICBMQVJHRSA9ICdsJyxcclxuICBFWFRSQV9MQVJHRSA9ICd4bCcsXHJcbiAgQVVUTyA9ICdhdXRvJ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yTWVzc2FnZSB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkY3gtbmctaW5wdXQnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RjeC1uZy1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGN4LW5nLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEY3hOZ0lucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIHR5cGU6IElucHV0VHlwZSA9IElucHV0VHlwZS5URVhUO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICBASW5wdXQoKSBzaXplOiBJbnB1dFNpemUgPSBJbnB1dFNpemUuTUVESVVNO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgZXJyb3JNZXNzYWdlczogRXJyb3JNZXNzYWdlW10gPSBbXTtcclxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLmlucHV0Q29udHJvbCkge1xyXG4gICAgICB0aGlzLmlucHV0Q29udHJvbC5zZXRWYWx1ZSh2YWwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4oKTtcclxuXHJcbiAgaW5wdXRDb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XHJcbiAgaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgaW5wdXRJZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW5wdXRJZCA9IGBkY3gtaW5wdXQtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSl9YDtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2V0dXBGb3JtQ29udHJvbCgpO1xyXG4gICAgdGhpcy5zZXR1cFZhbHVlQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBGb3JtQ29udHJvbCgpIHtcclxuICAgIGNvbnN0IHZhbGlkYXRvcnMgPSBbXTtcclxuXHJcbiAgICAvLyBBZ3JlZ2FyIHZhbGlkYWRvcmVzIGRlIGZvcm1hdG8gcHJpbWVybyBwYXJhIHF1ZSB0ZW5nYW4gcHJpb3JpZGFkXHJcbiAgICBpZiAodGhpcy50eXBlID09PSBJbnB1dFR5cGUuRU1BSUwpIHtcclxuICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMuZW1haWwpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gSW5wdXRUeXBlLk5VTUJFUikge1xyXG4gICAgICAvLyBQYXRyw7NuIG3DoXMgZXN0cmljdG8gcXVlIG5vIHBlcm1pdGUgbsO6bWVyb3MgdGVybWluYWRvcyBlbiBwdW50byBkZWNpbWFsXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4oL14tPyg/OlxcZCsoPzpcXC5cXGQrKT98XFwuXFxkKykkLykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFncmVnYXIgcmVxdWlyZWQgYWwgZmluYWwgcGFyYSBxdWUgbG9zIGVycm9yZXMgZGUgZm9ybWF0byB0ZW5nYW4gcHJpb3JpZGFkXHJcbiAgICBpZiAodGhpcy5yZXF1aXJlZCkge1xyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnB1dENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpO1xyXG5cclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRDb250cm9sLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0dXBWYWx1ZUNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmlucHV0Q29udHJvbC52YWx1ZUNoYW5nZXNcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzWydyZXF1aXJlZCddIHx8IGNoYW5nZXNbJ3R5cGUnXSB8fCBjaGFuZ2VzWydkaXNhYmxlZCddKSB7XHJcbiAgICAgIHRoaXMuc2V0dXBGb3JtQ29udHJvbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RXJyb3JNZXNzYWdlKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgaWYgKCF0aGlzLmlucHV0Q29udHJvbC5lcnJvcnMpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmlucHV0Q29udHJvbC52YWx1ZTtcclxuXHJcbiAgICAvLyBTaSBoYXkgY29udGVuaWRvIHBlcm8gZXMgaW52w6FsaWRvLCBwcmlvcml6YXIgZXJyb3JlcyBkZSBmb3JtYXRvXHJcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XHJcbiAgICAgIGlmICh0aGlzLmlucHV0Q29udHJvbC5oYXNFcnJvcigncGF0dGVybicpICYmIHRoaXMudHlwZSA9PT0gSW5wdXRUeXBlLk5VTUJFUikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yTWVzc2FnZXMuZmluZChtc2cgPT4gbXNnLnR5cGUgPT09ICdwYXR0ZXJuJyk/Lm1lc3NhZ2UgfHwgJ0Zvcm1hdG8gbnVtw6lyaWNvIGludsOhbGlkbyc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuaW5wdXRDb250cm9sLmhhc0Vycm9yKCdlbWFpbCcpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JNZXNzYWdlcy5maW5kKG1zZyA9PiBtc2cudHlwZSA9PT0gJ2VtYWlsJyk/Lm1lc3NhZ2UgfHwgJ0Zvcm1hdG8gY29ycmVvIGludsOhbGlkbyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBTaSBlc3TDoSB2YWPDrW8gbyBzb2xvIHRpZW5lIGVzcGFjaW9zLCBtb3N0cmFyIGVycm9yIHJlcXVpcmVkXHJcbiAgICBpZiAodGhpcy5pbnB1dENvbnRyb2wuaGFzRXJyb3IoJ3JlcXVpcmVkJykpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JNZXNzYWdlcy5maW5kKG1zZyA9PiBtc2cudHlwZSA9PT0gJ3JlcXVpcmVkJyk/Lm1lc3NhZ2UgfHwgJ0NhbXBvIG9ibGlnYXRvcmlvJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiPlxyXG4gIEBpZiAobGFiZWwpIHtcclxuICAgIDxsYWJlbCBbZm9yXT1cImlucHV0SWRcIiBjbGFzcz1cImlucHV0LWxhYmVsXCI+XHJcbiAgICAgIHt7IGxhYmVsIH19XHJcbiAgICAgIEBpZiAocmVxdWlyZWQpIHtcclxuICAgICAgICA8c3BhbiBjbGFzcz1cInJlcXVpcmVkLWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj4qPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+KHJlcXVpcmVkKTwvc3Bhbj5cclxuICAgICAgfVxyXG4gICAgPC9sYWJlbD5cclxuICB9XHJcblxyXG4gIDxpbnB1dFxyXG4gICAgW2lkXT1cImlucHV0SWRcIlxyXG4gICAgY2xhc3M9XCJkY3gtbmctaW5wdXRcIlxyXG4gICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgIFt0eXBlXT1cInR5cGVcIlxyXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgIFtmb3JtQ29udHJvbF09XCJpbnB1dENvbnRyb2xcIlxyXG4gICAgW25nQ2xhc3NdPVwiJ2RjeC1uZy1pbnB1dC1zaXplLS0nICsgc2l6ZVwiXHJcbiAgICBbY2xhc3MucmVxdWlyZWRdPVwiaW5wdXRDb250cm9sLnRvdWNoZWQgJiYgIWlzRm9jdXNlZCAmJiByZXF1aXJlZCAmJiAhaW5wdXRDb250cm9sLnZhbHVlXCJcclxuICAgIFtjbGFzcy5pbnZhbGlkXT1cImlucHV0Q29udHJvbC5pbnZhbGlkICYmIGlucHV0Q29udHJvbC50b3VjaGVkXCJcclxuICAgIFthdHRyLmFyaWEtcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxyXG4gICAgW2F0dHIuYXJpYS1pbnZhbGlkXT1cImlucHV0Q29udHJvbC5pbnZhbGlkICYmIGlucHV0Q29udHJvbC50b3VjaGVkXCJcclxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWwgfHwgcGxhY2Vob2xkZXJcIlxyXG4gIC8+XHJcblxyXG4gIEBpZiAoaW5wdXRDb250cm9sLmludmFsaWQgJiYgaW5wdXRDb250cm9sLnRvdWNoZWQpIHtcclxuICAgIDxzcGFuIGNsYXNzPVwiaW52YWxpZC1tZXNzYWdlXCI+e3sgZ2V0RXJyb3JNZXNzYWdlKCkgfX08L3NwYW4+XHJcbiAgfVxyXG48L2Rpdj5cclxuIl19
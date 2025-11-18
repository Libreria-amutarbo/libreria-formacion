import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
type SpinnerSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export declare class DcxNgSpinnerComponent implements OnInit {
    size: SpinnerSize;
    wrapper: boolean;
    delay: number;
    label: string | null;
    isVisible: boolean;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgSpinnerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgSpinnerComponent, "dcx-ng-spinner", never, { "size": { "alias": "size"; "required": false; }; "wrapper": { "alias": "wrapper"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, ["*"], true, never>;
}
export {};

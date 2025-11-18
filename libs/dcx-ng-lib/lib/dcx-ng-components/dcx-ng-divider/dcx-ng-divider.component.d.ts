import * as i0 from "@angular/core";
type DividerOrientation = 'horizontal' | 'vertical';
type DividerSize = 'small' | 'medium' | 'large' | 'auto';
export declare class DcxNgDividerComponent {
    color: string;
    size: DividerSize;
    orientation: DividerOrientation;
    thickness: number;
    ariaLabel: string;
    get dividerColor(): string;
    get dividerThickness(): string;
    get ariaLabelBinding(): string;
    get dividerClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgDividerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgDividerComponent, "dcx-ng-divider", never, { "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "thickness": { "alias": "thickness"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; }, {}, never, never, true, never>;
}
export {};

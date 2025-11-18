import * as i0 from "@angular/core";
type IconSize = 's' | 'm' | 'l' | 'xl';
type IconSpacing = 'none' | 'compact' | 'spacious';
export declare class DcxNgIconComponent {
    size: IconSize;
    spacing: IconSpacing;
    color: string;
    name: string;
    get iconClass(): string;
    get iconColor(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgIconComponent, "dcx-ng-icon", never, { "size": { "alias": "size"; "required": false; }; "spacing": { "alias": "spacing"; "required": false; }; "color": { "alias": "color"; "required": false; }; "name": { "alias": "name"; "required": false; }; }, {}, never, never, true, never>;
}
export {};

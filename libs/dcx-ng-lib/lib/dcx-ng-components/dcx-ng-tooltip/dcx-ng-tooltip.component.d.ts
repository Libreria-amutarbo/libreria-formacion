import { ElementRef, AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare enum TooltipPosition {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}
export declare class DcxNgTooltipComponent implements AfterViewInit {
    private elementRef;
    position: TooltipPosition;
    hideTooltipOnClick: boolean;
    content: string;
    visible: boolean;
    actualPosition: TooltipPosition;
    tooltipElement?: ElementRef;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onDocumentClick(event: Event): void;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    private adjustPosition;
    private calculateOptimalPosition;
    getTooltipClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgTooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgTooltipComponent, "dcx-ng-tooltip", never, { "position": { "alias": "position"; "required": false; }; "hideTooltipOnClick": { "alias": "hideTooltipOnClick"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, ["*"], true, never>;
}

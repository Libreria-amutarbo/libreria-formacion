import { EventEmitter, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DcxNgCardComponent {
    header: string;
    subheader: string;
    iconClass: string;
    closable: boolean;
    visible: boolean;
    onClose: EventEmitter<void>;
    onAccept: EventEmitter<void>;
    onCancel: EventEmitter<void>;
    cardBodyTemplate: TemplateRef<any> | null;
    cardFooterTemplate: TemplateRef<any> | null;
    handleClose(): void;
    handleAccept(): void;
    handleCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgCardComponent, "dcx-ng-card", never, { "header": { "alias": "header"; "required": false; }; "subheader": { "alias": "subheader"; "required": false; }; "iconClass": { "alias": "iconClass"; "required": false; }; "closable": { "alias": "closable"; "required": false; }; "visible": { "alias": "visible"; "required": false; }; }, { "onClose": "onClose"; "onAccept": "onAccept"; "onCancel": "onCancel"; }, ["cardBodyTemplate", "cardFooterTemplate"], ["*"], true, never>;
}

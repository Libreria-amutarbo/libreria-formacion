import { Signal } from '@angular/core';
import * as i0 from "@angular/core";
export type MessageType = 'notification' | 'error' | 'warning' | 'success';
interface DcxNgMessageComponentInputs {
    body: Signal<string>;
    type: Signal<MessageType>;
    title: Signal<string | undefined>;
    link: Signal<string | undefined>;
    icon: Signal<boolean>;
    showClose: Signal<boolean>;
}
export declare class DcxNgMessageComponent implements DcxNgMessageComponentInputs {
    body: import("@angular/core").InputSignal<string>;
    type: import("@angular/core").InputSignal<MessageType>;
    title: import("@angular/core").InputSignal<string>;
    link: import("@angular/core").InputSignal<string>;
    icon: import("@angular/core").InputSignal<boolean>;
    showClose: import("@angular/core").InputSignal<boolean>;
    messageData: Signal<{
        icon: string;
        role: string;
    } | {
        icon: string;
        role: string;
    } | {
        icon: string;
        role: string;
    } | {
        icon: string;
        role: string;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgMessageComponent, "dcx-ng-message", never, { "body": { "alias": "body"; "required": true; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "link": { "alias": "link"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "showClose": { "alias": "showClose"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};

import { LitElement } from 'lit';
import { DcxMessageType } from '../../core/interfaces/message';
export declare class DcxWebMessage extends LitElement {
    accessor body: string;
    accessor type: DcxMessageType;
    accessor title: string;
    accessor link: string;
    accessor icon: boolean;
    accessor iconName: string;
    accessor showClose: boolean;
    accessor announce: boolean;
    accessor dismissed: boolean;
    static styles: import('lit').CSSResult;
    get messageData(): {
        readonly icon: "info-circle";
        readonly role: "status";
        readonly ariaLive: "polite";
    } | {
        readonly icon: "check-circle";
        readonly role: "status";
        readonly ariaLive: "polite";
    } | {
        readonly icon: "exclamation-triangle";
        readonly role: "alert";
        readonly ariaLive: "assertive";
    } | {
        readonly icon: "x-circle";
        readonly role: "alert";
        readonly ariaLive: "assertive";
    };
    emit(name: string, detail?: unknown): void;
    onClose: () => void;
    render(): import('lit-html').TemplateResult<1> | typeof import('lit-html').nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-message': DcxWebMessage;
    }
}

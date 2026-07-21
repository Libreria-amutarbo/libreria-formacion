import { LitElement } from 'lit';
import { DcxSize } from '../../core/interfaces/generic';
import { DcxIconSpacing } from '../../core/interfaces/icon';
export declare class DcxWebIcon extends LitElement {
    accessor name: string;
    accessor size: DcxSize;
    accessor spacing: DcxIconSpacing;
    accessor color: string;
    accessor extraClass: string;
    accessor ariaLabel: string;
    createRenderRoot(): this;
    private get _decorative();
    private get _iconClass();
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-icon': DcxWebIcon;
    }
}

import { LitElement, PropertyValues } from 'lit';
import { TooltipArrowAlignment, TooltipVariant, DcxPosition } from '../../core/interfaces';
export declare class DcxWebTooltip extends LitElement {
    accessor position: DcxPosition;
    accessor arrowAlignment: TooltipArrowAlignment;
    accessor hideTooltipOnClick: boolean;
    accessor content: string;
    accessor contentHtml: string;
    accessor variant: TooltipVariant;
    accessor visible: boolean;
    accessor actualPosition: DcxPosition;
    readonly tooltipId: string;
    static styles: import('lit').CSSResult;
    get tooltipClasses(): string;
    get sanitizedHtml(): string;
    willUpdate(changedProperties: PropertyValues): void;
    firstUpdated(): void;
    private linkTriggerToTooltip;
    private sanitizeContent;
    show(): void;
    hide(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onFocusIn(): void;
    onFocusOut(): void;
    onEscape(): void;
    onClick(): void;
    connectedCallback(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-tooltip': DcxWebTooltip;
    }
}

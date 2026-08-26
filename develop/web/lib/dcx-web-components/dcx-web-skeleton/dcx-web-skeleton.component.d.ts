import { LitElement } from 'lit';
import { DcxSkeletonAnimation, DcxSkeletonShape } from '../../core/interfaces/skeleton';
export declare class DcxWebSkeleton extends LitElement {
    accessor shape: DcxSkeletonShape;
    accessor width: string;
    accessor height: string;
    accessor size: string | null;
    accessor borderRadius: string | null;
    accessor animation: DcxSkeletonAnimation;
    static styles: import('lit').CSSResult;
    get computedWidth(): string;
    get computedHeight(): string;
    get computedBorderRadius(): string;
    private updateHostClassesAndStyles;
    connectedCallback(): void;
    firstUpdated(): void;
    updated(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-skeleton': DcxWebSkeleton;
    }
}

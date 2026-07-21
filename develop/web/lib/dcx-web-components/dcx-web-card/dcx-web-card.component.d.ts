import { LitElement } from 'lit';
import { DcxLayout, DcxAlign, DcxSize, BorderStyleCard, ShadowPresetCard } from '../../core/interfaces';
export declare class DcxWebCard extends LitElement {
    accessor image: string | null;
    accessor imageAlt: string;
    accessor title: string;
    accessor subtitle: string;
    accessor layout: DcxLayout;
    accessor align: DcxAlign;
    accessor size: DcxSize;
    accessor maxContentWidth: string;
    accessor maxImageWidth: string;
    accessor accent: boolean;
    accessor bordered: boolean;
    accessor borderWidth: number;
    accessor borderStyle: BorderStyleCard;
    accessor shadow: ShadowPresetCard;
    accessor interactive: boolean;
    accessor disabled: boolean;
    static styles: import('lit').CSSResult;
    get cardClasses(): string;
    get innerClasses(): string;
    get innerStyles(): {
        '--card-max-content-width': string;
        '--card-max-image-width': string;
        '--card-border-style': BorderStyleCard;
        '--card-border-width': string;
        '--card-shadow': string;
    };
    get cardRole(): string;
    get cardTabIndex(): number | undefined;
    get hasHeader(): boolean;
    get hasContent(): boolean;
    get hasFooter(): boolean;
    get effectiveAriaLabel(): string | null;
    get shadowCSS(): string;
    _handleCardClick(evt: MouseEvent | KeyboardEvent): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-card': DcxWebCard;
    }
}

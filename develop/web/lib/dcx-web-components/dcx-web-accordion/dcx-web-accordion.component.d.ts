import { LitElement } from 'lit';
import { DcxWebAccordionTransition, DcxWebAccordionVariant, DcxWebAccordionItem } from '../../core/interfaces';
export declare class DcxWebAccordion extends LitElement {
    accessor items: DcxWebAccordionItem[];
    accessor transition: DcxWebAccordionTransition;
    accessor closeOthers: boolean;
    accessor expandedIds: string[];
    accessor variant: DcxWebAccordionVariant;
    accessor ariaLabel: string | null;
    private accessor _expandedItems;
    willUpdate(changedProperties: Map<PropertyKey, unknown>): void;
    toggleItem(item: DcxWebAccordionItem): void;
    onHeaderKeydown(event: KeyboardEvent): void;
    expandItemById(itemId: string): void;
    collapseItemById(itemId: string): void;
    isExpanded(itemId: string): boolean;
    expandAll(): void;
    collapseAll(): void;
    private navigateFocus;
    private _getIconName;
    renderIcon(iconName: string): import('lit-html').TemplateResult<1>;
    static styles: import('lit').CSSResult;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-accordion': DcxWebAccordion;
    }
}

import { LitElement } from 'lit';
import { DcxTabItem, DcxTabsVariant } from '../../core/interfaces/tabs';
export declare class DcxWebTabs extends LitElement {
    accessor tabs: DcxTabItem[];
    accessor variant: DcxTabsVariant;
    accessor hasControls: boolean;
    accessor activeTabId: string;
    accessor ariaLabel: string | null;
    accessor _activeTabId: string;
    accessor hasOverflow: boolean;
    accessor canScrollLeft: boolean;
    accessor canScrollRight: boolean;
    accessor tabsHeader: HTMLDivElement;
    static styles: import('lit').CSSResult;
    get activeTab(): DcxTabItem | undefined;
    get tabHeaderClasses(): string;
    firstUpdated(): void;
    updated(): void;
    private initializeActiveTab;
    emit(name: string, detail?: unknown): void;
    isButtonPressed(tabId: string): boolean;
    isActive(tabId: string): boolean;
    selectTab(tabId: string): void;
    private getHeaderVariantClass;
    private getButtonVariantClass;
    tabButtonClasses(tabId: string): string;
    private checkOverflow;
    updateScrollButtons: () => void;
    scrollTabsLeft: () => void;
    scrollTabsRight: () => void;
    private scrollTabIntoView;
    private findTabElement;
    onKeydown: (event: KeyboardEvent) => void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-tabs': DcxWebTabs;
    }
}

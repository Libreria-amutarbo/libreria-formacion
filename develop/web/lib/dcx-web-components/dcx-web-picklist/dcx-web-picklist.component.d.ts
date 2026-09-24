import { LitElement } from 'lit';
import { DcxPickListItem, DcxPickListSide } from '../../core/interfaces/picklist';
export declare class DcxWebPicklist extends LitElement {
    static styles: import('lit').CSSResult;
    private static nextId;
    readonly instanceId: string;
    readonly sourceHeadingId: string;
    readonly targetHeadingId: string;
    readonly sourceListId: string;
    readonly targetListId: string;
    accessor source: DcxPickListItem[];
    accessor target: DcxPickListItem[];
    accessor sourceHeader: string;
    accessor targetHeader: string;
    accessor filterBy: string;
    accessor showSourceFilter: boolean;
    accessor showTargetFilter: boolean;
    accessor sourceFilterPlaceholder: string;
    accessor targetFilterPlaceholder: string;
    accessor dragdrop: boolean;
    accessor itemTemplate: ((context: {
        item: DcxPickListItem;
        index: number;
        selected: boolean;
        side: DcxPickListSide;
    }) => unknown) | null;
    accessor listScrollHeight: string;
    accessor responsive: boolean;
    accessor disabled: boolean;
    accessor showSourceControls: boolean;
    accessor showTargetControls: boolean;
    accessor keepSelection: boolean;
    accessor sourceItems: DcxPickListItem[];
    accessor targetItems: DcxPickListItem[];
    accessor sourceQuery: string;
    accessor targetQuery: string;
    accessor selectedSourceIds: Array<string | number>;
    accessor selectedTargetIds: Array<string | number>;
    accessor focusedSourceIndex: number;
    accessor focusedTargetIndex: number;
    constructor();
    connectedCallback(): void;
    willUpdate(changedProperties: Map<string, unknown>): void;
    private syncListsFromProperties;
    emit(name: string, detail?: unknown): void;
    private filterItems;
    get visibleSourceItems(): DcxPickListItem[];
    get visibleTargetItems(): DcxPickListItem[];
    private isSelected;
    private isItemDisabled;
    onWebListSelect(e: CustomEvent, side: DcxPickListSide): void;
    onWebListDeselect(e: CustomEvent, side: DcxPickListSide): void;
    onWebListDrop(e: CustomEvent<{
        previousContainer: {
            id: string;
            data: DcxPickListItem[];
        };
        container: {
            id: string;
            data: DcxPickListItem[];
        };
        previousIndex: number;
        currentIndex: number;
    }>, side: DcxPickListSide): void;
    toggleItem(item: DcxPickListItem, side: DcxPickListSide, originalEvent?: Event): void;
    private reorderVisibleDrop;
    private insertVisibleDrop;
    private resolveFullInsertIndex;
    private findItemIndex;
    moveSelectedToTarget(): void;
    moveSelectedToSource(): void;
    moveEveryItemToTarget(): void;
    moveEveryItemToSource(): void;
    moveUp(side: DcxPickListSide): void;
    moveDown(side: DcxPickListSide): void;
    moveTop(side: DcxPickListSide): void;
    moveBottom(side: DcxPickListSide): void;
    private transferSelected;
    private transferAll;
    private applyTransfer;
    private reorderSelected;
    private moveSelectionByOne;
    private emitSelection;
    private emitMove;
    private emitReorder;
    private emitChanges;
    private getList;
    private setList;
    onFilterChange(side: DcxPickListSide, value: string | null): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-picklist': DcxWebPicklist;
    }
}

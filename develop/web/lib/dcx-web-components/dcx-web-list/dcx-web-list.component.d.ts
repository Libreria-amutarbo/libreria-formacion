import { LitElement, TemplateResult } from 'lit';
import { DcxListItem } from '../../core/interfaces/list';
export declare class DcxWebList extends LitElement {
    accessor items: DcxListItem[];
    accessor selectable: boolean;
    accessor multiSelect: boolean;
    accessor showChildrenIndicator: boolean;
    accessor renderChildren: boolean;
    accessor itemTemplate: ((context: {
        item: DcxListItem;
        index: number;
        selected: boolean;
    }) => TemplateResult) | null;
    accessor id: string;
    accessor ariaLabel: string;
    accessor listRole: string;
    accessor itemRole: string;
    accessor multiselectable: boolean | null;
    accessor externalSelection: boolean;
    accessor isItemSelected: ((item: DcxListItem, index: number) => boolean) | null;
    accessor dropList: boolean;
    accessor dropListData: DcxListItem[];
    accessor dropListConnectedTo: string | string[] | null;
    accessor dropListDisabled: boolean;
    accessor dragEnabled: boolean;
    accessor dragDisabled: (_item: DcxListItem) => boolean;
    accessor selectedIndices: number[];
    static styles: import('lit').CSSResult;
    private _dragPayload;
    private _listId;
    emit(name: string, detail?: unknown): void;
    private _ensureListId;
    _onDragStart(e: DragEvent, item: DcxListItem, index: number): void;
    _onDragOver(e: DragEvent): void;
    _onDrop(e: DragEvent): void;
    _onDragEnd(): void;
    getChildren(item: DcxListItem): DcxListItem[];
    isSelected(index: number): boolean;
    resolveAriaSelected(item: DcxListItem, index: number): boolean | null;
    onItemClick(item: DcxListItem, index: number): void;
    onKeydown(event: KeyboardEvent, item: DcxListItem, index: number): void;
    getItemClasses(item: DcxListItem, index: number): string;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-list': DcxWebList;
    }
}

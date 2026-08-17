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
    accessor cdkDropList: boolean;
    accessor cdkDropListData: DcxListItem[];
    accessor cdkDropListConnectedTo: string | string[] | null;
    accessor cdkDropListDisabled: boolean;
    accessor dragEnabled: boolean;
    accessor cdkDragDisabled: (_item: DcxListItem) => boolean;
    accessor selectedIndices: number[];
    static styles: import('lit').CSSResult;
    emit(name: string, detail?: unknown): void;
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

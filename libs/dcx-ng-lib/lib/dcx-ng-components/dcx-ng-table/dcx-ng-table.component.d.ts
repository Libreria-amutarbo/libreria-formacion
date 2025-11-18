import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
type SortDirection = 'asc' | 'desc' | null;
export declare enum SortType {
    Ascending = "ascending",
    Descending = "descending",
    None = "none"
}
export interface HeaderData {
    name: string;
    key?: string;
    sortable?: boolean;
    type?: 'string' | 'number';
    defaultSort?: Exclude<SortDirection, null>;
}
interface Sort {
    key: string | null;
    dir: SortDirection;
}
export declare class DcxNgTableComponent implements OnInit {
    headers: HeaderData[];
    rows: any[];
    showGrid: boolean;
    showStripped: boolean;
    scroll: boolean;
    scrollHeight: string;
    headerTemplate?: TemplateRef<any>;
    cellTemplate?: TemplateRef<any>;
    menuCellTemplate?: TemplateRef<any>;
    sortChange: EventEmitter<Sort>;
    sort: import("@angular/core").WritableSignal<Sort>;
    ngOnInit(): void;
    sortedRows(): any[];
    onHeaderClick(header: HeaderData): void;
    ariaSort(header: HeaderData): SortType;
    private ensureRowIds;
    private inferType;
    private compare;
    static ɵfac: i0.ɵɵFactoryDeclaration<DcxNgTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DcxNgTableComponent, "dcx-ng-table", never, { "headers": { "alias": "headers"; "required": true; }; "rows": { "alias": "rows"; "required": true; }; "showGrid": { "alias": "showGrid"; "required": false; }; "showStripped": { "alias": "showStripped"; "required": false; }; "scroll": { "alias": "scroll"; "required": false; }; "scrollHeight": { "alias": "scrollHeight"; "required": false; }; "headerTemplate": { "alias": "headerTemplate"; "required": false; }; "cellTemplate": { "alias": "cellTemplate"; "required": false; }; "menuCellTemplate": { "alias": "menuCellTemplate"; "required": false; }; }, { "sortChange": "sortChange"; }, never, never, true, never>;
}
export {};

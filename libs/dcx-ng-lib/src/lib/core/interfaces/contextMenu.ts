import { DcxListItem } from "@dcx-ng-components/dcx-ng-lib";

export interface DcxContextMenuItem extends DcxListItem {
    id?: string;
    action?: () => void;
    children?: DcxContextMenuItem[];
}
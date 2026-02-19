import { DcxListItem } from './list';

export interface DcxContextMenuItem extends DcxListItem {
    action?: () => void;
    children?: DcxContextMenuItem[];
}

import { DcxListItem } from './list';

export interface DcxContextMenuItem extends DcxListItem {
  id?: string;
  action?: () => void;
  children?: DcxContextMenuItem[];
}

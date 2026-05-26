import { DcxListItem } from './list';

export interface DcxPickListItem extends DcxListItem {
  id: string | number;
  label: string;
  category?: string;
}

export type DcxPickListSide = 'source' | 'target';

export interface DcxPickListSelectionEvent {
  originalEvent?: Event;
  items: DcxPickListItem[];
  side: DcxPickListSide;
}

export interface DcxPickListMoveEvent {
  items: DcxPickListItem[];
  source: DcxPickListItem[];
  target: DcxPickListItem[];
}

export interface DcxPickListReorderEvent {
  items: DcxPickListItem[];
  side: DcxPickListSide;
}

export interface DcxPickListFilterEvent {
  query: string;
  value: DcxPickListItem[];
  side: DcxPickListSide;
}

export interface DcxPickListItemTemplateContext {
  $implicit: DcxPickListItem;
  item: DcxPickListItem;
  index: number;
  selected: boolean;
  side: DcxPickListSide;
}

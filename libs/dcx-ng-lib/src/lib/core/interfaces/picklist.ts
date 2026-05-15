export interface DcxPickListItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  [key: string]: unknown;
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

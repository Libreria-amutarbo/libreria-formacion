export type DcxEditorToolbarAction =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'orderedList'
  | 'unorderedList'
  | 'removeFormat';

export interface DcxEditorToolbarItem {
  action: DcxEditorToolbarAction;
  icon: string;
  ariaLabel: string;
}

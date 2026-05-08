import type { DcxEditorToolbarAction } from '../interfaces';

export const EDITOR_DEFAULT_VALUE = '';
export const EDITOR_DEFAULT_LABEL = '';
export const EDITOR_DEFAULT_PLACEHOLDER = '';
export const EDITOR_DEFAULT_DISABLED = false;
export const EDITOR_DEFAULT_READONLY = false;
export const EDITOR_DEFAULT_REQUIRED = false;
export const EDITOR_DEFAULT_INVALID = false;
export const EDITOR_DEFAULT_ERROR_MESSAGE = '';
export const EDITOR_DEFAULT_ARIA_LABEL: string | null = null;
export const EDITOR_DEFAULT_ARIA_DESCRIBEDBY: string | null = null;
export const EDITOR_DEFAULT_MIN_HEIGHT = '160px';

export const EDITOR_DEFAULT_TOOLBAR_ACTIONS: DcxEditorToolbarAction[] = [
  'bold',
  'italic',
  'underline',
  'orderedList',
  'unorderedList',
  'removeFormat',
];

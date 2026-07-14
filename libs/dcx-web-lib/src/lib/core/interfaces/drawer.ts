import { DcxPosition } from './generic';

export interface DcxDrawerMockData {
  open: boolean;
  position: DcxPosition;
  modal: boolean;
  dismissible: boolean;
  showCloseIcon: boolean;
  closeOnEscape: boolean;
  blockScroll: boolean;
  fullScreen: boolean;
  size: string;
  baseZIndex: number;
  autoZIndex: boolean;
  header: string;
  footer: string;
}
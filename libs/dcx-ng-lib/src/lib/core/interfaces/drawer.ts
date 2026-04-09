import { DcxPosition } from './generic';

export interface DcxDrawerMockData {
  visible: boolean;
  position: DcxPosition;
  modal: boolean;
  dismissible: boolean;
  showCloseIcon: boolean;
  closeOnEscape: boolean;
  blockScroll: boolean;
  fullScreen: boolean;
  size: string;
  styleClass?: string;
  maskStyleClass?: string;
  baseZIndex: number;
  autoZIndex: boolean;
  header: string;
}

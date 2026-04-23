import { DcxDrawerMockData } from '../interfaces/drawer';
import { DcxPosition } from '../interfaces/generic';

export const DRAWER_VISIBLE_DEFAULT = false;
export const DRAWER_POSITION_DEFAULT: DcxPosition = 'right';
export const DRAWER_MODAL_DEFAULT = true;
export const DRAWER_DISMISSIBLE_DEFAULT = true;
export const DRAWER_SHOW_CLOSE_ICON_DEFAULT = true;
export const DRAWER_CLOSE_ON_ESCAPE_DEFAULT = true;
export const DRAWER_BLOCK_SCROLL_DEFAULT = false;
export const DRAWER_FULLSCREEN_DEFAULT = false;
export const DRAWER_SIZE_DEFAULT = '22rem';
export const DRAWER_BASE_Z_INDEX_DEFAULT = 1000;
export const DRAWER_AUTO_Z_INDEX_DEFAULT = true;
export const DRAWER_HEADER_DEFAULT = 'Drawer';
export const DRAWER_FOOTER_DEFAULT = '';

export const DRAWER_DEFAULT_ARGS: DcxDrawerMockData = {
  visible: DRAWER_VISIBLE_DEFAULT,
  position: DRAWER_POSITION_DEFAULT,
  modal: DRAWER_MODAL_DEFAULT,
  dismissible: DRAWER_DISMISSIBLE_DEFAULT,
  showCloseIcon: DRAWER_SHOW_CLOSE_ICON_DEFAULT,
  closeOnEscape: DRAWER_CLOSE_ON_ESCAPE_DEFAULT,
  blockScroll: DRAWER_BLOCK_SCROLL_DEFAULT,
  fullScreen: DRAWER_FULLSCREEN_DEFAULT,
  size: DRAWER_SIZE_DEFAULT,
  baseZIndex: DRAWER_BASE_Z_INDEX_DEFAULT,
  autoZIndex: DRAWER_AUTO_Z_INDEX_DEFAULT,
  header: DRAWER_HEADER_DEFAULT,
  footer: DRAWER_FOOTER_DEFAULT,
};

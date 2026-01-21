export interface DcxContextPosition {
  x: number;
  y: number;
}

export interface DcxContextMenuItem {
  label: string;
  action?: () => void;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  subItems?: DcxContextMenuItem[];
}

export interface DcxContextMenuStyles {
  backgroundColor: string;
  border: string;
  borderRadius: string;
  boxShadow: string;
  minWidth: string;
  padding: string;
  animation: string;
}

export const DEFAULT_CONTEXT_MENU_STYLES: DcxContextMenuStyles = {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  minWidth: '160px',
  padding: '8px',
  animation: 'contextMenuFadeIn 150ms ease-out'
};

export const CONTEXT_MENU_Z_INDEX = '9999';

export const CONTEXT_MENU_ANIMATION_CSS = `
  @keyframes contextMenuFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export function applyStylesToElement(renderer: any, element: HTMLElement, styles: Record<string, string>): void {
  Object.entries(styles).forEach(([key, value]) => {
    const styleKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    renderer.setStyle(element, styleKey, value);
  });
}

export function createContextMenuContainer(renderer: any, position: DcxContextPosition): HTMLDivElement {
  const container = renderer.createElement('div');
  renderer.setStyle(container, 'position', 'fixed');
  renderer.setStyle(container, 'left', `${position.x}px`);
  renderer.setStyle(container, 'top', `${position.y}px`);
  renderer.setStyle(container, 'z-index', CONTEXT_MENU_Z_INDEX);
  return container;
}
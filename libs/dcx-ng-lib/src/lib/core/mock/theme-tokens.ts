import { ThemeToken } from '@dcx-ng-components/dcx-ng-lib';
import { fn } from '@storybook/test';

export const CAPGEMINI_THEME_TOKENS: ThemeToken[] = [
  // ── Fondo ──────────────────────────────────────────────────────────────────
  {
    name: '--bg-primary',
    value: '#0058ab',
    defaultValue: '#0058ab',
    label: 'Fondo primario',
    group: 'background',
  },
  {
    name: '--bg-primary-hover',
    value: '#004080',
    defaultValue: '#004080',
    label: 'Fondo primario hover',
    group: 'background',
  },
  {
    name: '--bg-primary-pressed',
    value: '#121a38',
    defaultValue: '#121a38',
    label: 'Fondo primario pressed',
    group: 'background',
  },
  {
    name: '--bg-hover',
    value: '#f7f8fa',
    defaultValue: '#f7f8fa',
    label: 'Fondo hover',
    group: 'background',
  },
  {
    name: '--bg-pressed',
    value: '#e1e3e6',
    defaultValue: '#e1e3e6',
    label: 'Fondo pressed',
    group: 'background',
  },
  {
    name: '--bg-default',
    value: '#ffffff',
    defaultValue: '#ffffff',
    label: 'Fondo por defecto',
    group: 'background',
  },
  {
    name: '--bg-surface',
    value: '#f4f5f7',
    defaultValue: '#f4f5f7',
    label: 'Superficie',
    group: 'background',
  },
  {
    name: '--bg-sidebar',
    value: '#f0f2f5',
    defaultValue: '#f0f2f5',
    label: 'Sidebar',
    group: 'background',
  },

  // ── Texto ──────────────────────────────────────────────────────────────────
  {
    name: '--text-white',
    value: '#ffffff',
    defaultValue: '#ffffff',
    label: 'Texto blanco',
    group: 'text',
  },
  {
    name: '--text-dark',
    value: '#2a2e33',
    defaultValue: '#2a2e33',
    label: 'Texto oscuro',
    group: 'text',
  },
  {
    name: '--text-muted',
    value: '#696e75',
    defaultValue: '#696e75',
    label: 'Texto apagado',
    group: 'text',
  },
  {
    name: '--text-disabled',
    value: '#696e75',
    defaultValue: '#696e75',
    label: 'Texto deshabilitado',
    group: 'text',
  },
  {
    name: '--text-disabled-dark',
    value: '#4f545a',
    defaultValue: '#4f545a',
    label: 'Texto deshabilitado oscuro',
    group: 'text',
  },
  {
    name: '--text-label',
    value: '#4f545a',
    defaultValue: '#4f545a',
    label: 'Etiqueta',
    group: 'text',
  },
  {
    name: '--text-placeholder',
    value: '#9ca3af',
    defaultValue: '#9ca3af',
    label: 'Placeholder',
    group: 'text',
  },

  // ── Bordes ─────────────────────────────────────────────────────────────────
  {
    name: '--border-default',
    value: '#2a2e33',
    defaultValue: '#2a2e33',
    label: 'Borde por defecto',
    group: 'border',
  },
  {
    name: '--border-light',
    value: '#d1d5db',
    defaultValue: '#d1d5db',
    label: 'Borde claro',
    group: 'border',
  },
  {
    name: '--border-focus',
    value: '#1db8f2',
    defaultValue: '#1db8f2',
    label: 'Borde foco',
    group: 'border',
  },
  {
    name: '--border-error',
    value: '#dc2626',
    defaultValue: '#dc2626',
    label: 'Borde error',
    group: 'border',
  },
  {
    name: '--border-success',
    value: '#16a34a',
    defaultValue: '#16a34a',
    label: 'Borde éxito',
    group: 'border',
  },
  {
    name: '--border-input',
    value: '#d1d5db',
    defaultValue: '#d1d5db',
    label: 'Borde input',
    group: 'border',
  },

  // ── Semántico ──────────────────────────────────────────────────────────────
  {
    name: '--color-success',
    value: '#16a34a',
    defaultValue: '#16a34a',
    label: 'Éxito',
    group: 'semantic',
  },
  {
    name: '--color-success-bg',
    value: '#f0fdf4',
    defaultValue: '#f0fdf4',
    label: 'Fondo éxito',
    group: 'semantic',
  },
  {
    name: '--color-error',
    value: '#dc2626',
    defaultValue: '#dc2626',
    label: 'Error',
    group: 'semantic',
  },
  {
    name: '--color-error-bg',
    value: '#fef2f2',
    defaultValue: '#fef2f2',
    label: 'Fondo error',
    group: 'semantic',
  },
  {
    name: '--color-warning',
    value: '#d97706',
    defaultValue: '#d97706',
    label: 'Advertencia',
    group: 'semantic',
  },
  {
    name: '--color-warning-bg',
    value: '#fffbeb',
    defaultValue: '#fffbeb',
    label: 'Fondo advertencia',
    group: 'semantic',
  },
  {
    name: '--color-info',
    value: '#0058ab',
    defaultValue: '#0058ab',
    label: 'Información',
    group: 'semantic',
  },
  {
    name: '--color-info-bg',
    value: '#eff6ff',
    defaultValue: '#eff6ff',
    label: 'Fondo información',
    group: 'semantic',
  },
];

export const ThemeGeneratorActions = {
  themeChanged: fn(),
  cssGenerated: fn(),
};
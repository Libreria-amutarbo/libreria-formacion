import { ThemeTokenGroup } from '../interfaces/theme-generator';

export const GROUP_LABELS: Record<ThemeTokenGroup, string> = {
    background: 'Fondo',
    text: 'Texto',
    border: 'Bordes',
    semantic: 'Semántico',
};

export const GROUPS: ThemeTokenGroup[] = [
    'background',
    'text',
    'border',
    'semantic',
];

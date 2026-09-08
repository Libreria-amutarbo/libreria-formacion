import { DcxPickListItem } from '../interfaces';

export const PICKLIST_AVAILABLE_COURSES: DcxPickListItem[] = [
  {
    id: 'angular-foundations',
    label: 'Angular Foundations',
    description: 'Componentes, signals y routing',
    icon: 'braces',
    category: 'Frontend',
  },
  {
    id: 'design-system',
    label: 'Design System',
    description: 'Tokens, accesibilidad y patrones UI',
    icon: 'palette',
    category: 'UX',
  },
  {
    id: 'testing-library',
    label: 'Testing Library',
    description: 'Pruebas unitarias y de integracion',
    icon: 'check2-square',
    category: 'Quality',
  },
  {
    id: 'rxjs-practical',
    label: 'RxJS Practico',
    description: 'Streams, operadores y estado reactivo',
    icon: 'diagram-3',
    category: 'Frontend',
  },
  {
    id: 'node-api',
    label: 'Node API',
    description: 'Servicios REST, validacion y seguridad',
    icon: 'server',
    category: 'Backend',
  },
  {
    id: 'cloud-basics',
    label: 'Cloud Basics',
    description: 'Despliegue, observabilidad y costes',
    icon: 'cloud',
    category: 'Platform',
  },
];

export const PICKLIST_SELECTED_COURSES: DcxPickListItem[] = [
  {
    id: 'git-workflow',
    label: 'Git Workflow',
    description: 'Ramas, PRs y revision de codigo',
    icon: 'git',
    category: 'Engineering',
  },
  {
    id: 'agile-delivery',
    label: 'Agile Delivery',
    description: 'Planificacion, refinamiento y retrospectivas',
    icon: 'kanban',
    category: 'Delivery',
  },
];

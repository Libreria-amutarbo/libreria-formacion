import type {
  DcxAccordionTransition,
  DcxAccordionVariant,
  DcxWebAccordionItem,
} from '../interfaces';

export const DcxAccordionTransitionList: DcxAccordionTransition[] = [
  'fast',
  'none',
  'slow',
  'smooth',
];

export const DcxAccordionVariantList: DcxAccordionVariant[] = [
  'default',
  'flush',
];

export const DcxAccordionDefault: DcxWebAccordionItem[] = [
  {
    id: '1',
    title: '¿Qué es DCX?',
    content:
      'DCX es el centro de excelencia en experiencia digital de Capgemini. Desarrollamos soluciones de interfaz de usuario reutilizables, accesibles y coherentes para los proyectos de nuestros clientes.',
  },
  {
    id: '2',
    title: '¿Cómo se instala la librería?',
    content:
      'Instala el paquete con npm install @dcx-ng-components/dcx-ng-lib y añade el módulo en tu AppModule o importa directamente los componentes standalone que necesites.',
  },
  {
    id: '3',
    title: 'Contenido con interacción deshabilitada',
    content:
      'Este panel es visible pero sus controles internos están deshabilitados mediante disabledContent. Útil para mostrar información de solo lectura.',
    disabledContent: true,
  },
  {
    id: '4',
    title: 'Elemento deshabilitado',
    disabled: true,
  },
];

export const DcxAccordionItemsWithIcon: DcxWebAccordionItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    content: 'View your dashboard with analytics and reports.',
    icon: 'speedometer2',
  },
  {
    id: '2',
    title: 'Settings',
    content: 'Configure your application settings.',
    icon: 'gear-fill',
  },
  {
    id: '3',
    title: 'Profile',
    content: 'Manage your profile information.',
    icon: 'person-fill',
  },
];

export const DcxAccordionItemsWithExpanded: DcxWebAccordionItem[] = [
  {
    id: '1',
    title: 'Sección de bienvenida',
    content: 'Esta sección está expandida por defecto gracias a expanded: true.',
    expanded: true,
  },
  {
    id: '2',
    title: 'Características principales',
    content: 'Esta sección está colapsada por defecto.',
  },
  {
    id: '3',
    title: 'Configuración avanzada',
    content: 'Esta sección también está colapsada por defecto.',
  },
];

export const DcxAccordionItemsDisabled: DcxWebAccordionItem[] = [
  {
    id: '1',
    title: 'Introduction',
    content: 'Welcome to our application! This is the introduction section.',
    icon: 'info-circle-fill',
    disabled: true,
  },
  {
    id: '2',
    title: 'Features',
    content: 'Explore the amazing features of our application.',
    icon: 'star-fill',
    disabled: true,
  },
  {
    id: '3',
    title: 'Settings (Disabled)',
    content: 'Advanced settings - Coming soon!',
    icon: 'gear-fill',
    disabled: true,
  },
  {
    id: '4',
    title: 'Help & Support',
    content: 'Get help and support for any issues.',
    icon: 'question-circle-fill',
    disabled: true,
  },
];

export const DcxAccordionItemsContentDisabled: DcxWebAccordionItem[] = [
  {
    id: '1',
    title: 'Introduction',
    content: 'Welcome to our application! This is the introduction section.',
    icon: 'info-circle-fill',
    disabledContent: true,
  },
  {
    id: '2',
    title: 'Features',
    content: 'Explore the amazing features of our application.',
    icon: 'star-fill',
    disabledContent: true,
  },
  {
    id: '3',
    title: 'Settings (Disabled)',
    content: 'Advanced settings - Coming soon!',
    icon: 'gear-fill',
    disabledContent: true,
  },
  {
    id: '4',
    title: 'Help & Support',
    content: 'Get help and support for any issues.',
    icon: 'question-circle-fill',
    disabledContent: true,
  },
];

export const DcxAccordionLargeContent: DcxWebAccordionItem[] = [
  {
    id: '1',
    title: 'Contenido extenso con scroll interno',
    description: 'Desplázate dentro del panel para ver todo el texto',
    icon: 'info-circle-fill',
    maxContentHeight: '280px',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
];

export const DcxAccordionItemsWithDescription: DcxWebAccordionItem[] = [
  {
    id: '1',
    title: 'Información general',
    description: 'Datos básicos del servicio',
    content: 'Aquí encontrarás los datos generales del servicio contratado.',
    icon: 'info-circle-fill',
  },
  {
    id: '2',
    title: 'Configuración',
    description: 'Ajustes y preferences',
    content: 'Modifica los parámetros del servicio según tus necesidades.',
    icon: 'gear-fill',
  },
  {
    id: '3',
    title: 'Historial de cambios',
    description: 'Registro de actividad reciente',
    content: 'Consulta todos los cambios realizados durante el último mes.',
    icon: 'clock-history',
  },
];

export const LIST_ITEMS_MOCK = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

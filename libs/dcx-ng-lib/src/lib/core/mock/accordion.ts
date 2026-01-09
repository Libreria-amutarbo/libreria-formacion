import { DcxNgAccordionItem } from '../interfaces/accordion';

export const DcxAccordionMock: DcxNgAccordionItem[] = [
    {
        id: '1',
        title: 'Item 1',
        content: 'Content 1',
    },
    {
        id: '2',
        title: 'Item 2',
        content: 'Content 2',
    },
    {
        id: '3',
        title: 'Item 3 (Disabled)',
        content: 'Content 3',
        disabled: true,
    },
];

export const ACCORDION_ITEMS_WITH_ICONS: DcxNgAccordionItem[] = [
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

export const ACCORDION_ITEMS_WITH_EXPANDED: DcxNgAccordionItem[] = [
  {
    id: '1',
    title: 'Section 1',
    content: 'This section is expanded by default.',
    expanded: true,
  },
  {
    id: '2',
    title: 'Section 2',
    content: 'This section is collapsed by default.',
  },
  {
    id: '3',
    title: 'Section 3',
    content: 'This section is also collapsed by default.',
  },
];

export const ACCORDION_ITEMS_COMPLEX: DcxNgAccordionItem[] = [
  {
    id: '1',
    title: 'Introduction',
    content: 'Welcome to our application! This is the introduction section.',
    icon: 'info-circle-fill',
    expanded: true,
  },
  {
    id: '2',
    title: 'Features',
    content: 'Explore the amazing features of our application.',
    icon: 'star-fill',
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
    disabledContent: true,
  },
];

export const ACCORDION_ITEMS_LARGE_CONTENT: DcxNgAccordionItem[] = [
  {
    id: '1',
    title: 'Introduction',
    icon: 'book-fill',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    title: 'Detailed Information with Very Long Content',
    icon: 'info-circle-fill',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
  },
  {
    id: '3',
    title: 'Conclusion',
    icon: 'check-circle-fill',
    content: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  },
];

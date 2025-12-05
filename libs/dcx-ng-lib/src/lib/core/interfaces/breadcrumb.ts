export interface DcxBreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  disabled: boolean;
}

export type DcxBreadCrumbSeparatorIcons =
  | 'slash-lg'
  | 'chevron-right'
  | 'arrow-right-short';

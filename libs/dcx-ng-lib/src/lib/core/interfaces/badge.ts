export type BadgeSeverityType = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger';
export type BadgeSizeType = 'sm' | 'md' | 'lg' | 'xl';

export interface DcxNgBadgeComponentInputs {
  value: ReturnType<() => string>;
  severity: ReturnType<() => BadgeSeverityType>;
  size: ReturnType<() => BadgeSizeType>;
}

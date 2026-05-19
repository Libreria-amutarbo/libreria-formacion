export enum BadgeSeverity {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  DANGER = 'danger',
}

export enum BadgeSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export type BadgeSeverityType = `${BadgeSeverity}`;
export type BadgeSizeType = `${BadgeSize}`;

export interface DcxNgBadgeComponentInputs {
  value: ReturnType<() => string>;
  severity: ReturnType<() => BadgeSeverityType>;
  size: ReturnType<() => BadgeSizeType>;
}

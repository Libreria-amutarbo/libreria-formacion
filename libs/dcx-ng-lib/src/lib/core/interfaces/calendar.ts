export type DcxCalendarView = 'month' | 'week' | 'year' | 'mini';

export type DcxCalendarSelectionMode = 'none' | 'single' | 'range';

export type DcxCalendarEventType =
  | 'meeting'
  | 'delivery'
  | 'reminder'
  | 'urgent'
  | 'personal';

export type DcxCalendarRecurrence = 'none' | 'daily' | 'weekly' | 'monthly';

export type DcxCalendarDeleteScope = 'single' | 'following' | 'all';

export interface DcxCalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  type: DcxCalendarEventType;
  description?: string;
  recurrence?: DcxCalendarRecurrence;
  seriesId?: string;
}

export interface DcxCalendarEventDraft {
  title: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  type: DcxCalendarEventType;
  description?: string;
  recurrence: DcxCalendarRecurrence;
}

export interface DcxCalendarDeleteRequest {
  eventId: string;
  scope: DcxCalendarDeleteScope;
}

export interface DcxCalendarDayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  events: DcxCalendarEvent[];
}

export interface DcxCalendarWeekDay {
  date: Date;
  label: string;
  isToday: boolean;
  isWeekend: boolean;
}

export interface DcxCalendarMonthSummary {
  index: number;
  label: string;
  weeks: DcxCalendarDayCell[][];
  isActive: boolean;
}
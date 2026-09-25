import { DcxCalendarEvent } from '../interfaces';
export declare const makeCalendarEvent: (overrides?: Partial<DcxCalendarEvent>) => DcxCalendarEvent;
export declare const cloneCalendarEvents: (events: DcxCalendarEvent[]) => DcxCalendarEvent[];
export declare const buildCalendarDemoEvents: () => DcxCalendarEvent[];
export declare const DCX_CALENDAR_DEMO_EVENTS: DcxCalendarEvent[];

/**
 * Calculates timeframe integers for a given date or the current date
 * Day 1 = Jan 1, 1970
 * Week 1 = Week containing Jan 1, 1970 (until first Sunday)
 * Month 1 = Jan 1970
 * Year = Actual calendar year
 */

import { differenceInCalendarDays, differenceInCalendarWeeks, differenceInCalendarMonths, getYear, startOfWeek, isBefore, addDays, addMonths, addWeeks, endOfDay, endOfWeek, endOfMonth, endOfYear, differenceInWeeks } from 'date-fns';

export type FrameType = 'page' | 'week' | 'month' | 'year' | 'collection';

const EPOCH = new Date(1970, 0, 1); // Jan 1, 1970 00:00:00
const EPOCH_WEEK_START = startOfWeek(EPOCH);

export interface TimeframeIntegers {
  day: number;
  week: number;
  month: number;
  year: number;
}

type PartialTimeframeIntegers = Partial<TimeframeIntegers>;

// Return type will have the same keys as the input
type MappedTimeframeDates<T extends PartialTimeframeIntegers> = {
  [K in keyof T]: [Date, Date];
};

type StandardFrameType = Extract<FrameType, keyof TimeframeIntegers>;

/**
 * Returns the timeframe integers for a given date
 * 
 * Day 1 = Jan 1, 1970
 * Week 1 = Week containing Jan 1, 1970 (until locale-specific first day of week)
 * Month 1 = Jan 1970
 * Year = Actual calendar year
 * 
 * @param date - The date to get the timeframe integers for
 * @returns The timeframe integers
 */
export function getTimeframeIntegers(date: Date | null = null): TimeframeIntegers {
  const targetDate = date || new Date();
  
  // Reject dates before 1970
  if (isBefore(targetDate, EPOCH)) {
    throw new Error('Dates before January 1, 1970 are not supported');
  }

  // Calculate day number (days since epoch + 1)
  const day = differenceInCalendarDays(targetDate, EPOCH) + 1;

  // Calculate week number
  // If date is before first week start, it's week 1
  // Otherwise, calculate weeks since first week start and add 1
  const week = differenceInCalendarWeeks(targetDate, EPOCH_WEEK_START) + 1;

  // Calculate month number (months since epoch + 1)
  const month = differenceInCalendarMonths(targetDate, EPOCH) + 1;

  // Year is just the calendar year
  const year = getYear(targetDate);

  return {
    day,
    week,
    month,
    year
  };
}

export function getDatesFromTimeframeIntegers<T extends PartialTimeframeIntegers>(timeframe: T): MappedTimeframeDates<T> {
  const result = {} as MappedTimeframeDates<T>;

  if (timeframe.day) {
    const startDate = addDays(EPOCH, timeframe.day - 1);
    (result as any).day = [startDate, endOfDay(startDate)];
  }
  
  if (timeframe.week) {
    const startDate = addWeeks(EPOCH_WEEK_START, timeframe.week - 1);
    (result as any).week = [startDate, endOfWeek(startDate)];
  }
  
  if (timeframe.month) {
    const startDate = addMonths(EPOCH, timeframe.month - 1);
    (result as any).month = [startDate, endOfMonth(startDate)];
  }
  
  if (timeframe.year) {
    const startDate = new Date(timeframe.year, 0, 1);
    (result as any).year = [startDate, endOfYear(startDate)];
  }
  
  if (Object.keys(result).length === 0) {
    throw new Error('At least one timeframe integer must be provided');
  }
  
  return result;
}

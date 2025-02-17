import { differenceInCalendarDays, differenceInCalendarWeeks, differenceInCalendarMonths, getYear, isBefore } from 'date-fns';
import { EPOCH, EPOCH_WEEK_START } from './constants';
import type { TimeframeIntegers } from './types';

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
export function getTimeframeIntegers(date: Date | null = new Date()): TimeframeIntegers {
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
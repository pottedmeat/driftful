import { addDays, addMonths, addWeeks, endOfDay, endOfWeek, endOfMonth, endOfYear } from 'date-fns';
import { EPOCH, EPOCH_WEEK_START } from './constants';
import type { PartialTimeframeIntegers, MappedTimeframeDates } from './types';

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
import { format, isToday, isTomorrow, isYesterday, isSameMonth, isSameYear } from 'date-fns';
import { getDatesFromTimeframeIntegers } from '~/lib/utils/date/getDatesFromTimeframeIntegers';

import type { FrameType, FrameTypeWindow } from '~/types';

/**
 * Formats a title based on start and end dates following these rules:
 * - Uses "Today", "Yesterday", "Tomorrow" for those special days
 * - Shows only dates for same month in current year: "Feb 9 – 11"
 * - Shows months for different months in current year: "Jan 30 – Feb 1"
 * - Shows only end year for dates in same previous year: "Mar 3 – Apr 6, 2023"
 * - Shows only end year for dates in same previous month and year: "Mar 3–6, 2023"
 * - Shows full dates for different years: "Dec 31, 2023 – Jan 15, 2024"
 * - If startDate is null, shows Oldest — endDate
 * - If endDate is null, shows startDate — Future
 * - If both are null, shows Future
 */
export function formatFrameTitle(frameType: FrameType, frameWindow: FrameTypeWindow): string {
  if (frameType === 'collection' || frameType === 'year') {
    return `${frameWindow}`;
  }

  if (frameType === 'page') {
    if (frameWindow === 'future') {
      // TODO: Get the date of the entity farthest in the future
      return 'Tomorrow — Farthest Entity';
    }
    if (frameWindow === 'today') {
      // TODO: Get the page where end_day is null
      return 'Start Date — Today';
    }
    // TODO: Get the page with this page number
    return `Page ${frameWindow}`;
  }

  if (typeof frameWindow !== 'number') {
    return 'Unknown Timeframe';
  }
  
  const now = new Date();
  const timeframe = { [frameType]: frameWindow };
  const dates = getDatesFromTimeframeIntegers(timeframe);
  const [startDate, endDate] = dates[frameType];

  if (frameType === 'month') {
    const needsYear = !isSameYear(startDate, now);
    return format(startDate, needsYear ? 'MMMM yyyy' : 'MMMM');
  }
  
  if (!startDate && !endDate) return "Future";

  // Handle null end date (current page)
  if (!endDate) {
    if (!startDate) return "Today";
    if (isToday(startDate)) return "Today";
    return `${format(startDate, "MMM do, yyyy")} — Today`;
  }

  // Handle null start date (only show end date)
  if (!startDate) {
    let endPart = '';
    if (isToday(endDate)) endPart = "Today";
    else if (isYesterday(endDate)) endPart = "Yesterday";
    else if (isTomorrow(endDate)) endPart = "Tomorrow";
    else {
      const needsYear = !isSameYear(endDate, now);
      endPart = format(endDate, needsYear ? "MMM d, yyyy" : "MMM d");
    }
    return `Oldest — ${endPart}`;
  }

  // Format start date part
  let startPart = "";
  if (isToday(startDate)) {
    startPart = "Today";
  } else if (isYesterday(startDate)) {
    startPart = "Yesterday";
  } else if (isTomorrow(startDate)) {
    startPart = "Tomorrow";
  } else {
    const needsYear = !isSameYear(startDate, now) && !isSameYear(startDate, endDate);
    const needsMonth = !isSameMonth(startDate, endDate) || !isSameMonth(startDate, now) || !isSameYear(startDate, endDate);
    startPart = format(startDate, needsYear ? "MMM do, yyyy" : needsMonth ? "MMM do" : "do");
  }

  // Format end date part
  let endPart = "";
  if (isToday(endDate)) {
    endPart = "Today";
  } else if (isYesterday(endDate)) {
    endPart = "Yesterday";
  } else if (isTomorrow(endDate)) {
    endPart = "Tomorrow";
  } else {
    const needsYear = !isSameYear(endDate, now);
    const needsMonth = !isSameMonth(startDate, endDate);
    const format_str = needsYear ? 
      (needsMonth ? "MMM do, yyyy" : "do, yyyy") :
      (needsMonth ? "MMM do" : "do");
    endPart = format(endDate, format_str);
  }

  return `${startPart} – ${endPart}`;
}
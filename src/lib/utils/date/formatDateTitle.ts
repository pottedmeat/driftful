import { format, isToday, isTomorrow, isYesterday, isSameMonth, isSameYear } from 'date-fns';

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
export function formatDateTitle(startDate: Date | null, endDate: Date | null): string {
  if (!startDate && !endDate) return "Future";

  // Handle null end date (current page)
  if (!endDate) {
    if (!startDate) return "Today";
    if (isToday(startDate)) return "Today";
    return `${format(startDate, "MMM d, yyyy")} — Today`;
  }

  // Handle null start date (only show end date)
  if (!startDate) {
    let endPart = '';
    if (isToday(endDate)) endPart = "Today";
    else if (isYesterday(endDate)) endPart = "Yesterday";
    else if (isTomorrow(endDate)) endPart = "Tomorrow";
    else {
      const needsYear = !isSameYear(endDate, new Date());
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
    const needsYear = !isSameYear(startDate, new Date()) && !isSameYear(startDate, endDate);
    const needsMonth = !isSameMonth(startDate, endDate) || !isSameYear(startDate, endDate);
    startPart = format(startDate, needsYear ? "MMM d, yyyy" : needsMonth ? "MMM d" : "d");
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
    const needsYear = !isSameYear(endDate, new Date());
    const needsMonth = !isSameMonth(startDate, endDate);
    const format_str = needsYear ? 
      (needsMonth ? "MMM d, yyyy" : "d, yyyy") :
      (needsMonth ? "MMM d" : "d");
    endPart = format(endDate, format_str);
  }

  return `${startPart} – ${endPart}`;
} 
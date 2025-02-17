export interface TimeframeIntegers {
  day: number;
  week: number;
  month: number;
  year: number;
}

export type PartialTimeframeIntegers = Partial<TimeframeIntegers>;

// Return type will have the same keys as the input
export type MappedTimeframeDates<T extends PartialTimeframeIntegers> = {
  [K in keyof T]: [Date, Date];
}; 
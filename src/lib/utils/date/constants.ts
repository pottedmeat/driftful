import { startOfWeek } from "date-fns";

export const EPOCH = new Date(1970, 0, 1); // Jan 1, 1970 00:00:00
export const EPOCH_WEEK_START = startOfWeek(EPOCH);
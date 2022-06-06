export type Duration = number;

export const millisecond: Duration = 1;
export const second: Duration = 1000 * millisecond;
export const minute: Duration = 60 * second;
export const hour: Duration = 60 * minute;
export const day: Duration = 24 * hour;
export const week: Duration = 7 * day;

export const inMilliseconds = (d: Duration): Duration => d / millisecond;
export const inSeconds = (d: Duration): Duration => d / second;
export const inMinutes = (d: Duration): Duration => d / minute;
export const inHours = (d: Duration): Duration => d / hour;
export const inDays = (d: Duration): Duration => d / day;
export const inWeeks = (d: Duration): Duration => d / week;

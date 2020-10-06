import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import differenceInYears from 'date-fns/differenceInYears';

export const getEndOfDay = (date: Date | null) => endOfDay(date || new Date());
export const getStartOfDay = (date: Date | null) => startOfDay(date || new Date());
export const isYoungerThanFifthteen = (date: Date) => differenceInYears(new Date(), date) < 15;
export const isUnderAge = (date: Date) => differenceInYears(new Date(), date) < 18;

import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';

export const getEndOfDay = (date: Date | null) => endOfDay(date || new Date());
export const getStartOfDay = (date: Date | null) => startOfDay(date || new Date());

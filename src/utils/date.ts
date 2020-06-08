import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';

export const getEndOfDay = () => endOfDay(new Date());
export const getStartOfDay = () => startOfDay(new Date());

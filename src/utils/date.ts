import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import differenceInYears from 'date-fns/differenceInYears';
import isSunday from 'date-fns/isSunday';
import getHours from 'date-fns/getHours';

export const getEndOfDay = (date: Date | null) => endOfDay(date || new Date());

export const getStartOfDay = (date: Date | null) => startOfDay(date || new Date());

export const isYoungerThanFifthteen = (date: Date) => differenceInYears(new Date(), date) < 15;

export const isUnderAge = (date: Date) => differenceInYears(new Date(), date) < 18;

export const isSundayAfter10PM = () => {
	const currentDate = new Date();

	return isSunday(currentDate) && getHours(currentDate) >= 22;
};

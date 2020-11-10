import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import differenceInYears from 'date-fns/differenceInYears';
import isSunday from 'date-fns/isSunday';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import getDate from 'date-fns/getDate';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';

const getDetailDate = (date: Date) => ({
	year: getYear(date),
	month: getMonth(date),
	day: getDate(date),
});

export const getEndOfDay = (date: Date | null) => endOfDay(date || new Date());

export const getStartOfDay = (date: Date | null) => startOfDay(date || new Date());

export const isYoungerThanFifthteen = (date: Date) => differenceInYears(new Date(), date) < 15;

export const isUnderAge = (date: Date) => differenceInYears(new Date(), date) < 18;

export const isWeekDayLateNightOrSunday = () => {
	const currentDate = new Date();

	if (isSunday(currentDate)) {
		return true;
	}

	const detailDate = getDetailDate(currentDate);
	const startInterval = new Date(detailDate.year, detailDate.month, detailDate.day, 23, 0, 0);
	const endInterval = new Date(detailDate.year, detailDate.month, detailDate.day, 8, 0, 0);
	const isAfter11PM = isAfter(currentDate, startInterval);
	const isBefore8AM = isBefore(currentDate, endInterval);

	return isAfter11PM || isBefore8AM;
};

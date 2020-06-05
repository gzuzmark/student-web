import format from 'date-fns/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import es from 'date-fns/locale/es';

const CURRENT_TIME_ZONE = '-5';

export const formatApiDate = (date: Date | string, strFormat = 'h:mmaa') => {
	const dateObj = date instanceof Date ? date : new Date(date);
	const formattedDate = format(dateObj, strFormat);

	return formattedDate.toLowerCase();
};

export const parseUTCDate = (date: number): Date => {
	const dateObj = utcToZonedTime(date * 1000, CURRENT_TIME_ZONE);

	return dateObj;
};

export const formatUTCDate = (date: number, strFormat: string) => {
	const dateObj = parseUTCDate(date);
	const formattedDate = format(dateObj, strFormat, { locale: es });

	return formattedDate;
};

export const capitalizeDate = (date: string): string => [date[0].toUpperCase(), ...date.split('').slice(1)].join('');

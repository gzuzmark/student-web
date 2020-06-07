import format from 'date-fns/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import es from 'date-fns/locale/es';
import getUnixTime from 'date-fns/getUnixTime';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';

export const CURRENT_TIME_ZONE = '-5';

export const formatApiDate = (date: Date | string, strFormat = 'h:mmaa') => {
	const dateObj = date instanceof Date ? date : new Date(date);
	const formattedDate = format(dateObj, strFormat);

	return formattedDate.toLowerCase();
};

export const parseUTCDate = (date: number): Date => {
	const dateObj = utcToZonedTime(date * 1000, CURRENT_TIME_ZONE);

	return dateObj;
};

export const dateToUTC = (date: Date | number): Date => {
	const dateObj = zonedTimeToUtc(new Date(date), CURRENT_TIME_ZONE);

	return dateObj;
};

export const dateToUTCUnixTimestamp = (date: Date | number): number => {
	const dateObj = dateToUTC(date);

	return getUnixTime(dateObj);
};

export const formatUTCDate = (date: number, strFormat: string) => {
	const dateObj = parseUTCDate(date);
	const formattedDate = format(dateObj, strFormat, { locale: es });

	return formattedDate;
};

export const capitalizeDate = (date: string): string => [date[0].toUpperCase(), ...date.split('').slice(1)].join('');

export const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

export const transformToSnakeCase = <T extends object, R extends object>(obj: T): R => {
	const keys = Object.keys(obj);
	const newObj = {};

	keys.forEach((key: string) => {
		const snakeKey = snakeCase(key);

		// eslint-disable-next-line
		// @ts-ignore
		newObj[snakeKey] = obj[key];
	});

	return newObj as R;
};

export const transformToCamelCase = <T extends object, R extends object>(obj: T): R => {
	const keys = Object.keys(obj);
	const newObj = {};

	keys.forEach((key: string) => {
		const snakeKey = camelCase(key);

		// eslint-disable-next-line
		// @ts-ignore
		newObj[snakeKey] = obj[key];
	});

	return newObj as R;
};

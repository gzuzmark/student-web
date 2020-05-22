import format from 'date-fns/format';

export const formatApiDate = (date: Date | string, strFormat = 'h:mmaa') => {
	const dateObj = date instanceof Date ? date : new Date(date);
	const formattedDate = format(dateObj, strFormat);

	return formattedDate.toLowerCase();
};

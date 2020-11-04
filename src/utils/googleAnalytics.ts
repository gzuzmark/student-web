import { routToTitle } from 'routes';
import { GTagEvent } from 'types';

export const addGAEvent = (options: GTagEvent) => {
	console.log({
		event: 'virtualEvent',
		...options,
	});

	if (process.env.NODE_ENV === 'production') {
		window.dataLayer.push({
			event: 'virtualEvent',
			...options,
		});
	}
};

const processPath = (path: string): string => {
	const matches = path.match(/\w+/g);

	if (matches) {
		return matches.length > 1 ? 'detalle-cita' : matches[0];
	}

	return '';
};

export const sendGANavigation = (path: string) => {
	if (process.env.NODE_ENV === 'production') {
		window.dataLayer.push({
			event: 'virtualPage',
			pagePath: path,
			pageName: `Alivia - ${routToTitle[processPath(path)]}`,
		});
	}
};

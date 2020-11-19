import { routeToTitle } from 'routes';
import { GTagEvent } from 'types';

export const addGAEvent = (options: GTagEvent) => {
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
		return matches.join('_');
	}

	return '';
};

export const sendGANavigation = (path: string) => {
	if (process.env.NODE_ENV === 'production') {
		window.dataLayer.push({
			event: 'virtualPage',
			pagePath: path,
			pageName: `Alivia - ${routeToTitle[processPath(path)]}`,
		});
	}
};

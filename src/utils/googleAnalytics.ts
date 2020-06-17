import { routToTitle } from 'routes';

export const addGAEvent = (eventName: string, page: string, action: string) => {
	if (process.env.NODE_ENV === 'production') {
		window.gtag('send', eventName, page, action);
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
		window.gtag('config', 'UA-162231349-2', {
			page_title: routToTitle[processPath(path)],
			page_path: path,
		});
	}
};

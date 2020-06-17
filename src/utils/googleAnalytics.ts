export const addGAEvent = (eventName: string, page: string, action: string) => {
	if (process.env.NODE_ENV === 'production') {
		window.gtag('send', eventName, page, action);
	}
};

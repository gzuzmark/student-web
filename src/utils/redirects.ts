export const redirectToURL = (url: string, openInNewTab = false) => {
	if (openInNewTab) {
		window.open(url, '_blank');
	} else {
		window.location.href = url;
	}
};

export const redirectToBaseAlivia = () => {
	redirectToURL('https://alivia.pe');
};

export const getIntCurrency = (currency: string) => Math.round(Number(currency) * 100);

const initCulqi = (amount: string) => {
	if (window.Culqi) {
		window.Culqi.publicKey = process.env.REACT_APP_CULQI_PK_KEY || '';
		window.Culqi.options({
			lang: 'auto',
			style: {
				logo: 'https://i.imgur.com/D4ZRFAl.png',
				maincolor: '#1ECD96',
				buttontext: '#ffffff',
				maintext: '#535B6C',
				desctext: '#535B6C',
			},
		});
		window.Culqi.settings({
			title: 'Alivia',
			currency: 'PEN',
			description: 'Consulta',
			amount: getIntCurrency(amount),
		});
	}
};

export default initCulqi;

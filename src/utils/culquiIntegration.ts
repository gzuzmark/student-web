const initCulqi = (amount: number) => {
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
			amount: Math.round(amount * 100),
		});
	}
};

export default initCulqi;

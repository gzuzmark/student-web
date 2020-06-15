interface CulqiClient {
	browser: string;
	device_fingerprint: string | null;
	device_type: string;
	ip: string;
	ip_country: string;
	ip_country_code: string;
}

interface CulqiToken {
	active: boolean;
	id: string;
	card_number: string;
	client: CulqiClient;
	email: string;
	last_four: string;
	object: string;
}

interface CulqiError {
	error_message: string;
	user_message: string;
}

export interface Culqui {
	publicKey: string;
	token: CulqiToken | undefined;
	init: Function;
	options: Function;
	settings: Function;
	open: () => void;
	error: CulqiError | undefined;
}

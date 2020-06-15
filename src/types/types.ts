interface CulqiToken {
	id: string;
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

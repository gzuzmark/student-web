import CustomError from './CustomError';

export interface RequestCard {
	amount: string;
	card: {
		name: string;
		number: string;
		expiryMonth: string;
		expiryYear: string;
		cvc: string;
	};
	currency: string;
	isDeferred: boolean;
}

const changeToSecret = (data: RequestCard): RequestCard => {
	return {
		amount: String(data.amount),
		card: {
			name: data.card.name,
			number: String(data.card.number).replace(/[0-9]/g, '*'),
			expiryMonth: String(data.card.expiryMonth).replace(/[0-9]/g, '*'),
			expiryYear: String(data.card.expiryYear).replace(/[0-9]/g, '*'),
			cvc: String(data.card.cvc).replace(/[0-9]/g, '*'),
		},
		currency: data.currency,
		isDeferred: data.isDeferred,
	};
};

class KushkiCardError extends CustomError {
	public data: RequestCard;
	constructor(message: string, code: string, data: RequestCard) {
		super(message, code);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, KushkiCardError);
		}
		this.data = changeToSecret(data);
	}
}

export default KushkiCardError;

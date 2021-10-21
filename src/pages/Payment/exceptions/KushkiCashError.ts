import CustomError from './CustomError';

class KushkiCashError extends CustomError {
	public data: object;
	constructor(message: string, code: string, data: object) {
		super(message, code);

		this.data = data;
	}
}

export default KushkiCashError;

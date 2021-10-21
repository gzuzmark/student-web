class CustomError extends Error {
	public code: string;
	public data: object | null;

	constructor(message: string | undefined, code: string, data?: object) {
		super(message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError);
		}

		this.code = code;
		this.data = data || null;
	}
}

export default CustomError;

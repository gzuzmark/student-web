import aliviaAxios from 'utils/customAxios';
import { TokenResponse } from './types';

import { setLocalValue } from 'utils';

interface RequestRecoverTokenBody {
	documentNumber: string;
}

interface ResponseRecoverToken {
	data: {
		phone: string;
	};
}

interface VerifyOTPCodeBody {
	documentNumber: string;
	otpCode: string;
}

interface ResponseVerifyOTPCode {
	user_id: string;
}

interface ResetPasswordBody {
	documentNumber: string;
	userId: string;
	password: string;
	otpCode: string;
}

export const requestRecoverToken = async (params: RequestRecoverTokenBody): Promise<string> => {
	try {
		const resp = await aliviaAxios.post<ResponseRecoverToken>('/accounts/recover', {
			document_number: params.documentNumber,
		});
		const contactPhone = resp.data.data.phone;

		return contactPhone;
	} catch (e) {
		// audit actions
		throw Error(e);
	}
};

export const verifyResetPasswordCode = async (params: VerifyOTPCodeBody): Promise<string> => {
	try {
		const resp = await aliviaAxios.post<ResponseVerifyOTPCode>('/accounts/recover/verify', {
			document_number: params.documentNumber,
			code: params.otpCode,
		});
		const userID = resp.data.user_id;

		return userID;
	} catch (e) {
		// audit actions
		throw Error(e);
	}
};

export const resetPassword = async (params: ResetPasswordBody): Promise<string> => {
	try {
		const resp = await aliviaAxios.post<TokenResponse>('/accounts/reset-password', {
			document_number: params.documentNumber,
			user_id: params.userId,
			new_password: params.password,
			code: params.otpCode,
		});
		const data = resp.data;

		setLocalValue('userToken', data.token);
		setLocalValue('refreshToken', data.refresh_token);

		return data.token;
	} catch (e) {
		// audit actions
		throw Error(e);
	}
};

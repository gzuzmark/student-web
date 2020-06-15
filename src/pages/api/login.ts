import aliviaAxios from 'utils/customAxios';

import { setLocalValue } from 'utils';

import { TokenResponse } from './types';

interface LoginFields {
	username: string;
	password: string;
}

interface ForgotPasswordField {
	username: string;
}

export const mockUser = {
	name: 'John',
	lastName: 'Doe',
	secondSurname: 'Late',
	identification: '1234567',
	birthDate: '14/06/1984',
	gender: 'M',
	takeMedicines: true,
	medicineList: 'Test med',
	haveAllergies: false,
	allergies: '',
	moreInfo: '',
	phoneNumber: '123456789',
	email: 'jhon.doe@test.com',
};

export const sendLogin = async (fields: LoginFields): Promise<string | void> => {
	try {
		const resp = await aliviaAxios.post<TokenResponse>('/auth', fields);
		const data = resp.data;

		setLocalValue('userToken', data.token);
		setLocalValue('refreshToken', data.refresh_token);
		return data.token;
	} catch (e) {
		console.log(e);
		throw Error(e);
	}
};

export const logout = async (): Promise<void> => {
	try {
		await aliviaAxios.post('/auth/logout');
	} catch (e) {
		console.log(e);
	}
};

export const forgotPassword = async (fields: ForgotPasswordField): Promise<void> => {
	try {
		await aliviaAxios.post('/auth/recover-password', fields);
		// sendSuccessMessage
	} catch (e) {
		console.log(e);
	}
};

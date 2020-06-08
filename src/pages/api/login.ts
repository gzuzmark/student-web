import aliviaAxios from 'utils/customAxios';
import i18next from 'l18n/index';

import { setLocalValue } from 'utils';

import { TokenResponse } from './types';

const errorMessages = {
	phoneNumber: i18next.t('login:login.phoneNumber.error'),
	password: i18next.t('login:login.password.error'),
};

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

export const sendLogin = async (fields: LoginFields, setFieldErrors: Function): Promise<string | void> => {
	try {
		const resp = await aliviaAxios.post<TokenResponse>('/auth', { data: fields });
		const data = resp.data;

		setLocalValue('userToken', data.token);
		// setLocalValue('refreshToken', data.refresh_token);
		return data.token;
	} catch (e) {
		console.log(e);
		// sendFailsMessage
		setFieldErrors('phoneNumber', errorMessages.phoneNumber);
		setFieldErrors('password', errorMessages.password);
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
		await aliviaAxios.post('/auth/recover-password', { data: fields });
		// sendSuccessMessage
	} catch (e) {
		console.log(e);
	}
};

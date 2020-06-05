import aliviaAxios from 'utils/customAxios';
import { User } from 'AppContext';

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

export const sendLogin = async (fields: LoginFields): Promise<User | undefined> => {
	try {
		const resp = await aliviaAxios.post<LoginFields>('/auth', { data: fields });
		const data = resp.data;
		console.log(data);

		// set auth cookie
		// return data;
		return mockUser;
	} catch (e) {
		console.log(e);
		// sendFailsMessage
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

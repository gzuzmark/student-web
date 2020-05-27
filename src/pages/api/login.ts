import aliviaAxios from 'utils/customAxios';

interface LoginFields {
	username: string;
	password: string;
}

interface ForgotPasswordField {
	username: string;
}

export const sendLogin = async (fields: LoginFields): Promise<LoginFields | undefined> => {
	try {
		const resp = await aliviaAxios.post<LoginFields>('/auth', { data: fields });
		const data = resp.data;

		// set auth cookie
		return data;
	} catch (e) {
		console.log(e);
		// sendFailsMessage
	}
};

export const logout = async (): Promise<void> => {
	await aliviaAxios.post('/auth/logout');
};

export const forgotPassword = async (fields: ForgotPasswordField): Promise<void> => {
	try {
		await aliviaAxios.post('/auth/recover-password', { data: fields });
		// sendSuccessMessage
	} catch (e) {
		console.log(e);
	}
};

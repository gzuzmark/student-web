import aliviaAxios from 'utils/customAxios';
import format from 'date-fns/format';

export interface User {
	name: string;
	lastName: string;
	secondSurname: string;
	identification: string;
	birthDate: Date | null;
	gender: string;
	takeMedicines: boolean | null;
	medicines?: string;
	haveAllergies: boolean | null;
	allergies?: string;
	moreMedicalInformation?: string;
	phoneNumber: string;
	email?: string;
	password?: string;
}

export const sendSignUp = async (user: User): Promise<void> => {
	try {
		await aliviaAxios.post('/signup', {
			data: { ...user, birthDate: user.birthDate && format(new Date(user.birthDate), 'dd/MM/yyyy') },
		});
	} catch (e) {}
};

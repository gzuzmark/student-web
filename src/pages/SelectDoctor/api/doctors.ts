// import axios from 'axios';
import isToday from 'date-fns/isToday';

export interface DoctorAvailability {
	id: number;
	name: string;
	cmp: string;
	profilePicture: string;
	comment?: string;
	availableDates: string[];
}

export interface MedicalSpeciality {
	id: number;
	name: string;
	doctors: DoctorAvailability[];
}

interface RequestProps {
	date: Date;
	useCase: string;
}

export const getMedicalSpecialities = async (data: RequestProps): Promise<MedicalSpeciality[]> => {
	// const response = axios<MedicalSpeciality[]>.get('/specialities', { data });

	const specialities = [
		{
			id: 1,
			name: 'Problemas de Piel',
			doctors: [
				{
					id: 1,
					name: 'Jose Luis Perez Cuellar',
					cmp: '938943',
					profilePicture: 'https://picsum.photos/200/184',
					comment: 'El doctor se preocupa por entender bien lo que tengo. Me dejó explicarle mis síntomas con calma',
					availableDates: [
						'2020-05-20T09:00',
						'2020-05-20T09:30',
						'2020-05-20T10:00',
						'2020-05-20T11:00',
						'2020-05-20T11:30',
						'2020-05-20T12:00',
						'2020-05-20T12:30',
						'2020-05-20T14:00',
						'2020-05-20T14:30',
						'2020-05-20T15:00',
						'2020-05-20T16:30',
						'2020-05-20T17:00',
					],
				},
				{
					id: 2,
					name: 'Sandra Ramirez',
					cmp: '938943',
					profilePicture: 'https://picsum.photos/200/184',
					comment:
						'Cuando conversé con la doctora Riveros, parecía que me conocía desde antes. Entendió mi preocupación',
					availableDates: [
						'2020-05-20T09:00',
						'2020-05-20T09:30',
						'2020-05-20T10:00',
						'2020-05-20T11:00',
						'2020-05-20T11:30',
						'2020-05-20T12:00',
					],
				},
			],
		},
	] as MedicalSpeciality[];

	return isToday(data.date) ? specialities : [];
};

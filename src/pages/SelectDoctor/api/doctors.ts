// import axios from 'axios';

interface DoctorAvailability {
	id: number;
	name: string;
	cmp: string;
	availableDates: string[];
}

interface MedicalSpeciality {
	id: number;
	name: string;
	doctors: DoctorAvailability[];
}

interface RequestProps {
	currentDate: string;
}

export const getMedicalSpecialities = async ({ currentDate }: RequestProps): Promise<MedicalSpeciality[]> => {
	// const response = axios<MedicalSpeciality[]>.get('/specialities', { data: { currentDate } });
	console.log(currentDate);
	const specialities = [
		{
			id: 1,
			name: 'Problemas de Piel',
			doctors: [
				{
					id: 1,
					name: 'Jose Luis Perez Cuellar',
					cmp: '938943',
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
			],
		},
	] as MedicalSpeciality[];

	return specialities;
};

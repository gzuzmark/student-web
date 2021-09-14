export { default as SelectDoctorHour } from './SelectDoctorHour';

export const dataContext = {
	useCase: '0ceb81db-ccfe-4198-b72e-1789fe113494',
	doctor: {
		id: '869790c5-c8e4-47aa-8ada-cd5057de9a06',
		name: 'jon',
		cmp: '189213',
		lastName: 'doe',
		speciality: 'doctor',
		specialityName: 'Consejeria en becas',
		profilePicture:
			'https://lh3.googleusercontent.com/fM2-UmqQ2hgmAwtgI4f6wZblgMOs-P5A7MiV-WRh2cpYqzChDdYsSWW3NkaJaI0W5Aa_EN8-1jeoD45QkPLINntmwzkJNHDCBBqQJhHAc8zZARqRfa8=s0',
		schedules: [
			{
				id: '4dca8430-5b0e-4bdf-8bce-70e5426b04f5',
				startTime: new Date('2021-09-13T16:40:00.000Z'),
				endTime: new Date('2021-09-13T17:00:00.000Z'),
				isDisabled: false,
			},
			{
				id: '9775917a-92c2-436d-8baf-a290064d7795',
				startTime: new Date('2021-09-13T17:40:00.000Z'),
				endTime: new Date('2021-09-13T18:00:00.000Z'),
				isDisabled: false,
			},
			{
				id: 'd784b4ab-26fe-468e-8294-010daa4d27ab',
				startTime: new Date('2021-09-13T18:40:00.000Z'),
				endTime: new Date('2021-09-13T19:00:00.000Z'),
				isDisabled: false,
			},
			{
				id: 'f14f1006-01ae-42f8-8d91-0306e4688164',
				startTime: new Date('2021-09-13T19:20:00.000Z'),
				endTime: new Date('2021-09-13T19:40:00.000Z'),
				isDisabled: false,
			},
			{
				id: '62311d07-0467-40e0-aedc-0baf6ff3123c',
				startTime: new Date('2021-09-13T19:40:00.000Z'),
				endTime: new Date('2021-09-13T20:00:00.000Z'),
				isDisabled: false,
			},
			{
				id: 'b141b424-ebf9-4c59-9241-929b1276415a',
				startTime: new Date('2021-09-13T20:00:00.000Z'),
				endTime: new Date('2021-09-13T20:20:00.000Z'),
				isDisabled: false,
			},
			{
				id: 'ddfcb8e2-da52-42cf-a59d-0067f2efe88e',
				startTime: new Date('2021-09-13T20:20:00.000Z'),
				endTime: new Date('2021-09-13T20:40:00.000Z'),
				isDisabled: false,
			},
		],
		rating: 0,
		aboutMe: '996662609',
		education: '996662609',
		diseases: [],
		patientOpinions: [],
	},
	listDates: [
		{ date: new Date('2021-09-13T05:00:00.000Z'), isEmpty: false },
		{ date: new Date('2021-09-14T05:00:00.000Z'), isEmpty: false },
		{ date: new Date('2021-09-15T05:00:00.000Z'), isEmpty: false },
		{ date: new Date('2021-09-16T05:00:00.000Z'), isEmpty: false },
		{ date: new Date('2021-09-17T05:00:00.000Z'), isEmpty: false },
		{ date: new Date('2021-09-18T05:00:00.000Z'), isEmpty: false },
		{ date: new Date('2021-09-19T05:00:00.000Z'), isEmpty: true },
	],
	isNextDays: false,
	selectDate: new Date('2021-09-13T05:00:00.000Z'),
};

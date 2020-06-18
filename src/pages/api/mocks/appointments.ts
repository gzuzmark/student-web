import { ApiAppointmentDetail } from '../appointments';

export const mockSmallAppointmentList: ApiAppointmentDetail[] = [
	{
		id: '123',
		appointment_type: {
			id: 'asdfas',
			name: 'videollamada',
			cost: '20',
		},
		use_case: {
			id: '123123',
			title: 'resfrio',
		},
		patient: {
			id: '444',
			name: 'Joaquín',
			last_name: 'Salinas',
			second_last_name: 'Herreda',
		},
		doctor: {
			id: '333',
			name: 'Jose Luis',
			last_name: 'Perez Cuellar',
			title: 'MEDICINA GENERAL',
			cmp: '948252',
			photo: 'https://picsum.photos/200/184',
		},
		date: 1590836400, // May 30th - previous date
	},
	{
		id: '125',
		appointment_type: {
			id: 'asdfas',
			name: 'videollamada',
			cost: '10',
		},
		use_case: {
			id: '123123',
			title: 'covid',
		},
		patient: {
			id: '4456',
			name: 'Jose',
			last_name: 'Perez',
			second_last_name: 'Alvarado',
		},
		doctor: {
			id: '334',
			name: 'Luis',
			last_name: 'Miguel',
			title: 'MEDICINA GENERAL',
			cmp: '948312',
			photo: 'https://picsum.photos/200/184',
		},
		date: 1590836400, // May 30th - previous date
	},
	{
		id: '129',
		appointment_type: {
			id: 'asfasbhlkjfas',
			name: 'videollamada',
			cost: '10',
		},
		use_case: {
			id: '123123',
			title: 'dolor de cabeza',
		},
		patient: {
			id: '4456',
			name: 'Mariano',
			last_name: 'del Solar',
			second_last_name: '',
		},
		doctor: {
			id: '334',
			name: 'Julio Ramon',
			last_name: 'Riveiro',
			title: 'MEDICINA GENERAL',
			cmp: '951312',
			photo: 'https://picsum.photos/200/184',
		},
		date: 1590836400, // May 30th - previous date
	},
	{
		id: '127',
		appointment_type: {
			id: 'asfasbhlkjfas',
			name: 'videollamada',
			cost: '10',
		},
		use_case: {
			id: '123123',
			title: 'dolor de cabeza',
		},
		patient: {
			id: '4456',
			name: 'Ricardo',
			last_name: 'Martines',
			second_last_name: 'de la Torre',
		},
		doctor: {
			id: '334',
			name: 'Mario',
			last_name: 'Vargas',
			title: 'MEDICINA GENERAL',
			cmp: '951312',
			photo: 'https://picsum.photos/200/184',
		},
		date: 1590836400, // May 30th - previous date
	},
];

export const mockAppointmentDetail: ApiAppointmentDetail = {
	id: '123',
	appointment_type: {
		id: 'asdfas',
		name: 'videollamada',
		cost: '20',
	},
	use_case: {
		id: '123123',
		title: 'resfrio',
	},
	patient: {
		id: '444',
		name: 'Joaquín',
		last_name: 'Salinas',
		second_last_name: 'Herreda',
	},
	doctor: {
		id: '333',
		name: 'Jose Luis',
		last_name: 'Perez Cuellar',
		title: 'MEDICINA GENERAL',
		cmp: '948252',
		photo: 'https://picsum.photos/200/184',
	},
	date: 1590836400, // May 30th - previous date
};

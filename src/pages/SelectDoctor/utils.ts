import { DoctorAvailability, Doctor } from 'pages/api';

export const formatDoctor = (doctor: DoctorAvailability | null): Doctor | null =>
	doctor
		? {
				id: doctor.id,
				name: doctor.name,
				lastName: doctor.lastName,
				cmp: doctor.cmp,
				profilePicture: doctor.profilePicture,
				speciality: doctor.speciality,
		  }
		: null;
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
				rating: doctor.rating,
				aboutMe: doctor.aboutMe,
				education: doctor.education,
				diseases: doctor.diseases,
				patientOpinions: doctor.patientOpinions,
				specialityName: doctor.specialityName,
				experiences: [], // experiencias
				awards: doctor.awards,
				diagnostics: doctor.diagnostics,
				ageFrom: doctor.ageFrom,
				ageTo: doctor.ageTo,
				gender: doctor.gender,
		  }
		: null;

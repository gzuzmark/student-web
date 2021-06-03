import { Location } from 'history';
import { DoctorAvailability, Doctor } from 'pages/api';
import { ExamDataValues } from './components';
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
		  }
		: null;

export const SUB_ROUTES_EXAM = ['exam', 'laboratory', 'scheduling'];
export const findStepExam = (location: Location) =>
	SUB_ROUTES_EXAM.findIndex((route: string) => location && location.pathname === `/labs/${route}`);

export const checkStepExam = (location: Location, examData: ExamDataValues | undefined, push: Function) => {
	const index = findStepExam(location);
	if (index === 0) {
		push('labs/exam');
	}
};

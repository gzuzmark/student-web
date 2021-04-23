import { DoctorAvailability, Doctor } from 'pages/api';
import { ExamDataValues, ContactValues } from './components';
import { Location } from 'history';
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
	SUB_ROUTES_EXAM.findIndex((route: string) => location && location.pathname === `/examenes/${route}`);

export const checkStepExam = (
	location: Location,
	examData: ExamDataValues | undefined,
	push: Function,
	medicalData: ContactValues | undefined,
) => {
	const index = findStepExam(location);
	console.log('step ytils:', index);
	if (index === 0 && !examData) {
		push('examenes/exam');
	} else if (index === 2 && examData && !medicalData) {
		push('examenes/laboratory');
	} else if (index === 3 && !examData && !medicalData) {
		push('examenes/scheduling');
	}
};

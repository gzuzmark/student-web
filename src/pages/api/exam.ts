import aliviaAxios from 'utils/customAxios';
import { TrackParams } from 'AppContext';
import { ExamByModality } from 'types';

interface ExamRequestBody {
	cost: string;
	appointmentTypeID: string;
	token: string;
	email: string;
	scheduleID: string;
	discountID: string;
	dni: string;
	name: string;
	lastName: string;
	phone: string;
	paymentType: number;
	trackParams: TrackParams;
	reservationAccountID: string;
}

interface FakeSessionBody {
	reservation_account_id: string;
	use_case_id: string;
	doctor_id: string;
	start_time: number;
	end_time: number;
}

export const getExamsByModality = async (id: number): Promise<ExamByModality[]> => {
	const body = {
		exam_modality_id: id,
	};
	try {
		const response = await aliviaAxios.post('/laboratories/exams', body);
		return response.data;
	} catch (error) {
		throw error;
	}
};

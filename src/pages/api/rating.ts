import { AxiosResponse } from 'axios';
import aliviaAxios from 'utils/customAxios';
import { Doctor, Schedule } from '.';

export interface HtppResponseSaveRatingDoctorError {
	ok: boolean;
	message: string;
}

export interface Patient {
	id: string;
	name: string;
	lastname: string;
	second_lastname: string;
}

export interface HttpResponseGetRatingDoctor {
	doctor: Doctor | null;
	schedule: Schedule | null;
	patient: Patient | null;
	hasRating: boolean;
	step: number;
}

export interface HtppResponseSaveRatingDoctorError {
	ok: boolean;
	message: string;
}

export const createRatingDoctor = async (
	sessionId: string,
	stars: number,
	comment: string,
	step: number,
): Promise<HtppResponseSaveRatingDoctorError> => {
	try {
		const body = {
			stars: stars,
			comment: comment,
			step: step,
		};
		await aliviaAxios.post(`/rating/session/${sessionId}`, body);
		return {
			ok: true,
			message: '',
		};
	} catch (error) {
		return processHttpResponse(error as AxiosResponse);
	}
};

const processHttpResponse = (response: AxiosResponse): HtppResponseSaveRatingDoctorError => {
	console.log(response);
	const status = response.status;
	switch (status) {
		case 404:
			return {
				ok: false,
				message: 'Error, la cita médica especificada no ha sido encontrada',
			};
		case 422:
			return {
				ok: false,
				message: 'Error, la cita médica ya ha sido calificada anteriormente',
			};
		case 400:
			return {
				ok: false,
				message: 'Error, el contenido de la calificación tiene errores',
			};
	}

	return {
		ok: false,
		message: 'Error, la calificación no ha podido ser registrado',
	};
};

export const getRatingDoctor = async (sessionId: string): Promise<HttpResponseGetRatingDoctor> => {
	try {
		const resp: AxiosResponse = await aliviaAxios.get(`/rating/session/${sessionId}`);
		return convertDataToResponseRatingDoctor(resp.data);
	} catch (error) {
		return {
			doctor: null,
			schedule: null,
			patient: null,
			hasRating: false,
			step: 0,
		};
	}
};

const convertDataToResponseRatingDoctor = (data: any): HttpResponseGetRatingDoctor => {
	return {
		doctor: {
			id: String(data.doctor.id),
			name: String(data.doctor.name),
			lastName: String(data.doctor.last_name),
			cmp: String(data.doctor.cmp),
			profilePicture: String(data.doctor.photo),
			specialityName: String(data.doctor.specialty_name),
			aboutMe: String(data.doctor.about_me),
			diseases: [],
			patientOpinions: [],
			speciality: '',
			education: '',
			rating: 0,
		},
		schedule: {
			id: String(data.schedule.id),
			startTime: new Date(data.schedule.start_time * 1000),
			endTime: new Date(data.schedule.end_time * 1000),
			isDisabled: false,
		},
		patient: {
			id: String(data.patient.id),
			name: String(data.patient.name),
			lastname: String(data.patient.last_name),
			second_lastname: String(data.patient.second_last_name),
		},
		hasRating: data.hasRating,
		step: data.step,
	};
};

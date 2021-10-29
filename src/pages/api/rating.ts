import { AxiosResponse } from 'axios';
import aliviaAxios from 'utils/customAxios';
import { Doctor, Schedule } from '.';

export interface HtppResponseSaveRatingDoctorError {
	ok: boolean;
	message: string;
}

export interface HttpResponseGetRatingDoctor {
	doctor: Doctor | null;
	schedule: Schedule | null;
	hasRating: boolean;
}

export interface HtppResponseSaveRatingDoctorError {
	ok: boolean;
	message: string;
}

export const createRatingDoctor = async (
	sessionId: string,
	stars: number,
	comment: string,
): Promise<HtppResponseSaveRatingDoctorError> => {
	try {
		const body = {
			stars: stars,
			comment: comment,
		};
		await aliviaAxios.post(`/rating/session/${sessionId}`, body);
		return {
			ok: true,
			message: 'Gracias por su calificación, ha sido registrado con éxito',
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
		return resp.data as HttpResponseGetRatingDoctor;
	} catch (error) {
		return {
			doctor: null,
			schedule: null,
			hasRating: false,
		};
	}
};

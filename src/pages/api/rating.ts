import { AxiosResponse } from 'axios';
import aliviaAxios from 'utils/customAxios';

export interface HtppResponseRatingDoctor {
	ok: boolean;
	message: string;
}

export const createRatingDoctor = async (
	sessionId: string,
	stars: number,
	comment: string,
): Promise<HtppResponseRatingDoctor> => {
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

const processHttpResponse = (response: AxiosResponse): HtppResponseRatingDoctor => {
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

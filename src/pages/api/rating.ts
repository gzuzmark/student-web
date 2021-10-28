import aliviaAxios from 'utils/customAxios';

export const createRatingDoctor = async (sessionId: string, stars: number, comment: string) => {
	try {
		const body = {
			stars: stars,
			comment: comment,
		};
		const response = await aliviaAxios.post(`/rating/session/${sessionId}`, body);
		console.log(response);
	} catch (error) {
		// console.log(error.response.status);
	}
};

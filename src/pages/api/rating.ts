import aliviaAxios from 'utils/customAxios';

export const CreateRatingDoctor = async (sessionId: string, stars: number, comment: string) => {
	try {
		const body = {
			stars: stars,
			comment: comment,
		};
		const response = await aliviaAxios.post(`/rating/session/${sessionId}`, body);
		console.log(response);
	} catch (error) {
		const errorAxios = error as any;
		console.log(errorAxios.response);
	}
};

import aliviaAxios from 'utils/customAxios';

interface PaymentRequestBody {
	cost: string;
	appointmentTypeID: string;
	token: string;
	scheduleID: string;
}

const formatParams = (params: PaymentRequestBody) => ({
	cost: params.cost,
	appointment_type_id: params.appointmentTypeID || 'ugito',
	token: params.token,
	schedule_id: params.scheduleID,
});

export const createPayment = async (params: PaymentRequestBody): Promise<void> => {
	try {
		await aliviaAxios.post('/payments', { ...formatParams(params) });
	} catch (e) {
		throw Error(e);
	}
};

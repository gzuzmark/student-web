import aliviaAxios from 'utils/customAxios';

interface PaymentRequestBody {
	cost: string;
	appointmentTypeID: string;
	token: string;
	scheduleID: string;
	discountID: string;
	dni: string;
}

interface DiscountRequestBody {
	couponCode: string;
	dni: string;
}

export interface Discount {
	id: string;
	totalCost: string;
}

interface DiscountAPI {
	id: string;
	total_cost: string;
}

interface DiscountDataResponse {
	data: DiscountAPI;
}

const formatParams = (params: PaymentRequestBody) => ({
	cost: params.cost,
	appointment_type_id: params.appointmentTypeID || 'ugito',
	token: params.token,
	schedule_id: params.scheduleID,
	discount_id: params.discountID,
	dni: params.dni || '',
});

export const createPayment = async (params: PaymentRequestBody): Promise<void> => {
	try {
		await aliviaAxios.post('/payments', { ...formatParams(params) });
	} catch (e) {
		throw Error(e);
	}
};

export const applyDiscount = async ({ couponCode, dni }: DiscountRequestBody): Promise<Discount> => {
	try {
		const resp = await aliviaAxios.post<DiscountDataResponse>('/discount', {
			coupon_code: couponCode,
			patient_dni: dni || '',
		});
		const discountAPI = resp.data.data;

		return { id: discountAPI.id, totalCost: discountAPI.total_cost };
	} catch (e) {
		throw Error(e);
	}
};

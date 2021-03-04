import aliviaAxios from 'utils/customAxios';
import { TrackParams } from 'AppContext';

export const CULQI_PAYMENT_ID = 1;
export const PE_PAYMENT_ID = 2;
export const TRANSACTION_PAYMENT_ID = 3;
export const KUSHKI_PAYMENT_ID = 1;

export const KUSHKI_RESPONSE_K001 = 'K001';
export const KUSHKI_RESPONSE_K004 = 'K004';
export const KUSHKI_RESPONSE_K005 = 'K005';
export const KUSHKI_RESPONSE_K017 = '017';

interface PaymentRequestBody {
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

interface DiscountRequestBody {
	couponCode: string;
	dni: string;
	scheduleID: string;
}

export interface Discount {
	id: string;
	totalCost: string;
}

interface DiscountAPI {
	coupon: {
		id: string;
		total_cost: string;
	};
}

interface DiscountDataResponse {
	data: DiscountAPI;
}

const formatParams = (params: PaymentRequestBody) => ({
	cost: params.cost,
	appointment_type_id: params.appointmentTypeID || 'ugito',
	token: params.token,
	email: params.email,
	schedule_id: params.scheduleID,
	discount_id: params.discountID || '',
	patient_dni: params.dni || '',
	patient_name: params.name || '',
	patient_last_name: params.lastName || '',
	patient_phone: params.phone || '',
	payment_type: params.paymentType,
	utm_source: params.trackParams.utmSource || '',
	utm_campaign: params.trackParams.utmCampaign || '',
	utm_medium: params.trackParams.utmMedium || '',
	user_id: params.reservationAccountID || '',
});

export const createPayment = async (params: PaymentRequestBody): Promise<void> => {
	try {
		return await aliviaAxios.post('/payments', { ...formatParams(params) });
	} catch (e) {
		throw Error(e);
	}
};

export const sendFakeSession = async (params: FakeSessionBody): Promise<void> => {
	try {
		return await aliviaAxios.post('/appointments/fake', { ...params });
	} catch (e) {
		throw Error(e);
	}
};

export const applyDiscount = async ({ couponCode, dni, scheduleID }: DiscountRequestBody): Promise<Discount> => {
	try {
		const resp = await aliviaAxios.post<DiscountDataResponse>('/coupons/validate', {
			coupon_code: couponCode,
			patient_dni: dni || '',
			schedule_id: scheduleID,
			appointment_type_id: 'ugito',
		});
		const discountAPI = resp.data.data.coupon;

		return { id: discountAPI.id, totalCost: discountAPI.total_cost };
	} catch (e) {
		throw Error(e);
	}
};

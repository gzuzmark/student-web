import aliviaAxios from 'utils/customAxios';
import { TrackParams } from 'AppContext';
import ApiPaymentError from 'pages/Payment/exceptions/ApiPaymentError';

export const CULQI_PAYMENT_ID = 1;
export const PE_PAYMENT_ID = 2;
export const TRANSACTION_PAYMENT_ID = 3;
export const B2B_PAYMENT_ID = 4;

export const KUSHKI_PAYMENT_ID = 1;

export const KUSHKI_RESPONSE_K001 = 'K001';
export const KUSHKI_RESPONSE_K004 = 'K004';
export const KUSHKI_RESPONSE_K005 = 'K005';
export const KUSHKI_RESPONSE_K017 = '017';

export interface PaymentRequestBody {
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
	benefitID: string;
}

interface PaymentRequestBodyLab {
	cost: number;
	token: string;
	email: string;
	patient_dni: string;
	payment_type: number;
	reservation_date: string;
	user_id: string;
	exam_modality_id: number;
	service_id: number;
	student_id: string;
	laboratory_id: number;
	laboratory_name: string;
	file: string;
	laboratory_exams: LaboratoryExamen[];
}

interface LaboratoryExamen {
	laboratory_exam_id: number;
	available_time_id: number;
	price: string;
}

interface FakeSessionBody {
	reservation_account_id: string;
	use_case_id: string;
	doctor_id: string;
	start_time: number;
	end_time: number;
}

interface DiscountRequestBody {
	benefitID?: string;
	couponCode?: string;
	dni: string;
	scheduleID: string;
}

export interface Discount {
	id: string;
	totalCost: string;
	percentage?: string;
}

export interface DiscountFirstSession {
	status: boolean;
	discount: Discount;
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

interface BenefitDiscountAPI {
	benefit: {
		id: string;
		total_cost: string;
	};
}

interface NewCostAPI {
	coupon: {
		id: string;
		total_cost: string;
		percentage?: string;
	};
}
interface BenefitDiscountDataResponse {
	data: BenefitDiscountAPI;
}
interface ValidateDocumentTalonOneResponse {
	status: boolean;
	data: NewCostAPI;
}

interface ValidateDocumentBody {
	document_number: string;
	total_cost: number;
	scheduleID: string;
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
	benefit_id: params.benefitID || '',
});

export const createPayment = async (params: PaymentRequestBody): Promise<void> => {
	try {
		return await aliviaAxios.post('/payments', { ...formatParams(params) });
	} catch (e) {
		if (e instanceof Error) {
			throw new ApiPaymentError(e.message, 'status http', params);
		}
	}
};

export const createPaymentLab = async (params: PaymentRequestBodyLab): Promise<void> => {
	try {
		return await aliviaAxios.post('/payments/laboratory-exams', { ...params });
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

export const applyBenefit = async ({ benefitID, dni, scheduleID }: DiscountRequestBody): Promise<Discount> => {
	try {
		const resp = await aliviaAxios.post<BenefitDiscountDataResponse>('/benefits/validate-discount', {
			benefit_id: benefitID,
			patient_dni: dni || '',
			schedule_id: scheduleID,
			appointment_type_id: 'b2b',
		});
		const discountAPI = resp.data.data.benefit;

		return { id: discountAPI.id, totalCost: discountAPI.total_cost };
	} catch (e) {
		throw Error(e);
	}
};

const parseResponseDiscount = (id: string, totalCost: string, percentage: string): Discount => ({
	id: id,
	totalCost: totalCost,
	percentage: percentage,
});
export const applyDiscountFirstDate = async ({
	document_number,
	total_cost,
	scheduleID,
}: ValidateDocumentBody): Promise<DiscountFirstSession> => {
	try {
		const resp = await aliviaAxios.get<ValidateDocumentTalonOneResponse>(`/user/document`, {
			params: {
				document_number: document_number,
				total_cost: total_cost,
				session_id: scheduleID,
			},
		});
		const respData = resp.data;
		return {
			status: respData.status,
			discount: parseResponseDiscount(
				respData.data.coupon.id,
				respData.data.coupon.total_cost,
				respData.data.coupon.percentage || '',
			),
		};
	} catch (e) {
		throw Error(e);
	}
};

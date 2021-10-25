import {
	createTrackingAccessLog,
	createTrackingDetailLog,
	TrackingAccessLogRequest,
	TrackingDetailLogRequest,
} from 'pages/api/tracking';
import ApiAppoitmentError from './exceptions/ApiAppoitmentError';
import ApiPaymentError from './exceptions/ApiPaymentError';
import CustomError from './exceptions/CustomError';
import KushkiErrors from './exceptions/KushiErrors';
import KushkiCardError from './exceptions/KushkiCardError';
import KushkiCashError from './exceptions/KushkiCashError';
import { DataTracking } from './interfaces';

export const processErrorPayment = (error: Error, dataAppointment: DataTracking): string => {
	if (error instanceof KushkiCardError || error instanceof KushkiCashError) {
		if (error instanceof KushkiCardError) {
			sendTrackingErrorKushkiCard(error, dataAppointment);
		} else {
			sendTrackingErrorKushkiCash(error, dataAppointment);
		}
		const e = error.code as keyof typeof KushkiErrors;
		if (KushkiErrors[e]) {
			return KushkiErrors[e].message;
		}
	} else if (error instanceof ApiPaymentError) {
		sendTrackingErrorPayment(error, dataAppointment);
	} else if (error instanceof ApiAppoitmentError) {
		sendTrackingErrorAppoitment(error, dataAppointment);
	}
	return 'Error al realizar el pago. Por favor contacte con soporte';
};

const sendTrackingErrorKushkiCard = async (error: KushkiCardError, dataAppointment: DataTracking) => {
	try {
		const id = await createTrackingAccessLog(convertDataAppointmentToTrackingRequest(dataAppointment));
		if (id != null) {
			createTrackingDetailLog(convertDataErrorToTrackingDetailRequest(id, requestDetailErrorKushiCard, error));
		}
	} catch (e) {}
};

const sendTrackingErrorKushkiCash = async (error: KushkiCashError, dataAppointment: DataTracking) => {
	try {
		const id = await createTrackingAccessLog(convertDataAppointmentToTrackingRequest(dataAppointment));
		if (id != null) {
			createTrackingDetailLog(convertDataErrorToTrackingDetailRequest(id, requestDetailErrorKushiCash, error));
		}
	} catch (e) {}
};

const sendTrackingErrorPayment = async (error: ApiPaymentError, dataAppointment: DataTracking) => {
	try {
		const id = await createTrackingAccessLog(convertDataAppointmentToTrackingRequest(dataAppointment));
		if (id != null) {
			createTrackingDetailLog(convertDataErrorToTrackingDetailRequest(id, requestDetailErrorPayment, error));
		}
	} catch (e) {}
};

const sendTrackingErrorAppoitment = async (error: ApiAppoitmentError, dataAppointment: DataTracking) => {
	try {
		const id = await createTrackingAccessLog(convertDataAppointmentToTrackingRequest(dataAppointment));
		if (id != null) {
			createTrackingDetailLog(convertDataErrorToTrackingDetailRequest(id, requestDetailErrorAppointment, error));
		}
	} catch (e) {}
};

const convertDataAppointmentToTrackingRequest = (dataAppointment: DataTracking): TrackingAccessLogRequest => {
	let typeUser = 'invitado';
	const { doctor_id: doctorId, session_id: sessionId, patient_id: patientId, user_id: userId } = dataAppointment;
	if (userId != null) {
		if (userId === patientId) {
			typeUser = 'logueado';
		} else {
			typeUser = 'logueado-invitado';
		}
	}

	return {
		doctor_id: doctorId,
		session_id: sessionId,
		patient_id: patientId,
		type_user: typeUser,
	};
};

const convertDataErrorToTrackingDetailRequest = (
	id: string,
	defaultRequest: TrackingDetailLogRequest,
	error: CustomError,
): TrackingDetailLogRequest => {
	return {
		...defaultRequest,
		tracking_id: id,
		payload: JSON.stringify(error.data),
		value_description: `${error.name} | ${error.code} | ${error.message}`,
	};
};

const requestDetailDefault = {
	tracking_id: '',
	value_number: 0,
	value_type: 'string',
	payload: '',
	value_description: '',
};

const requestDetailErrorKushiCard: TrackingDetailLogRequest = {
	...requestDetailDefault,
	type_action: 'error-process-kushki-card',
	description: 'Error al procesar el pago de kushki con tarjeta',
	value_text: 'GET /merchant/v1/merchant/settings | POST /card/v1/tokens',
};

const requestDetailErrorKushiCash: TrackingDetailLogRequest = {
	...requestDetailDefault,
	type_action: 'error-process-kushki-cash',
	description: 'Error al procesar el pago efectivo de kushki',
	value_text: 'GET /card/v1/tokens',
};

const requestDetailErrorPayment: TrackingDetailLogRequest = {
	...requestDetailDefault,
	type_action: 'error-process-api-payment',
	description: 'Error al procesar el post de api payment',
	value_text: 'POST /payments',
};

const requestDetailErrorAppointment: TrackingDetailLogRequest = {
	...requestDetailDefault,
	type_action: 'error-process-api-appointment',
	description: 'Error al procesar el post de api appointment',
	value_text: 'POST /appointments',
};

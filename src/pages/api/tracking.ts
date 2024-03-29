import { device } from 'pages/Tracking/Devices';
import aliviaAxios from 'utils/customAxios';

const URL_POST_CREATE_TRACKING_ACCESS_LOG = '/tracking/access-log';
const URL_POST_CREATE_TRACKING_DETAIL_LOG = '/tracking/detail-log';

export interface TrackingAccessLogRequest {
	session_id: string;
	doctor_id: string | null;
	patient_id: string | null;
	type_user: string | null;
	type_device?: string | null;
}

export interface TrackingAccessLog {
	id: string;
	session_id: string;
	doctor_id: string;
	patient_id: string;
	type_device: string;
	type_user: string;
	created_at: string;
	updated_at: string;
}

interface TrackingAccessLogData {
	id_tracking: string;
}

interface TrackingAccesLogResponse {
	data: TrackingAccessLogData;
}

export interface TrackingLocalStorage {
	sesssionId: string;
	trackingId: string;
}

const TRACKING_ID = 'trackingId';

export const getTrackingLocalStorage = (): TrackingLocalStorage | null => {
	try {
		const data = localStorage.getItem(TRACKING_ID);
		if (data !== null && data !== undefined) {
			return JSON.parse(data);
		}
		return null;
	} catch (error) {
		return null;
	}
};

export const setTrackingLocalStorage = (tracking: TrackingLocalStorage) => {
	localStorage.setItem(TRACKING_ID, JSON.stringify(tracking));
};

export const createTrackingAccessLog = async (accessLog: TrackingAccessLogRequest): Promise<string | null> => {
	try {
		const dataRequest: TrackingAccessLogRequest = {
			...accessLog,
			type_device: device.os.name,
		};
		const resp = await aliviaAxios.post<TrackingAccesLogResponse>(URL_POST_CREATE_TRACKING_ACCESS_LOG, dataRequest);
		const {
			data: { data },
		} = resp;
		return data.id_tracking;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export interface TrackingDetailLogRequest {
	tracking_id: string;
	type_action: string;
	description: string;
	value_description: string | null;
	payload: string | null;
	value_type: string;
	value_number: number | null;
	value_text: string | null;
}

/**
 * Model data for address no coverage
 */
export const trackingDetailAddressNoCoverage = {
	type_action: 'direccion-cobertura',
	description: 'Para la dirección indicada no se tiene cobertura',
	value_description: null,
	value_type: 'string',
	payload: null,
	value_number: null,
	value_text: null,
};

export const createTrackingDetailLogAddressNoCoverage = (trackingId: string | undefined, address: string) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailAddressNoCoverage,
		tracking_id: trackingId || '',
		value_text: address,
	};
	createTrackingDetailLog(request);
};

/**
 * Model data for option ecommerce
 */
export const trackingDetailTwoOptionEcommerce = {
	type_action: 'click-ecommerce',
	description: 'El usuario da click a la segunda opción: ecommerce inkafarma',
	value_description: 'acceso a la cotización de su medicina',
	value_type: 'string',
	payload: null,
	value_number: null,
	value_text: 'click',
};

export const createTrackingDetailOptionEcommerce = (trackingId: string | undefined) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailTwoOptionEcommerce,
		tracking_id: trackingId || '',
	};
	createTrackingDetailLog(request);
};

/**
 * Model click primera opcion
 */
const trackingClickFirstOption = {
	type_action: 'click-descarga-receta',
	description: 'El usuario da click a la primera opción: descargar receta',
	value_description: 'acceso al pdf de la receta médica',
	value_type: 'string',
	payload: null,
	value_number: null,
	value_text: 'click',
};

export const createTrackingClickFirstOption = (trackingId: string | undefined) => {
	const request: TrackingDetailLogRequest = {
		...trackingClickFirstOption,
		tracking_id: trackingId || '',
	};
	createTrackingDetailLog(request);
};

/**
 * Model click primera opcion
 */
const trackingClickThirdOption = {
	type_action: 'click-contacto-inkafarma',
	description: 'El usuario da click a la tecerra opción: quiero que me contacte inkafarma',
	value_description: 'contacto con inkafarma',
	value_type: 'string',
	payload: null,
	value_number: null,
	value_text: 'click',
};

export const createTrackingClickThirdOption = (trackingId: string | undefined) => {
	const request: TrackingDetailLogRequest = {
		...trackingClickThirdOption,
		tracking_id: trackingId || '',
	};
	createTrackingDetailLog(request);
};

/**
 * Data for medicines with stock
 */
const trackingDetailAvailablesMedicines = {
	type_action: 'medicinas-con-stock',
	description: 'La cantidad de medicinas que tienen stock',
	value_description: 'medicinas con stock',
	value_type: 'number',
	value_text: null,
};

export const createTrackingAvailablesMedicines = (
	trackingId: string | undefined,
	total: number,
	payload: string,
	isAlternative: boolean,
) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailAvailablesMedicines,
		tracking_id: trackingId || '',
		value_number: total,
		payload: payload,
	};
	if (isAlternative) {
		request.type_action = `alternativo-${request.type_action}`;
	} else {
		request.type_action = `sugerido-${request.type_action}`;
	}
	createTrackingDetailLog(request);
};

/**
 * Data for medicines without stock
 */
const trackingDetailOutstockMedicines = {
	type_action: 'medicinas-sin-stock',
	description: 'La cantidad de medicinas que no tienen stock',
	value_description: 'medicinas sin stock',
	value_type: 'number',
	value_text: null,
};

export const createTrackingOutstockMedicines = (
	trackingId: string | undefined,
	total: number,
	payload: string,
	isAlternative: boolean,
) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailOutstockMedicines,
		tracking_id: trackingId || '',
		value_number: total,
		payload: payload,
	};
	if (isAlternative) {
		request.type_action = `alternativo-${request.type_action}`;
	} else {
		request.type_action = `sugerido-${request.type_action}`;
	}
	createTrackingDetailLog(request);
};

/**
 * Data for medicines not ecommerce
 */
const trackingDetailMedicinesNotEcommerce = {
	type_action: 'medicinas-no-ecommerce',
	description: 'La cantidad de medicinas que no están disponibles para ecommerce',
	value_description: 'medicinas no disponibles para ecommerce',
	value_type: 'number',
	value_text: null,
};

export const createTrackingMedicinesNotEcommerce = (
	trackingId: string | undefined,
	total: number,
	payload: string,
	isAlternative: boolean,
) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailMedicinesNotEcommerce,
		tracking_id: trackingId || '',
		value_number: total,
		payload: payload,
	};
	if (isAlternative) {
		request.type_action = `alternativo-${request.type_action}`;
	} else {
		request.type_action = `sugerido-${request.type_action}`;
	}
	createTrackingDetailLog(request);
};

/**
 * Data selected medicines for ecommerce
 */
const trackingDetailSelectMedicinesToEcommerce = {
	type_action: 'medicinas-seleccionadas-ecommerce',
	description: 'La cantidad de medicinas que fueron seleccionadas para la comprar por ecommerce',
	value_description: 'total de medicinas',
	value_type: 'number',
	value_text: null,
};

export const createTrackingDetailSelectMedicinesToEcommerce = (
	trackingId: string | undefined,
	total: number,
	payload: string,
) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailSelectMedicinesToEcommerce,
		tracking_id: trackingId || '',
		value_number: total,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data selected medicines for ecommerce
 */
const trackingErrorRedirectToEcommerce = {
	type_action: 'error-redirect-ecommerce',
	description: 'Error al rediccionar al ecommer de inkafarma',
	value_description: 'El error es por una validación de parte de inkafarma',
	value_type: 'string',
	value_number: null,
};

export const createTrackingErrorRedirectToEcommerce = (
	trackingId: string | undefined,
	error: string,
	payload: string,
) => {
	const request: TrackingDetailLogRequest = {
		...trackingErrorRedirectToEcommerce,
		tracking_id: trackingId || '',
		value_text: error,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data error address
 */
const trackingErrorAddress = {
	type_action: 'error-address',
	description: 'Error en la dirección del paciente',
	value_description: 'El paciente no escribió una dirección correcta',
	value_type: 'string',
	value_number: null,
};

export const createTrackingErrorAddress = (trackingId: string | undefined, error: string, payload: string) => {
	const request: TrackingDetailLogRequest = {
		...trackingErrorAddress,
		tracking_id: trackingId || '',
		value_text: error,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data error address reference
 */
const trackingErrorAddressReference = {
	type_action: 'error-address-reference',
	description: 'Error en la referencia de la dirección del paciente',
	value_description: 'El paciente no escribió una referencia para su dirección',
	value_type: 'string',
	value_number: null,
};

export const createTrackingErrorAddressReference = (trackingId: string | undefined, error: string, payload: string) => {
	const request: TrackingDetailLogRequest = {
		...trackingErrorAddressReference,
		tracking_id: trackingId || '',
		value_text: error,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data error address attempt
 */
const trackingAddressPatientAttempt = {
	type_action: 'intento-direccion-paciente',
	description: 'Lo que el paciente escribe como dirección',
	value_description: 'El paciente escribe una dirección',
	value_type: 'string',
	value_number: null,
};

export const createTrackingAddressPatientAttempt = (
	trackingId: string | undefined,
	address: string,
	payload: string,
) => {
	const request: TrackingDetailLogRequest = {
		...trackingAddressPatientAttempt,
		tracking_id: trackingId || '',
		value_text: address,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data error address attempt
 */
const trackingPatientPrescriptionBlank = {
	type_action: 'paciente-sin-receta',
	description: 'El paciente abre el enlace de una receta no emitida',
	value_description: 'No se ha generado aun una receta',
	value_type: 'string',
	value_text: 'click',
	value_number: null,
	payload: null,
};

export const createTrackingPatientPrescriptionBlank = (trackingId: string | undefined) => {
	const request: TrackingDetailLogRequest = {
		...trackingPatientPrescriptionBlank,
		tracking_id: trackingId || '',
	};
	createTrackingDetailLog(request);
};

/**
 * Method master to post detail log
 * @param request data send detail
 */
export const createTrackingDetailLog = async (request: TrackingDetailLogRequest) => {
	try {
		await aliviaAxios.post(URL_POST_CREATE_TRACKING_DETAIL_LOG, request);
	} catch (error) {
		console.error(error);
	}
};

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
 * Data for medicines with stock
 */
export const trackingDetailAvailablesMedicines = {
	type_action: 'medicinas-con-stock',
	description: 'La cantidad de medicinas que tienen stock',
	value_description: 'medicinas con stock',
	value_type: 'number',
	value_text: null,
};

export const createTrackingAvilablesMedicines = (trackingId: string | undefined, total: number, payload: string) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailAvailablesMedicines,
		tracking_id: trackingId || '',
		value_number: total,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data for medicines without stock
 */
export const trackingDetailOutstockMedicines = {
	type_action: 'medicinas-sin-stock',
	description: 'La cantidad de medicinas que no tienen stock',
	value_description: 'medicinas sin stock',
	value_type: 'number',
	value_text: null,
};

export const createTrackingOutstockMedicines = (trackingId: string | undefined, total: number, payload: string) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailOutstockMedicines,
		tracking_id: trackingId || '',
		value_number: total,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data for medicines not ecommerce
 */
export const trackingDetailMedicinesNotEcommerce = {
	type_action: 'medicinas-no-ecommerce',
	description: 'La cantidad de medicinas que no están disponibles para ecommerce',
	value_description: 'medicinas no disponibles para ecommerce',
	value_type: 'number',
	value_text: null,
};

export const createTrackingDetailMedicinesNotEcommerce = (
	trackingId: string | undefined,
	total: number,
	payload: string,
) => {
	const request: TrackingDetailLogRequest = {
		...trackingDetailMedicinesNotEcommerce,
		tracking_id: trackingId || '',
		value_number: total,
		payload: payload,
	};
	createTrackingDetailLog(request);
};

/**
 * Data selected medicines for ecommerce
 */
export const trackingDetailSelectMedicinesToEcommerce = {
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

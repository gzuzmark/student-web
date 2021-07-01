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

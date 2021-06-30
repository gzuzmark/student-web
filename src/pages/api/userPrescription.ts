import { ugoConsoleAxios } from 'utils/customAxios';
import { Position } from './laboratories';
import aliviaAxios from 'utils/customAxios';

export interface StoreMedicine {
	totalPrice: number;
	totalQuantity: number;
	name: string;
	concentration: string;
	activePrinciples: string;
	unit: string;
	unitQuantity: string;
	pharmaceuticalFormPrice: number;
	pharmaceuticalForm: string;
	imgUrl: string;
}

export interface PrescribedMedicine {
	skuInkafarma: string;
	name: string;
	individualMeasure: string;
	individualCost: string;
	totalMeasure: string;
	totalCost: number;
	imgUrl: string;
	hasStock: boolean;
	alternativeMedicine: PrescribedMedicine | null;
	isAvailableForECommerce: boolean;
	totalQuantity: number;
	pharmaceuticalForm: string;
	totalPrice: number;
	medicamentNumber: number;
	concentrations: string;
	activePrinciples: string;
}

export interface Prescription {
	address: string;
	folioNumber: string;
	prescriptionPath: string;
	medicines: PrescribedMedicine[];
	notAvailableNearYou: boolean;
}

interface ImagesApi {
	type: string;
	url: string;
	thumbnails: string | null;
}

interface MedicineAPI {
	skuInkafarma: string;
	productName: string;
	totalQuantity: number;
	totalPrice: number;
	images: ImagesApi[];
	recomendedProduct: MedicineAPI | null;
	statusCode: number;
	pharmaceuticalFormPrice: number;
	pharmaceuticalForm: string;
	unitQuantity: number;
	unit: string;
	medicamentNumber: number;
	concentrations: string;
	activePrinciples: string;
}

interface PrescriptionAPI {
	address: string;
	folioNumber: string;
	latitude: string;
	longitude: string;
	prescriptionPath: string;
	availableProducts: MedicineAPI[];
	hasCoverage: boolean;
}

const formatAlternativeMedicine = (
	medicineAPI: MedicineAPI | null,
	originalMedicamentNumber: number,
): PrescribedMedicine | null =>
	medicineAPI && {
		skuInkafarma: medicineAPI.skuInkafarma,
		name: medicineAPI.productName,
		individualMeasure: `${medicineAPI.pharmaceuticalForm} ${medicineAPI.unitQuantity} ${medicineAPI.unit}`,
		individualCost: medicineAPI.pharmaceuticalFormPrice.toFixed(2),
		totalMeasure: `${medicineAPI.totalQuantity} ${medicineAPI.pharmaceuticalForm} ${medicineAPI.unitQuantity} ${medicineAPI.unit}`,
		totalCost: medicineAPI.totalPrice || 0,
		imgUrl: medicineAPI.images.find((image) => image.type.includes('IMAGEN_DEFAULT_SMALL'))?.url || '',
		hasStock: medicineAPI.statusCode === 1,
		isAvailableForECommerce: true,
		totalQuantity: medicineAPI.totalQuantity,
		pharmaceuticalForm: medicineAPI.pharmaceuticalForm,
		alternativeMedicine: null,
		totalPrice: medicineAPI.totalPrice,
		medicamentNumber: originalMedicamentNumber,
		concentrations: medicineAPI.concentrations,
		activePrinciples: medicineAPI.activePrinciples,
	};

const formatPrescription = ({
	address,
	folioNumber,
	availableProducts,
	prescriptionPath,
	hasCoverage,
}: PrescriptionAPI): Prescription => ({
	address,
	folioNumber,
	prescriptionPath,
	notAvailableNearYou: false, // !hasCoverage
	medicines: (availableProducts || []).map(
		({
			skuInkafarma,
			productName,
			totalQuantity,
			totalPrice,
			images,
			recomendedProduct,
			statusCode,
			pharmaceuticalFormPrice,
			pharmaceuticalForm,
			unitQuantity,
			unit,
			medicamentNumber,
			concentrations,
			activePrinciples,
		}) => ({
			skuInkafarma,
			name: productName,
			individualMeasure: `${pharmaceuticalForm} ${unitQuantity} ${unit}`,
			individualCost: (pharmaceuticalFormPrice || 0).toFixed(2),
			totalMeasure: `${totalQuantity} ${(pharmaceuticalForm || '').toLowerCase()}${
				totalQuantity > 1 ? 's' : ''
			} ${unitQuantity} ${unit}`,
			totalCost: totalPrice || 0,
			imgUrl: (images || []).find((image) => image.type.includes('IMAGEN_DEFAULT_SMALL'))?.url || '',
			hasStock: statusCode === 1,
			alternativeMedicine: formatAlternativeMedicine(recomendedProduct, medicamentNumber),
			isAvailableForECommerce: statusCode !== 3,
			totalQuantity,
			pharmaceuticalForm,
			totalPrice,
			medicamentNumber,
			concentrations,
			activePrinciples,
		}),
	),
});

export const getPrescription = async (
	userId: string,
	updatedPosition: Position | undefined,
	folioNumber: string,
): Promise<Prescription> => {
	try {
		const resp = await ugoConsoleAxios.get<PrescriptionAPI>(
			`/alivia/available_products?sessionId=${userId}&folioNumber=${folioNumber}&latitude=${
				updatedPosition?.lat || ''
			}&longitude=${updatedPosition?.lng || ''}`,
		);

		return formatPrescription(resp.data);
	} catch (e) {
		console.log(e);
		throw Error(e);
	}
};

interface SelectedMedicine {
	sku: string;
	quantity: number;
	pharmaceuticalForm: string;
}

interface RedirectUrlResponse {
	code: string;
	error: string;
	object: string;
}

export type SelectedMedicines = SelectedMedicine[];

export const getRedirectUrl = async (sessionId: string, selectedItems: SelectedMedicines): Promise<string> => {
	try {
		const resp = await ugoConsoleAxios.post<RedirectUrlResponse>('/alivia/ecommerce_url', {
			sessionId,
			items: selectedItems,
		});

		return resp.data.object;
	} catch (e) {
		throw Error(e);
	}
};

interface UserLog {
	action_date: string;
	type_action_id: number;
	student_id: string;
}

export const sendLogs = async (fields: UserLog): Promise<string | void> => {
	try {
		const resp = await aliviaAxios.post('/logs-prescriptions', {
			action_date: fields.action_date,
			type_action_id: fields.type_action_id,
			student_id: fields.student_id,
		});

		const data = resp.data;

		// setLocalValue('userToken', data.token);
		// setLocalValue('refreshToken', data.refresh_token);
		// return data.token;
		console.log(fields);
		console.log(data);
	} catch (e) {
		console.log(e);
		throw Error(e);
	}
};

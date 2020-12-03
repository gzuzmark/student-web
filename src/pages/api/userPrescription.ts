import { ugoConsoleAxios } from 'utils/customAxios';
import { Position } from './laboratories';

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
	name: string;
	individualMeasure: string;
	individualCost: string;
	totalMeasure: string;
	totalCost: string;
	imgUrl: string;
	hasStock: boolean;
	alternativeMedicine?: Omit<PrescribedMedicine, 'alternativeMedicine'>;
	isAvailableForECommerce: boolean;
}

export interface Prescription {
	address: string;
	folioNumber: string;
	medicines: PrescribedMedicine[];
	notAvailableNearYou: boolean;
}

interface ImagesApi {
	type: string;
	url: string;
	thumbnails: string | null;
}

interface MedicineAPI {
	productName: string;
	totalQuantity: number;
	totalPrice: number;
	images: ImagesApi[];
	alternative_medicine?: Omit<MedicineAPI, 'alternative_medicine'>;
	statusCode: number;
	pharmaceuticalFormPrice: number;
	pharmaceuticalForm: string;
	unitQuantity: number;
	unit: string;
}

interface PrescriptionAPI {
	address: string;
	folioNumber: string;
	latitude: string;
	longitude: string;
	prescriptionPath: string;
	availableProducts: MedicineAPI[];
	not_available_near_you: boolean;
}

const formatAlternativeMedicine = (
	medicineAPI: Omit<MedicineAPI, 'alternative_medicine'> | undefined,
): Omit<PrescribedMedicine, 'alternativeMedicine'> | undefined =>
	medicineAPI && {
		name: medicineAPI.productName,
		individualMeasure: `${medicineAPI.pharmaceuticalForm} ${medicineAPI.unitQuantity} ${medicineAPI.unit}`,
		individualCost: medicineAPI.pharmaceuticalFormPrice.toFixed(2),
		totalMeasure: `${medicineAPI.totalQuantity} ${medicineAPI.pharmaceuticalForm} ${medicineAPI.unitQuantity} ${medicineAPI.unit}`,
		totalCost: medicineAPI.totalPrice.toFixed(2),
		imgUrl: medicineAPI.images.find((image) => image.type.includes('IMAGEN_DEFAULT_SMALL'))?.url || '',
		hasStock: true,
		isAvailableForECommerce: true,
	};

const formatPrescription = ({
	address,
	folioNumber,
	availableProducts,
	not_available_near_you,
}: PrescriptionAPI): Prescription => ({
	address,
	folioNumber,
	notAvailableNearYou: not_available_near_you,
	medicines: availableProducts.map(
		({
			productName,
			totalQuantity,
			totalPrice,
			images,
			alternative_medicine,
			statusCode,
			pharmaceuticalFormPrice,
			pharmaceuticalForm,
			unitQuantity,
			unit,
		}) => ({
			name: productName,
			individualMeasure: `${pharmaceuticalForm} ${unitQuantity} ${unit}`,
			individualCost: pharmaceuticalFormPrice.toFixed(2),
			totalMeasure: `${totalQuantity} ${pharmaceuticalForm.toLowerCase()}${
				totalQuantity > 1 ? 's' : ''
			} ${unitQuantity} ${unit}`,
			totalCost: totalPrice.toFixed(2),
			imgUrl: images.find((image) => image.type.includes('IMAGEN_DEFAULT_SMALL'))?.url || '',
			hasStock: statusCode === 1,
			alternativeMedicine: formatAlternativeMedicine(alternative_medicine),
			isAvailableForECommerce: statusCode !== 3,
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
		throw Error(e);
	}
};

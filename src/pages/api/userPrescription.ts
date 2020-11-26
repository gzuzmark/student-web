// import axios from 'axios';

const mockPrescription: PrescriptionAPI = {
	address: 'Calle Los Castaños 200 SAN ISIDRO, LIMA',
	medicines: [
		{
			name: 'Esomeprazol 40mg comprimidos',
			measure: 'BLISTER 10 UN',
			individual_cost: '5.50',
			total_measure: '3 blister 10 UN',
			total_cost: '15.50',
			img_url: 'https://picsum.photos/500/700',
			has_stock: true,
			is_available_for_commerce: true,
		},
		{
			name: 'Ibuprofeno 800mg comprimidos',
			measure: '1 blister 10 UN',
			individual_cost: '5.50',
			total_measure: '2 blister de 10 UN',
			total_cost: '11.00',
			img_url: 'https://picsum.photos/500/700',
			has_stock: false,
			alternative_medicine: {
				name: 'Gofen 400mg Cápsulas Blandas',
				measure: 'BLISTER 10 UN',
				individual_cost: '12.50',
				total_measure: '2 blister de 10 UN',
				total_cost: '25.00',
				img_url: 'https://picsum.photos/500/700',
				has_stock: true,
				is_available_for_commerce: true,
			},
			is_available_for_commerce: true,
		},
		{
			name: 'Gofen 400mg Cápsulas Blandas',
			measure: 'BLISTER 10 UN',
			individual_cost: '12.50',
			total_measure: '2 blister de 10 UN',
			total_cost: '25.00',
			img_url: 'https://picsum.photos/500/700',
			has_stock: false,
			is_available_for_commerce: false,
		},
	],
};

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
	medicines: PrescribedMedicine[];
}

interface MedicineAPI {
	name: string;
	measure: string;
	individual_cost: string;
	total_measure: string;
	total_cost: string;
	img_url: string;
	has_stock: boolean;
	alternative_medicine?: Omit<MedicineAPI, 'alternative_medicine'>;
	is_available_for_commerce: boolean;
}

interface PrescriptionAPI {
	address: string;
	medicines: MedicineAPI[];
}

const formatAlternativeMedicine = (
	medicineAPI: Omit<MedicineAPI, 'alternative_medicine'> | undefined,
): Omit<PrescribedMedicine, 'alternativeMedicine'> | undefined =>
	medicineAPI && {
		name: medicineAPI.name,
		individualMeasure: medicineAPI.measure,
		individualCost: medicineAPI.individual_cost,
		totalMeasure: medicineAPI.total_measure,
		totalCost: medicineAPI.total_cost,
		imgUrl: medicineAPI.img_url,
		hasStock: true,
		isAvailableForECommerce: true,
	};

const formatPrescription = ({ address, medicines }: PrescriptionAPI): Prescription => ({
	address,
	medicines: medicines.map(
		({
			name,
			measure,
			individual_cost,
			total_measure,
			total_cost,
			img_url,
			has_stock,
			alternative_medicine,
			is_available_for_commerce,
		}) => ({
			name,
			individualMeasure: measure,
			individualCost: individual_cost,
			totalMeasure: total_measure,
			totalCost: total_cost,
			imgUrl: img_url,
			hasStock: has_stock,
			alternativeMedicine: formatAlternativeMedicine(alternative_medicine),
			isAvailableForECommerce: is_available_for_commerce,
		}),
	),
});

export const getPrescription = async (): Promise<Prescription> => {
	try {
		// const resp = await axios.get<PrescriptionAPI>('http://somewhere-over-the-rainbow/prescription');
		const resp = { data: mockPrescription };

		return formatPrescription(resp.data);
	} catch (e) {
		throw Error(e);
	}
};

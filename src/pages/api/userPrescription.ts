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
		},
		{
			name: 'Gofen 400mg Cápsulas Blandas',
			measure: 'BLISTER 10 UN',
			individual_cost: '12.50',
			total_measure: '2 blister de 10 UN',
			total_cost: '25.00',
			img_url: 'https://picsum.photos/500/700',
		},
	],
};

export interface PrescribedMedicine {
	name: string;
	individualMeasure: string;
	individualCost: string;
	totalMeasure: string;
	totalCost: string;
	imgUrl: string;
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
}

interface PrescriptionAPI {
	address: string;
	medicines: MedicineAPI[];
}

const formatPrescription = ({ address, medicines }: PrescriptionAPI): Prescription => ({
	address,
	medicines: medicines.map(({ name, measure, individual_cost, total_measure, total_cost, img_url }) => ({
		name,
		individualMeasure: measure,
		individualCost: individual_cost,
		totalMeasure: total_measure,
		totalCost: total_cost,
		imgUrl: img_url,
	})),
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

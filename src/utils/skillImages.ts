// import orientation from 'icons/default.png';
import dermatology from 'icons/derm.png';
import endocrinology from 'icons/endo.png';
import gastroenterology from 'icons/gast.png';
import general from 'icons/general.png';
import gynecology from 'icons/gine.png';
import medicinaInterna from 'icons/medin.svg';
import nutrition from 'icons/nut.png';
// import others from 'icons/others.png';
import pediatrics from 'icons/ped.png';
import psychology from 'icons/psico.png';
import reuma from 'icons/reuma.svg';

import traumatology from 'icons/traum.png';
export interface SpecialtyType {
	id: string;
	label: string;
	image: string;
	cost?: number;
}

export const DEV_IMAGES: SpecialtyType[] = [
	{
		id: '0ceb81db-ccfe-4198-b72e-1789fe113494',
		label: 'Dermatología',
		image: dermatology,
		cost: 35,
	},
	{
		id: 'c78cf27f-2059-4823-bdb8-8bd22126b671',
		label: 'Medicina interna',
		image: general,
		cost: 25,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87d',
		label: 'Ginecología',
		image: gynecology,
		cost: 35,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87a',
		label: 'Test1',
		image: general,
		cost: 30,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87b',
		label: 'Test2',
		image: general,
		cost: 25,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87c',
		label: 'Test3',
		image: general,
		cost: 45,
	},
];

export const PROD_IMAGES: SpecialtyType[] = [
	{
		id: '6358556c-2e7d-4d94-9d6e-cb72ee5e6103',
		label: 'Medicina general',
		image: general,
		cost: 25,
	},
	{
		id: 'fedc56ae-b39e-11eb-a596-42010a7c6012',
		label: 'Medicina interna',
		image: medicinaInterna,
		cost: 35,
	},
	{
		id: '8a0a27a5-8ff0-4534-b863-65a2955a4448',
		label: 'Pediatría',
		image: pediatrics,
		cost: 35,
	},
	{
		id: '0ceb81db-ccfe-4198-b72e-1789fe113494',
		label: 'Dermatología',
		image: dermatology,
		cost: 45,
	},
	{
		id: '0430e88e-7401-4009-9cae-4c2006969640',
		label: 'Endocrinología',
		image: endocrinology,
		cost: 45,
	},
	{
		id: '3775b414-c3de-40c1-9eb9-3c2b9c8f6997',
		label: 'Gastroenterología',
		image: gastroenterology,
		cost: 35,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87d',
		label: 'Ginecología',
		image: gynecology,
		cost: 35,
	},
	{
		id: 'fedc537e-b39e-11eb-a596-42010a7c6012',
		label: 'Reumatología',
		image: reuma,
		cost: 45,
	},
	{
		id: '42c02591-ab0b-4523-9a12-15412fed062c',
		label: 'Psicología',
		image: psychology,
		cost: 45,
	},
	{
		id: 'c78cf27f-2059-4823-bdb8-8bd22126b671',
		label: 'Nutrición',
		image: nutrition,
		cost: 35,
	},
	{
		id: '12a9a5a0-61d9-4312-9e5d-b8708da8b592',
		label: 'Traumatología',
		image: traumatology,
		cost: 35,
	},
];

export const isDevelopment = () => {
	const urlApi = process.env.REACT_APP_BASE_URL || '';
	if (urlApi === '') {
		return true;
	}
	if (urlApi.includes('api-dev')) {
		return true;
	}
	if (urlApi.includes('localhost')) {
		return true;
	}
	return false;
};

import medicinaGeneralIcon from 'icons/medicina_general.svg';
import medicinaInternaIcon from 'icons/medicina_interna.svg';
import pediatriaIcon from 'icons/pediatria.svg';
import dermatologiaIcon from 'icons/dermatologia.svg';
import endocrinologiaIcon from 'icons/endocrinologia.svg';
import ginecologiaIcon from 'icons/ginecologia.svg';
import gastroenterologiaIcon from 'icons/gastroenterologia.svg';
import reumatologiaIcon from 'icons/reumatologia.svg';
import psicologiaIcon from 'icons/psicologia.svg';
import nutricionIcon from 'icons/nutricion.svg';
import traumatologiaIcon from 'icons/traumatologia.svg';
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
		image: dermatologiaIcon,
		cost: 35,
	},
	{
		id: 'c78cf27f-2059-4823-bdb8-8bd22126b671',
		label: 'Medicina interna',
		image: medicinaInternaIcon,
		cost: 25,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87d',
		label: 'Ginecología',
		image: ginecologiaIcon,
		cost: 35,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87a',
		label: 'Test Medicina General',
		image: medicinaGeneralIcon,
		cost: 30,
	},
	{
		id: '8a0a27a5-8ff0-4534-b863-65a2955a4440',
		label: 'Test Pediatría',
		image: pediatriaIcon,
		cost: 35,
	},
	{
		id: '0430e88e-7401-4009-9cae-4c2006969640',
		label: 'Test Endocrinología',
		image: endocrinologiaIcon,
		cost: 45,
	},
	{
		id: '3775b414-c3de-40c1-9eb9-3c2b9c8f6997',
		label: 'Test Gastroenterología',
		image: gastroenterologiaIcon,
		cost: 35,
	},
	{
		id: 'fedc537e-b39e-11eb-a596-42010a7c6012',
		label: 'Test Reumatología',
		image: reumatologiaIcon,
		cost: 45,
	},
	{
		id: '42c02591-ab0b-4523-9a12-15412fed062c',
		label: 'Test Psicología',
		image: psicologiaIcon,
		cost: 45,
	},
	{
		id: 'c78cf27f-2059-4823-bdb8-8bd22126b670',
		label: 'Test Nutrición',
		image: nutricionIcon,
		cost: 35,
	},
	{
		id: '12a9a5a0-61d9-4312-9e5d-b8708da8b592',
		label: 'Test Traumatología',
		image: traumatologiaIcon,
		cost: 35,
	},
];

export const PROD_IMAGES: SpecialtyType[] = [
	{
		id: '6358556c-2e7d-4d94-9d6e-cb72ee5e6103',
		label: 'Medicina general',
		image: medicinaGeneralIcon,
		cost: 25,
	},
	{
		id: 'fedc56ae-b39e-11eb-a596-42010a7c6012',
		label: 'Medicina interna',
		image: medicinaInternaIcon,
		cost: 35,
	},
	{
		id: '8a0a27a5-8ff0-4534-b863-65a2955a4448',
		label: 'Pediatría',
		image: pediatriaIcon,
		cost: 35,
	},
	{
		id: '0ceb81db-ccfe-4198-b72e-1789fe113494',
		label: 'Dermatología',
		image: dermatologiaIcon,
		cost: 45,
	},
	{
		id: '0430e88e-7401-4009-9cae-4c2006969640',
		label: 'Endocrinología',
		image: endocrinologiaIcon,
		cost: 45,
	},
	{
		id: '3775b414-c3de-40c1-9eb9-3c2b9c8f6997',
		label: 'Gastroenterología',
		image: gastroenterologiaIcon,
		cost: 35,
	},
	{
		id: 'e6d9a4aa-4307-4ca2-b4e4-d10208fdf87d',
		label: 'Ginecología',
		image: ginecologiaIcon,
		cost: 35,
	},
	{
		id: 'fedc537e-b39e-11eb-a596-42010a7c6012',
		label: 'Reumatología',
		image: reumatologiaIcon,
		cost: 45,
	},
	{
		id: '42c02591-ab0b-4523-9a12-15412fed062c',
		label: 'Psicología',
		image: psicologiaIcon,
		cost: 45,
	},
	{
		id: 'c78cf27f-2059-4823-bdb8-8bd22126b671',
		label: 'Nutrición',
		image: nutricionIcon,
		cost: 35,
	},
	{
		id: '12a9a5a0-61d9-4312-9e5d-b8708da8b592',
		label: 'Traumatología',
		image: traumatologiaIcon,
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

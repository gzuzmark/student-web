import { ugoConsoleAxios } from 'utils/customAxios';
import Departamentos from './ubigeo/ubigeo_peru_2016_departamentos.json';
import Provincias from './ubigeo/ubigeo_peru_2016_provincias.json';
import Distritos from './ubigeo/ubigeo_peru_2016_distritos.json';

interface DataAddress {
	address: string;
	reference: string;
	latitude: string;
	longitude: string;
}

export interface Departamento {
	id: string;
	name: string;
}

export interface Provincia {
	id: string;
	department_id: string;
	name: string;
}

export interface Distrito {
	id: string;
	department_id: string;
	province_id: string;
	name: string;
}

export const postAddress = async (sessionId: string, data: DataAddress) => {
	try {
		await ugoConsoleAxios.post(`/alivia/sessions/${sessionId}/address`, data);
	} catch (e) {
		throw Error(e);
	}
};

export const getDepartamentos = (): Departamento[] => {
	return Departamentos;
};

export const getProvincias = (): Provincia[] => {
	return Provincias;
};

export const getProvinciasByDepartamentoId = (id: string): Provincia[] => {
	const provincias = [...Provincias];
	return provincias.filter(({ department_id }) => department_id === id);
};

export const getDistritos = (): Distrito[] => {
	return Distritos;
};

export const getDistritosByProvinciaId = (id: string): Distrito[] => {
	const distritos = [...Distritos];
	return distritos.filter(({ province_id }) => province_id === id);
};

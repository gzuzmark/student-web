import { Position } from 'pages/api';

export type MapsApi = typeof google.maps;
export type MapInstance = google.maps.Map;

export interface FormattedPlace {
	number: string;
	country: string;
	district: string;
	street: string;
	city: string;
	name: string;
}

export interface AddressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}

export interface Place {
	address: string;
	position: Position;
	formattedPlace: FormattedPlace;
}

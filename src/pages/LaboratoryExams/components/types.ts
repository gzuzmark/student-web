import { Position } from 'pages/api';

export type MapsApi = typeof google.maps;
export type MapInstance = google.maps.Map;

export interface Place {
	address: string;
	position: Position;
}

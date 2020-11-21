import { Position } from 'pages/api';

export type MapsApi = typeof google.maps;
export type MapInstance = google.maps.Map;
export type Marker = google.maps.Marker;

export interface Place {
	address: string;
	position: Position;
}

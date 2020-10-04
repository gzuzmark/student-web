import { Position } from 'pages/api';

export type MapsApi = typeof google.maps;

export interface Place {
	address: string;
	position: Position;
}

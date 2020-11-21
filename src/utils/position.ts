import { Position } from 'pages/api';

export const defaultCenter: Position = {
	lat: -12.0552497,
	lng: -77.0539775,
};

export const getUserCurrentPosition = (): Promise<Position> =>
	new Promise((resolve) => {
		const successCurrentPosition = (pos: { coords: { latitude: number; longitude: number } }) => {
			const crd = pos.coords;
			const currentPosition = {
				lat: crd.latitude,
				lng: crd.longitude,
			};

			resolve(currentPosition);
		};
		const errorCurrentPosition = () => {
			resolve(defaultCenter);
		};

		navigator.geolocation.getCurrentPosition(successCurrentPosition, errorCurrentPosition, {
			enableHighAccuracy: true,
			timeout: 5000,
		});
	});

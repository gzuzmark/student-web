import { Culqui as CulquiType } from './types';

declare global {
	interface Window {
		Culqi: CulquiType;
		culqi: () => void;
		gtag: Function;
		fbq: (event: string, info: string) => void;
	}
}

import { Culqui as CulquiType, GTagEvent } from './types';

declare global {
	interface Window {
		Culqi: CulquiType;
		culqi: () => void;
		fbq: (event: string, info: string, extraInfo: Record<string, any>) => void;
		nutritionistUseCaseId: string;
		gastroUseCaseId: string;
		dataLayer: GTagEvent[];
	}
}

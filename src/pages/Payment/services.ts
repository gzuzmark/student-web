import ApiAppoitmentError from './exceptions/ApiAppoitmentError';
import ApiPaymentError from './exceptions/ApiPaymentError';
import KushkiErrors from './exceptions/KushiErrors';
import KushkiCardError from './exceptions/KushkiCardError';
import KushkiCashError from './exceptions/KushkiCashError';

export const processErrorPayment = (error: Error): string => {
	if (error instanceof KushkiCardError || error instanceof KushkiCashError) {
		if (error instanceof KushkiCardError) {
			sendTrackingErrorKushkiCard(error);
		} else {
			sendTrackingErrorKushkiCash(error);
		}
		const e = error.code as keyof typeof KushkiErrors;
		if (KushkiErrors[e]) {
			return KushkiErrors[e].message;
		}
	} else if (error instanceof ApiPaymentError) {
		sendTrackingErrorPayment(error);
	} else if (error instanceof ApiAppoitmentError) {
		sendTrackingErrorAppoitment(error);
	}
	return 'Error al realizar el pago. Por favor contacte con soporte';
};

const sendTrackingErrorKushkiCard = (error: KushkiCardError) => {
	console.log('tracking kushki', error.data);
};

const sendTrackingErrorKushkiCash = (error: KushkiCashError) => {
	console.log('tracking kushki', error.data);
};

const sendTrackingErrorPayment = (error: ApiPaymentError) => {
	console.log('tracking payment', error.data);
};

const sendTrackingErrorAppoitment = (error: ApiAppoitmentError) => {
	console.log('tracking appoitment', error.data);
};

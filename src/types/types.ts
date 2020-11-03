interface CulqiClient {
	browser: string;
	device_fingerprint: string | null;
	device_type: string;
	ip: string;
	ip_country: string;
	ip_country_code: string;
}

interface CulqiToken {
	active: boolean;
	id: string;
	card_number: string;
	client: CulqiClient;
	email: string;
	last_four: string;
	object: string;
}

interface CulqiError {
	error_message: string;
	user_message: string;
}

export interface Culqui {
	publicKey: string;
	token: CulqiToken | undefined;
	init: Function;
	options: Function;
	settings: Function;
	open: () => void;
	error: CulqiError | undefined;
}

interface EcommerceProduct {
	name: string;
	id: string;
	price: string;
	brand: string;
	category: string;
	variant: string;
	quantity: string;
	dimension3: string;
	dimension4: string;
}

interface EcommerceActionField {
	id: string;
	revenue: string;
	tax: string;
}

interface EcommercePurchase {
	actionField: EcommerceActionField;
	products: EcommerceProduct[];
}

export interface GTagEvent {
	event?: string;
	pagePath?: string;
	pageName?: string;
	loginStatus?: string;
	userID?: string;
	category?: string;
	action?: string;
	label?: string;
	dia?: string;
	hora?: string;
	especialidad?: string;
	monto?: string;
	tipoPago?: string;
	ecommerce?: {
		currencyCode: string;
		purchase: EcommercePurchase;
	};
}

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

export interface ExamByModality {
	id: number;
	name: string;
	price: number;
	laboratory_id: number;
	types_laboratory_exam_id: number;
	exam_modality_id: number;
}

export interface Laboratory {
	id: number;
	name: string;
	business_name: string;
	ruc: string;
	description: string;
	email: string;
	phone: string;
	mobile_phone: string;
	address: string;
	latitude: string;
	longitude: string;
	is_main: string;
	district_id: number;
	total_cost: number;
	available_times: AvailableTime[];
	selected_time: AvailableTime | undefined;
	logo: string;
	laboratory_exams: LaboratoryExamen[];
}

export interface LaboratoryExamen {
	exam_modality_id: string;
	laboratory_id: number;
	id: number;
	name: string;
	price: number;
	types_laboratory_exam_id: number;
}

export interface AvailableTime {
	id: number;
	start_time: string;
	final_time: string;
	status: boolean;
	laboratory_id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string;
}

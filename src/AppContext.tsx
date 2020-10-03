import React, { ReactElement, useState, useCallback } from 'react';
import { getLocalValue } from 'utils';
import { UseCase } from 'pages/api/useCase';
import { Doctor, Schedule } from 'pages/api/selectDoctor';

// Appointment Owner
export const MYSELF = 'myself';
export const RELATIVE = 'relative';
export const GUEST = 'guest';

export type AppointmentOwner = 'myself' | 'relative' | 'guest' | '';

// Steps
export const TRIAGE_STEP = 'triage';
export const ATTENTION_METHOD_STEP = 'attention-method';
export const SELECT_DOCTOR_STEP = 'select-doctor';
export const PRE_SIGNUP_STEP = 'pre-signup';
export const PAYMENT_STEP = 'payment';
export const CONFIRMATION_STEP = 'confirmation';
export const routeMapping = {
	[TRIAGE_STEP]: '/triaje',
	[ATTENTION_METHOD_STEP]: 'metodo_atencion',
	[SELECT_DOCTOR_STEP]: '/seleccionar_doctor',
};

export interface TrackParams {
	utmSource?: string;
	utmMedium?: string;
	utmCampaign?: string;
}

export type AppointmentCreationStep =
	| ''
	| 'triage'
	| 'attention-method'
	| 'select-doctor'
	| 'pre-signup'
	| 'payment'
	| 'confirmation';

interface AppProviderProps {
	children: ReactElement;
}

export interface User {
	id: string;
	name: string;
	lastName: string;
	secondSurname: string;
	identification: string;
	birthDate: Date;
	gender: string;
	takeMedicines: boolean;
	medicines?: string;
	haveAllergies: boolean;
	allergies?: string;
	moreMedicalInformation?: string;
	phoneNumber: string;
	email?: string;
	isMain: boolean;
	isUnderAge?: boolean;
}

export interface TriagePair {
	question: string;
	answer: string;
}

interface ContextProps {
	user: User | null;
	patientUser: User | null;
	userToken: string | null;
	accountUsers: User[];
	guestToken: string | null;
	reservationAccountID: string;
	channel: string;
	useCase: UseCase | null;
	doctor: Doctor | null;
	schedule: Schedule | null;
	appointmentOwner: AppointmentOwner;
	triage: TriagePair[];
	updateState: Function;
	appointmentCreationStep: AppointmentCreationStep;
	paymentURL: string | null;
	isTransactionEnabled: boolean;
	isUbigeoEnabled: boolean;
	userFiles: string[];
	trackParams: TrackParams;
}

const defaultState: ContextProps = {
	user: null,
	patientUser: null,
	userToken: getLocalValue('userToken'),
	accountUsers: [],
	guestToken: null,
	reservationAccountID: '',
	channel: 'Videollamada',
	useCase: null,
	doctor: null,
	schedule: null,
	triage: [],
	appointmentOwner: MYSELF,
	updateState: Function.prototype,
	appointmentCreationStep: '',
	paymentURL: null,
	isTransactionEnabled: false,
	isUbigeoEnabled: false,
	userFiles: [],
	trackParams: {},
};
const AppContext = React.createContext<Partial<ContextProps>>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<Partial<ContextProps>>(defaultState);
	const updateState = useCallback((newState: Partial<ContextProps>, callback: Function | undefined = undefined) => {
		setState((state) => ({ ...state, ...newState }));

		if (callback && typeof callback === 'function') {
			callback();
		}
	}, []);

	return <AppContext.Provider value={{ ...state, updateState }}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppProvider };

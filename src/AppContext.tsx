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

export interface SimpleUser {
	id: string;
	name: string;
	lastName: string;
	secondSurname: string;
	identification: string;
	email?: string;
	isMain: boolean;
	phoneNumber?: string;
}

export interface User {
	name: string;
	lastName: string;
	secondSurname: string;
	identification: string;
	birthDate: string;
	gender: string;
	takeMedicines: boolean;
	medicines?: string;
	haveAllergies: boolean;
	allergies?: string;
	moreMedicalInformation?: string;
	phoneNumber: string;
	email?: string;
}

export interface TriagePair {
	question: string;
	answer: string;
}

interface ContextProps {
	user: SimpleUser | null;
	userToken: string | null;
	accountUsers: SimpleUser[];
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
}

const defaultState: ContextProps = {
	user: null,
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

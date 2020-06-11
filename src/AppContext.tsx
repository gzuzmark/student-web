import React, { ReactElement, useState, useCallback } from 'react';
import { getLocalValue } from 'utils';
import { UseCase } from 'pages/api/useCase';

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
export const routeMapping = {
	[TRIAGE_STEP]: '/triaje',
	[ATTENTION_METHOD_STEP]: 'metodo_atencion',
	[SELECT_DOCTOR_STEP]: '/seleccionar_doctor',
};

export type AppointmentCreationStep = '' | 'triage' | 'attention-method' | 'select-doctor' | 'pre-signup' | 'payment';

interface AppProviderProps {
	children: ReactElement;
}

export interface SimpleUser {
	id: string;
	name: string;
	lastName: string;
	secondSurname: string;
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
	guestToken: string | null;
	reservationAccountID: string;
	channel: string;
	useCase: UseCase | null;
	appointmentOwner: AppointmentOwner;
	triage: TriagePair[];
	scheduleID: string;
	updateState: Function;
	appointmentCreationStep: AppointmentCreationStep;
}

const defaultState: ContextProps = {
	user: null,
	userToken: getLocalValue('userToken'),
	guestToken: null,
	reservationAccountID: '',
	channel: 'videocall',
	useCase: null,
	scheduleID: '',
	triage: [],
	appointmentOwner: MYSELF,
	updateState: Function.prototype,
	appointmentCreationStep: '',
};
const AppContext = React.createContext<Partial<ContextProps>>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<Partial<ContextProps>>(defaultState);
	const updateState = useCallback((newState: Partial<ContextProps>) => {
		setState((state) => ({ ...state, ...newState }));
	}, []);
	console.log(state);

	return <AppContext.Provider value={{ ...state, updateState }}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppProvider };

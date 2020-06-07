import React, { ReactElement, useState, useCallback } from 'react';
// import { mockUser } from 'pages/api/login';

// Appointment Owner
export const MYSELF = 'myself';
export const RELATIVE = 'relative';
export const GUEST = 'guest';

export type AppointmentOwner = 'myself' | 'relative' | 'guest' | '';

// Steps
export const TRIAGE_STEP = 'triage';
export const ATTENTION_METHOD = 'attention-method';
export const SELECT_DOCTOR = 'select-doctor';
export const PRE_SIGNUP = 'pre-signup';
export const routeMapping = {
	[TRIAGE_STEP]: '/triaje',
	[ATTENTION_METHOD]: 'metodo_atencion',
	[SELECT_DOCTOR]: '/seleccionar_doctor',
};

export type AppointmentCreationStep = 'triage' | 'attention-method' | 'select-doctor' | 'pre-signup';

interface AppProviderProps {
	children: ReactElement;
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
	user: User | null;
	channel: string;
	useCase: string;
	appointmentOwner: AppointmentOwner;
	updateState: Function;
	triage: TriagePair[];
	appointmentCreationStep: AppointmentCreationStep;
}

const defaultState: ContextProps = {
	user: null,
	channel: 'videocall',
	useCase: 'Fiebre',
	updateState: Function.prototype,
	appointmentOwner: MYSELF,
	triage: [],
	appointmentCreationStep: 'triage',
};
const AppContext = React.createContext<Partial<ContextProps>>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<Partial<ContextProps>>(defaultState);
	const updateState = useCallback((newState: Partial<ContextProps>) => {
		setState((state) => ({ ...state, ...newState }));
	}, []);

	return <AppContext.Provider value={{ ...state, updateState }}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppProvider };

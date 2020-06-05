import React, { ReactElement, useState, useCallback } from 'react';
import { mockUser } from 'pages/api/login';

export const MYSELF = 'myself';
export const RELATIVE = 'relative';
export const GUEST = 'guest';

export type AppointmentOwner = 'myself' | 'relative' | 'guest' | '';

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

interface ContextProps {
	user: User | null;
	useCase: string;
	updateState: Function;
	appointmentOwner: AppointmentOwner;
}

const defaultState: ContextProps = {
	user: mockUser,
	useCase: 'Problemas de Piel',
	updateState: Function.prototype,
	appointmentOwner: MYSELF,
};
const AppContext = React.createContext<Partial<ContextProps>>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<Partial<ContextProps>>(defaultState);
	const updateState = useCallback(
		(newState: Partial<ContextProps>) => {
			setState({ ...state, ...newState });
		},
		[state],
	);

	return <AppContext.Provider value={{ ...state, updateState }}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppProvider };

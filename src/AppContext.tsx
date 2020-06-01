import React, { ReactElement, useState, useCallback } from 'react';

export const MYSELF = 'myself';
export const RELATIVE = 'relative';
export const GUEST = 'guest';

export type AppointmentOwner = 'myself' | 'relative' | 'guest' | '';

interface AppProviderProps {
	children: ReactElement;
}

interface ContextProps {
	user: Record<string, any> | null;
	useCase: string;
	updateState: Function;
	appointmentOwner: AppointmentOwner;
}

const defaultState: ContextProps = {
	user: null,
	useCase: 'Problemas de Piel',
	updateState: Function.prototype,
	appointmentOwner: 'guest',
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

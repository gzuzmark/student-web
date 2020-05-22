import React, { ReactElement, useState } from 'react';

interface AppProviderProps {
	children: ReactElement;
}

interface ContextProps {
	user: Record<string, any> | null;
	useCase: string;
	updateState: Function;
}

const defaultState: ContextProps = { user: null, useCase: 'Problemas de Piel', updateState: Function.prototype };
const AppContext = React.createContext<Partial<ContextProps>>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState(defaultState);
	const updateState = (newState: ContextProps) => {
		setState({ ...state, ...newState });
	};

	return <AppContext.Provider value={{ ...state, updateState }}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppProvider };

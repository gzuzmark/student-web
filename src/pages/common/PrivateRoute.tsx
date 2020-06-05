import React, { ReactElement, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from 'AppContext';

interface PrivateRouteProps {
	children: ReactElement;
}

const PrivateRoute = ({ children, ...props }: PrivateRouteProps) => {
	const { user } = useContext(AppContext);
	const { push } = useHistory();

	useEffect(() => {
		if (!user) {
			push('/iniciar_sesion');
		}
	}, [push, user]);

	return <>{children}</>;
};

export default PrivateRoute;

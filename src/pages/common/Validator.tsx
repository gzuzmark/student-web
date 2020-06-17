import React, { ReactElement, useContext, useState, useLayoutEffect, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from 'AppContext';
import { getCurrentUser } from 'pages/api';
import { getLocalValue, sendGANavigation, setLocalValue } from 'utils';

interface ValidatorProps {
	isPrivate: boolean;
	children: ReactElement;
}

const requestCurrentUser = async (
	userToken: string | null | undefined,
	updateContextState: Function | undefined,
	setLoading: Function,
) => {
	if (userToken && updateContextState) {
		const [reservationAccountID, user] = await getCurrentUser(userToken);
		updateContextState({ user, reservationAccountID });
		setLoading(false);
	}
};

const Validator = ({ isPrivate, children }: ValidatorProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const { user, updateState } = useContext(AppContext);
	const { push, listen } = useHistory();

	useLayoutEffect(() => {
		const userToken = getLocalValue('userToken');

		if (isPrivate && !userToken && !user) {
			push('/iniciar_sesion');
		}

		if ((user && user.name === '') || (!!userToken && !user)) {
			requestCurrentUser(userToken, updateState, setLoading);
		} else {
			setLoading(false);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const numberOfRouteListeners = Number(getLocalValue('routeListeners'));

		if (numberOfRouteListeners < 1) {
			listen((location) => {
				sendGANavigation(location.pathname);
			});

			setLocalValue('routeListeners', '1');
		}
	}, [listen]);

	return loading ? <div /> : <>{children}</>;
};

export default Validator;

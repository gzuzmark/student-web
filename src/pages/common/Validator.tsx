import React, { ReactElement, useContext, useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from 'AppContext';
import { getCurrentUser } from 'pages/api';

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
	}
	setLoading(false);
};

const Validator = ({ isPrivate, children }: ValidatorProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const { userToken, user, updateState } = useContext(AppContext);
	const { push } = useHistory();

	useLayoutEffect(() => {
		if (isPrivate && !userToken && !user) {
			push('/iniciar_sesion');
		}

		if ((user && user.name === '') || (!!userToken && !user)) {
			requestCurrentUser(userToken, updateState, setLoading);
		} else {
			setLoading(false);
		}
	}, [isPrivate, push, updateState, user, userToken]);

	return loading ? <div /> : <>{children}</>;
};

export default Validator;

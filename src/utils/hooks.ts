import { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from 'AppContext';

export const usePageTitle = (title: string) => {
	useLayoutEffect(() => {
		document.title = `Alivia - ${title}`;
	}, [title]);
};

export const useCurrentUserRediction = (currentUser: User | null | undefined, redictedPath: string) => {
	const history = useHistory();

	useLayoutEffect(() => {
		if (currentUser) {
			history.push(redictedPath);
		}
	}, [currentUser, history, redictedPath]);
};

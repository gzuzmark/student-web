import React, { useEffect, useContext } from 'react';
import { Theme } from '@material-ui/core/styles';

import AppContext from 'AppContext';
import { stylesWithTheme } from 'utils';
// import { getAccounts } from 'pages/api';

import AccountCard from './AccountCard';
import AddUserCard from './AddUserCard';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	list: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '256px',
		margin: '0 auto',
		[breakpoints.up('lg')]: {
			width: 'auto',
			justifyContent: 'center',
			margin: '0',
		},
	},
}));

const requestAccounts = async (updateState: Function) => {
	// const accounts = await getAccounts();

	// updateState({ accountUsers: accounts });
	updateState({
		accountUsers: [
			{
				id: 'sadasdas',
				name: 'Jhon',
				lastName: 'Doe',
				secondSurname: 'Lololol',
				identification: '1234567',
			},
			{
				id: 'sadasdasadfadsf',
				name: 'Armando',
				lastName: 'Puertas',
				secondSurname: 'Paredes',
				identification: '1234568',
			},
			{
				id: 'sadasdasadfadsf',
				name: 'Armando',
				lastName: 'Puertas',
				secondSurname: 'Paredes',
				identification: '1234568',
			},
		],
	});
};

const ProfileList = () => {
	const { accountUsers, user: currentUser, updateState } = useContext(AppContext);
	const classes = useStyles();

	useEffect(() => {
		if (updateState) {
			requestAccounts(updateState);
		}
	}, [updateState]);

	return (
		<div className={classes.list}>
			{(accountUsers || []).map((account) => (
				<AccountCard
					key={`user-${account.id}`}
					account={account}
					isCurrentAccount={!!currentUser && account.id === currentUser.id}
				/>
			))}
			<AddUserCard />
		</div>
	);
};

export default ProfileList;

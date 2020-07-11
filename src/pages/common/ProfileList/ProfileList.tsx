import React, { useEffect, useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import AppContext, { SimpleUser, AppointmentCreationStep } from 'AppContext';
import { stylesWithTheme } from 'utils';
import { getProfiles } from 'pages/api';

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
	const profiles = await getProfiles();

	updateState({ accountUsers: profiles });
};

interface PropfileListProps {
	className?: string;
	redirectCallback?: (appointmentCreationStep: AppointmentCreationStep | undefined) => void;
}

const ProfileList = ({ className, redirectCallback }: PropfileListProps) => {
	const { accountUsers, user: currentUser, updateState, appointmentCreationStep } = useContext(AppContext);
	const classes = useStyles();
	const onChangeProfile = (user: SimpleUser) => () => {
		if (updateState) {
			updateState({ user, reservationAccountID: user.id });
		}
		if (redirectCallback) {
			redirectCallback(appointmentCreationStep);
		}
	};

	useEffect(() => {
		if (updateState) {
			requestAccounts(updateState);
		}
	}, [updateState]);

	return (
		<div className={clsx(classes.list, className)}>
			{(accountUsers || []).map((account) => (
				<AccountCard
					key={`user-${account.id}`}
					account={account}
					isCurrentAccount={!!currentUser && account.id === currentUser.id}
					onChangeProfile={onChangeProfile}
				/>
			))}
			<AddUserCard />
		</div>
	);
};

export default ProfileList;

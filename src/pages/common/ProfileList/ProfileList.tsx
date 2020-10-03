import React, { useEffect, useContext, FC } from 'react';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import AppContext, { User } from 'AppContext';
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
	editEnable?: boolean;
	editOverlay?: FC<any>;
	redirectNewAccountCallback: () => void;
	onUserCardClick: (user: User) => void;
	addUserLabel?: string;
}

const ProfileList = ({
	className,
	editEnable = false,
	editOverlay,
	redirectNewAccountCallback,
	onUserCardClick,
	addUserLabel,
}: PropfileListProps) => {
	const { accountUsers, user: currentUser, updateState } = useContext(AppContext);
	const classes = useStyles();

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
					onChangeProfile={onUserCardClick}
					editEnable={editEnable}
					editOverlay={editOverlay}
				/>
			))}
			<AddUserCard label={addUserLabel} redirectNewAccountCallback={redirectNewAccountCallback} />
		</div>
	);
};

export default ProfileList;

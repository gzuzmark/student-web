import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';

import { User } from 'AppContext';
import { ReactComponent as UserSmile } from 'icons/user_smile.svg';
import { stylesWithTheme } from 'utils';

import UserCard from './UserCard';

interface StylesProps {
	isCurrentAccount: boolean;
}

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		textAlign: 'center',
		marginRight: '8px',
		marginBottom: '17px',
		[breakpoints.up('lg')]: {
			marginRight: '21px',
			marginBottom: '0px',
		},
		'&:nth-child(2n)': {
			marginRight: '0px',
			[breakpoints.up('lg')]: {
				marginRight: '21px',
			},
		},
	},
	card: {
		marginBottom: '7px',
		[breakpoints.up('lg')]: {
			marginBottom: '21px',
		},
	},
	userSmileIcon: {
		height: '68px',
		width: '68px',
		'& > path': {
			fill: ({ isCurrentAccount }: StylesProps) => (isCurrentAccount ? 'white' : palette.primary.main),
		},
		[breakpoints.up('lg')]: {
			height: '106px',
			width: '106px',
		},
	},
	name: {
		textTransform: 'none',
		maxWidth: '124px',
		[breakpoints.up('lg')]: {
			maxWidth: '194px',
		},
	},
}));

interface AccountCardProps {
	account: User;
	isCurrentAccount: boolean;
	onChangeProfile: (user: User) => () => void;
	editEnable?: boolean;
	editOverlay?: FC<any>;
}

const AccountCard = ({ account, isCurrentAccount, onChangeProfile, editEnable, editOverlay }: AccountCardProps) => {
	const classes = useStyles({ isCurrentAccount });

	return (
		<div className={classes.wrapper}>
			<UserCard
				account={account}
				onClick={onChangeProfile(account)}
				className={classes.card}
				isCurrentAccount={isCurrentAccount}
				overlayActive={editEnable}
				overlay={editOverlay}
			>
				<UserSmile className={classes.userSmileIcon} />
			</UserCard>
			<Typography className={classes.name} variant="button">
				{account.name}
			</Typography>
		</div>
	);
};

export default AccountCard;

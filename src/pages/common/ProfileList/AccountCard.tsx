import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';

import { SimpleUser } from 'AppContext';
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
	account: SimpleUser;
	isCurrentAccount: boolean;
	onChangeProfile: (user: SimpleUser) => () => void;
}

const AccountCard = ({ account, isCurrentAccount, onChangeProfile }: AccountCardProps) => {
	const classes = useStyles({ isCurrentAccount });

	return (
		<div className={classes.wrapper}>
			<UserCard onClick={onChangeProfile(account)} className={classes.card} isCurrentAccount={isCurrentAccount}>
				<UserSmile className={classes.userSmileIcon} />
			</UserCard>
			<Typography className={classes.name} variant="button">
				{account.name}
			</Typography>
		</div>
	);
};

export default AccountCard;

import React, { MouseEvent, ReactElement, FC } from 'react';
import Card from '@material-ui/core/Card';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';
import { User } from 'AppContext';

interface StylesProps {
	isCurrentAccount: boolean;
}

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	cardWrapper: {
		position: 'relative',
	},
	card: {
		alignItems: 'center',
		backgroundColor: ({ isCurrentAccount }: StylesProps) => (isCurrentAccount ? palette.primary.main : '#ffffff'),
		boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '124px',
		height: '124px',
		'&:hover': {
			boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
		},
		[breakpoints.up('lg')]: {
			boxShadow: 'none',
			width: '194px',
			height: '194px',
		},
	},
}));

interface UserCardProps {
	children: ReactElement;
	account?: User;
	className?: string;
	isCurrentAccount?: boolean;
	onClick?: (e: MouseEvent) => void;
	overlayActive?: boolean;
	overlay?: FC<any>;
}

const UserCard = ({
	children,
	onClick,
	className,
	account,
	isCurrentAccount = false,
	overlayActive = false,
	overlay: Overlay,
}: UserCardProps) => {
	const classes = useStyles({ isCurrentAccount });

	return (
		<div className={classes.cardWrapper}>
			<Card onClick={onClick} className={clsx(classes.card, className)}>
				{children}
			</Card>
			{overlayActive && Overlay ? <Overlay user={account} /> : null}
		</div>
	);
};

export default UserCard;

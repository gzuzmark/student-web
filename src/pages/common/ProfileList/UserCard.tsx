import React, { MouseEvent, ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';

interface StylesProps {
	isCurrentAccount: boolean;
}

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	card: {
		alignItems: 'center',
		backgroundColor: ({ isCurrentAccount }: StylesProps) => (isCurrentAccount ? palette.primary.main : 'white'),
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
	className?: string;
	isCurrentAccount?: boolean;
	onClick?: (e: MouseEvent) => void;
}

const UserCard = ({ children, onClick, className, isCurrentAccount = false }: UserCardProps) => {
	const classes = useStyles({ isCurrentAccount });

	return (
		<Card onClick={onClick} className={clsx(classes.card, className)}>
			{children}
		</Card>
	);
};

export default UserCard;

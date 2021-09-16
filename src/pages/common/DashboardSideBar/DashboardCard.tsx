import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import { Theme } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette }: Theme) => ({
	card: {
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderRaius: '4px',
		boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		margin: '0 16px 22px 0',
		height: '125px',
		textAlign: 'center',
		width: '150px',
		userSelect: 'none',

		'&:hover': {
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
		},

		'&:nth-child(2n)': {
			margin: '0 0 22px 0',
		},

		'&.active': {
			border: `1px solid ${palette.primary.main}`,
		},
	},
}));

interface DashboardCardProps {
	children: ReactNode | ReactNode[];
	path: string;
}

const DashboardCard = ({ path, children }: DashboardCardProps) => {
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();
	const isActive = location.pathname.includes(path);
	const onClick = () => {
		if (!isActive) {
			history.push(path);
		}
	};

	return (
		<Card onClick={onClick} className={clsx(classes.card, isActive ? 'active' : '')}>
			{children}
		</Card>
	);
};

export default DashboardCard;

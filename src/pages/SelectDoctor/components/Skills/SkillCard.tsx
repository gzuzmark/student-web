import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import { useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(() => ({
	card: {
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderRadius: '5px',
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
		border: '1px solid #1ecd96',
		'&:hover': {
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
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

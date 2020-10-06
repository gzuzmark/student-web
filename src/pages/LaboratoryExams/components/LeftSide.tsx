import React from 'react';

import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import { LeftLayout, DashboardSideBar } from 'pages/common';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
}));

const LeftSide = () => {
	const classes = useStyles();

	return (
		<LeftLayout className={classes.layout}>
			<DashboardSideBar />
		</LeftLayout>
	);
};

export default LeftSide;

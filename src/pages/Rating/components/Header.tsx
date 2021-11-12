import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';

const urlLogo = `${process.env.REACT_APP_LOGO_URL}`;
const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			alignItems: 'center',
			borderBottom: '1px solid #6FCF97',
			display: 'flex',
			padding: '12px 0 12px 52px',
			position: 'relative',
			justifyContent: 'center',
			[breakpoints.up('lg')]: {
				padding: '27px 0',
			},
		},
		brandLogo: {
			width: 58,
			[breakpoints.up('lg')]: {
				width: 140,
				height: 25,
			},
			[breakpoints.down('md')]: {
				width: 90,
				height: 25,
			},
		},
	}),
);

const Header = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<BrandLogo className={classes.brandLogo} />
		</div>
	);
};
export default Header;

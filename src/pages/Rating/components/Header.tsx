import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';

const urlLogo = `${process.env.REACT_APP_LOGO_URL}`;
const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			alignItems: 'center',
			borderBottom: '1px solid #6FCF97',
			display: 'flex',
			padding: '12px 0 12px 52px',
			position: 'relative',
			[breakpoints.up('lg')]: {
				padding: '27px 0',
				justifyContent: 'center',
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
		arrowIcon: {
			padding: '10px',
			left: 4,
			position: 'absolute',
			cursor: 'pointer',
			[breakpoints.up('lg')]: {
				display: 'none',
			},
		},
		goToStartText: {
			fontFamily: 'Mulish, sans-serif',
			fontStyle: 'normal',
			fontWeight: 600,
			fontSize: '14px',
			lineHeight: '20px',
			color: '#1ECD96',
			marginLeft: '10px',
		},
		goToStartButton: {
			cursor: 'pointer',
			display: 'none',
			fontSize: '12px',
			padding: 0,
			position: 'absolute',
			left: '26px',
			textTransform: 'none',
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'none',
			},
			[breakpoints.up('lg')]: {
				display: 'flex',
				padding: '10px 20px',
				left: '72px',
				fontSize: '15px',
			},
		},
		loginButton: {
			fontSize: '12px',
			padding: 0,
			position: 'absolute',
			right: '26px',
			textTransform: 'none',
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'none',
			},
			[breakpoints.up('lg')]: {
				padding: '10px 20px',
				right: '72px',
				fontSize: '15px',
			},
		},
		userIconWrapper: {
			alignItems: 'center',
			display: 'flex',
			position: 'absolute',
			top: '0px',
			right: '7px',
			[breakpoints.up('lg')]: {
				top: '5px',
				right: '111px',
			},
		},
		userIcon: {
			width: '25px',
			height: '25px',
			[breakpoints.up('lg')]: {
				width: '46px',
				height: '46px',
			},
		},
	}),
);

const Header = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<img src={urlLogo} alt="" className={classes.brandLogo} />
		</div>
	);
};
export default Header;

import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const MIN_DESKTOP = 800;
export const MIN_MOBILE = 375 + 1; // 375
export const MAX_XS_MOBILE = 425 + 1;

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			justifyContent: 'center',
			justifyItems: 'center',
			alignContent: 'center',
			[breakpoints.down('md')]: {
				width: '100%',
			},
		},
		close: {
			position: 'absolute',
			top: '40px',
			right: '44.25px',
		},
		closeIcon: {
			width: 23,
			height: 23,
			cursor: 'pointer',
		},
		dropwdown: {
			position: 'fixed',
			top: '0px',
			left: '0px',
			right: '0px',
			backgroundColor: '#ffffff',
		},
		bodyContainer: {
			display: 'flex',
			flex: 1,
			[breakpoints.down(MIN_DESKTOP)]: {
				marginTop: '70px',
			},
		},
		body: {
			[breakpoints.up(MIN_DESKTOP)]: {
				maxWidth: '840px !important',
			},
		},
		card: {
			display: 'flex',
			flexDirection: 'column',
			marginTop: '20px',
			backgroundColor: '#ffffff',
			borderColor: '#ffffff',
			[breakpoints.up('md')]: {
				marginTop: '80px',
			},
			[breakpoints.down(MIN_DESKTOP)]: {
				marginBottom: '90px',
			},
		},
		cardTitle: {
			fontFamily: 'Montserrat, sans-serif',
			color: '#676F8F',
			fontWeight: 600,
			fontStyle: 'normal',
			fontSize: '20px',
			lineHeight: '24px',
			textAlign: 'center',
			marginBottom: '60px',
		},
		img: {
			width: '60px',
			verticalAlign: 'middle',
			display: 'inline-block',
			marginTop: '-10px',
		},
		container: {
			margin: '0px 50px',
			[breakpoints.up('lg')]: {
				minWidth: '756px',
				maxWidth: '756px',
			},
			[breakpoints.down(MIN_MOBILE)]: {
				margin: '0px',
				flexWrap: 'wrap',
			},
			[breakpoints.down(MAX_XS_MOBILE)]: {
				margin: '0px 25px',
				flexWrap: 'wrap',
			},
		},
		cardItem: {
			width: '148px',
			display: 'flex',
			justifyContent: 'center',
			[breakpoints.down(MIN_MOBILE)]: {
				// margin: '0px 25px',
			},
		},
		divButton: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			padding: '21px 60px 37px',
			[breakpoints.down(MIN_DESKTOP)]: {
				display: 'block',
				position: 'fixed',
				left: '0px',
				right: '0px',
				bottom: '0px',
				padding: '20px 25px 30px',
				backgroundColor: '#ffffff',
			},
		},
		button: {
			height: '54px',
			fontSize: '16px',
			fontFamily: 'Montserrat, sains-serif',
			lineHeight: '18px',
			fontWeight: 600,
			textAlign: 'center',
			borderRadius: '8px',
			transition: 'none',
			'&:hover': {
				boxShadow: 'none',
				background: '#51D8AE',
			},
		},
	}),
);

export default useStyles;

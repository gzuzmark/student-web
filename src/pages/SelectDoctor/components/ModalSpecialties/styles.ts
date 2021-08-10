import { createStyles, makeStyles, Theme } from '@material-ui/core';

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
		card: {
			display: 'flex',
			flexDirection: 'column',
			marginTop: '20px',
			backgroundColor: '#FFFFFF',
			borderColor: '#FFFFFF',
			[breakpoints.up('md')]: {
				marginTop: '80px',
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
			[breakpoints.down('xs')]: {
				margin: '0px 10px',
			},
		},
		cardItem: {
			width: '148px',
			display: 'flex',
			justifyContent: 'center',
		},
		divButton: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			padding: '21px 60px 37px',
			[breakpoints.down('xs')]: {
				padding: '20px 25px 30px',
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
			'&:hover': {
				background: '#51D8AE',
			},
		},
	}),
);

export default useStyles;

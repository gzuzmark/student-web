import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			borderRadius: '8px',
			padding: '15px 7px',
			width: '148px',
			minWidth: '148px',
			maxHeight: '126px',
			marginBottom: '16px',
			cursor: 'pointer',
			marginLeft: '8px',
			marginRight: '8px',
			[breakpoints.down('xs')]: {
				minWidth: 'none',
			},
		},
		active: {
			border: '2px solid #1ECD96',
		},
		inactive: {
			border: '2px solid #F0F2FA',
		},
		title: {
			textAlign: 'center',
			fontFamily: 'Mulish, sans-serif',
			fontSize: '14px',
			lineHeight: '20px',
			color: '#676F8F',
			marginTop: '7px',
			marginBottom: '7px',
		},
		imgDiv: {
			textAlign: 'center',
		},
		img: {
			width: '48px',
			height: '48px',
		},
		cost: {
			fontFamily: 'Mulish, sans-serif',
			fontWeight: 'bold',
			fontStyle: 'normal',
			fontSize: '14px',
			lineHeight: '16px',
			textAlign: 'center',
			color: '#51D8AE',
			marginTop: '4px',
		},
	}),
);

export default useStyles;

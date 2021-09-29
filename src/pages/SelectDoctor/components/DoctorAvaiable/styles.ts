import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const gap = 28;

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		continueButton: {
			fontFamily: 'Mulish, sans-serif',
			fontSize: '12px',
			textTransform: 'unset',
			fontWeight: 'bold',
			color: '#1ECD96',
			background: '#E9FAF5',
			[breakpoints.up('lg')]: {
				fontSize: '16px',
				marginTop: '10px',
				lineHeight: '18px',
				padding: '11.5px 0',
				// color: "#1ECD96",
				// background: "#E9FAF5",
				// fontFamily: 'Mulish, sans-serif',
			},
			'&:hover': {
				color: '#ffffff',
			},
		},
		buttonDisabled: {
			fontFamily: 'Mulish, sans-serif',
			fontSize: '12px',
			textTransform: 'unset',
			fontWeight: 'normal',
			color: '#A3ABCC !important',
			background: '#F0F2FA !important',
			[breakpoints.up('lg')]: {
				fontSize: '16px',
				marginTop: '10px',
				lineHeight: '18px',
				padding: '11.5px 0',
				// color: "#1ECD96",
				// background: "#E9FAF5",
				// fontFamily: 'Mulish, sans-serif',
			},
			'&:hover': {
				color: '#ffffff',
			},
		},
		doctorWrapper: {
			backgroundColor: '#ffffff',
			boxSizing: 'border-box',
			padding: '20px 21px',
			width: `calc((100% - ${gap}px) / 2)`,
			[breakpoints.down('md')]: {
				width: '100%',
			},
		},
	}),
);

export default useStyles;

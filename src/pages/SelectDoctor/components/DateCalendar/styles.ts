import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			height: '64px !important',
			width: '76px !important',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			// padding: '3px 5px',
			border: '1px solid #E5EFFF',
			boxShadow: '0.8px 0.8px 3px rgba(103, 111, 143, 0.1)',
			boxSizing: 'border-box',
			borderRadius: '8px',
			margin: '0px 5px',
		},
		containerDisabled: {
			border: '1px solid #F0F2FA',
			backgroundColor: '#F0F2FA',
			boxShadow: '0.8px 0.8px 3px rgba(103, 111, 143, 0.1)',
		},
		containerSelected: {
			border: '2px solid #1ECD96',
			boxShadow: '0.72px 0.72px 3px rgba(0, 0, 0, 0.1)',
		},
		pointer: {
			cursor: 'pointer',
		},
		div: {},
		dayDiv: {
			fontFamily: 'Mulish, sans-serif',
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 800,
			lineHeight: '20px',
			textAlign: 'center',
			marginBottom: '0px',
		},
		dateDiv: {
			fontFamily: 'Mulish, sans-serif',
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: '16px',
			textAlign: 'center',
		},
	}),
);

export default useStyles;

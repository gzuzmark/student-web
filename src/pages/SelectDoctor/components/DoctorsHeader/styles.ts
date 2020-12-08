import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		padding: '0 26px 40px',
		[breakpoints.up('lg')]: {
			display: 'flex',
			padding: '0 0 16px 0',
			flexWrap: 'wrap',
		},
	},
	formLabel: {
		fontSize: '13px',
		lineHeight: '18px',
		paddingBottom: '8px',
	},
	datePickerField: {
		paddingBottom: '32px',
		[breakpoints.up('lg')]: {
			paddingBottom: 0,
		},
	},
	datePickerContainer: {
		[breakpoints.up('lg')]: {
			minWidth: '260px',
			paddingRight: '50px',
		},
	},
	useCaseField: {
		display: 'flex',
		paddingBottom: '24px',
		[breakpoints.up('lg')]: {
			padding: '24px 39px 0 0',
			alignSelf: 'center',
		},
	},
	useCaseLabel: {
		fontSize: '13px',
		lineHeight: '18px',
		paddingBottom: '4px',
	},
	appointmentCostLabel: {
		fontSize: '13px',
		lineHeight: '18px',
		paddingBottom: '4px',
	},
	useCaseInput: {
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
		},
	},
	iconWrapper: {
		paddingRight: '16px',
	},
	appointmentCost: {
		display: 'flex',
		paddingBottom: '24px',
		[breakpoints.up('lg')]: {
			alignSelf: 'center',
			padding: '24px 39px 0',
		},
	},
	appointmentDuration: {
		display: 'flex',
		[breakpoints.up('lg')]: {
			alignSelf: 'center',
			padding: '24px 0 0',
		},
	},
}));

export default useStyles;

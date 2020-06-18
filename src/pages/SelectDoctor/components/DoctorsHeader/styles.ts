import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	form: {
		paddingBottom: '20px',
		paddingLeft: '26px',
		[breakpoints.up('lg')]: {
			display: 'flex',
			paddingBottom: '9px',
			paddingLeft: '0',
		},
	},
	formLabel: {
		fontSize: '13px',
		lineHeight: '18px',
		color: palette.info.main,
		paddingBottom: '3px',
	},
	datePickerField: {
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: 0,
		},
	},
	datePickerContainer: {
		maxWidth: '227px',
		[breakpoints.up('lg')]: {
			minWidth: '260px',
			paddingRight: '50px',
		},
	},
	useCaseField: {
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingRight: '39px',
			paddingBottom: '0',
		},
	},
	useCaseInput: {
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			paddingTop: '14px',
		},
	},
}));

export default useStyles;

import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	form: {
		paddingBottom: '20px',
		paddingLeft: '26px',
		[breakpoints.up('md')]: {
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
		[breakpoints.up('md')]: {
			paddingBottom: 0,
		},
	},
	datePickerContainer: {
		maxWidth: '227px',
		[breakpoints.up('md')]: {
			minWidth: '260px',
			paddingRight: '50px',
		},
	},
	useCaseField: {},
	useCaseInput: {
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('md')]: {
			fontSize: '15px',
			paddingTop: '14px',
		},
	},
}));

export default useStyles;

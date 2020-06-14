import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	doctorList: {
		[breakpoints.up('lg')]: {
			maxWidth: '606px',
		},
	},
	counter: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			padding: '22px 0 38px 0',
		},
	},
	counterFirstPart: {
		fontWeight: 'bold',
		color: palette.info.main,
		fontSize: '14px',
		lineHeight: '15px',
	},
	counterSecondPart: {
		color: palette.info.main,
		fontSize: '14px',
		lineHeight: '15px',
	},
	doctorWrapper: {
		backgroundColor: 'white',
		padding: '21px 26px 61px 26px',
		marginBottom: '15px',
		[breakpoints.up('lg')]: {
			borderRadius: '10px',
			padding: '34px 0 23px 36px',
			marginBottom: '25px',
		},
	},
	doctor: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '20px',
	},
	photoWrapper: {
		paddingRight: '20px',
		[breakpoints.up('lg')]: {
			paddingRight: '58px',
		},
	},
	photo: {
		borderRadius: '51%',
		width: '94px',
		height: '86px',
	},
	info: {},
	nameWrapper: {
		paddingBottom: '10px',
	},
	name: {
		fontSize: '15px',
		lineHeight: '18px',
		textTransform: 'capitalize',
		'&.no-caps': {
			textTransform: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
		},
	},
	specialityWrapper: {
		paddingBottom: '5px',
		[breakpoints.up('lg')]: {
			paddingRight: '27px',
			paddingBottom: '11px',
		},
	},
	speciality: {
		fontSize: '12px',
		lineHeight: '17px',
		textTransform: 'uppercase',
	},
	cmp: {
		fontSize: '12px',
		lineHeight: '17px',
	},
	commentWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			maxWidth: '356px',
		},
	},
	comment: {
		[breakpoints.up('lg')]: {
			fontSize: '13px',
			lineHeight: '15px',
			fontStyle: 'italic',
		},
	},
	flexWrapper: {
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	dateButtonWrapper: {
		width: '98px',
		marginRight: '7px',
		marginBottom: '11px',
		'&:nth-child(3n)': {
			marginRight: '0',
			[breakpoints.up('lg')]: {
				marginRight: '7px',
			},
		},
	},
	dateButton: {
		color: 'white',
		textTransform: 'lowercase',
	},
	timesWrapper: {
		[breakpoints.up('lg')]: {
			display: 'flex',
			alignItems: 'center',
		},
	},
	continueButton: {
		fontSize: '15px',
		textTransform: 'unset',
		[breakpoints.up('lg')]: {
			width: '171px',
			fontSize: '13px',
			lineHeight: '18px',
			padding: '11.5px 0',
		},
	},
	availableTitleWrapper: {
		paddingBottom: '10px',
	},
	availableTitle: {
		fontSize: '14px',
		color: palette.info.main,
		[breakpoints.up('lg')]: {
			fontSize: '12px',
			lineHeight: '17px',
		},
	},
}));

export default useStyles;

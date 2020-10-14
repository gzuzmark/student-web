import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	doctorList: {
		[breakpoints.up('lg')]: {
			maxWidth: '711px',
		},
	},
	counter: {
		padding: '0 24px 24px',
		[breakpoints.up('lg')]: {
			padding: '22px 0 20px 0',
		},
	},
	counterFirstPart: {
		fontWeight: 'bold',
		fontSize: '14px',
		lineHeight: '15px',
	},
	counterSecondPart: {
		fontSize: '14px',
		lineHeight: '15px',
	},
	doctorWrapper: {
		backgroundColor: 'white',
		padding: '40px 24px',
		marginBottom: '8px',
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
		[breakpoints.up('lg')]: {
			borderRadius: '10px',
			padding: '34px 0 23px 36px',
			marginBottom: '25px',
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
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
		[breakpoints.up('lg')]: {
			width: '111px',
			height: '102px',
		},
	},
	info: {},
	nameWrapper: {
		paddingBottom: '10px',
	},
	name: {
		fontSize: '15px',
		lineHeight: '18px',
		textTransform: 'capitalize',
		fontWeight: 'bold',
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
	flexWrapper: {
		paddingBottom: '8px',
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
		fontSize: '12px',
		[breakpoints.up('lg')]: {
			fontSize: '12px',
			lineHeight: '17px',
		},
	},
	ratingWrapper: {
		display: 'flex',
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '22px',
		},
	},
	doctorRating: {
		'&&': {
			color: palette.primary.main,
		},
	},
	ratingNumber: {
		fontSize: '13px',
		lineHeight: '24px',
	},
	doctorMoreInfo: {
		textDecoration: 'none',
		fontSize: '13px',
		lineHeight: '18px',
		padding: '6px 0',
		'&:hover': {
			textDecoration: 'none',
		},
	},
}));

export default useStyles;

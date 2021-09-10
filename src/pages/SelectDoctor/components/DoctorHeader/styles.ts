import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	doctor: {
		display: 'flex',
		alignItems: 'flex-start',
		paddingBottom: '20px',
	},
	photoWrapper: {
		paddingRight: '15px',
		// [breakpoints.up('lg')]: {
		// 	paddingRight: '14px',
		// },
	},
	photo: {
		borderRadius: '51%',
		width: '48px',
		height: '48px',
		[breakpoints.up('lg')]: {
			width: '48px',
			height: '48px',
		},
	},
	info: {
		flex: '1',
	},
	doctorInfoWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: '0px',
	},
	nameWrapper: {
		paddingBottom: '3px',
	},
	name: {
		fontFamily: 'Montserrat,-apple-system,sans-serif',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '14px',
		lineHeight: '120%',
		// '&.no-caps': {
		// 	textTransform: 'none',
		// },
		// [breakpoints.up('lg')]: {
		// 	fontSize: '20px',
		// 	lineHeight: '25px',
		// },
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
	doctorMoreInfo: {
		fontFamily: 'Mulish, sans-serif',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '12px',
		lineHeight: '15px',
		textDecorationLine: 'underline',
		textTransform: 'none',
		color: '#676F8F',
		margin: '0px !important',
		padding: '0px !important',
		justifyContent: 'flex-start',
		// '&:hover': {
		// 	textDecoration: 'none',
		// },
	},
	ratingWrapper: {
		display: 'flex',
		flex: '1',
		justifyContent: 'flex-end',
		alignItems: 'center',
		alignContent: 'center',
		// marginRight: '9px',
		// paddingBottom: '12px',
		// [breakpoints.up('lg')]: {
		// 	paddingBottom: '22px',
		// },
	},
	doctorRating: {
		'&&': {
			// color: palette.primary.main,
			color: '#FACD40',
		},
	},
	ratingNumber: {
		fontFamily: 'Mulish, sans-serif',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '12px',
		lineHeight: '16px',
		color: '#A3ABCC',
		margin: '2px 5px 0px 10px',
	},
}));

export default useStyles;

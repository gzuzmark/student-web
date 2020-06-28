import { Theme } from '@material-ui/core/styles';

import { INCOMING } from 'pages/api';
import { stylesWithTheme } from 'utils';

interface StylesProps {
	appointmentType: string;
}

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		padding: '25px 26px 0px',
		[breakpoints.up('lg')]: {
			padding: '61px 0 0 0',
			width: '772px',
		},
	},
	titleWrapper: {
		paddingBottom: '35px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	titleBold: {
		fontWeight: 'bold',
	},
	card: {
		padding: '20px 20px 28px 26px',
		marginBottom: ({ appointmentType }: StylesProps) => (appointmentType === INCOMING ? '11px' : '29px'),
		'&:hover': {
			boxShadow: 'none',
		},
		[breakpoints.up('lg')]: {
			padding: '59px 26px 70px 104px',
			marginBottom: '20px',
			marginRight: '35px',
		},
	},
	cardTitleWrapper: {
		paddingBottom: '21px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		[breakpoints.up('lg')]: {
			paddingBottom: '28px',
		},
	},
	cardTitle: {
		'& > span': {
			'&:first-child': {
				textTransform: 'capitalize',
			},
			fontSize: '15px',
			[breakpoints.up('lg')]: {
				fontSize: '18px',
			},
		},
	},
	finishedLabel: {
		backgroundColor: palette.primary.light,
		padding: '5px',
		[breakpoints.up('lg')]: {
			marginRight: '50px',
		},
	},
	desktopCardTitle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'inline',
		},
	},
	doctorWrapper: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '33px',
	},
	doctorPictureWrapper: {
		paddingRight: '31px',
		[breakpoints.up('lg')]: {
			paddingRight: '19px',
		},
	},
	doctorPicture: {
		width: '46px',
		height: '42px',
		borderRadius: '51%',
		[breakpoints.up('lg')]: {
			width: '86px',
			height: '80px',
		},
	},
	doctorInfoWrapper: {
		'& > div': {
			paddingBottom: '3px',
		},
	},
	detailWrapper: {
		display: 'flex',
		paddingBottom: '16px',
		alignItems: 'center',
		'&:last-child': {
			paddingBottom: '0px',
		},
	},
	doctorName: {
		fontSize: '15px',
	},
	detailContainer: {
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	whenWrapper: {
		[breakpoints.up('lg')]: {
			paddingRight: '64px',
		},
	},
	whenTitleWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			paddingBottom: '17px',
			display: 'block',
		},
	},
	whenTitle: {
		color: 'rgba(83, 91, 108, 0.5)',
	},
	patientWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	patientTitleWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			paddingBottom: '17px',
			display: 'block',
		},
	},
	patientTitle: {
		color: 'rgba(83, 91, 108, 0.5)',
	},
	patientNameWrapper: {
		[breakpoints.up('lg')]: {
			alignItems: 'center',
			display: 'flex',
			height: '29px',
		},
	},
	iconWrapper: {
		marginRight: '12px',
		[breakpoints.up('lg')]: {
			marginRight: '16px',
		},
		'&.moneyWrapper': {
			marginRight: '9px',
			[breakpoints.up('lg')]: {
				marginRight: '14px',
			},
		},
	},
	calendarIcon: {
		width: '15px',
		height: '15px',
		stroke: palette.info.main,
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
		},
	},
	clockIcon: {
		width: '15px',
		height: '15px',
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
		},
	},
	moneyIcon: {
		width: '18px',
		height: '15px',
		[breakpoints.up('lg')]: {
			width: '26px',
			height: '22px',
		},
	},
	cancelAppointment: {
		color: palette.info.main,
		textAlign: 'center',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			paddingBottom: '17px',
		},
	},
	divider: {
		height: '0px',
		borderBottom: `1px solid ${palette.info.main}`,
		marginBottom: '31px',
		[breakpoints.up('lg')]: {
			marginBottom: '29px',
		},
	},
	treatmentMessage: {
		color: palette.info.main,
		textAlign: 'center',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			maxWidth: '390px',
			margin: '0 auto',
		},
	},
}));

export default useStyles;

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
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
			padding: '20px 21px',
			marginBottom: '28px',
			//boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
			[breakpoints.up('lg')]: {
				// borderRadius: '10px',
				padding: '20px 24px',
				margin: '28px',
				// boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
			},
		},
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
			paddingBottom: '14px',
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
			flex: '1',
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
			flex: '1',
			justifyContent: 'flex-end',
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
			marginTop: '1.5px',
			marginLeft: '10px',
			marginRight: '5px',
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
			// '&:hover': {
			// 	textDecoration: 'none',
			// },
		},
	}),
);

export default useStyles;

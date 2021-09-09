import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
	createStyles({
		container: {
			// display: 'flex',
			// flexDirection: 'column',
			// alignItems: 'center',
			display: 'grid',
			// gridAutoFlow: 'column',
			// gridAutoColumns: '1fr',
			gap: '1em',
			gridTemplateRows: 'repeat(auto-fit, minmax(3em, 6em))',
			justifyContent: 'center',
		},
		doctorList: {
			[breakpoints.up('lg')]: {
				width: '1100px',
				display: 'flex',
				justifyContent: 'flex-start',
				// alignItems: 'center',
				flexWrap: 'wrap',
			},
			[breakpoints.down('xs')]: {
				width: '95%',
			},
			[breakpoints.down('md')]: {
				width: '55%%',
			},
		},
		timeFilterList: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			[breakpoints.up('lg')]: {
				paddingLeft: '16px',
			},
			[breakpoints.down('xs')]: {},
			[breakpoints.down('md')]: {},
		},
		timeFilterContainer: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			[breakpoints.down('xs')]: {
				backgroundColor: '#F7F8FC',

				flexDirection: 'column-reverse',
			},
		},
		counter: {
			display: 'flex',
			flexDirection: 'row',
			padding: '0 24px 0px',
			[breakpoints.up('lg')]: {
				padding: '22px 0 20px 0',
			},
			[breakpoints.down('xs')]: {
				padding: '0 18px 0px',
			},
		},
		counterContent: {
			flex: '1 1 auto',
		},
		counterFirstPart: {
			color: '#A3ABCC',
			fontWeight: 'bold',
			fontSize: '14px',
			lineHeight: '15px',
			[breakpoints.down('xs')]: {
				display: 'none',
			},
		},
		counterFirstPartBold: {
			color: '#2C7BFD',
			fontWeight: 'bold',
			fontSize: '14px',
			lineHeight: '15px',
			[breakpoints.down('xs')]: {
				color: '#52575C',
			},
		},
		counterSecondPart: {
			fontSize: '14px',
			lineHeight: '15px',
			[breakpoints.down('xs')]: {
				display: 'none',
			},
		},
		counterFirstPartMobile: {
			display: 'none',
			[breakpoints.down('xs')]: {
				color: '#52575C',
				fontWeight: 'bold',
				fontSize: '14px',
				lineHeight: '15px',
				display: 'inline',
			},
		},
		doctorWrapper: {
			backgroundColor: '#ffffff',
			padding: '20px 21px',
			marginBottom: '28px',
			//boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
			[breakpoints.up('lg')]: {
				// borderRadius: '10px',
				// padding: '20px 24px',
				margin: '10px 12px',
				width: '44%',
				// boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
			},
			[breakpoints.down('xs')]: {
				width: '100%',

				padding: '20px 10px',
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
			color: '#ffffff',
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
			fontWeight: 'bold',
			[breakpoints.up('lg')]: {
				// width: '171px',
				fontSize: '13px',
				marginTop: '10px',
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
	}),
);

export default useStyles;

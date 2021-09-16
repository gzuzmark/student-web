import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const gap = 28;

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			margin: '0 auto',
			display: 'flex',
			flexDirection: 'column',
			alignContent: 'center',
			[breakpoints.up('lg')]: {
				maxWidth: '896px',
			},
			border: '0.2px solid #ccc',
		},
		doctorList: {
			display: 'flex',
			flex: 1,
			flexWrap: 'wrap',
			boxSizing: 'border-box',
			rowGap: `${gap}px`,
			columnGap: `${gap}px`,
		},
		timeFilterList: {
			display: 'flex',
			flex: 1,
			flexWrap: 'wrap',
			justifyContent: 'flex-end',
			[breakpoints.up('lg')]: {
				paddingLeft: '16px',
			},
		},
		timeFilterContainer: {
			display: 'flex',
			alignItems: 'center',
			padding: '36px 0 28px 0',
			[breakpoints.down('md')]: {
				display: 'flex',
				alignItems: 'flex-start',
				backgroundColor: '#F7F8FC',
				padding: '0 0 1rem',
				flexDirection: 'column-reverse',
			},
		},
		counter: {
			display: 'flex',
			flexDirection: 'row',
			// padding: '0 24px 0px',
			[breakpoints.up('lg')]: {},
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
			boxSizing: 'border-box',
			padding: '20px 21px',
			width: `calc((100% - ${gap}px) / 2)`,
			[breakpoints.down('md')]: {
				width: '100%',
			},
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
	}),
);

export default useStyles;

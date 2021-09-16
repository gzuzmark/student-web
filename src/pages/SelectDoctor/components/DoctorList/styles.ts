import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'grid',
			justifyContent: 'center',
		},
		doctorList: {
			[breakpoints.up('lg')]: {
				width: '1100px',
				display: 'flex',
				justifyContent: 'flex-start',
				flexWrap: 'wrap',
			},
		},
		timeFilterList: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'flex-end',
			[breakpoints.up('lg')]: {
				paddingLeft: '16px',
			},
			[breakpoints.down('xs')]: {},
			[breakpoints.down('md')]: {},
		},
		timeFilterContainer: {
			display: 'grid',
			alignItems: 'center',
			gridTemplateColumns: 'repeat(auto-fit, minmax(3em, 34em))',
			padding: '20px 0 10px 0',
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
			padding: '0 24px 0px',
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
			padding: '20px 21px',
			marginBottom: '28px',
			boxSizing: 'border-box',
			[breakpoints.up('lg')]: {
				margin: '10px 12px',
				width: '44%',
			},
			[breakpoints.down('md')]: {
				width: '100%',
				padding: '20px 24px',
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

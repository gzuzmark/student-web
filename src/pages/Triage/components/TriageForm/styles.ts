import { stylesWithTheme } from 'utils';
import { Theme } from '@material-ui/core/styles';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	fieldWrapper: {
		paddingBottom: '123px',
		'&:last-child': {
			paddingBottom: '18px',
			[breakpoints.up('lg')]: {
				paddingBottom: '25px',
			},
		},
		'&.text-field': {
			[breakpoints.up('lg')]: {
				paddingBottom: '232px',
			},
		},
	},
	fieldPrefix: {
		paddingBottom: '7px',
		[breakpoints.up('lg')]: {
			paddingBottom: '20px',
		},
	},
	fieldLabelWrapper: {
		paddingBottom: '25px',
		[breakpoints.up('lg')]: {
			paddingBottom: '20px',
		},
	},
	fieldLabel: {
		fontSize: '20px',
		lineHeight: '28px',
		fontWeight: '400',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			fontWeight: '500',
		},
	},
	optionField: {
		'&&': {
			display: 'block',
			[breakpoints.up('lg')]: {
				display: 'flex',
			},
		},
	},
	smallerOptionField: {
		[breakpoints.up('lg')]: {
			width: '413px',
		},
	},
	optionWrapper: {
		margin: 0,
		[breakpoints.up('lg')]: {
			marginRight: '5px',
			maxWidth: '204px',
		},
	},
	option: {
		border: '1px solid white',
		marginBottom: '10px',
		justifyContent: 'flex-start',
		padding: '26px',
		'&.long-text': {
			padding: '26px 15px 26px 26px',
		},
		'&:last-child': {
			marginBottom: '0',
		},
		'&:hover': {
			boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
			'& .option-icon-wrapper': {
				backgroundColor: palette.primary.light,
			},
		},
		[breakpoints.up('lg')]: {
			marginBottom: 0,
			padding: '46px 13px 46px 22px',
		},
	},
	optionActive: {
		boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
		border: `1px solid ${palette.primary.main}`,
		'& .option-icon-wrapper': {
			backgroundColor: palette.primary.light,
		},
	},
	optionBody: {
		alignItems: 'center',
		display: 'flex',
		textAlign: 'left',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	optionIconWrapper: {
		alignItems: 'center',
		borderRadius: '50%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '47px',
		width: '47px',
		marginRight: '31px',
		[breakpoints.up('lg')]: {
			marginRight: '0',
		},
	},
	discomfortLvlText: {
		textAlign: 'left',
		'& > div': {
			textTransform: 'none',
		},
	},
	submit: {
		padding: '11px 18px',
		textTransform: 'none',
	},
}));

export default useStyles;

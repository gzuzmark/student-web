import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	rightLayout: {
		'&&': {
			minHeight: 'calc(100vh - 200px)',
			[breakpoints.up('lg')]: {
				minHeight: 'calc(100vh - 80px)',
			},
		},
	},
	tipsWrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '96px 0 49px 0',
			width: '475px',
		},
	},
	formWrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '151px 0 0 0',
			width: '566px',
		},
	},
	titleWrapper: {
		paddingBottom: '25px',
		[breakpoints.up('lg')]: {
			paddingBottom: '26px',
		},
	},
	title: {
		[breakpoints.up('lg')]: {
			paddingBottom: '12px',
		},
	},
	titleText: {
		fontFamily: 'Playfair Display',
		fontStyle: 'normal',
		fontSize: '25px',
		lineHeight: '28px',
		fontWeight: 'bold',
		[breakpoints.up('lg')]: {
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'normal',
			lineHeight: '35px',
			letterSpacing: '0.2px',
		},

		'&.main': {
			color: palette.primary.main,
			[breakpoints.up('lg')]: {
				color: palette.text.primary,
				fontWeight: 'bold',
			},
		},
		'&.capitalize': {
			textTransform: 'capitalize',
		},
	},
	separator: {
		[breakpoints.up('lg')]: {
			height: '0',
			width: '25px',
			borderBottom: `1px solid ${palette.info.main}`,
		},
	},
	subTitle: {
		paddingBottom: '24px',
		fontWeight: 'bold',
		textTransform: 'none',
		[breakpoints.up('lg')]: {
			paddingBottom: '16px',
			fontWeight: 'normal',
		},
	},
	benefits: {
		padding: '0 0 44px 0',
		[breakpoints.up('lg')]: {
			padding: '0 0 54px 0',
		},
	},
	benefit: {
		padding: '0 0 16px 0',
		'&:last-child': {
			padding: '0',
		},
	},
	benefitIcon: {
		minWidth: '26px',
	},
	benefitText: {
		margin: '0',
	},
}));

export default useStyles;

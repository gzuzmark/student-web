import { ElementType } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const MAIN_GREEN = '#1ECD96';
const LIGHT_GREEN = '#DEF4EC';
const DISABLED = '#D9D9DC';
const BLUE_STEEL = '#9EADCC';
const PRIMARY_BLACK = '#535B6C';
const SECONDARY_BLACK = '#353535';

const palette = {
	primary: {
		main: MAIN_GREEN,
		light: LIGHT_GREEN,
		contrastText: 'white',
	},
	divider: DISABLED,
	info: {
		main: BLUE_STEEL,
	},
	text: {
		primary: PRIMARY_BLACK,
		secondary: SECONDARY_BLACK,
	},
	action: {
		disabled: DISABLED,
	},
};

const typography = {
	fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
	fontWeightRegular: 500,
	h1: {
		fontFamily: ['Playfair Display', '-apple-system', 'sans-serif'].join(','),
		fontSize: '22px',
		lineHeight: '28px',
		letterSpacing: '0.2px',
		[defaultTheme.breakpoints.up('md')]: {
			fontSize: '30px',
			lineHeight: '40px',
		},
	},
	h2: {
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '20px',
		lineHeight: '25px',
		letterSpacing: '0.2px',
		[defaultTheme.breakpoints.up('md')]: {
			fontSize: '25px',
			lineHeight: '30px',
		},
	},
	h3: {
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '10px',
		lineHeight: '15px',
		letterSpacing: '5px',
		[defaultTheme.breakpoints.up('md')]: {
			fontSize: '15px',
		},
	},
	button: {
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '15px',
		lineHeight: '18px',
		[defaultTheme.breakpoints.up('md')]: {
			fontSize: '20px',
			lineHeight: '25px',
		},
	},
	body1: {
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '15px',
		lineHeight: '20px',
		letterSpacing: '0.2px',
		[defaultTheme.breakpoints.up('md')]: {
			fontSize: '12px',
			lineHeight: '15px',
		},
	},
	body2: {
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontStyle: 'italic',
		[defaultTheme.breakpoints.up('md')]: {
			fontSize: '13px',
			lineHeight: '15px',
		},
	},
	h4: {
		// TODO
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		[defaultTheme.breakpoints.up('md')]: {
			fontSize: '13px',
			lineHeight: '18px',
		},
	},
};

type TypographyColor =
	| 'initial'
	| 'inherit'
	| 'primary'
	| 'secondary'
	| 'textPrimary'
	| 'textSecondary'
	| 'error'
	| undefined;
type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
interface PropsTypes {
	MuiTypography: { color: TypographyColor; component: ElementType };
	MuiButton: { color: ButtonColor };
}

const props: PropsTypes = {
	MuiTypography: {
		color: 'textPrimary',
		component: 'div',
	},
	MuiButton: {
		color: 'primary',
	},
};

const overrides = {
	MuiPickersDay: {
		day: {
			color: palette.text.primary,
			'&:focus': {
				'&$daySelected': {
					backgroundColor: palette.primary.main,
				},
			},
		},
		daySelected: {
			backgroundColor: palette.primary.main,
			'&:hover': {
				willChange: 'background-color',
				backgroundColor: palette.primary.main,
			},
		},
		dayDisabled: {
			color: palette.action.disabled,
		},
		current: {
			backgroundColor: palette.primary.main,
		},
	},
	MuiButton: {
		contained: {
			boxShadow: 'none',
			'&:hover': {
				boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
			},
			'&$disabled': {
				color: 'white',
				backgroundColor: DISABLED,
			},
		},
		containedPrimary: {
			color: 'white',
			'&:hover': {
				backgroundColor: MAIN_GREEN,
			},
		},
		outlinedPrimary: {
			backgroundColor: 'white',
			border: '1px solid #1ECD96',
			'&:hover': {
				backgroundColor: 'white',
				boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
			},
		},
		textPrimary: {
			'&:hover': {
				backgroundColor: 'transparent',
				textDecoration: 'underline',
			},
		},
	},
	MuiOutlinedInput: {
		root: {
			backgroundColor: 'white',
			'&:hover $notchedOutline': {
				borderColor: BLUE_STEEL,
			},
			'&$focused $notchedOutline': {
				borderColor: BLUE_STEEL,
				borderWidth: '1px',
			},
		},
		notchedOutline: {
			borderColor: BLUE_STEEL,
		},
		input: {
			fontSize: '13px',
			lineHeight: '18px',
			[defaultTheme.breakpoints.up('md')]: {
				fontSize: '15px',
				lineHeight: '20px',
			},
		},
	},
};

export const leftPrefixTitleFontsStyles = {
	fontSize: '10px',
	lineHeight: '15px',
	letterSpacing: '5px',
	[defaultTheme.breakpoints.up('md')]: {
		fontSize: '15px',
	},
};

export const leftTitleFontsStyles = {
	fontSize: '22px',
	lineHeight: '28px',
	letterSpacing: '0.2px',
	[defaultTheme.breakpoints.up('md')]: {
		fontSize: '30px',
		lineHeight: '40px',
	},
};

export const leftStepsLabels = {
	fontSize: '12px',
	lineHeight: '15px',
	letterSpacing: '0.2px',
	[defaultTheme.breakpoints.up('md')]: {
		fontSize: '15px',
		lineHeight: '28px',
	},
};

export const BACKGROUND_DEFAULT = '#F8F8F8';

export default {
	palette,
	typography,
	props,
	overrides,
};

import { ElementType } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';

import { ReactComponent as DownArrow } from 'icons/down-arrow.svg';

const defaultTheme = createMuiTheme();

const MAIN_GREEN = '#1ECD96';
const LIGHT_GREEN = '#DEF4EC';
const DISABLED = '#D9D9DC';
const BLUE_STEEL = '#9EADCC';
const PRIMARY_BLACK = '#535B6C';
const SECONDARY_BLACK = '#353535';
const RED_MAIN = '#FE6B6F';
const NEUTRAL2 = '#676F8F';
const MAIN_BLUE = '#2C7BFD';
const LIGHT_BLUE = '#7BADFE';

const palette = {
	neutral2: {
		main: NEUTRAL2,
	},
	primary: {
		main: MAIN_GREEN,
		light: LIGHT_GREEN,
		contrastText: '#ffffff',
	},
	error: {
		main: RED_MAIN,
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
	secondary: {
		main: MAIN_BLUE,
		light: LIGHT_BLUE,
	},
};

const typography = {
	fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
	fontWeightRegular: 500,
	h1: {
		// titles left side
		fontFamily: ['Playfair Display', '-apple-system', 'sans-serif'].join(','),
		fontWeight: 400,
		fontSize: '22px',
		lineHeight: '28px',
		letterSpacing: '0.2px',
		[defaultTheme.breakpoints.up('lg')]: {
			fontSize: '30px',
			lineHeight: '40px',
		},
	},
	h2: {
		// some titles
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '20px',
		lineHeight: '25px',
		letterSpacing: '0.2px',
		fontWeight: 400,
		[defaultTheme.breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '30px',
			fontWeight: 500,
		},
	},
	h3: {
		// subtitle
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '10px',
		lineHeight: '15px',
		letterSpacing: '5px',
		[defaultTheme.breakpoints.up('lg')]: {
			fontSize: '15px',
		},
	},
	button: {
		// normal buttons
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '15px',
		lineHeight: '18px',
		fontWeight: 400,
		[defaultTheme.breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
		},
	},
	body1: {
		// input boxes
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '13px',
		lineHeight: '18px',
		letterSpacing: '0.2px',
		[defaultTheme.breakpoints.up('lg')]: {
			fontSize: '14px',
			lineHeight: '20px',
		},
	},
	body2: {
		// quotes
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontStyle: 'italic',
		[defaultTheme.breakpoints.up('lg')]: {
			fontSize: '13px',
			lineHeight: '15px',
		},
	},
	h4: {
		// Small buttons
		fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
		fontSize: '13px',
		lineHeight: '18px',
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
	MuiSelect: { IconComponent: ElementType };
}

const props: PropsTypes = {
	MuiTypography: {
		color: 'textPrimary',
		component: 'div',
	},
	MuiButton: {
		color: 'primary',
	},
	MuiSelect: {
		IconComponent: DownArrow,
	},
};

const overrides: Overrides = {
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
	MuiSelect: {
		select: {
			'&:focus': {
				backgroundColor: '#ffffff',
			},
		},
		iconOutlined: {
			top: 'calc(50% - 4px)',
			right: '13px',
			[defaultTheme.breakpoints.up('lg')]: {
				right: '23px',
				top: 'calc(50% - 3px)',
			},
		},
	},
	MuiButton: {
		contained: {
			boxShadow: 'none',
			textTransform: 'unset',
			padding: '16px 0',
			'&:hover': {
				boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
			},
			'&$disabled': {
				color: '#ffffff',
				backgroundColor: DISABLED,
			},
			[defaultTheme.breakpoints.up('lg')]: {
				padding: '21px 0',
			},
		},
		containedPrimary: {
			color: '#ffffff',
			'&:hover': {
				backgroundColor: MAIN_GREEN,
			},
		},
		outlinedPrimary: {
			backgroundColor: '#ffffff',
			borderRadius: '8px',
			border: '1px solid #1ECD96',
			'&:hover': {
				backgroundColor: '#ffffff',
				boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
			},
		},
		textPrimary: {
			color: MAIN_GREEN,
			textDecoration: 'underline',
			'&:hover': {
				backgroundColor: 'transparent',
				textDecoration: 'underline',
			},
		},
	},
	MuiFormLabel: {
		root: {
			color: PRIMARY_BLACK,
		},
	},
	MuiInputLabel: {
		root: {
			color: PRIMARY_BLACK,
			zIndex: 2,
			'&$focused': {
				color: PRIMARY_BLACK,
			},
		},
		formControl: {
			transform: 'translate(21px, 16px) scale(1)',
			'&$shrink': {
				transform: 'translate(0, -22px) scale(1)',
			},
			[defaultTheme.breakpoints.up('lg')]: {
				transform: 'translate(21px, 14px) scale(1)',
				'&$shrink': {
					transform: 'translate(0, -28px) scale(1)',
				},
			},
		},
		outlined: {
			transform: 'translate(21px, 16px) scale(1)',
			'&$shrink': {
				transform: 'translate(0, -22px) scale(1)',
			},
			[defaultTheme.breakpoints.up('lg')]: {
				transform: 'translate(21px, 14px) scale(1)',
				'&$shrink': {
					transform: 'translate(0, -28px) scale(1)',
				},
			},
		},
	},
	MuiOutlinedInput: {
		root: {
			backgroundColor: '#ffffff',
			'&&:hover $notchedOutline': {
				borderColor: BLUE_STEEL,
			},
			'&$focused $notchedOutline': {
				borderColor: BLUE_STEEL,
				borderWidth: '1px',
			},
			borderRadius: '8px',
		},
		notchedOutline: {
			borderColor: BLUE_STEEL,
			'& > legend': {
				// TODO check if this will be used
				maxWidth: '0.01px',
			},
		},
		input: {
			fontSize: '13px',
			lineHeight: '18px',
			padding: '14px 18.5px 14px 21px',
			[defaultTheme.breakpoints.up('lg')]: {
				fontSize: '15px',
				lineHeight: '20px',
			},
		},
	},
	MuiFormHelperText: {
		root: {
			'&$error': {
				fontSize: '13px',
				lineHeight: '18px',
				textAlign: 'right',
			},
		},
		contained: {
			marginLeft: 0,
			marginRight: 0,
			textAlign: 'right',
		},
	},
	MuiCard: {
		root: {
			boxShadow: 'none',
			'&:hover': {
				boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
			},
		},
	},
};

export const leftPrefixTitleFontsStyles = {
	fontSize: '10px',
	lineHeight: '15px',
	letterSpacing: '5px',
	[defaultTheme.breakpoints.up('lg')]: {
		fontSize: '15px',
	},
};

export const leftTitleFontsStyles = {
	fontSize: '22px',
	lineHeight: '28px',
	letterSpacing: '0.2px',
	[defaultTheme.breakpoints.up('lg')]: {
		fontSize: '30px',
		lineHeight: '40px',
	},
};

export const leftStepsLabels = {
	fontSize: '12px',
	lineHeight: '15px',
	letterSpacing: '0.2px',
	[defaultTheme.breakpoints.up('lg')]: {
		fontSize: '15px',
		lineHeight: '28px',
	},
};

export const BACKGROUND_DEFAULT = '#F7F8FC';

export default {
	palette,
	typography,
	props,
	overrides,
};

const palette = {
	primary: {
		main: '#1ECD96',
		light: '#DEF4EC',
		contrastText: '#25282B',
	},
	divider: '#D9D9DC',
	info: {
		main: '#9EADCC',
	},
	text: {
		primary: '#535B6C',
		secondary: '#353535',
	},
	action: {
		disabled: '#D9D9DC',
	},
};

const typography = {
	fontFamily: ['Montserrat', '-apple-system', 'sans-serif'].join(','),
};

type Color = 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
interface PropsTypes {
	MuiTypography: { color: Color | undefined };
}

const props: PropsTypes = {
	MuiTypography: {
		color: 'textPrimary',
	},
};

export const BACKGROUND_DEFAULT = '#F8F8F8';

export default {
	palette,
	typography,
	props,
};

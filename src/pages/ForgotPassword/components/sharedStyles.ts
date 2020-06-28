import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	title: {
		fontSize: '20px',
		lineHeight: '28px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			fontWeight: 'bold',
			letterSpacing: '0.2px',
			lineHeight: '35px',
		},
	},
	subTitle: {
		fontSize: '13px',
		lineHeight: '28px',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			letterSpacing: '0.2px',
		},
	},
}));

export default useStyles;

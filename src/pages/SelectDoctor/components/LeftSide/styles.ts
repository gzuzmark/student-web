import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	leftLayout: {
		display: 'flex',
		justifyContent: 'center',
		padding: '30px 0',
		[breakpoints.up('md')]: {
			display: 'block',
			padding: '89px 0 0 104px',
		},
	},
	prefixTitleContainer: {
		display: 'none',
		paddingBottom: '17px',
		[breakpoints.up('md')]: {
			display: 'block',
		},
	},
	prefixTitle: {
		fontSize: '15px',
		lineHeight: '15px',
		letterSpacing: '5px',
		paddingBottom: '17px',
	},
	titleContainer: {
		display: 'none',
		paddingBottom: '57px',
		[breakpoints.up('md')]: {
			display: 'block',
		},
	},
	title: {
		fontSize: '30px',
		fontWeight: 'bold',
		lineHeight: '40px',
		letterSpacing: '0.2px',
		fontFamily: 'Playfair Display',
	},
}));

export default useStyles;

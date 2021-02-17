import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		paddingTop: '26px',
		[breakpoints.up('lg')]: {
			paddingTop: '65px',
			paddingRight: '104px',
		},
	},
	titleContainer: {
		paddingBottom: '24px',
		paddingLeft: '26px',
		[breakpoints.up('lg')]: {
			paddingBottom: '33px',
			paddingLeft: '0',
		},
	},
	cards: {
		display: 'flex',
		flexWrap: 'wrap',
		paddingRight: '84px',
	},
	title: {
		fontSize: '20px',
		lineHeight: '25px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '30px',
			letterSpacing: '0.2px',
		},
	},
	img: {
		width: '60px',
		'vertical-align': 'middle',
		display: 'inline-block',
		'margin-top': '-10px',
	},
	divider: {
		margin: '0 24px 32px',
		[breakpoints.up('lg')]: {
			margin: '0',
		},
	},
	emptyMessageWrapper: {
		[breakpoints.up('lg')]: {
			textAlign: 'center',
			maxWidth: '510px',
			margin: '0 auto',
			paddingTop: '171px',
		},
	},
	emptyMessage: {
		fontSize: '16px',
		lineHeight: '25px',
		padding: '0 30px 20px 26px',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			padding: '0',
		},
	},
}));

export default useStyles;

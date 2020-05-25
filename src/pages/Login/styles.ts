import { stylesWithTheme } from 'utils/createStyles';
import { Theme } from '@material-ui/core/styles';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		backgroundColor: 'white',
		position: 'relative',
		overflow: 'hidden',
	},
	mobileImg: {
		position: 'fixed',
		top: '24px',
		left: '178px',
		[breakpoints.up('md')]: {
			display: 'none',
		},
	},
	desktopImg: {
		display: 'none',
		[breakpoints.up('md')]: {
			display: 'block',
		},
	},
	loginFormContainer: {
		paddingTop: '151px',
		paddingLeft: '25px',
		paddingRight: '25px',
		[breakpoints.up('md')]: {
			background: 'white',
			borderTopLeftRadius: '25px',
			borderBottomLeftRadius: '25px',
			marginLeft: '-195px',
			paddingRight: 0,
			paddingTop: '117px',
			paddingLeft: '98px',
			width: '100%',
		},
	},
	contentWrapper: {
		[breakpoints.up('md')]: {
			maxWidth: '401px',
		},
	},
	brandImg: {
		width: '145px',
		height: '37px',
		paddingBottom: '18px',
	},
	title: {
		paddingRight: '150px',
		paddingBottom: '33px', // 15px
		[breakpoints.up('md')]: {
			paddingRight: 0,
			paddingBottom: '65px', // 47px
		},
	},
	desktopCircle: {
		display: 'none',
		[breakpoints.up('md')]: {
			display: 'block',
		},
	},
}));

export default useStyles;

import { stylesWithTheme } from 'utils/createStyles';
import { Theme } from '@material-ui/core/styles';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		backgroundColor: '#ffffff',
		position: 'relative',
		overflow: 'hidden',
	},
	imgWrapper: {
		[breakpoints.up('lg')]: {
			position: 'relative',
			width: '83.1vh',
		},
	},
	goToStartText: {
		fontFamily: 'Mulish, sans-serif',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '14px',
		lineHeight: '20px',
		color: '#1ECD96',
		marginLeft: '10px',
	},
	goToStartButton: {
		cursor: 'pointer',
		display: 'flex',
		fontSize: '12px',
		padding: '30px 6rem',
		textTransform: 'none',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '15px',
		},
		[breakpoints.down('md')]: {
			padding: '30px 0px',
		},
	},
	mobileImg: {
		position: 'fixed',
		top: '24px',
		right: '-127px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	desktopImg: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			objectFit: 'cover',
			width: '100%',
		},
	},
	loginFormContainer: {
		paddingTop: '151px',
		paddingLeft: '25px',
		paddingRight: '25px',
		[breakpoints.up('lg')]: {
			background: '#ffffff',
			borderTopLeftRadius: '25px',
			borderBottomLeftRadius: '25px',
			flex: '1 1 auto',
			height: '100vh',
			zIndex: 2,
			padding: 0,
		},
	},
	contentWrapper: {
		[breakpoints.up('lg')]: {
			maxWidth: '401px',
			paddingRight: 0,
			paddingTop: '117px',
			paddingLeft: '98px',
		},
	},
	brandImg: {
		width: '145px',
		height: '37px',
		paddingBottom: '18px',
	},
	title: {
		paddingRight: '150px',
		paddingBottom: '43px',
		[breakpoints.up('lg')]: {
			paddingRight: 0,
			paddingBottom: '73px',
		},
	},
	desktopCircle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
}));

export default useStyles;

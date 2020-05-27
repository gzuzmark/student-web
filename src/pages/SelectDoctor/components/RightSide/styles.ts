import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	container: {
		paddingTop: '26px',
		minHeight: 'calc(100vh - 220px)',
		[breakpoints.up('lg')]: {
			paddingTop: '65px',
			paddingRight: '104px',
			minHeight: 'calc(100vh - 145px)',
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
	title: {
		fontSize: '20px',
		lineHeight: '25px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '30px',
			letterSpacing: '0.2px',
		},
	},
	divider: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
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
		color: palette.info.main,
		padding: '0 30px 20px 26px',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			padding: '0',
		},
	},
}));

export default useStyles;

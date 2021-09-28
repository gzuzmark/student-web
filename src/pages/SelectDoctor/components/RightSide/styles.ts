import { createStyles, Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) =>
	createStyles({
		rightLayout: {
			paddingLeft: '0px !important',
		},
		wrapper: {
			// paddingTop: '26px',
			// [breakpoints.up('lg')]: {
			// 	paddingTop: '32px',
			// 	// paddingRight: '104px',
			// },
		},
		titleContainer: {
			textAlign: 'center',
			paddingBottom: '24px',
			// paddingLeft: '26px',
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
			backgroundColor: '#F7F8FC',
			margin: '0 24px',
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
			textAlign: 'center',
			lineHeight: '25px',
			padding: '0 30px 20px 26px',
			[breakpoints.up('lg')]: {
				fontSize: '20px',
				padding: '0',
			},
		},
	}),
);

export default useStyles;

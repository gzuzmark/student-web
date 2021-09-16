import { createStyles, Theme } from '@material-ui/core';
import { stylesWithTheme } from 'utils';
import { MOBILE } from './constants';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			alignItems: 'center',
			backgroundColor: '#F7F8FC',
			minHeight: 'calc(100vh - 80px)',
		},
		div: {
			width: '550px',
			padding: '24px 43px 20px',
			flex: 1,
			backgroundColor: '#FFFFFF',
			boxSizing: 'border-box',
			[breakpoints.down(MOBILE)]: {
				width: '100%',
				padding: '14px 0px 20px',
			},
		},
		header: {
			margin: '0px 55px 0px',
			paddingBottom: '0px',
			backgroundColor: '#FFFFFF',
			[breakpoints.down(MOBILE)]: {
				margin: '0px 24px',
			},
		},
	}),
);

export default useStyles;

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
			padding: '36px 43px 20px',
			flex: 1,
			backgroundColor: '#FFFFFF',
			boxSizing: 'border-box',
			[breakpoints.down(MOBILE)]: {
				width: '100%',
				padding: '36px 20px 20px',
			},
		},
		divBack: {
			display: 'flex',
			width: '550px',
			padding: '22px 0px',
			backgroundColor: '#F7F8FC',
			boxSizing: 'border-box',
			[breakpoints.down(MOBILE)]: {
				width: '100%',
			},
		},
		header: {
			paddingBottom: '0px',
			backgroundColor: '#FFFFFF',
		},
	}),
);

export default useStyles;

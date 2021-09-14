import { createStyles } from '@material-ui/core';
import { stylesWithTheme } from 'utils';

// { breakpoints }: Theme

const useStyles = stylesWithTheme(() =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			alignItems: 'center',
			backgroundColor: '#F7F8FC',
		},
		div: {
			width: '550px',
			padding: '36px 43px 20px',
			backgroundColor: '#FFFFFF',
		},
		header: {
			paddingBottom: '0px',
			backgroundColor: '#FFFFFF',
		},
	}),
);

export default useStyles;

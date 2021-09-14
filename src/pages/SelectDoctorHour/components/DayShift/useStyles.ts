import { createStyles } from '@material-ui/core';
import { stylesWithTheme } from 'utils';

// { breakpoints }: Theme

const useStyles = stylesWithTheme(() =>
	createStyles({
		container: {
			flexDirection: 'column',
			flex: 1,
			alignItems: 'center',
		},
		divHours: {
			backgroundColor: '#FFFFFF',
			display: 'flex',
			flex: '1',
			flexWrap: 'wrap',
			margin: '0px 17px',
		},
	}),
);

export default useStyles;

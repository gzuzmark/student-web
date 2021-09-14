import { createStyles } from '@material-ui/core';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(() =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'row',
			flex: 1,
			cursor: 'pointer',
			margin: '0px 0px 24px',
		},
		text: {
			fontFamily: 'Mulish, sans-serif',
			fontStyle: 'normal',
			fontWeight: 600,
			fontSize: '14px',
			lineHeight: '20px',
			color: '#1ECD96',
			marginLeft: '10px',
		},
	}),
);

export default useStyles;

import { createStyles, Theme } from '@material-ui/core';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) =>
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
			margin: '16px 0px',
		},
		continueButton: {
			fontSize: '15px',
			textTransform: 'unset',
			fontWeight: 'bold',
			[breakpoints.up('lg')]: {
				fontSize: '13px',
				lineHeight: '18px',
				padding: '11.5px 0',
			},
		},
	}),
);

export default useStyles;

import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		titleDiv: {
			display: 'flex',
			flex: 1,
			justifyContent: 'center',
			fontWeight: 'bold',
			color: '#535B6C',
			fontSize: '26px',
		},
	}),
);

export default useStyles;

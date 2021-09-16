import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			width: '100%',
		},
		titleDiv: {
			display: 'flex',
			flex: 1,
			justifyContent: 'center',
		},
		'MuiBox-root': {
			width: '100%',
		},
	}),
);

export default useStyles;

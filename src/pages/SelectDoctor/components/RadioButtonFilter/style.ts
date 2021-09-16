import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
		},
		titleDiv: {
			display: 'flex',
			flex: 1,
			justifyContent: 'center',
		},
	}),
);

export default useStyles;

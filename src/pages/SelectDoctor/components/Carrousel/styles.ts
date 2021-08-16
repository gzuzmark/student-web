import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
		},
	}),
);

export default useStyles;

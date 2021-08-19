import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '30px 0px',
			backgroundColor: '#FFFFFF',
		},
		carousel: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '0px',
			// width: '582px',
			// height: '68px',
		},
		pointer: {
			cursor: 'pointer',
		},
	}),
);

export default useStyles;

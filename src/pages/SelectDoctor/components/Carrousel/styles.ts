import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			// padding: '30px 0px',
			backgroundColor: '#ffffff',
		},
		carousel: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '0px',
			margin: '10px 0 30px 0',
			// width: '582px',
			// height: '68px',
		},
		arrow: {
			display: 'flex',
			justifyContent: 'center',
		},
		pointer: {
			cursor: 'pointer',
		},
		rotate: {
			transform: 'rotate(180deg)',
		},
		skeleton: {
			margin: '0px 5px',
			borderRadius: '8px',
		},
	}),
);

export default useStyles;

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
			[breakpoints.down('xs')]: {
				padding: '30px 0px',
			},
		},
		carousel: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '0px',

			// width: '582px',
			// height: '68px',
			[breakpoints.up('md')]: {
				margin: '10px 0 30px 0',
			},
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

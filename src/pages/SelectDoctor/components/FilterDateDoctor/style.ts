import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: '32px',
			backgroundColor: '#FFFFFF',
			[breakpoints.down('md')]: {
				paddingTop: '20px',
			},
		},
		titleDiv: {
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 500,
			fontSize: '26px',
			lineHeight: '120%',
			display: 'flex',
			flex: 1,
			justifyContent: 'center',
			color: '#535B6C',
		},
	}),
);

export default useStyles;

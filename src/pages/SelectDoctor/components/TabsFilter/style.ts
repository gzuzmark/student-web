import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			width: '100%',
			marginTop: '15px',
		},
		tabs: {},
		tab: {
			'& .MuiTab-root': {
				textTransform: 'capitalize',
				width: '50%',
				maxWidth: '500px',
				fontSize: '16px',
				//backgroundColor: "orange"
			},
		},

		titleDiv: {
			display: 'flex',
			flex: 1,
			justifyContent: 'center',
		},
		'MuiBox-root': {
			width: '100%',
		},
		selectedTab: {
			color: '#1ECD96',
			fontWeight: 'bold',
		},
	}),
);

export default useStyles;

import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			width: '100%',
			marginTop: '15px',
		},
		tab: {
			fontFamily: 'Mulish, sans-serif',

			'& .MuiTab-root': {
				textTransform: 'initial',
				width: '50%',
				maxWidth: '500px',
				fontSize: '16px',
				//backgroundColor: "orange"
			},
		},
		itemTab: {
			fontFamily: 'Mulish, sans-serif !important',
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
			color: '#1ECD96 !important',
			// fontWeight: ['bold'],
			fontWeight: 'bold',
			// fontWeightRegular:
		},
	}),
);

export default useStyles;

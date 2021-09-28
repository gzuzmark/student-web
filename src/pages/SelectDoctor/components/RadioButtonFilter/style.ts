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
		labelItem: {
			color: '#A3ABCC',
			fontSize: '16px',
			fontFamily: 'Mulish, sans-serif',
		},
		labelItemActive: {
			color: '#1ECD96',
			fontWeight: 'bold',
			fontSize: '16px',
			fontFamily: 'Mulish, sans-serif',
		},
		radioItem: {
			margin: '15px 10px',
		},
		itemRadio: {
			visibility: 'visible',
			margin: '0 10px -2px 0',
			'&:checked': {
				background: 'radial-gradient(red 0%, teal 40%, transparent 50%, transparent)',
				borderColor: 'teal',
				backgroundColor: 'red',
			},

			'&::before': {
				// content: '""',
				// display: 'inline-block',
				// verticalAlign: 'bottom',
				// width: '1rem',
				// height: '1rem',
				// marginRight: '0.3rem',
				// borderRadius: '50%',
				// borderStyle: 'solid',
				// borderWidth: '0.1rem',
				// borderColor: 'gray',
			},
		},
	}),
);

export default useStyles;

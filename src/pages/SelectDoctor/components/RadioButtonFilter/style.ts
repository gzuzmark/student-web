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
		},
		radioItem: {
			margin: '15px 10px',
		},
		itemRadio: {
			visibility: 'visible',
			'&:checked': {
				background: 'radial-gradient(red 0%, teal 40%, transparent 50%, transparent)',
				borderColor: 'teal',
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

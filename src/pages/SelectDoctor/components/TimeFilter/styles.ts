import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: spacing(0.5),
		},
	},
	outlinedPrimary: {
		backgroundColor: '#ffffff',
		border: '1px solid #2C7BFD',
		color: '#2C7BFD',
		'&:hover': {
			backgroundColor: '#ffffff',
			boxShadow: '#2C7BFD',
		},
	},
	imgWrapper: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		paddingRight: '8px',
		[breakpoints.down('md')]: {
			display: 'none',
		},
		[breakpoints.down('xs')]: {
			display: 'none',
		},
	},
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& > *:not(:last-child)': {
			marginRight: theme.spacing(2),
		},
	},
}));

export default useStyles;

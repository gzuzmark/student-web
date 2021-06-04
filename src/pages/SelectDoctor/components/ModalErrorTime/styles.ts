import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	dateButton: {
		textTransform: 'lowercase',
		fontSize: '14px',
		lineHeight: '15px',
		padding: '12.5px 0',
		paddingLeft: '5px',
		paddingRight: '5px',
		marginBottom: '10px',
		boxShadow: '0px 4px 4px rgba(83, 91, 108, 0.28)',
		[breakpoints.up('lg')]: {
			marginRight: '7px',
			minWidth: 'auto',
			fontSize: '13px',
			lineHeight: '18px',
			padding: '11.5px 8px',
		},
	},
}));

export default useStyles;

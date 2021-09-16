import { createStyles, Theme } from '@material-ui/core';
import { MOBILE } from 'pages/SelectDoctorHour/constants';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'row',
			flex: 1,
			cursor: 'pointer',
			margin: '0px 0px 24px',
			[breakpoints.down(MOBILE)]: {
				margin: '0px 24px 24px',
			},
		},
		text: {
			fontFamily: 'Mulish, sans-serif',
			fontStyle: 'normal',
			fontWeight: 600,
			fontSize: '14px',
			lineHeight: '20px',
			color: '#1ECD96',
			marginLeft: '10px',
		},
	}),
);

export default useStyles;

import { createStyles, Theme } from '@material-ui/core';
import { MOBILE, MOBILE_XS } from 'pages/SelectDoctorHour/constants';
import { stylesWithTheme } from 'utils';

const gap = 11;
const itemsDesktop = 5;
const itemsMobile = 4;
const itemsMobileXS = 3;

const useStyles = stylesWithTheme(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			flexDirection: 'column',
			flex: 1,
			alignItems: 'center',
		},
		divTitle: {
			padding: '4px 30px',
			[breakpoints.down(MOBILE)]: {
				padding: '4px 24px',
			},
		},
		title: {
			display: 'flex',
			alignItems: 'center',
			height: '28px',
			fontFamily: 'Mulish',
			fontStyle: 'normal',
			fontWeight: 600,
			fontSize: '14px',
			lineHeight: '20px',
			color: '#52575C',
		},
		divSchedule: {
			padding: '16px 30px',
			[breakpoints.down(MOBILE)]: {
				padding: '16px 24px',
			},
		},
		divider: {
			borderTop: '1px solid #CDD4F0',
		},
		divHours: {
			backgroundColor: '#FFFFFF',
			display: 'flex',
			flex: '1',
			boxSizing: 'border-box',
			rowGap: `${gap}px`,
			columnGap: `${gap}px`,
			flexWrap: 'wrap',
			margin: '0px',
		},
		hourItem: {
			margin: '0px',
			boxSizing: 'border-box',
			width: `calc((100% - ${itemsDesktop - 1} * ${gap}px) / ${itemsDesktop})`,
			[breakpoints.down(MOBILE)]: {
				width: `calc((100% - ${itemsMobile - 1} * ${gap}px) / ${itemsMobile})`,
			},
			[breakpoints.down(MOBILE_XS)]: {
				width: `calc((100% - ${itemsMobileXS - 1} * ${gap}px) / ${itemsMobileXS})`,
			},
		},
		divButton: {
			paddingTop: '16px',
		},
		continueButton: {
			fontSize: '15px',
			textTransform: 'unset',
			fontWeight: 'bold',
			[breakpoints.up('lg')]: {
				fontSize: '13px',
				lineHeight: '18px',
				padding: '11.5px 0',
			},
		},
	}),
);

export default useStyles;

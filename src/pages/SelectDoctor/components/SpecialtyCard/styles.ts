import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { MAX_XS_MOBILE, MIN_MOBILE } from '../ModalSpecialties/styles';

const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			borderRadius: '8px',
			padding: '15px 7px',
			width: '148px',
			minWidth: '148px',
			maxHeight: '126px',
			cursor: 'pointer',
			marginLeft: '8px',
			marginRight: '8px',
			marginBottom: '16px',
			[breakpoints.down('xs')]: {
				minWidth: 'none',
			},
			[breakpoints.down(MIN_MOBILE)]: {
				flex: 1,
				minWidth: 'unset',
				margin: '0px 0px 16px',
			},
			[breakpoints.down(MAX_XS_MOBILE)]: {
				flex: 1,
				minWidth: 'unset',
				margin: '0px 7.5px 16px',
			},
		},
		active: {
			border: '2px solid #1ECD96',
		},
		inactive: {
			border: '2px solid #F0F2FA',
		},
		title: {
			textAlign: 'center',
			fontFamily: 'Mulish, sans-serif',
			fontSize: '14px',
			lineHeight: '20px',
			color: '#676F8F',
			marginTop: '7px',
			marginBottom: '7px',
		},
		imgDiv: {
			textAlign: 'center',
		},
		img: {
			width: '48px',
			height: '48px',
		},
		cost: {
			fontFamily: 'Mulish, sans-serif',
			fontWeight: 'bold',
			fontStyle: 'normal',
			fontSize: '14px',
			lineHeight: '16px',
			textAlign: 'center',
			color: '#51D8AE',
			marginTop: '4px',
		},
	}),
);

export default useStyles;

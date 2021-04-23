import React from 'react';
import { Theme } from '@material-ui/core';

import { stylesWithTheme } from 'utils';
import TimeOption from './TimeOption';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		position: 'relative',
		[breakpoints.up('lg')]: {
			width: '656px',
			marginRight: '10px', // 7px of margin right from buttons + 12px from container width space + 10px to all sum up 29px
		},
	},
	times: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '18px',
		[breakpoints.up('lg')]: {
			marginBottom: '0',
		},
	},
	dateButtonWrapper: {
		width: '98px',
		marginRight: '7px',
		marginBottom: '11px',
		'&:nth-child(3n)': {
			marginRight: '0',
			[breakpoints.up('lg')]: {
				marginRight: '7px',
			},
		},
		[breakpoints.up('lg')]: {
			width: '46px',
			'&:nth-last-child(-n + 6)': {
				marginBottom: '0',
			},
		},
	},
	dateButton: {
		textTransform: 'lowercase',
		fontSize: '14px',
		lineHeight: '15px',
		padding: '7.5px 0',
		[breakpoints.up('lg')]: {
			marginRight: '7px',
			minWidth: 'auto',
			fontSize: '13px',
			lineHeight: '18px',
			padding: '11.5px 8px',
		},
	},
	timesOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		cursor: 'pointer',
	},
}));

const AvailableTimes = () => {
	const classes = useStyles();
	const sweetArray = [
		'12:30',
		'11:30',
		'01:30',
		'02:30',
		'03:30',
		'10:30',
		'14:30',
		'15:30',
		'16:30',
		'17:30',
		'18:30',
		'19:30',
	];
	return (
		<div className={classes.container}>
			<div className={classes.timesOverlay} />
			<div className={classes.times}>
				{sweetArray.map((hours) => (
					<TimeOption value={hours} key={`${hours}`} />
				))}
			</div>
		</div>
	);
};

export default AvailableTimes;

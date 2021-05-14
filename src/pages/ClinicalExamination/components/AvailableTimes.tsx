import React from 'react';
import { Theme } from '@material-ui/core';

import { stylesWithTheme } from 'utils';
import TimeOption from './TimeOption';
import { AvailableTime, Laboratory } from 'types';

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
}));

interface AvailableTimePickerProps {
	availableTimes: AvailableTime[];
	onChoose: (value: AvailableTime) => void;
	selectedLaboratory: Laboratory | undefined;
}

const AvailableTimePicker = (props: AvailableTimePickerProps) => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.times}>
				{props.availableTimes.map((time, index) => (
					<TimeOption
						key={index}
						value={time}
						onClick={props.onChoose}
						disabled={props.selectedLaboratory ? props.selectedLaboratory.selected_time?.id !== time.id : false}
					/>
				))}
			</div>
		</div>
	);
};

export default AvailableTimePicker;

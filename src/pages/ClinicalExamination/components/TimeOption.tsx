import React from 'react';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core';
import { stylesWithTheme } from 'utils';

interface StylesProps {
	active: boolean;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
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
			'&:nth-last-child(-n + 4)': {
				marginBottom: '0',
			},
		},
	},
	dateButton: {
		textTransform: 'lowercase',
		fontSize: '14px',
		lineHeight: '15px',
		padding: '12.5px 0',
		boxShadow: (props: StylesProps) => (props.active ? '0px 4px 4px rgba(83, 91, 108, 0.28)' : 'none'),
		[breakpoints.up('lg')]: {
			marginRight: '7px',
			minWidth: 'auto',
			fontSize: '13px',
			lineHeight: '18px',
			padding: '11.5px 8px',
		},
	},
}));

interface TimeOptionProps {
	value: string;
	key: string;
}

const TimeOption = ({ value, key }: TimeOptionProps) => {
	const active = true;
	const classes = useStyles({ active });

	return (
		<div className={classes.dateButtonWrapper}>
			<Button className={classes.dateButton} variant="contained" fullWidth>
				{value}
			</Button>
		</div>
	);
};

export default TimeOption;

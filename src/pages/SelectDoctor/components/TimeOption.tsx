import React from 'react';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core';
import { formatApiDate, stylesWithTheme } from 'utils';

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
	date: Date;
	onClick: () => void;
	disabled: boolean;
	active?: boolean;
	format?: string;
}

const TimeOption = ({ date, onClick, disabled, format, active = false }: TimeOptionProps) => {
	const classes = useStyles({ active });

	return (
		<div className={classes.dateButtonWrapper}>
			<Button className={classes.dateButton} variant="contained" onClick={onClick} disabled={disabled} fullWidth>
				{formatApiDate(date, format)}
			</Button>
		</div>
	);
};

export default TimeOption;

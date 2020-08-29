import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DesktopDatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ParsableDate } from '@material-ui/pickers/src/constants/prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/src/typings/date';
import isToday from 'date-fns/isToday';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';

const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
	createStyles({
		datePicker: {
			'& .MuiInputBase-root': {
				cursor: 'pointer',
			},
			'& .MuiInputBase-input': {
				cursor: 'pointer',
				userSelect: 'none',
				padding: '14.8px 14px',
				paddingRight: 0,
				[breakpoints.up('lg')]: {
					padding: '15.1px 14px',
					paddingRight: 0,
				},
			},
		},
		calendarIcon: {
			stroke: palette.primary.main,
		},
	}),
);

interface DatePickerInputProps {
	views?: ('date' | 'year' | 'month')[];
	open?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	mask?: string;
	inputFormat?: string;
	value: ParsableDate;
	minDate: Date | null;
	onChange: (date: MaterialUiPickersDate, keyboardInputValue: string | undefined) => void;
	format?: string;
	InputProps?: { onClick?: () => void };
}

const DatePickerInput = ({ InputProps, value, format, minDate, ...props }: DatePickerInputProps) => {
	const classes = useStyles();
	const today = value && isToday(value as number | Date);
	const defaultFormat = `${today ? "'Hoy '" : ''}EEEE dd 'de' MMMM`;

	return (
		<DesktopDatePicker
			autoOk
			disablePast
			readOnly
			minDate={minDate}
			displayStaticWrapperAs="desktop"
			renderInput={(props) => (
				<TextField
					{...props}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<CalendarIcon className={classes.calendarIcon} />
							</InputAdornment>
						),
					}}
					{...InputProps}
					className={classes.datePicker}
					helperText=""
					variant="outlined"
					fullWidth
				/>
			)}
			{...props}
			mask={undefined}
			inputFormat={format || defaultFormat}
			value={value}
		/>
	);
};

export default DatePickerInput;

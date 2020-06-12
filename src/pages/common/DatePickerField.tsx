import React, { useState, useCallback } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { FieldProps, getIn } from 'formik';
import { DesktopDatePicker, BaseDatePickerProps } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Theme } from '@material-ui/core';

import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	iconButton: {
		padding: '12px',
		marginRight: '-15px',
		[breakpoints.up('lg')]: {
			marginRight: '-5px',
		},
	},
	calendarIcon: {
		stroke: palette.info.main,
	},
}));

interface DatePickerFieldProps extends FieldProps, BaseDatePickerProps {
	TextFieldProps: TextFieldProps;
}

const DatePickerField = ({
	field,
	form: { errors, touched, setFieldValue, setFieldTouched },
	maxDate = new Date('2100-01-01'),
	minDate = new Date('1900-01-01'),
	...other
}: DatePickerFieldProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const fieldError = getIn(errors, field.name);
	const showError = getIn(touched, field.name) && !!fieldError;
	const classes = useStyles();
	const onChange = useCallback(
		(date: Date | null) => {
			setFieldValue(field.name, date, true);
		},
		[field.name, setFieldValue],
	);
	const openDialog = useCallback(() => {
		setIsOpen(true);
	}, []);
	const closeDialog = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<DesktopDatePicker
			autoOk
			displayStaticWrapperAs="desktop"
			minDate={minDate}
			maxDate={maxDate}
			value={field.value}
			onChange={onChange}
			open={isOpen}
			onOpen={openDialog}
			onClose={closeDialog}
			renderInput={({ ref, ...props }) => {
				return (
					<TextField
						name={field.name}
						{...props}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={openDialog} className={classes.iconButton}>
										<CalendarIcon className={classes.calendarIcon} />
									</IconButton>
								</InputAdornment>
							),
						}}
						inputRef={ref}
						error={Boolean(showError)}
						helperText={showError ? fieldError : props.helperText}
						onBlur={(e) => {
							if (props.onBlur) {
								props.onBlur(e);
							}

							setFieldTouched(field.name, true, true);
						}}
					/>
				);
			}}
			{...other}
		/>
	);
};

export default DatePickerField;

import React, { useState, MouseEvent } from 'react';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { FieldProps, getIn } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import { ReactComponent as Visibility } from 'icons/eye_on.svg';
import { ReactComponent as VisibilityOff } from 'icons/eye_off.svg';

interface PasswordField extends FieldProps, Omit<TextFieldProps, 'name' | 'value' | 'error'> {}

const useStyles = stylesWithTheme(({ palette }: Theme) => ({
	icon: {
		'& > path': {
			stroke: palette.info.main,
		},
	},
}));

const PasswordField = ({
	field,
	form: { isSubmitting, errors, touched },
	disabled,
	children,
	...props
}: PasswordField) => {
	const [showPassword, setShowPassword] = useState(false);
	const classes = useStyles();
	const fieldError = getIn(errors, field.name);
	const showError = getIn(touched, field.name) && !!fieldError;
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleOnMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};

	return (
		<MuiTextField
			{...props}
			{...field}
			error={showError}
			helperText={showError ? fieldError : props.helperText}
			disabled={disabled ?? isSubmitting}
			variant={props.variant || 'outlined'}
			type={showPassword ? 'text' : 'password'}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={toggleShowPassword} onMouseDown={handleOnMouseDown}>
							{showPassword ? <Visibility className={classes.icon} /> : <VisibilityOff className={classes.icon} />}
						</IconButton>
					</InputAdornment>
				),
			}}
		>
			{children}
		</MuiTextField>
	);
};

export default PasswordField;

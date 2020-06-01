import React, { ElementType } from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FieldProps, getIn } from 'formik';

import { stylesWithTheme } from 'utils';

const useGroupStyles = stylesWithTheme(() => ({
	group: {
		display: 'flex',
	},
}));

type ButtonPropsForContext = Omit<ButtonProps, 'name' | 'onChange' | 'onBlur' | 'value'>;
type ButtonsForComponent = Omit<ButtonProps, 'form' | 'field'>;
type FieldPropsForContext = Pick<FieldProps['field'], 'name' | 'onBlur'>;

interface OptionsGroupProps extends ButtonsForComponent, FieldProps {
	children: ElementType;
}

interface OptionsContextProps extends Partial<ButtonPropsForContext>, FieldPropsForContext {
	onChange: (currentValue: boolean) => void;
	formValue: boolean | null;
}

// eslint-disable-next-line
// @ts-ignore
export const OptionsContext = React.createContext<OptionsContextProps>({});

export const OptionsGroup = ({
	form: { errors, touched, setFieldValue },
	field: { name, onBlur, value },
	children,
	...props
}: OptionsGroupProps) => {
	const classes = useGroupStyles();
	const fieldError = getIn(errors, name);
	const showError = getIn(touched, name) && !!fieldError;
	const onChange = (value: boolean) => {
		setFieldValue(name, value, true);
	};
	const contextValue = {
		...props,
		formValue: value,
		name,
		onChange,
		onBlur,
	};

	return (
		<OptionsContext.Provider value={contextValue}>
			<div>
				<div className={classes.group}>{children}</div>
				{showError ? (
					<FormHelperText error={showError} variant="outlined">
						{fieldError}
					</FormHelperText>
				) : null}
			</div>
		</OptionsContext.Provider>
	);
};

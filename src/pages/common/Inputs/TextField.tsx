import React, { useCallback } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';

const TextField = (props: TextFieldProps) => {
	const {
		form: { setFieldValue },
		field: { name },
	} = props;
	const onChange = useCallback(
		(event) => {
			const { value } = event.target;

			setFieldValue(name, value);
		},
		[setFieldValue, name],
	);
	return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
};

export default TextField;

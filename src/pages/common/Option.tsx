import React, { useContext, useRef, useCallback, useMemo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';

import { OptionsContext } from './OptionsGroup';

const useOptionStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	optionWrapper: {
		// maxWidth: '96px',
		width: '100%',
		marginRight: '10px',
		'&:last-child': {
			marginRight: 0,
		},
		[breakpoints.up('lg')]: {
			// maxWidth: '169px',
		},
	},
	active: {},
	optionButton: {},
	optionInput: {
		display: 'none',
	},
}));

interface OptionProps extends Omit<ButtonProps, 'value'> {
	value: string | boolean | number;
	wrapperClassName?: string;
	classes?: Record<string, any>;
}

const mergeClasses = (optionClasses: Record<string, any>, customClasses: Record<string, any>) => {
	const copyOptionClasses = { ...optionClasses };

	Object.keys(customClasses).forEach((key: string) => {
		copyOptionClasses[key] = customClasses[key];
	});

	return copyOptionClasses;
};

const Option = ({ children, value, classes, wrapperClassName, ...props }: OptionProps) => {
	const { name, onChange, onBlur, formValue, ...buttonProps } = useContext(OptionsContext);
	const defaultClasses = useOptionStyles();
	const optionClasses = classes ? mergeClasses(defaultClasses, classes) : defaultClasses;
	const inputRef = useRef(null);
	const onClick = useCallback(() => {
		// eslint-disable-next-line
		// @ts-ignore
		inputRef.current.click();
	}, []);
	const checked = formValue === value;
	const inputOnChange = useCallback(() => {
		onChange(value);
	}, [onChange, value]);
	const blurCallback = useMemo(() => onBlur, [onBlur]);
	const variant = props.variant || (checked ? 'contained' : 'outlined');

	return (
		<div className={clsx(optionClasses.optionWrapper, wrapperClassName)}>
			<Button
				{...props}
				className={clsx(optionClasses.optionButton, { [optionClasses.active]: checked }, props.className)}
				onClick={onClick}
				onBlur={blurCallback}
				name={name}
				variant={variant}
				{...buttonProps}
			>
				{children}
			</Button>
			<input
				checked={checked}
				ref={inputRef}
				name={name}
				value={String(value)}
				className={optionClasses.optionInput}
				onChange={inputOnChange}
				type="radio"
			/>
		</div>
	);
};

export default Option;

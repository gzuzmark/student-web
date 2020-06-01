import React, { useContext, useRef, ChangeEvent, useCallback, useMemo } from 'react';
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
	optionButton: {
		textTransform: 'none',
		padding: '12.5px',
		'&.MuiButton-contained': {
			padding: '13.5px',
			[breakpoints.up('lg')]: {
				padding: '17.5px',
			},
		},
		[breakpoints.up('lg')]: {
			padding: '16.5px',
		},
	},
	optionInput: {
		display: 'none',
	},
}));

interface OptionProps extends Omit<ButtonProps, 'value'> {
	value: string | boolean | number;
}

const Option = ({ children, value, ...props }: OptionProps) => {
	const { name, onChange, onBlur, formValue, ...buttonProps } = useContext(OptionsContext);
	const classes = useOptionStyles();
	const inputRef = useRef(null);
	const onClick = useCallback(() => {
		// eslint-disable-next-line
		// @ts-ignore
		inputRef.current.click();
	}, []);
	const checked = formValue === value;
	const inputOnChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;

			onChange(value === 'true');
		},
		[onChange],
	);
	const blurCallback = useMemo(() => onBlur, [onBlur]);

	return (
		<div className={classes.optionWrapper}>
			<Button
				className={clsx(classes.optionButton, props.className)}
				onClick={onClick}
				onBlur={blurCallback}
				name={name}
				variant={checked ? 'contained' : 'outlined'}
				{...buttonProps}
			>
				{children}
			</Button>
			<input
				checked={checked}
				ref={inputRef}
				name={name}
				value={String(value)}
				className={classes.optionInput}
				onChange={inputOnChange}
				type="radio"
			/>
		</div>
	);
};

export default Option;

import React from 'react';
import MuiStepLabel, { StepLabelProps as MuiStepLabelProps } from '@material-ui/core/StepLabel';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

interface StylesProps {
	active: boolean;
	isEmpty: boolean;
}

const useStyles = makeStyles(({ breakpoints, palette }: Theme) =>
	createStyles({
		root: {
			[breakpoints.up('lg')]: {
				flexDirection: 'row-reverse',
			},
		},
		iconContainer: {
			[breakpoints.up('lg')]: {
				padding: 0,
			},
		},
		labelContainer: {
			height: (props: StylesProps) => (props.isEmpty ? '1px' : 'auto'),
		},
		label: {
			color: palette.action.disabled,
			fontSize: '12px',
			lineHeight: '15px',
			letterSpacing: '0.2px',
			fontStyle: 'normal',
			[breakpoints.up('lg')]: {
				fontSize: '15px',
				lineHeight: '20px',
			},
		},
		vertical: {
			[breakpoints.up('lg')]: {
				marginRight: (props: StylesProps) => (props.active ? 0 : '7.5px'),
			},
		},
		active: {
			'&&': {
				color: palette.primary.main,
			},
		},
	}),
);

interface StepLabelProps extends MuiStepLabelProps {
	isEmpty: boolean;
}

const StepLabel = ({ children, isEmpty, ...props }: StepLabelProps) => {
	// eslint-disable-next-line
	// @ts-ignore
	const classes = useStyles({ active: props.active, isEmpty });

	return (
		<MuiStepLabel classes={classes} {...props}>
			{children}
		</MuiStepLabel>
	);
};

export default StepLabel;

import React from 'react';
import MuiStepLabel, { StepLabelProps as MuiStepLabelProps } from '@material-ui/core/StepLabel';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, palette }: Theme) =>
	createStyles({
		root: {
			[breakpoints.up('md')]: {
				flexDirection: 'row-reverse',
			},
		},
		iconContainer: {
			[breakpoints.up('md')]: {
				padding: 0,
			},
		},
		label: {
			color: palette.action.disabled,
			fontSize: '12px',
			lineHeight: '15px',
			letterSpacing: '0.2px',
			fontStyle: 'normal',
			[breakpoints.up('md')]: {
				fontSize: '15px',
				lineHeight: '20px',
			},
		},
		vertical: {
			[breakpoints.up('md')]: {
				marginRight: (props: { active: boolean }) => (props.active ? 0 : '7.5px'),
			},
		},
		active: {
			'&&': {
				color: palette.primary.main,
			},
		},
	}),
);

const StepLabel = ({ children, ...props }: MuiStepLabelProps) => {
	// eslint-disable-next-line
	// @ts-ignore
	const classes = useStyles({ active: props.active });

	return (
		<MuiStepLabel classes={classes} {...props}>
			{children}
		</MuiStepLabel>
	);
};

export default StepLabel;

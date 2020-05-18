import React from 'react';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
	createStyles({
		root: {
			background: 'transparent',
			borderColor: palette.action.disabled,
			color: palette.action.disabled,
			borderRadius: '50%',
			borderStyle: 'solid',
			borderWidth: '2px',
			height: '34px',
			position: 'relative',
			width: '34px',
			'& $icon': {
				top: '3px',
				left: '10.5px',
			},
		},
		firstChild: {
			'& $icon': {
				top: '3px',
				left: '13px',
			},
		},
		isNotFirstChild: {
			'&& $icon': {
				[breakpoints.up('md')]: {
					top: '11px',
					left: '18px',
				},
			},
		},
		active: {
			borderColor: palette.primary.main,
			color: palette.primary.main,
			'& $icon': {
				[breakpoints.up('md')]: {
					top: '11px',
					left: '20px',
				},
			},
			[breakpoints.up('md')]: {
				height: '49px',
				width: '49px',
			},
		},
		icon: {
			fontSize: '24px',
			lineHeight: '28px',
			letterSpacing: '0.2px',
			position: 'absolute',
		},
	}),
);

const StepIcon = ({ active, icon }: StepIconProps) => {
	const isFirstChild = icon === 1;
	const classes = useStyles();

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.firstChild]: isFirstChild,
				[classes.isNotFirstChild]: !isFirstChild && active,
			})}
		>
			<div className={classes.icon}>{icon}</div>
		</div>
	);
};

export default StepIcon;

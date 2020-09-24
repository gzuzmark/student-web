import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BACKGROUND_DEFAULT } from 'theme';
import clsx from 'clsx';
import circleImg from 'icons/circle.png';

interface LayoutProps {
	children: ReactNode;
	className?: string;
	width?: number | string;
	hideCircle?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			[theme.breakpoints.up('lg')]: {
				flexDirection: 'row',
			},
		},
		leftLayout: {
			position: 'relative',
			overflow: 'hidden',
			[theme.breakpoints.up('lg')]: {
				width: 411,
				paddingLeft: 104,
				flexShrink: 0,
			},
		},
		rightLayout: {
			backgroundColor: BACKGROUND_DEFAULT,
			flex: '1 1 auto',
			minHeight: 'calc(100vh - 50px)',
			[theme.breakpoints.up('lg')]: {
				paddingLeft: 109,
				minHeight: 'calc(100vh - 80px)',
			},
		},
		circle: {
			display: 'none',
			position: 'absolute',
			top: '448px',
			left: '0',
			[theme.breakpoints.up('lg')]: {
				display: 'block',
			},
		},
	}),
);

export const Container = ({ children, className }: LayoutProps) => {
	const classes = useStyles();

	return <section className={clsx(classes.container, className)}>{children}</section>;
};

export const LeftLayout = ({ children, className, hideCircle }: LayoutProps) => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.leftLayout, className)}>
			{children}
			{hideCircle ? null : <img src={circleImg} className={classes.circle} alt="Brand circle" />}
		</div>
	);
};

export const RightLayout = ({ children, className }: LayoutProps) => {
	const classes = useStyles();

	return <div className={clsx(classes.rightLayout, className)}>{children}</div>;
};

import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BACKGROUND_DEFAULT } from 'theme';
import clsx from 'clsx';
import circleImg from 'icons/circle.png';

interface LayoutProps {
	children: ReactNode;
	className?: string;
	width?: number | string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			[theme.breakpoints.up('md')]: {
				flexDirection: 'row',
			},
		},
		leftLayout: {
			[theme.breakpoints.up('md')]: {
				width: 411,
				paddingLeft: 104,
			},
		},
		rightLayout: {
			backgroundColor: BACKGROUND_DEFAULT,
			flex: '1 1 auto',
			minHeight: 'calc(100vh - 80px)',
			[theme.breakpoints.up('md')]: {
				paddingLeft: 109,
			},
		},
		circle: {
			display: 'none',
			position: 'absolute',
			top: '528px',
			left: '0',
			[theme.breakpoints.up('md')]: {
				display: 'block',
			},
		},
	}),
);

export const Container = ({ children }: LayoutProps) => {
	const classes = useStyles();

	return <section className={classes.container}>{children}</section>;
};

export const LeftLayout = ({ children, className }: LayoutProps) => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.leftLayout, className)}>
			{children}
			<img src={circleImg} className={classes.circle} alt="Brand circle" />
		</div>
	);
};

export const RightLayout = ({ children, className }: LayoutProps) => {
	const classes = useStyles();

	return <div className={clsx(classes.rightLayout, className)}>{children}</div>;
};

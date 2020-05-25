import React from 'react';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';

interface CircleProps {
	top?: number | string;
	right?: number | string;
	bottom?: number | string;
	left?: number | string;
	radius: number | string;
	className?: string;
}

const useStyles = stylesWithTheme(({ palette }: Theme) => ({
	circle: {
		position: 'absolute',
		top: (props: CircleProps) => `${props.top}px`,
		bottom: (props: CircleProps) => `${props.bottom}px`,
		left: (props: CircleProps) => `${props.left}px`,
		right: (props: CircleProps) => `${props.right}px`,
		width: (props: CircleProps) => `${props.radius}px`,
		height: (props: CircleProps) => `${props.radius}px`,
		border: `100px solid ${palette.primary.light}`,
		borderRadius: '50%',
	},
}));

const Circle = ({ className, ...props }: CircleProps) => {
	const classes = useStyles(props);

	return <div className={clsx(classes.circle, className)} />;
};

export default Circle;

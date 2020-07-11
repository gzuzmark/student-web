import React, { ReactNode } from 'react';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';

interface StyleProps {
	height?: string | number;
	width?: string | number;
}

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	wrapper: {
		[breakpoints.up('lg')]: {
			position: 'relative',
			zIndex: '0',
		},
	},
	content: {
		[breakpoints.up('lg')]: {
			backgroundColor: 'white',
			width: ({ width }: StyleProps) => `${width || 856}px`,
			height: ({ height }: StyleProps) => `${height || 580}px`,
		},
	},
	backRectangle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			backgroundColor: palette.primary.main,
			width: ({ width }: StyleProps) => `${width || 856}px`,
			height: ({ height }: StyleProps) => `calc(${height || 580}px - 10px)`,
			position: 'absolute',
			top: '19px',
			left: '9px',
			zIndex: '-1',
		},
	},
}));

interface FloatCardProps {
	children: ReactNode;
	className?: string;
	height?: string | number;
	width?: string | number;
}

const FloatCard = ({ children, width, height, className }: FloatCardProps) => {
	const classes = useStyles({ width, height });

	return (
		<div className={clsx(classes.wrapper, className)}>
			<div className={classes.content}>{children}</div>
			<div className={classes.backRectangle} />
		</div>
	);
};

export default FloatCard;

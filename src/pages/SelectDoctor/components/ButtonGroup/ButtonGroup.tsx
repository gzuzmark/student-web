import React from 'react';
import useStyles from './styles';

export const ButtonGroup = ({ children }: any) => {
	const classes = useStyles();
	return <div className={classes.root}>{children}</div>;
};

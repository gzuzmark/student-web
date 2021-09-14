import { Typography } from '@material-ui/core';
import IconBack from 'icons/left2.svg';
import React from 'react';
import { useHistory } from 'react-router';
import useStyles from './useStyles';

const GoBack = () => {
	const classes = useStyles();
	const history = useHistory();

	const onClickBack = () => {
		history.goBack();
	};

	return (
		<div className={classes.container} onClick={onClickBack}>
			<img alt="" src={IconBack} height={20} />
			<Typography className={classes.text}>Regresar</Typography>
		</div>
	);
};

export default GoBack;

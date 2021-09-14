import React from 'react';
import useStyles from './useStyles';
import IconBack from 'icons/left2.svg';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

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

import React from 'react';
import useStyles from './style';

const FilterDateDoctor = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.titleDiv}>Elige tu cita</div>
		</div>
	);
};

export default FilterDateDoctor;

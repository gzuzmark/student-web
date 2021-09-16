import React from 'react';
import useStyles from './style';

const RadioButtonFilter = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.radioItem}>
				<input className={classes.itemRadio} type="radio" id="radioDate" name="inputRadio" />
				<label className={classes.labelItem} htmlFor="radioDate">
					Por Fecha
				</label>
			</div>

			<div className={classes.radioItem}>
				<input className={classes.itemRadio} type="radio" id="radioDoctor" name="inputRadio" />
				<label className={classes.labelItem} htmlFor="radioDoctor">
					Por Doctor
				</label>
			</div>
		</div>
	);
};

export default RadioButtonFilter;

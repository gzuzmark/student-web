import React from 'react';
import { FilterType } from '../FilterDateDoctor/FilterDateDoctor';
import useStyles from './style';

export interface RadioButtonFilterProps {
	value: FilterType;
	onChangeFilter: (value: FilterType) => void;
}

const RadioButtonFilter = ({ value, onChangeFilter }: RadioButtonFilterProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.radioItem} onClick={() => onChangeFilter('date')}>
				<input className={classes.itemRadio} type="radio" id="radioDate" name="inputRadio" checked={value === 'date'} />
				<label className={classes.labelItem} htmlFor="radioDate">
					Por Fecha
				</label>
			</div>

			<div className={classes.radioItem} onClick={() => onChangeFilter('doctor')}>
				<input
					className={classes.itemRadio}
					type="radio"
					id="radioDoctor"
					name="inputRadio"
					checked={value === 'doctor'}
				/>
				<label className={classes.labelItem} htmlFor="radioDoctor">
					Por Doctor
				</label>
			</div>
		</div>
	);
};

export default RadioButtonFilter;

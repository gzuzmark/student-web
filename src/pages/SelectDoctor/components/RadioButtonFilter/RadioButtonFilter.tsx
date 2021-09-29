import React from 'react';
import { FilterType } from '../FilterDateDoctor/FilterDateDoctor';
import useStyles from './style';
import { ReactComponent as RadioButton } from 'icons/radioButton.svg';
import { ReactComponent as RadioButtonActive } from 'icons/radioButtonActive.svg';

export interface RadioButtonFilterProps {
	value: FilterType;
	onChangeFilter: (value: FilterType) => void;
}

const RadioButtonFilter = ({ value, onChangeFilter }: RadioButtonFilterProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.radioItem} onClick={() => onChangeFilter('date')}>
				{value === 'date' ? (
					<RadioButtonActive className={classes.itemRadio} />
				) : (
					<RadioButton className={classes.itemRadio} />
				)}
				<label className={value === 'date' ? classes.labelItemActive : classes.labelItem} htmlFor="radioDate">
					Por Fecha
				</label>
			</div>

			<div className={classes.radioItem} onClick={() => onChangeFilter('doctor')}>
				{value === 'doctor' ? (
					<RadioButtonActive className={classes.itemRadio} />
				) : (
					<RadioButton className={classes.itemRadio} />
				)}
				<label className={value === 'doctor' ? classes.labelItemActive : classes.labelItem} htmlFor="radioDoctor">
					Por Médico
				</label>
			</div>
		</div>
	);
};

export default RadioButtonFilter;

import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import RadioButtonFilter from '../RadioButtonFilter/RadioButtonFilter';
import TabsFilter from '../TabsFilter/TabsFilter';
import useStyles from './style';

export interface FilterDateDoctorProps {
	value: FilterType;
	onChangeFilter: (type: FilterType) => void;
}

export type FilterType = 'date' | 'doctor';

const FilterDateDoctor = ({ value, onChangeFilter }: FilterDateDoctorProps) => {
	const classes = useStyles();

	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<div className={classes.container}>
			<div className={classes.titleDiv}>Elige tu cita</div>
			{isDesktop ? (
				<RadioButtonFilter value={value} onChangeFilter={onChangeFilter} />
			) : (
				<TabsFilter value={value} onChangeFilter={onChangeFilter} />
			)}
		</div>
	);
};

export default FilterDateDoctor;

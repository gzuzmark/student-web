import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import RadioButtonFilter from '../RadioButtonFilter/RadioButtonFilter';
import TabsFilter from '../TabsFilter/TabsFilter';
import useStyles from './style';

const FilterDateDoctor = () => {
	const classes = useStyles();

	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<div className={classes.container}>
			<div className={classes.titleDiv}>Elige tu cita</div>
			{isDesktop ? <RadioButtonFilter /> : <TabsFilter />}
		</div>
	);
};

export default FilterDateDoctor;

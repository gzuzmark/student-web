import React from 'react';
import useStyles from './style';
import { Tabs, Tab, Box } from '@material-ui/core';
import { FilterType } from '../FilterDateDoctor/FilterDateDoctor';
export interface TabsFilterProps {
	value: FilterType;
	onChangeFilter: (value: FilterType) => void;
}

const TabsFilter = ({ value, onChangeFilter }: TabsFilterProps) => {
	const classes = useStyles();

	const handleTabs = (e: React.ChangeEvent<{}>, val: React.SetStateAction<number>) => {
		const typeValue = Number(val);
		onChangeFilter(typeValue === 0 ? 'date' : 'doctor');
	};

	return (
		<div className={classes.container}>
			<Box css={{ width: '100%' }}>
				<Tabs value={value === 'date' ? 0 : 1} onChange={handleTabs} indicatorColor={'primary'} className={classes.tab}>
					<Tab label="Por Fechas" classes={{ selected: classes.selectedTab }} id="1"></Tab>
					<Tab label="Por Médicos" classes={{ selected: classes.selectedTab }} id="2"></Tab>
				</Tabs>
			</Box>
		</div>
	);
};

export default TabsFilter;

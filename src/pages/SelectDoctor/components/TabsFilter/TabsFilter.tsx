import React from 'react';
import useStyles from './style';
import { Tabs, Tab, Box } from '@material-ui/core';
import { Simulate } from 'react-dom/test-utils';

const TabsFilter = () => {
	const [value, setValue] = React.useState(0);
	const classes = useStyles();
	const handleTabs = (e: any, val: React.SetStateAction<number>) => {
		console.log(val);
		setValue(val);
	};

	return (
		<div className={classes.container}>
			<Box css={{ width: '100%' }}>
				<Tabs value={value} onChange={handleTabs} indicatorColor={'primary'} className={classes.tab}>
					<Tab label="Por Fechas" classes={{ selected: classes.selectedTab }} id="1"></Tab>

					<Tab label="Por Médicos" classes={{ selected: classes.selectedTab }} id="2"></Tab>
				</Tabs>
			</Box>
		</div>
	);
};

export default TabsFilter;

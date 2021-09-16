import React from 'react';
import useStyles from './style';
import { Tabs, Tab, Box } from '@material-ui/core';

const TabsFilter = () => {
	const [value, setValue] = React.useState(0);
	const classes = useStyles();
	const handleTabs = (e: any, val: React.SetStateAction<number>) => {
		console.log(e);
		setValue(val);
	};

	return (
		<div className={classes.container}>
			<Box css={{ width: '100%' }}>
				<Tabs value={value} onChange={handleTabs}>
					<Tab label="Por Fechas"></Tab>
					<Tab label="Por Médicos"></Tab>
				</Tabs>
			</Box>
		</div>
	);
};

export default TabsFilter;

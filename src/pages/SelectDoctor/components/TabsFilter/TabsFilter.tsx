import React from 'react';
// import useStyles from './style';
import { Tabs, Tab, Box, makeStyles } from '@material-ui/core';
import { FilterType } from '../FilterDateDoctor/FilterDateDoctor';

export interface TabsFilterProps {
	value: FilterType;
	onChangeFilter: (value: FilterType) => void;
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		width: '100%',
		marginTop: '15px',
	},
	tab: {
		fontFamily: 'Mulish, sans-serif',

		'& .MuiTab-root': {
			textTransform: 'initial',
			width: '50%',
			maxWidth: '500px',
			fontSize: '16px',
			//backgroundColor: "orange"
		},
	},
	itemTab: {
		fontFamily: 'Mulish, sans-serif !important',
		color: '#A3ABCC',
	},
	titleDiv: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
	},
	'MuiBox-root': {
		width: '100%',
	},
	selectedTab: {
		color: '#1ECD96 !important',
		fontWeight: 'bold',
	},
	flexContainer: {
		borderBottom: '4px solid #F7F8FC',
	},
}));

const TabsFilter = ({ value, onChangeFilter }: TabsFilterProps) => {
	const classes = useStyles();

	const handleTabs = (e: React.ChangeEvent<{}>, val: React.SetStateAction<number>) => {
		const typeValue = Number(val);
		onChangeFilter(typeValue === 0 ? 'date' : 'doctor');
	};

	return (
		<div className={classes.container}>
			<Box css={{ width: '100%' }}>
				<Tabs
					value={value === 'date' ? 0 : 1}
					onChange={handleTabs}
					indicatorColor={'primary'}
					className={classes.tab}
					classes={{ flexContainer: classes.flexContainer }}
				>
					<Tab label="Por fechas" classes={{ selected: classes.selectedTab }} id="1" className={classes.itemTab}></Tab>
					<Tab
						label="Por especialistas"
						classes={{ selected: classes.selectedTab }}
						id="2"
						className={classes.itemTab}
					></Tab>
				</Tabs>
			</Box>
		</div>
	);
};

export default TabsFilter;

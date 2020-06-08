import React from 'react';
import { Container } from 'pages/common';

import RightSide from './components/RightSide';
import LeftSide from './components/LeftSide';
import { usePageTitle } from 'utils';

const AppointmentList = () => {
	usePageTitle('Citas');

	return (
		<Container>
			<LeftSide />
			<RightSide />
		</Container>
	);
};

export default AppointmentList;

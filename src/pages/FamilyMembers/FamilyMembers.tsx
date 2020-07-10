import React from 'react';

import { Container } from 'pages/common';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const FamilyMembers = () => {
	return (
		<Container>
			<LeftSide />
			<RightSide />
		</Container>
	);
};

export default FamilyMembers;

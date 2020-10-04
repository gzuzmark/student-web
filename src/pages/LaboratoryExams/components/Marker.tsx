import React, { ReactElement } from 'react';
import { ReactComponent as MarkerIcon } from 'icons/marker.svg';
import { ReactComponent as ActiveMarkerIcon } from 'icons/active_marker.svg';
import { ReactComponent as UserMarker } from 'icons/user_marker.svg';

interface MarkerProps {
	isActive?: boolean;
	isUser?: boolean;
}

const Marker = ({ isActive = false, isUser = false }: MarkerProps): ReactElement | null => {
	if (isUser) {
		return <UserMarker />;
	}

	return isActive ? <ActiveMarkerIcon /> : <MarkerIcon />;
};

export default Marker;

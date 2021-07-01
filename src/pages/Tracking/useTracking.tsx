import {
	createTrackingAccessLog,
	getTrackingLocalStorage,
	setTrackingLocalStorage,
	TrackingLocalStorage,
} from 'pages/api/tracking';
import { parse } from 'query-string';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useTracking = () => {
	const location = useLocation();
	const params = parse(location.search);
	const sessionId = (params.sessionId as string) || '';
	const [tracking, setTracking] = useState<TrackingLocalStorage | null>(null);

	const createAccessLog = useCallback(async () => {
		if (sessionId != null) {
			const trackingId = await createTrackingAccessLog({
				session_id: sessionId,
				doctor_id: null,
				patient_id: null,
				type_user: null,
			});
			if (trackingId != null) {
				const trackingData: TrackingLocalStorage = {
					sesssionId: sessionId,
					trackingId: trackingId,
				};
				setTrackingLocalStorage(trackingData);
				setTracking(trackingData);
			}
		}
	}, [sessionId]);

	useEffect(() => {
		if (sessionId !== null && sessionId !== '') {
			const tracking = getTrackingLocalStorage();
			if (tracking == null) {
				createAccessLog();
			} else {
				if (tracking.sesssionId === sessionId) {
					setTracking(tracking);
				}
			}
		}
	}, [createAccessLog, sessionId]);

	return tracking;
};

export default useTracking;

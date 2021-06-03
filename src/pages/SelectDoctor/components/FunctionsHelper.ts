import moment from 'moment';
import { Schedule } from 'pages/api';
import { ONE_HOUR_IN_SECONDS } from 'utils/constants';

const SCHEDULE_NOT_FOUND = 'La cita seleccionada no existe';
const SCHEDULE_NOT_AVAILABLE = 'La cita ya no se encuentra disponible debido al horario.';
const SCHEDULE_ONE_HOUR_ERROR =
	'Recuerde que para realizar la cita médica, esta debe de ser al menos con una hora de anticipación...';

const validSelectTimeWithNow = (schedule: Schedule | null | undefined, error?: boolean): void => {
	if (schedule === null || schedule === undefined) {
		throw new Error(SCHEDULE_NOT_FOUND);
	}
	if (error) {
		throw new Error(SCHEDULE_ONE_HOUR_ERROR);
	}
	// test: new Date(2021, 4, 28, 18, 30, 0) in moment now time
	const nowTime: number = moment().unix();
	const startTime: number = moment(schedule.startTime).unix();
	const diff = startTime - nowTime;
	if (diff < 0) {
		throw new Error(SCHEDULE_NOT_AVAILABLE);
	}
	if (diff < ONE_HOUR_IN_SECONDS) {
		throw new Error(SCHEDULE_ONE_HOUR_ERROR);
	}
};

export { validSelectTimeWithNow };

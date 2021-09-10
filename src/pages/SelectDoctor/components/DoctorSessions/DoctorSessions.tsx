import Button from '@material-ui/core/Button';
import { DoctorAvailability } from 'pages/api';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AvailableTimes from '../AvailableTimes';
import { DoctorHeader } from '../DoctorHeader';
import { ActiveDoctorTime } from '../DoctorList/DoctorList';
import useStyles from '../DoctorList/styles';

interface DoctorSessionsProps {
	doctor: DoctorAvailability;
	doctorIndex: number;
	activeDoctorTime: ActiveDoctorTime;
	selectDoctor: (doctorCmp: string, doctorIndex: number) => (scheduleID: string, scheduleIndex: number) => void;
	selectDoctorForModal: (index: number) => void;
	openDetailedDoctorModal: () => void;
	continueToPreRegister: () => void;
}

const DoctorSessions = ({
	doctor,
	doctorIndex,
	activeDoctorTime,
	selectDoctor,
	// selectDoctorForModal,
	// openDetailedDoctorModal,
	continueToPreRegister,
}: DoctorSessionsProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const { name, cmp, schedules } = doctor;

	return (
		<div className={classes.doctorWrapper}>
			<DoctorHeader doctor={doctor} />
			<div className={classes.timesWrapper}>
				<AvailableTimes
					doctorCmp={cmp}
					availableDates={schedules}
					mode={'extended'}
					name={name}
					selectTime={selectDoctor(cmp, doctorIndex)}
					activeDoctorTime={activeDoctorTime}
				/>
			</div>
			<div>
				{activeDoctorTime.doctorCmp === cmp ? (
					<Button fullWidth className={classes.continueButton} variant="contained" onClick={continueToPreRegister}>
						{t('left.button.seleccionar')}
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default DoctorSessions;

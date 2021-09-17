import Button from '@material-ui/core/Button';
import { DoctorAvailability } from 'pages/api';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AvailableTimes from '../AvailableTimes';
import { DoctorHeader } from '../DoctorHeader';
import { ActiveDoctorTime } from '../DoctorList/DoctorList';
import useStyles from '../DoctorList/styles';
import clsx from 'clsx';

interface DoctorSessionsProps {
	className?: string;
	doctor: DoctorAvailability;
	doctorIndex: number;
	activeDoctorTime: ActiveDoctorTime;
	selectDoctor: (doctorId: string, doctorIndex: number) => (scheduleID: string, scheduleIndex: number) => void;
	selectDoctorForModal: (index: number) => void;
	openDetailedDoctorModal: () => void;
	continueToPreRegister: () => void;
	onSeeMore: () => void;
}

const DoctorSessions = ({
	className,
	doctor,
	doctorIndex,
	activeDoctorTime,
	selectDoctor,
	continueToPreRegister,
	onSeeMore,
}: DoctorSessionsProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const { id, schedules } = doctor;

	return (
		<div className={clsx(classes.doctorWrapper, className)}>
			<DoctorHeader doctor={doctor} />
			<div className={classes.timesWrapper}>
				<AvailableTimes
					doctorId={id}
					availableDates={schedules}
					mode={'short'}
					selectTime={selectDoctor(id, doctorIndex)}
					activeDoctorTime={activeDoctorTime}
					onSeeMore={onSeeMore}
				/>
			</div>
			<div className={classes.divButtonContinue}>
				{activeDoctorTime.doctorID === id ? (
					<Button fullWidth className={classes.continueButton} variant="contained" onClick={continueToPreRegister}>
						{t('left.button.seleccionar')}
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default DoctorSessions;

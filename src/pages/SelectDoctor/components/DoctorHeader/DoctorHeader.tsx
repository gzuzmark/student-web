import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import { DoctorAvailability } from 'pages/api';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DetailedDoctorModal from '../DoctorList/DetailedDoctorModal';
import useStyles from './styles';

interface DoctorHeaderProps {
	className?: string | undefined;
	doctor: DoctorAvailability;
}

const DoctorHeader = ({ doctor, className }: DoctorHeaderProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const { name, lastName, profilePicture, rating, patientOpinions } = doctor;
	const [isDetailDoctorModalOpen, setIsDetailDoctorModalOpen] = useState<boolean>(false);

	return (
		<div className={clsx(classes.doctor, className)}>
			<div className={classes.photoWrapper}>
				<img className={classes.photo} src={profilePicture} alt="doctor" />
			</div>
			<div className={classes.info}>
				<div className={classes.nameWrapper}>
					<Typography component="span" className={clsx(classes.name, 'no-caps')}>
						{t('right.doctor.prefix')}{' '}
					</Typography>
					<Typography component="span" className={classes.name}>
						{name} {lastName}
					</Typography>
				</div>
				<div className={classes.doctorInfoWrapper}>
					<div>
						<Button className={classes.doctorMoreInfo} onClick={() => setIsDetailDoctorModalOpen(true)}>
							{t('right.doctor.moreInformation')}
						</Button>
					</div>
					{patientOpinions.length >= 1 && (
						<div className={classes.ratingWrapper}>
							<Rating className={classes.doctorRating} value={rating} precision={0.5} readOnly size={'small'} />
							<Typography className={classes.ratingNumber}>({patientOpinions.length})</Typography>
						</div>
					)}
				</div>
			</div>
			{isDetailDoctorModalOpen && (
				<DetailedDoctorModal
					isOpen={isDetailDoctorModalOpen}
					doctor={doctor}
					closeModal={() => setIsDetailDoctorModalOpen(false)}
				/>
			)}
		</div>
	);
};

export default DoctorHeader;

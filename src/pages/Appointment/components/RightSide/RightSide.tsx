import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { RightLayout } from 'pages/common';
import { AppointDetail, INCOMING, PREVIOUS } from 'pages/api';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as ClockIcon } from 'icons/clock.svg';
import { ReactComponent as MoneyIcon } from 'icons/money.svg';
import { capitalizeDate } from 'utils';

import Treatment from '../Treatment';
import Recomendations from '../Recomendations';
import useStyles from './styles';

interface RightSideProps {
	appointment: AppointDetail;
}

const RightSide = ({
	appointment: {
		appointmentType,
		date,
		time,
		channel,
		disease,
		doctor,
		paidAmount,
		patient,
		medicines,
		recomendations,
	},
}: RightSideProps) => {
	const classes = useStyles({ appointmentType });
	const { t } = useTranslation('appointmentDetail');

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<div className={classes.titleWrapper}>
					<Typography component="span" variant="h1">
						{t(`appointmentDetail.mobile.title.${appointmentType}.firstLine`)}{' '}
					</Typography>
					<Typography className={classes.titleBold} component="span" variant="h1">
						{t(`appointmentDetail.mobile.title.${appointmentType}.secondLine`)}
					</Typography>
				</div>
				<Card className={classes.card}>
					<div className={classes.cardTitleWrapper}>
						<div className={classes.cardTitle}>
							<Typography component="span">{channel} </Typography>
							<Typography className={classes.desktopCardTitle} component="span">
								{t('appointmentDetail.for')}{' '}
							</Typography>
							<Typography className={classes.desktopCardTitle} component="span">
								{disease}
							</Typography>
						</div>
						{appointmentType === PREVIOUS ? (
							<div className={classes.finishedLabel}>
								<Typography>{t('appointmentDetail.finished.label')}</Typography>
							</div>
						) : null}
					</div>
					<div className={classes.doctorWrapper}>
						<div className={classes.doctorPictureWrapper}>
							<img className={classes.doctorPicture} src={doctor.profilePicture} alt="doctor profile" />
						</div>
						<div className={classes.doctorInfoWrapper}>
							<Typography className={classes.doctorName}>{doctor.name}</Typography>
							<Typography>{doctor.speciality}</Typography>
							<Typography>
								{t('appointmentDetail.doctor.cmp')} {doctor.cmp}
							</Typography>
						</div>
					</div>
					<div className={classes.detailContainer}>
						<div className={classes.whenWrapper}>
							<div className={classes.whenTitleWrapper}>
								<Typography className={classes.whenTitle}>{t('appointmentDetail.when.title')}</Typography>
							</div>
							<div className={classes.detailWrapper}>
								<div className={classes.iconWrapper}>
									<CalendarIcon className={classes.calendarIcon} />
								</div>
								<Typography>{capitalizeDate(date)}</Typography>
							</div>
							<div className={classes.detailWrapper}>
								<div className={classes.iconWrapper}>
									<ClockIcon className={classes.clockIcon} />
								</div>
								<Typography>{time}</Typography>
							</div>
							<div className={classes.detailWrapper}>
								<div className={clsx(classes.iconWrapper, 'moneyWrapper')}>
									<MoneyIcon className={classes.moneyIcon} />
								</div>
								<Typography>S/ {paidAmount}</Typography>
							</div>
						</div>
						<div className={classes.patientWrapper}>
							<div className={classes.patientTitleWrapper}>
								<Typography className={classes.patientTitle}>{t('appointmentDetail.patient.title')}</Typography>
							</div>
							<div className={classes.patientNameWrapper}>
								<Typography>{patient}</Typography>
							</div>
						</div>
					</div>
				</Card>
				{appointmentType === PREVIOUS ? (
					<>
						<Treatment medicines={medicines} />
						<Recomendations recomendations={recomendations} />
					</>
				) : null}
				{appointmentType === INCOMING ? (
					<>
						<Typography className={classes.cancelAppointment}>
							{t('appointmentDetail.detail.cancelAppointment')}
						</Typography>
						<div className={classes.divider} />
						<Typography className={classes.treatmentMessage}>
							{t('appointmentDetail.detail.treatmentMessage')}
						</Typography>
					</>
				) : null}
			</div>
		</RightLayout>
	);
};

export default RightSide;

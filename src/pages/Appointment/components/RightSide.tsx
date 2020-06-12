import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { RightLayout } from 'pages/common';
import { AppointDetail, INCOMING, PREVIOUS } from 'pages/api';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as ClockIcon } from 'icons/clock.svg';
import { ReactComponent as MoneyIcon } from 'icons/money.svg';
import { stylesWithTheme, capitalizeDate } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		padding: '25px 26px 0px',
		[breakpoints.up('lg')]: {
			padding: '61px 0 0 0',
			width: '772px',
		},
	},
	titleWrapper: {
		paddingBottom: '35px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	titleBold: {
		fontWeight: 'bold',
	},
	card: {
		padding: '20px 20px 28px 26px',
		marginBottom: '11px',
		'&:hover': {
			boxShadow: 'none',
		},
		[breakpoints.up('lg')]: {
			padding: '59px 26px 70px 104px',
			marginBottom: '20px',
			marginRight: '35px',
		},
	},
	cardTitleWrapper: {
		paddingBottom: '21px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		[breakpoints.up('lg')]: {
			paddingBottom: '28px',
		},
	},
	cardTitle: {
		'& > span': {
			'&:first-child': {
				textTransform: 'capitalize',
			},
			fontSize: '15px',
			[breakpoints.up('lg')]: {
				fontSize: '18px',
			},
		},
	},
	finishedLabel: {
		backgroundColor: palette.primary.light,
		padding: '5px',
		[breakpoints.up('lg')]: {
			marginRight: '50px',
		},
	},
	desktopCardTitle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'inline',
		},
	},
	doctorWrapper: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '33px',
	},
	doctorPictureWrapper: {
		paddingRight: '31px',
		[breakpoints.up('lg')]: {
			paddingRight: '19px',
		},
	},
	doctorPicture: {
		width: '46px',
		height: '42px',
		borderRadius: '51%',
		[breakpoints.up('lg')]: {
			width: '86px',
			height: '80px',
		},
	},
	doctorInfoWrapper: {
		'& > div': {
			paddingBottom: '3px',
		},
	},
	detailWrapper: {
		display: 'flex',
		paddingBottom: '16px',
		alignItems: 'center',
		'&:last-child': {
			paddingBottom: '0px',
		},
	},
	doctorName: {
		fontSize: '15px',
	},
	detailContainer: {
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	whenWrapper: {
		[breakpoints.up('lg')]: {
			paddingRight: '64px',
		},
	},
	whenTitleWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			paddingBottom: '17px',
			display: 'block',
		},
	},
	whenTitle: {
		color: 'rgba(83, 91, 108, 0.5)',
	},
	patientWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	patientTitleWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			paddingBottom: '17px',
			display: 'block',
		},
	},
	patientTitle: {
		color: 'rgba(83, 91, 108, 0.5)',
	},
	patientNameWrapper: {
		[breakpoints.up('lg')]: {
			alignItems: 'center',
			display: 'flex',
			height: '29px',
		},
	},
	iconWrapper: {
		marginRight: '12px',
		[breakpoints.up('lg')]: {
			marginRight: '16px',
		},
		'&.moneyWrapper': {
			marginRight: '9px',
			[breakpoints.up('lg')]: {
				marginRight: '14px',
			},
		},
	},
	calendarIcon: {
		width: '15px',
		height: '15px',
		stroke: palette.info.main,
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
		},
	},
	clockIcon: {
		width: '15px',
		height: '15px',
		[breakpoints.up('lg')]: {
			width: '25px',
			height: '25px',
		},
	},
	moneyIcon: {
		width: '18px',
		height: '15px',
		[breakpoints.up('lg')]: {
			width: '26px',
			height: '22px',
		},
	},
	cancelAppointment: {
		color: palette.info.main,
		textAlign: 'center',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			paddingBottom: '17px',
		},
	},
	divider: {
		height: '0px',
		borderBottom: `1px solid ${palette.info.main}`,
		marginBottom: '31px',
		[breakpoints.up('lg')]: {
			marginBottom: '29px',
		},
	},
	treatmentMessage: {
		color: palette.info.main,
		textAlign: 'center',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			maxWidth: '390px',
			margin: '0 auto',
		},
	},
}));

interface RightSideProps {
	appointment: AppointDetail;
}

const RightSide = ({
	appointment: { appointmentType, date, time, channel, disease, doctor, paidAmount, patient },
}: RightSideProps) => {
	const classes = useStyles();
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

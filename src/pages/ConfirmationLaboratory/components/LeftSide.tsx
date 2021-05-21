import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';

import { LeftLayout } from 'pages/common';
import { User } from 'AppContext';
import { useTranslation } from 'react-i18next';
import { formatUTCDate, stylesWithTheme } from 'utils';
import { Laboratorys, Schedules } from 'pages/api/laboratories';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		'&&': {
			[breakpoints.up('lg')]: {
				paddingLeft: '97px',
				width: '512px',
			},
		},
	},
	wrapper: {
		padding: '31px 0 40px 26px',
		[breakpoints.up('lg')]: {
			padding: '114px 40px 0 0',
		},
	},
	prefix: {
		paddingBottom: '8px',
		[breakpoints.up('lg')]: {
			paddingBottom: '15px',
		},
	},
	title: {
		'& > div': {
			fontSize: '30px',
			lineHeight: '40px',
			fontWeight: 'bold',
		},
		'& > div > span': {
			fontSize: '30px',
			lineHeight: '40px',
			fontWeight: 'bold',
		},
		paddingBottom: '32px',
		[breakpoints.up('lg')]: {
			paddingBottom: '26px',
		},
	},
	patientSection: {
		paddingBottom: '24px',
		[breakpoints.up('lg')]: {
			paddingBottom: '31px',
		},
	},
	patientTitle: {
		opacity: 0.5,
		paddingBottom: '6px',
		[breakpoints.up('lg')]: {
			paddingBottom: '3px',
		},
	},
	patienName: {
		textTransform: 'capitalize',
	},
	doctorTitle: {
		opacity: 0.5,
		paddingBottom: '4px',
		[breakpoints.up('lg')]: {
			paddingBottom: '14px',
		},
	},
	doctorWrapper: {
		display: 'flex',
	},
	doctorImgWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			marginRight: '32px',
		},
	},
	doctorImg: {
		borderRadius: '51%',
		width: '71px',
		height: '66px',
	},
	tipsWrapper: {
		padding: '20px 15px 35px 25px',
		[breakpoints.up('lg')]: {
			padding: '72px 50px 0 0',
		},
	},
}));

interface LeftSideProps {
	user: User | null | undefined;
	laboratorio: Laboratorys | null | undefined;
	schedule: Schedules | null | undefined;
	showExtraInfo: boolean;
	isGuest: boolean;
}

const LeftSide = ({ user, laboratorio, schedule, showExtraInfo, isGuest }: LeftSideProps) => {
	const { t } = useTranslation('confirmationLab');
	const classes = useStyles();

	return (
		<LeftLayout className={classes.container} hideCircle>
			<div className={classes.wrapper}>
				<Typography className={classes.prefix} variant="h3">
					{t('confirmation.left.prefix')}
				</Typography>
				<div className={classes.title}>
					<Typography variant="h1">{t('confirmation.left.title.firstSection')} </Typography>
					<div>
						<Typography component="span" variant="h1">
							{t('confirmation.left.title.secondSection')}{' '}
						</Typography>
						<Typography variant="h1" component="span" color="primary">
							{schedule?.start_time ? formatUTCDate(new Date(schedule?.start_time), "EEEE dd 'de' MMMM") : ''}{' '}
						</Typography>
					</div>
					<div>
						<Typography variant="h1" component="span">
							{t('confirmation.left.title.thirdSection')}{' '}
						</Typography>
						<Typography variant="h1" component="span" color="primary">
							{schedule?.start_time ? formatUTCDate(new Date(schedule?.start_time), 'h:mm aaa') : ''}
						</Typography>
					</div>
				</div>
				<div className={classes.patientSection}>
					<Typography className={classes.patientTitle}>{t('confirmation.left.patient.title')}</Typography>
					<Typography className={classes.patientName}>{user?.name + ' ' + user?.lastName}</Typography>
				</div>
				<div className={classes.doctorSection}>
					<Typography className={classes.doctorTitle}>{t('confirmation.left.doctor.title')}</Typography>
					<div className={classes.doctorWrapper}>
						<div className={classes.doctorImgWrapper}>
							<img className={classes.doctorImg} src={laboratorio?.logo} alt="doctor" />
						</div>
						<div>
							<div>
								<Typography className={classes.doctorName}>{laboratorio?.name}</Typography>
							</div>
							<div className={classes.doctorCMP}>
								<Typography component="span">RUC </Typography>
								<Typography component="span">{laboratorio?.ruc}</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;

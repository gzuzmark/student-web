import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';

import { Doctor, Schedule } from 'pages/api/selectDoctor';
import { LeftLayout } from 'pages/common';
import { SimpleUser } from 'AppContext';
import { useTranslation } from 'react-i18next';
import { formatUTCDate, stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		'&&': {
			[breakpoints.up('lg')]: {
				paddingLeft: '198px',
			},
		},
	},
	wrapper: {
		padding: '31px 0 40px 26px',
		[breakpoints.up('lg')]: {
			padding: '68px 40px 0 0',
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
}));

interface LeftSideProps {
	user: SimpleUser | null | undefined;
	doctor: Doctor | null | undefined;
	schedule: Schedule | null | undefined;
}

const LeftSide = ({ user, doctor, schedule }: LeftSideProps) => {
	const { t } = useTranslation('confirmation');
	const classes = useStyles();

	return (
		<LeftLayout className={classes.container}>
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
							{schedule?.startTime ? formatUTCDate(schedule?.startTime, "EEEE dd 'de' MMMM") : ''}{' '}
						</Typography>
					</div>
					<div>
						<Typography variant="h1" component="span">
							{t('confirmation.left.title.thirdSection')}{' '}
						</Typography>
						<Typography variant="h1" component="span" color="primary">
							{schedule?.startTime ? formatUTCDate(schedule?.startTime, 'h:mm aaa') : ''}
						</Typography>
					</div>
				</div>
				<div className={classes.patientSection}>
					<Typography className={classes.patientTitle}>{t('confirmation.left.patient.title')}</Typography>
					<Typography className={classes.patienName}>{user?.name}</Typography>
				</div>
				<div className={classes.doctorSection}>
					<Typography className={classes.doctorTitle}>{t('confirmation.left.doctor.title')}</Typography>
					<div className={classes.doctorWrapper}>
						<div className={classes.doctorImgWrapper}>
							<img className={classes.doctorImg} src={doctor?.profilePicture} alt="doctor" />
						</div>
						<div>
							<div>
								<Typography component="span">{doctor?.name} </Typography>
								<Typography component="span">{doctor?.lastName}</Typography>
							</div>
							<div className={classes.doctorCMP}>
								<Typography component="span">{t('confirmation.left.doctor.cmp')} </Typography>
								<Typography component="span">{doctor?.cmp}</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;

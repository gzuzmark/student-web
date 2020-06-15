import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';

import { LeftLayout } from 'pages/common';
import { Doctor, Schedule } from 'pages/api';
import { stylesWithTheme, formatUTCDate } from 'utils';
import { SimpleUser } from 'AppContext';
import { useTranslation } from 'react-i18next';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '18px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '65px 80px 0 0',
		},
	},
	prefix: {
		paddingBottom: '6px',
	},
	title: {
		fontWeight: 'bold',
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: '36px',
		},
	},
	infoWrapper: {
		display: 'flex',
		flexDirection: 'column',
	},
	appointmentSection: {
		order: '3',
		paddingBottom: '15px',
		[breakpoints.up('lg')]: {
			order: '1',
			paddingBottom: '46px',
		},
	},
	appointmentInfo: {
		display: 'flex',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	separator: {
		padding: '0 5px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	appointmentChannel: {
		display: 'none',
		textTransform: 'capitalize',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	patientSection: {
		order: '1',
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			order: '2',
			paddingBottom: '31px',
		},
	},
	patientName: {
		textTransform: 'capitalize',
	},
	doctorSection: {
		order: '2',
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			order: '3',
			paddingBottom: '0px',
		},
	},
	infoTitle: {
		opacity: 0.5,
		paddingBottom: '2px',
		[breakpoints.up('lg')]: {
			paddingBottom: '10px',
		},
	},
	doctorWrapper: {
		alignItems: 'center',
		display: 'flex',
	},
	doctorImgWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingRight: '32px',
		},
	},
	doctorImg: {
		borderRadius: '51%',
		width: '71px',
		height: '66px',
	},
	doctorName: {
		textTransform: 'capitalize',
	},
}));

interface LeftSideProps {
	doctor: Doctor | null | undefined;
	user: SimpleUser | null | undefined;
	schedule: Schedule | null | undefined;
	channel: string | undefined;
}

const LeftSide = ({ doctor, user, schedule, channel }: LeftSideProps) => {
	const classes = useStyles();
	const { t } = useTranslation('payment');

	return (
		<LeftLayout>
			<div className={classes.wrapper}>
				<Typography className={classes.prefix} variant="h3">
					{t('payment.left.prefix')}
				</Typography>
				<Typography className={classes.title} variant="h1">
					{t('payment.left.title')}
				</Typography>
				<div className={classes.infoWrapper}>
					<div className={classes.appointmentSection}>
						<Typography className={classes.infoTitle}>{t('payment.left.appointmentTitle')}</Typography>
						<div className={classes.appointmentInfo}>
							<Typography>
								{schedule?.startTime
									? capitalize(formatUTCDate(schedule?.startTime, "EEEE dd 'de' MMMM 'del' yyyy"))
									: ''}
							</Typography>
							<Typography className={classes.separator}> - </Typography>
							<Typography>{schedule?.startTime ? formatUTCDate(schedule?.startTime, 'h:mm aaa') : ''}</Typography>
							<Typography className={classes.appointmentChannel}>{channel}</Typography>
						</div>
					</div>
					<div className={classes.patientSection}>
						<Typography className={classes.infoTitle}>{t('payment.left.pacientTitle')}</Typography>
						<Typography className={classes.patientName}>{user?.name}</Typography>
					</div>
					<div className={classes.doctorSection}>
						<Typography className={classes.infoTitle}>{t('payment.left.doctorTitle')}</Typography>
						<div className={classes.doctorWrapper}>
							<div className={classes.doctorImgWrapper}>
								<img src={doctor?.profilePicture} alt="doctor" />
							</div>
							<div>
								<Typography className={classes.doctorName}>{doctor?.name}</Typography>
								<div>
									<Typography component="span">{t('payment.left.cmp')} </Typography>
									<Typography component="span">{doctor?.cmp}</Typography>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LeftLayout>
	);
};

export default LeftSide;

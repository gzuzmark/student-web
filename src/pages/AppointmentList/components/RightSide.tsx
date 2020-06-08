import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { RightLayout } from 'pages/common';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import AppContext from 'AppContext';
import { stylesWithTheme } from 'utils';
import { getAppointmentList, AppointDetail } from 'pages/api/appointments';

import AppointmentsTab from './AppointmentsTab';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	rightWrapper: {
		[breakpoints.up('lg')]: {
			paddingTop: '76px',
			width: '711px',
		},
	},
	mobileTitleWrapper: {
		padding: '25px 0 15px 26px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	mobileTitle: {
		paddingBottom: '9px',
		'& > .bold': {
			fontWeight: 'bold',
		},
	},
	mobileSubtitle: {
		fontSize: '15px',
	},
	tabsContainer: {
		minHeight: 'auto',
	},
	tabsIndicator: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		height: '1px',
		'& > span': {
			backgroundColor: palette.primary.main,
			width: '100%',
			maxWidth: '118px',
			[breakpoints.up('lg')]: {
				maxWidth: '150px',
			},
		},
		[breakpoints.up('lg')]: {
			justifyContent: 'flex-start',
			marginLeft: '6px',
		},
	},
	tab: {
		padding: '10px 0',
		minHeight: 'auto',
		fontWeight: 500,
		opacity: 0.2,
		'&.Mui-selected': {
			opacity: 1,
		},
		[breakpoints.up('lg')]: {
			'&:last-child': {
				paddingLeft: '34px',
			},
			'& .MuiTab-wrapper': {
				alignItems: 'flex-start',
			},
		},
	},
}));

const requestSmallAppointments = async (
	setAppointments: Function,
	closed: number,
	userID: string,
	userToken: string | null | undefined,
) => {
	if (userToken) {
		const appointments = await getAppointmentList({ user_id: userID, closed });

		if (appointments) {
			setAppointments(appointments);
		}
	}
};

const RightSide = () => {
	const { t } = useTranslation('appointmentList');
	const { user: currentUser, userToken } = useContext(AppContext);
	const [selectedTab, setSelectedTab] = useState<number>(0);
	const [oldAppointments, setOldAppointments] = useState<AppointDetail[]>([]);
	const [appointments, setAppointments] = useState<AppointDetail[]>([]);
	const classes = useStyles();
	const handleChange = (_: ChangeEvent<{}>, newValue: number) => {
		setSelectedTab(newValue);
	};

	useEffect(() => {
		if (currentUser) {
			requestSmallAppointments(setAppointments, 0, currentUser.id, userToken);
			requestSmallAppointments(setOldAppointments, 1, currentUser.id, userToken);
		}
	}, [currentUser, userToken]);

	return (
		<RightLayout>
			<div className={classes.rightWrapper}>
				<div className={classes.mobileTitleWrapper}>
					<div className={classes.mobileTitle}>
						<Typography component="span" variant="h1">
							{t('appointments.title.mobile')}
						</Typography>
						<Typography component="span" className="bold" variant="h1">
							{currentUser && currentUser.name ? currentUser.name : ''}
						</Typography>
					</div>
					<Typography className={classes.mobileSubtitle}>{t('appointments.subTitle.mobile')}</Typography>
				</div>
				<Tabs
					className={classes.tabsContainer}
					value={selectedTab}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					TabIndicatorProps={{ children: <span />, className: classes.tabsIndicator }}
				>
					<Tab className={classes.tab} label={t('appointments.incoming')} id="new-appointments" disableRipple />
					<Tab className={classes.tab} label={t('appointments.previous')} id="old-appointments" disableRipple />
				</Tabs>
				{appointments ? (
					<>
						<AppointmentsTab appointments={appointments} isActive={selectedTab === 0} />
						<AppointmentsTab appointments={oldAppointments} isActive={selectedTab === 1} />
					</>
				) : null}
			</div>
		</RightLayout>
	);
};

export default RightSide;

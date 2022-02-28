import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppContext from 'AppContext';
import { stylesWithTheme, redirectToBaseAlivia } from 'utils';
import { getAppointmentList, AppointDetail } from 'pages/api/appointments';
import AppointmentsTab from './components/AppointmentsTab';
import LeftSide from './components/LeftSide';
import { Container } from 'pages/common';
import { RightLayout } from 'pages/common';
const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	'@global': {
		body: {
			fontFamily: 'Mulish',
		},
		'.MuiTypography-h1, .MuiTypography-body1': {
			fontFamily: 'Mulish',
		},
	},
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
	divider: {
		margin: '0 26px 20px 26px',
	},
	buttonWrapper: {
		maxWidth: '323px',
		margin: '0 auto',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	newAppointmentButton: {
		boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
		border: '1px solid white',
		fontSize: '15px',
		padding: '15px',
		textTransform: 'none',

		'&:hover': {
			border: '1px solid white',
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
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
		const appointments = await getAppointmentList({ user_id: userID, closed }, userToken);

		if (appointments) {
			setAppointments(appointments);
		}
	}
};

const AppointmentHistory = () => {
	const { t } = useTranslation('appointmentList');
	const { t: tDashboard } = useTranslation('dashboard');
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
		<Container>
			<LeftSide />
			<RightLayout>
				<div>
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
								<AppointmentsTab appointments={oldAppointments} isActive={selectedTab === 1} oldAppointments />
							</>
						) : null}
						<Divider className={classes.divider} variant="middle" />
						<div className={classes.buttonWrapper}>
							<Button
								variant="contained"
								className={classes.newAppointmentButton}
								onClick={redirectToBaseAlivia}
								fullWidth
							>
								{tDashboard('dashboard.newAppointment')}
							</Button>
						</div>
					</div>
				</div>
			</RightLayout>
		</Container>
	);
};

export default AppointmentHistory;

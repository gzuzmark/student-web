import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import AppContext from 'AppContext';
import { stylesWithTheme, redirectToBaseAlivia } from 'utils';
import { ReactComponent as Pill } from 'icons/pill.svg';
import { ReactComponent as Family } from 'icons/family.svg';
import { ReactComponent as Planner } from 'icons/planner.svg';
import { ReactComponent as TestIcon } from 'icons/testIcon.svg';

import DashboardCard from './DashboardCard';

const useStyles = stylesWithTheme(() => ({
	wrapper: {
		paddingTop: '51px',
	},
	prefix: {
		paddingBottom: '16px',
		textTransform: 'uppercase',
	},
	title: {
		padding: '0 120px 32px 0',
	},
	cards: {
		display: 'flex',
		flexWrap: 'wrap',
		paddingRight: '84px',
	},
	iconWrapper: {
		paddingBottom: '12.5px',

		'& > svg': {
			height: '45px',
		},
	},
	buttonWrapper: {
		maxWidth: '317px',
	},
	newAppointmentButton: {
		boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
		border: '1px solid white',
		fontSize: '15px',
		padding: '11.5px 15px',
		textTransform: 'none',

		'&:hover': {
			border: '1px solid white',
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
		},
	},
}));

const createButtonsData = (t: Function) => [
	{
		Icon: Planner,
		title: t('dashboard.appointments'),
		disabled: false,
		path: '/dashboard/citas',
	},
	{
		Icon: Pill,
		title: t('dashboard.treatments'),
		disabled: true,
		path: '/dashboard/tratamientos',
	},
	{
		Icon: TestIcon,
		title: t('dashboard.laboratoryTest'),
		disabled: false,
		path: '/dashboard/laboratorios',
	},
	{
		Icon: Family,
		title: t('dashboard.familyMembers'),
		disabled: false,
		path: '/dashboard/parientes',
	},
];

const DashboardSideBar = () => {
	const { t } = useTranslation('dashboard');
	const { user } = useContext(AppContext);
	const classes = useStyles();
	const buttonsData = createButtonsData(t);
	const goToAlivia = () => {
		redirectToBaseAlivia();
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.prefix} variant="h3">
				{t('dashboard.prefix')} <b>{user?.name}</b>
			</Typography>
			<Typography className={classes.title} variant="h1">
				<b>{t('dashboard.title')}</b>
			</Typography>
			<div className={classes.cards}>
				{buttonsData.map(({ Icon, title, disabled, path }) =>
					!disabled ? (
						<DashboardCard path={path} key={title}>
							<div className={classes.iconWrapper}>
								<Icon />
							</div>
							<Typography color="primary">{title}</Typography>
						</DashboardCard>
					) : null,
				)}
			</div>
			<div className={classes.buttonWrapper}>
				<Button variant="outlined" className={classes.newAppointmentButton} onClick={goToAlivia} fullWidth>
					{t('dashboard.newAppointment')}
				</Button>
			</div>
		</div>
	);
};

export default DashboardSideBar;

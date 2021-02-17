import React, { useCallback, useContext } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { stylesWithTheme, redirectToURL } from 'utils';
import { ReactComponent as Ellipse } from 'icons/ellipse.svg';
import AppContext from 'AppContext';
import useClasses from './styles';

const useLocalClasses = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	disclaimerWrapper: {
		paddingBottom: '38px',
		[breakpoints.up('lg')]: {
			paddingBottom: '35px',
		},
	},
	disclaimer: {
		textTransform: 'none',
	},
	privacyPoliciesWrapper: {
		paddingBottom: '24px',
		[breakpoints.up('lg')]: {
			paddingBottom: '39px',
			width: '418px',
		},
	},
	privacyPoliciesText: {
		fontSize: '13px',
		color: palette.info.main,
	},
	privacyPoliciesLink: {
		fontSize: '13px',
		cursor: 'pointer',
	},
	linkAccountBtnWrapper: {
		[breakpoints.up('lg')]: {
			maxWidth: '293px',
		},
	},
}));

interface LinkUderAgeAccountProps {
	activeUserName?: string;
	className?: string;
}

const LinkUnderAgeAccount = ({ activeUserName, className }: LinkUderAgeAccountProps) => {
	const classes = useClasses();
	const localClasses = useLocalClasses();
	const { t } = useTranslation('defaultDashboard');
	const history = useHistory();
	const { user: currentUser } = useContext(AppContext);

	const goToPrivacyPolicy = () => {
		redirectToURL('https://drive.google.com/open?id=1RjgoOp4wR2zCUtktj0d_PqhT9FC7TGyR', true);
	};
	const gotToTermsAndConditions = () => {
		redirectToURL('https://drive.google.com/open?id=12DfeCL1FGluiEmYcH_fo4uZBUu1k-LtV', true);
	};
	const linkAccount = useCallback(async () => {
		history.push('/dashboard/parientes');
	}, [history]);

	return (
		<div className={clsx(classes.formWrapper, className)}>
			<div className={classes.titleWrapper}>
				<div className={classes.title}>
					<Typography className={classes.titleText} component="span">
						{t('dashboard.default.title.firstPart', { loggedUserName: capitalize(currentUser?.name) })}
					</Typography>{' '}
					<Typography className={classes.titleText} component="span" color="primary">
						{t('dashboard.default.title.secondPart', { name: capitalize(activeUserName) })}
					</Typography>
				</div>
				<div className={classes.separator}></div>
			</div>
			<div className={localClasses.disclaimerWrapper}>
				<Typography className={localClasses.disclaimer} variant="button">
					{t('dashboard.default.underAge.disclaimer', { name: activeUserName })}
				</Typography>
			</div>
			<Typography className={classes.subTitle} variant="button">
				<b>{t('dashboard.default.subTitle')}</b>
			</Typography>
			<List className={classes.benefits}>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('dashboard.default.benefits.medicHistory')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('dashboard.default.benefits.appointments')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText
						className={classes.benefitText}
						primary={t('dashboard.default.benefits.easierNewAppointments')}
					/>
				</ListItem>
			</List>
			<div className={localClasses.privacyPoliciesWrapper}>
				<Typography className={localClasses.privacyPoliciesText} component="span">
					{t('dashboard.default.privacyPolicies.firstPart')}
				</Typography>{' '}
				<Typography
					className={localClasses.privacyPoliciesLink}
					color="primary"
					onClick={goToPrivacyPolicy}
					component="span"
				>
					{t('dashboard.default.privacyPolicies.secondPart')}
				</Typography>{' '}
				<Typography className={localClasses.privacyPoliciesText} component="span">
					{t('dashboard.default.privacyPolicies.thirdPart')}
				</Typography>{' '}
				<Typography
					className={localClasses.privacyPoliciesLink}
					color="primary"
					onClick={gotToTermsAndConditions}
					component="span"
				>
					{t('dashboard.default.privacyPolicies.fourthPart')}
				</Typography>
			</div>
			<div className={localClasses.linkAccountBtnWrapper}>
				<Button variant="contained" fullWidth onClick={linkAccount}>
					{t('dashboard.default.linkAccountLabel')}
				</Button>
			</div>
		</div>
	);
};

export default LinkUnderAgeAccount;

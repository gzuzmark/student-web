import React, { useCallback, useState } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';
import clsx from 'clsx';

import { stylesWithTheme, redirectToURL } from 'utils';
import { ReactComponent as Ellipse } from 'icons/ellipse.svg';

import useClasses from './styles';
import ConfirmationModal from './ConfirmationModal';

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
	loggedUserName?: string;
	activeUserName?: string;
	className?: string;
	linkAction: () => Promise<void>;
	closeModalAction: () => void;
}

const LinkUnderAgeAccount = ({
	loggedUserName,
	activeUserName,
	className,
	linkAction,
	closeModalAction,
}: LinkUderAgeAccountProps) => {
	const classes = useClasses();
	const localClasses = useLocalClasses();
	const { t } = useTranslation('confirmation');
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const closeConfirmationModal = () => {
		setIsConfirmationModalOpen(false);
		closeModalAction();
	};
	const goToPrivacyPolicy = () => {
		redirectToURL(
			'https://docs.google.com/document/d/e/2PACX-1vQf6HE_Cj14iMCA6By3PPapUWZbp4dhtoi5n1BlpL5Nk58v_1Cl66sHA6gKx3yP0w/pub',
			true,
		);
	};
	const gotToTermsAndConditions = () => {
		redirectToURL(
			'https://docs.google.com/document/u/2/d/e/2PACX-1vS3SBl2FrGqj_qWltyMkUOF1B3dNSHtvr7sbqGy6OJvuKQKGcIklLBvO4GIOev4YQ/pub',
			true,
		);
	};
	const linkAccount = useCallback(async () => {
		try {
			setIsSubmitting(true);
			await linkAction();
			setIsConfirmationModalOpen(true);
		} catch (e) {
			setIsSubmitting(false);
		}
	}, [linkAction]);

	return (
		<div className={clsx(classes.formWrapper, className)}>
			<div className={classes.titleWrapper}>
				<div className={classes.title}>
					<Typography className={classes.titleText} component="span">
						{t('confirmation.linkAccount.title.firstPart', { loggedUserName: capitalize(loggedUserName) })}
					</Typography>{' '}
					<Typography className={classes.titleText} component="span" color="primary">
						{t('confirmation.linkAccount.title.secondPart', { name: capitalize(activeUserName) })}
					</Typography>
				</div>
				<div className={classes.separator}></div>
			</div>
			<div className={localClasses.disclaimerWrapper}>
				<Typography className={localClasses.disclaimer} variant="button">
					{t('confirmation.linkAccount.underAge.disclaimer', { name: activeUserName })}
				</Typography>
			</div>
			<Typography className={classes.subTitle} variant="button">
				<b>{t('confirmation.linkAccount.subTitle')}</b>
			</Typography>
			<List className={classes.benefits}>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('confirmation.linkAccount.benefits.medicHistory')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('confirmation.linkAccount.benefits.appointments')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText
						className={classes.benefitText}
						primary={t('confirmation.linkAccount.benefits.easierNewAppointments')}
					/>
				</ListItem>
			</List>
			<div className={localClasses.privacyPoliciesWrapper}>
				<Typography className={localClasses.privacyPoliciesText} component="span">
					{t('confirmation.linkAccount.privacyPolicies.firstPart')}
				</Typography>{' '}
				<Typography
					className={localClasses.privacyPoliciesLink}
					color="primary"
					onClick={goToPrivacyPolicy}
					component="span"
				>
					{t('confirmation.linkAccount.privacyPolicies.secondPart')}
				</Typography>{' '}
				<Typography className={localClasses.privacyPoliciesText} component="span">
					{t('confirmation.linkAccount.privacyPolicies.thirdPart')}
				</Typography>{' '}
				<Typography
					className={localClasses.privacyPoliciesLink}
					color="primary"
					onClick={gotToTermsAndConditions}
					component="span"
				>
					{t('confirmation.linkAccount.privacyPolicies.fourthPart')}
				</Typography>
			</div>
			<div className={localClasses.linkAccountBtnWrapper}>
				<Button variant="contained" fullWidth onClick={linkAccount} disabled={isSubmitting}>
					{t('confirmation.linkAccount.linkAccountLabel')}
				</Button>
			</div>
			<ConfirmationModal
				activeUserName={activeUserName}
				isOpen={isConfirmationModalOpen}
				onClose={closeConfirmationModal}
			/>
		</div>
	);
};

export default LinkUnderAgeAccount;

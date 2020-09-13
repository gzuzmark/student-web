import React, { MouseEvent } from 'react';
import { Modal, Button, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { FloatCard } from 'pages/common';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	card: {
		left: '50%',
		position: 'relative',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		width: '327px',
		[breakpoints.up('lg')]: {
			width: '856px',
		},
	},
	wrapper: {
		textAlign: 'center',
		padding: '58px 30px 0',
		[breakpoints.up('lg')]: {
			padding: '75px 107px 0',
		},
	},
	title: {
		paddingBottom: '28px',
		[breakpoints.up('lg')]: {
			paddingBottom: '39px',
		},
	},
	actions: {
		[breakpoints.up('lg')]: {
			display: 'flex',
			justifyContent: 'space-between',
		},
	},
	action: {
		width: '180px',
		marginBottom: '25px',
		[breakpoints.up('lg')]: {
			width: '300px',
			marginBottom: '0',
		},
	},
}));

interface SelectAppointmentOwnerProps {
	isOpen: boolean;
	onClose: () => void;
	selectAppointmentForMe: (e: MouseEvent) => void;
	selectAppointmentForSomeoneElse: (e: MouseEvent) => void;
}

const SelectAppointmentOwner = ({
	isOpen,
	onClose,
	selectAppointmentForMe,
	selectAppointmentForSomeoneElse,
}: SelectAppointmentOwnerProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<Modal open={isOpen} onClose={onClose}>
			<FloatCard className={classes.card} height={matches ? 312 : 365} width={matches ? 856 : 327} mobile>
				<div className={classes.wrapper}>
					<Typography variant="h2" className={classes.title}>
						{t('selectAppointmentOwner.title')}
					</Typography>
					<div className={classes.actions}>
						<Button className={classes.action} variant="contained" onClick={selectAppointmentForMe}>
							<span>
								{t('selectAppointmentOwner.for')} <b>{t('selectAppointmentOwner.me')}</b>
							</span>
						</Button>
						<Button className={classes.action} variant="contained" onClick={selectAppointmentForSomeoneElse}>
							<span>
								{t('selectAppointmentOwner.for')} <b>{t('selectAppointmentOwner.someoneElse')}</b>
							</span>
						</Button>
					</div>
				</div>
			</FloatCard>
		</Modal>
	);
};

export default SelectAppointmentOwner;

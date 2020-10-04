import React from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { CreatePasswordForm } from 'pages/common';

import useClasses from './styles';

interface CreatePasswordProps {
	userId: string;
	updateContextState?: Function;
	goToAppointments: () => void;
}

const CreatePassword = ({ userId, goToAppointments, updateContextState }: CreatePasswordProps) => {
	const classes = useClasses();
	const { t } = useTranslation('confirmation');

	return (
		<div className={classes.formWrapper}>
			<div className={classes.titleWrapper}>
				<div className={classes.title}>
					<Typography className={clsx(classes.titleText, 'main')} component="span">
						{t('confirmation.createPassword.title.firstPart')}
					</Typography>{' '}
					<Typography className={classes.titleText} component="span">
						{t('confirmation.createPassword.title.secondPart')}
					</Typography>
				</div>
				<div className={classes.separator}></div>
			</div>
			<CreatePasswordForm
				userId={userId}
				redirectAfterSubmit={goToAppointments}
				updateContextState={updateContextState}
			/>
		</div>
	);
};

export default CreatePassword;

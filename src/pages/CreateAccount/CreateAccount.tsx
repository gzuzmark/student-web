import React, { useLayoutEffect, useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { parse } from 'query-string';

import { stylesWithTheme } from 'utils';
import { CreatePasswordForm } from 'pages/common';
import { getUserId } from 'pages/api';
import AppContext from 'AppContext';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	container: {
		padding: '30px 16px 0',
		[breakpoints.up('lg')]: {
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},
	titleWrapper: {
		paddingBottom: '25px',
		[breakpoints.up('lg')]: {
			paddingBottom: '26px',
		},
	},
	title: {
		[breakpoints.up('lg')]: {
			paddingBottom: '12px',
		},
	},
	separator: {
		[breakpoints.up('lg')]: {
			height: '0',
			width: '25px',
			borderBottom: `2px solid ${palette.info.main}`,
		},
	},
}));

const authenticateUser = async (id: string, push: Function) => {
	try {
		await getUserId(id);
	} catch (e) {
		push('/iniciar_sesion');
	}
};

const CreateAccount = () => {
	const classes = useStyles();
	const { updateState: updateContextState, userToken } = useContext(AppContext);
	const history = useHistory();
	const params = parse(history.location.search);
	const userId = params.patient as string;
	const { t } = useTranslation('createAccount');
	const omitThisStep = () => {
		history.push('/iniciar_sesion');
	};
	const redirectAfterSubmit = () => {
		history.push('/dashboard/citas');
	};

	if (!!userToken || !userId) {
		history.push('/iniciar_sesion');
	}

	useLayoutEffect(() => {
		authenticateUser(userId, history.push);
	}, [history.push, params, userId]);

	return (
		<div className={classes.container}>
			<div>
				<div className={classes.titleWrapper}>
					<Typography className={classes.title} variant="h2">
						{t('createAccount.title')}
					</Typography>
					<div className={classes.separator}></div>
				</div>
				<CreatePasswordForm
					redirectAfterSubmit={redirectAfterSubmit}
					updateContextState={updateContextState}
					userId={userId}
					omitStepCallback={omitThisStep}
				/>
			</div>
		</div>
	);
};

export default CreateAccount;

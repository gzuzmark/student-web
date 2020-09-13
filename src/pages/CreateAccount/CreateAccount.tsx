import React, { useState, useLayoutEffect, useContext } from 'react';
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

const authenticateUser = async ({ id, setUserId }: { id: string; setUserId: Function }, push: Function) => {
	try {
		const userId = await getUserId(id);

		if (userId) {
			setUserId(userId);
		} else {
			push('/iniciar_sesion');
		}
	} catch (e) {
		push('/iniciar_sesion');
	}
};

const CreateAccount = () => {
	const classes = useStyles();
	const { updateState: updateContextState } = useContext(AppContext);
	const [userId, setUserId] = useState<string>();
	const { t } = useTranslation('createAccount');
	const history = useHistory();
	const params = parse(history.location.search);
	const omitThisStep = () => {
		history.push('/iniciar_sesion');
	};

	useLayoutEffect(() => {
		authenticateUser({ id: params.patient as string, setUserId }, history.push);
	}, [history.push, params, setUserId]);

	return (
		<div className={classes.container}>
			<div>
				<div className={classes.titleWrapper}>
					<Typography className={classes.title} variant="h2">
						{t('createAccount.title')}
					</Typography>
					<div className={classes.separator}></div>
				</div>
				<CreatePasswordForm updateContextState={updateContextState} userId={userId} omitStepCallback={omitThisStep} />
			</div>
		</div>
	);
};

export default CreateAccount;

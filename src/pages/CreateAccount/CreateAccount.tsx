import React, { useState, useLayoutEffect } from 'react';
import { Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { parse } from 'query-string';

import { stylesWithTheme, redirectToBaseAlivia } from 'utils';
import { CreatePasswordForm } from 'pages/common';
import { getUserId } from 'pages/api';

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

const authenticateUser = async ({ id, setUserId }: { id: string; setUserId: Function }) => {
	try {
		const userId = await getUserId(id);

		if (userId) {
			setUserId(userId);
		} else {
			redirectToBaseAlivia();
		}
	} catch (e) {
		redirectToBaseAlivia();
	}
};

const CreateAccount = () => {
	const classes = useStyles();
	const [userId, setUserId] = useState<string>();
	const { t } = useTranslation('createAccount');
	const history = useHistory();
	const params = parse(history.location.search);
	const omitThisStep = () => {
		history.push('/iniciar_sesion');
	};

	useLayoutEffect(() => {
		authenticateUser({ id: params.id as string, setUserId });
	}, [params, setUserId]);

	return (
		<div className={classes.container}>
			<div>
				<div className={classes.titleWrapper}>
					<Typography className={classes.title} variant="h2">
						{t('createAccount.title')}
					</Typography>
					<div className={classes.separator}></div>
				</div>
				<CreatePasswordForm userId={userId} omitStepCallback={omitThisStep} />
			</div>
		</div>
	);
};

export default CreateAccount;

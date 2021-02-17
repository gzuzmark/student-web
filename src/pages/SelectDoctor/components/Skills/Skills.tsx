import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { Trans, useTranslation } from 'react-i18next';
import { DEV_IMAGES, PROD_IMAGES } from 'utils/skillImages';
import { RightLayout } from 'pages/common';

import useStyles from './styles';
import { Skill } from 'pages/api';
import DashboardCard from './SkillCard';

export const FAKE_SESSION_ID = 'fake';

interface RightSideProps {
	skills: Skill[] | null | undefined;
	isUserLoggedIn: boolean;
	numSessions: string;
}

const RightSide = () => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const skills = process.env.NODE_ENV === 'production' ? PROD_IMAGES : DEV_IMAGES;

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<div className={classes.titleContainer}>
					<Typography component="span" className={classes.title}>
						<Trans i18nKey={`selectDoctor:${'right.default.title'}`} />
					</Typography>
				</div>
				<div className={classes.cards}>
					{skills?.map((skill) => (
						<DashboardCard path={`/seleccionar_doctor?malestar=${skill.id}`} key={skill.id}>
							<div className={classes.iconWrapper}>
								<img className={classes.img} src={skill.image} alt={skill.label} />
							</div>
							<Typography color="primary">{skill.label}</Typography>
						</DashboardCard>
					))}
				</div>
			</div>
		</RightLayout>
	);
};

export default RightSide;

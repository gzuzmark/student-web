import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Trans } from 'react-i18next';
import { DEV_IMAGES, PROD_IMAGES } from 'utils/skillImages';
import { RightLayout } from 'pages/common';

import useStyles from './styles';
import DashboardCard from './SkillCard';

export const FAKE_SESSION_ID = 'fake';

const RightSide = () => {
	const classes = useStyles();
	const skills = (process.env.REACT_APP_BASE_URL || '').includes('api-dev') ? DEV_IMAGES : PROD_IMAGES;

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<div className={classes.titleContainer}>
					<Typography component="span" className={classes.title}>
						<Trans i18nKey={`selectDoctor:${'right.default.title'}`} />
					</Typography>
				</div>
				<div className={classes.cards}>
					{skills?.map((skill, i) => (
						<DashboardCard path={`/seleccionar_doctor?malestar=${skill.id}`} key={i}>
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

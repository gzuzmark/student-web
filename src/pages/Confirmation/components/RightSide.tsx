import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import capitalize from 'lodash/capitalize';

import { Schedule } from 'pages/api/selectDoctor';
import { RightLayout } from 'pages/common';
import { ReactComponent as SmileIcon } from 'icons/smile.svg';
import { formatUTCDate, stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		padding: '40px 26px 27px',
		[breakpoints.up('lg')]: {
			padding: '45px 0 49px 0',
			width: '410px',
		},
	},
	titleWrapper: {
		alignItems: 'center',
		display: 'flex',
		paddingBottom: '27px',
		[breakpoints.up('lg')]: {
			paddingBottom: '49px',
		},
	},
	iconWrapper: {
		marginRight: '16px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			marginRight: '14px',
		},
	},
	smileIcon: {
		width: '18px',
		height: '43px',
		[breakpoints.up('lg')]: {
			width: '24px',
			height: '46px',
		},
	},
	separator: {
		height: '0',
		width: '25px',
		borderBottom: `1px solid ${palette.info.main}`,
	},
	tipTitle: {
		color: palette.info.main,
		fontSize: '15px',
		lineHeight: '15px',
		paddingBottom: '6px',
	},
	beforeSection: {
		paddingBottom: '48px',
		[breakpoints.up('lg')]: {
			paddingBottom: '32px',
		},
	},
	duringSection: {
		paddingBottom: '48px',
	},
	afterSection: {
		[breakpoints.up('lg')]: {
			paddingBottom: '45px',
		},
	},
	goodbyeMessage: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
}));

interface RightSideProps {
	schedule: Schedule | null | undefined;
}

const RightSide = ({ schedule }: RightSideProps) => {
	const classes = useStyles();
	const { t } = useTranslation('confirmation');

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<div className={classes.titleWrapper}>
					<div className={classes.iconWrapper}>
						<SmileIcon className={classes.smileIcon} />
						<div className={classes.separator}></div>
					</div>
					<div>
						<Typography variant="h3">{t('confirmation.right.title')}</Typography>
					</div>
				</div>
				<div className={classes.beforeSection}>
					<Typography className={classes.tipTitle} variant="h3">
						{t('confirmation.right.before.title')}
					</Typography>
					<div>
						<Typography>{t('confirmation.right.before.message')} </Typography>
						<Typography color="primary">
							{schedule?.startTime
								? capitalize(formatUTCDate(schedule?.startTime, "EEEE dd 'de' MMMM 'a las' h:mm aaaa"))
								: ''}
						</Typography>
					</div>
				</div>
				<div className={classes.duringSection}>
					<Typography className={classes.tipTitle} variant="h3">
						{t('confirmation.right.during.title')}
					</Typography>
					<div>
						<Typography component="span">{t('confirmation.right.during.message')}</Typography>
					</div>
				</div>
				<div className={classes.afterSection}>
					<Typography className={classes.tipTitle} variant="h3">
						{t('confirmation.right.after.title')}
					</Typography>
					<div>
						<Typography component="span">{t('confirmation.right.after.message')}</Typography>
					</div>
				</div>
				<Typography className={classes.goodbyeMessage}>{t('confirmation.right.goodbye.message')}</Typography>
			</div>
		</RightLayout>
	);
};

export default RightSide;

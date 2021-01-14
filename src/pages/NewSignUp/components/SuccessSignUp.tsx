import React, { ReactElement } from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { ReactComponent as ThumbsUpIcon } from 'icons/good_quality.svg';
import { stylesWithTheme } from 'utils';
import { BACKGROUND_DEFAULT } from 'theme';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	'@global': {
		'.nav-container': {
			display: 'none !important',
		},
	},
	container: {
		minHeight: '100vh',
		[breakpoints.up('lg')]: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: BACKGROUND_DEFAULT,
			minHeight: '100vh',
		},
	},
	wrapper: {
		backgroundColor: 'white',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			width: '889px',
		},
	},
	content: {
		paddingTop: '40px',
		[breakpoints.up('lg')]: {
			padding: '69px 0 82px 0',
		},
	},
	dividerWrapper: {
		margin: '7px 47px',
		[breakpoints.up('lg')]: {
			margin: '17px 187px',
		},
	},
	brandLogo: {
		width: '81px',
	},
	title: {
		paddingBottom: '30px',
		[breakpoints.up('lg')]: {
			paddingBottom: '49px',
		},
		'&> div': {
			fontWeight: 'bold',
			fontSize: '25px',
			[breakpoints.up('lg')]: {
				fontSize: '35px',
			},
		},
	},
	thumbsUpIcon: {
		paddingBottom: '30px',
		[breakpoints.up('lg')]: {
			paddingBottom: '49px',
		},
	},
	continueButton: {
		width: '263px',
		fontSize: '15px',
		[breakpoints.up('lg')]: {
			padding: '12.5px 0',
		},
	},
}));

const SuccessSignUp = (): ReactElement => {
	const { t } = useTranslation('newSignUp');
	const history = useHistory();
	const goToDashboard = () => {
		history.push('/dashboard/citas');
	};
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.brandLogoWrapper}>
						<BrandLogo className={classes.brandLogo} />
					</div>
					<div className={classes.dividerWrapper}>
						<Divider />
					</div>
					<div className={classes.title}>
						<Typography variant="h1">{t('successSignUp.title.firstLine')}</Typography>
						<Typography variant="h1">{t('successSignUp.title.secondLine')}</Typography>
					</div>
					<div className={classes.thumbsUpIcon}>
						<ThumbsUpIcon />
					</div>
					<div>
						<Button className={classes.continueButton} variant="contained" onClick={goToDashboard}>
							{t('successSignUp.continue')}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessSignUp;

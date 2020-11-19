import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { stylesWithTheme } from 'utils';

import AskAddressForm from './components/AskAddressForm';
import AddressBenefits from './components/AddressBenefits';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		height: 'calc(100vh - 34px)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		padding: '34px 15px 0 15px',
		[breakpoints.up('lg')]: {
			justifyContent: 'center',
			alignItems: 'center',
			padding: '0',
		},
	},
	brandLogo: {
		width: '59px',
		height: '18px',
	},
	title: {
		fontWeight: 'bold',
		paddingBottom: '5px',
	},
	subTitle: {
		textTransform: 'none',
		paddingBottom: '20px',
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		[breakpoints.up('lg')]: {
			flexDirection: 'row',
		},
	},
}));

const AskAddress = (): ReactElement => {
	const { t } = useTranslation('askAddress');
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<div className={classes.container}>
			<div>
				<div>
					<BrandLogo className={classes.brandLogo} />
				</div>
				<Typography className={classes.title} variant="h1">
					{t('askAddress.title')}
				</Typography>
				<Typography className={classes.subTitle} variant="button">
					{t('askAddress.subTitle')}
				</Typography>
			</div>
			<div className={classes.contentContainer}>
				<AskAddressForm />
				{isDesktop && <AddressBenefits />}
			</div>
		</div>
	);
};

export default AskAddress;

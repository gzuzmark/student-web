import React, { useState, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { parse } from 'query-string';

import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { stylesWithTheme, redirectToBaseAlivia } from 'utils';

import AskAddressForm from './components/AskAddressForm';
import AddressBenefits from './components/AddressBenefits';
import SuccessModal from './components/SuccessModal';
import { Position } from 'pages/api';

interface StylesProps {
	isAlternativeActive: boolean;
}

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
	titleWrapper: {
		[breakpoints.up('lg')]: {
			minWidth: '951px',
			paddingBottom: ({ isAlternativeActive }: StylesProps) => (isAlternativeActive ? '54px' : ''),
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

interface AskAddressProps {
	sessionId?: string;
	submitCallback?: (pos: Position, address: string) => void;
}

const AskAddress = ({ sessionId, submitCallback }: AskAddressProps): ReactElement => {
	const { t } = useTranslation('askAddress');
	const classes = useStyles({ isAlternativeActive: !!sessionId });
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const location = useLocation();
	const params = parse(location.search);
	const activeSessionId = sessionId || (params.sessionId as string);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
	const redirectToAccount = () => {
		console.log('to somwhere !');
	};
	const openSuccesModal = () => {
		setIsSuccessModalOpen(true);
	};

	if (!activeSessionId) {
		redirectToBaseAlivia();
	}

	return (
		<div className={classes.container}>
			<div className={classes.titleWrapper}>
				<div>
					<BrandLogo className={classes.brandLogo} />
				</div>
				<Typography className={classes.title} variant="h1">
					{t(!!sessionId ? 'askAddress.title.alternative' : 'askAddress.title')}
				</Typography>
				{!sessionId && (
					<Typography className={classes.subTitle} variant="button">
						{t('askAddress.subTitle')}
					</Typography>
				)}
			</div>
			<div className={classes.contentContainer}>
				<AskAddressForm sessionId={activeSessionId} openSuccesModal={openSuccesModal} submitCallback={submitCallback} />
				{isDesktop && <AddressBenefits />}
			</div>
			<SuccessModal isOpen={isSuccessModalOpen} onClose={redirectToAccount} />
		</div>
	);
};

export default AskAddress;

import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import { useLocation } from 'react-router';
import { parse } from 'query-string';

import { getPrescription, Position } from 'pages/api';
import { PrescribedMedicine } from 'pages/api/userPrescription';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { stylesWithTheme } from 'utils';

import Medicines from './components/Medicines';
import CheckoutInformation from './components/CheckoutInformation';
import SelectPrescriptionType from './components/SelectPrescriptionType';
import NotAvailableNearYou from './components/NotAvailableNearYour';
import AskAddress from '../AskAddress/AskAddress';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		height: 'calc(100vh - 44px)',
		position: 'relative',
		padding: '44px 13px 0 13px',
		[breakpoints.up('lg')]: {
			height: 'calc(100vh - 70px)',
			padding: '70px 0 0 208px',
		},
	},
	brandLogo: {
		width: '59px',
		height: '18px',
	},
	title: {
		fontWeight: 'bold',
		padding: '0 75px 5px 0',

		[breakpoints.up('lg')]: {
			fontSize: '38px',
			padding: '0 0 15px 0',
		},
	},
	subTitle: {
		textTransform: 'none',
		paddingBottom: '20px',
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
			paddingBottom: '30px',
			width: '575px',
			fontWeight: 400,
		},
	},
	body: {
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
}));

const requestPrescription = async ({
	setMedicines,
	setUserAddress,
	setNotAvailableNearYou,
	userId,
	updatedPosition,
}: {
	setMedicines: Function;
	setUserAddress: Function;
	setNotAvailableNearYou: Function;
	userId: string;
	updatedPosition: Position | undefined;
}) => {
	try {
		const { address, medicines, notAvailableNearYou } = await getPrescription(userId, updatedPosition);

		setUserAddress(address);
		setMedicines(medicines);
		setNotAvailableNearYou(notAvailableNearYou);
	} catch (e) {}
};

const BuyPrescription = (): ReactElement => {
	const { t } = useTranslation('buyPrescription');
	const location = useLocation();
	const params = parse(location.search);
	const [selectedMedicines, setSelectedMedicines] = useState<number[]>([]);
	const [medicines, setMedicines] = useState<PrescribedMedicine[]>([]);
	const [userAddress, setUserAddress] = useState<string>('');
	const [notAvailableNearYou, setNotAvailableNearYou] = useState<boolean>(false);
	const [showingQuotedPrescription, setShowingQuotedPrescription] = useState<boolean>(false);
	const [isShowingEditAddressScreen, setIsShowingEditAddressScreen] = useState<boolean>(false);
	const [updatedPosition, setUpdatedPosition] = useState<Position>();
	const classes = useStyles();
	const outOfStock =
		medicines.filter(({ hasStock, isAvailableForECommerce }) => hasStock && isAvailableForECommerce).length < 1;
	const userId = (params.user_id as string) || '';
	const toggleMedicine = useCallback(
		(index: number) => () => {
			const positionIndex = selectedMedicines.indexOf(index);
			const alreadySelected = positionIndex > -1;

			let newSelectedMedicines: number[] = [];

			if (alreadySelected) {
				newSelectedMedicines = [...selectedMedicines];

				newSelectedMedicines.splice(positionIndex, 1);
			} else {
				newSelectedMedicines = [...selectedMedicines, index];
			}

			setSelectedMedicines(newSelectedMedicines);
		},
		[selectedMedicines],
	);
	const showQuotedPrescription = () => {
		setShowingQuotedPrescription(true);
	};
	const showEditAddressScreen = () => {
		setIsShowingEditAddressScreen(true);
	};
	const onAskAddressSubmit = (pos: Position, address: string) => {
		setUpdatedPosition(pos);
		setUserAddress(address);
		setIsShowingEditAddressScreen(false);
	};

	useEffect(() => {
		requestPrescription({
			setMedicines,
			setUserAddress,
			setNotAvailableNearYou,
			userId,
			updatedPosition,
		});
	}, [updatedPosition, userId]);

	if (isShowingEditAddressScreen) {
		return <AskAddress sessionId={userId} submitCallback={onAskAddressSubmit} />;
	}

	if (showingQuotedPrescription && notAvailableNearYou) {
		return <NotAvailableNearYou address={userAddress} showEditAddressScreen={showEditAddressScreen} />;
	}

	if (!showingQuotedPrescription) {
		return <SelectPrescriptionType showQuotedPrescription={showQuotedPrescription} />;
	}

	return (
		<div className={classes.container}>
			<div>
				<BrandLogo className={classes.brandLogo} />
			</div>
			<Typography className={classes.title} variant="h1">
				{t('buyPrescription.title')}
			</Typography>
			<Typography className={classes.subTitle}>
				{t(outOfStock ? 'buyPrescription.subTitle.outOfStock' : 'buyPrescription.subTitle')}
			</Typography>
			<div className={classes.body}>
				<Medicines medicines={medicines} selectedMedicines={selectedMedicines} toggleMedicine={toggleMedicine} />
				<Divider orientation="vertical" flexItem />
				<CheckoutInformation address={userAddress} medicines={medicines} selectedMedicines={selectedMedicines} />
			</div>
		</div>
	);
};

export default BuyPrescription;

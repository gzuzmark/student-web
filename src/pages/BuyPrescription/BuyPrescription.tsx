import Divider from '@material-ui/core/Divider';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as BrandLogo } from 'icons/logo-alivia.svg';
import { getPrescription, Position } from 'pages/api';
import { createTrackingPatientPrescriptionBlank, TrackingLocalStorage } from 'pages/api/tracking';
import { PrescribedMedicine, Prescription } from 'pages/api/userPrescription';
import useTracking from 'pages/Tracking/useTracking';
import { parse } from 'query-string';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { redirectToBaseAlivia, stylesWithTheme } from 'utils';
import AskAddress from '../AskAddress/AskAddress';
import CheckoutInformation from './components/CheckoutInformation';
import LoadLanding from './components/LoadLanding';
import Medicines from './components/Medicines';
import NotAvailableNearYou from './components/NotAvailableNearYour';
import PrescriptionNotFound from './components/PrescriptionNotFound';
import RedirectToInkafarma from './components/RedirectToInkafarma';
import SelectPrescriptionType from './components/SelectPrescriptionType';
import TitleStock from './components/TitleStock';

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
	body: {
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
}));

const MIN_LENGTH_FOLIO = 8;

const requestPrescription = async ({
	setMedicines,
	setUserAddress,
	setNotAvailableNearYou,
	setFolioNumber,
	setPrescriptionPath,
	sessionId,
	updatedPosition,
	folioNumber,
	savedAddress,
}: {
	setMedicines: Function;
	setUserAddress: Function;
	setNotAvailableNearYou: Function;
	setFolioNumber: Function;
	setPrescriptionPath: Function;
	sessionId: string;
	updatedPosition: Position | undefined;
	folioNumber: string;
	savedAddress: string | undefined;
}) => {
	try {
		const resp: Prescription = await getPrescription(sessionId, updatedPosition, folioNumber);
		const { address, medicines, prescriptionPath, notAvailableNearYou, folioNumber: newFolioNumber } = resp;

		const addressObject = JSON.parse(address);
		const newAddress = `${addressObject.street || ''} , ${addressObject.number || ''}, ${
			addressObject.district || ''
		} , ${addressObject.country || ''}`;
		if (!savedAddress) {
			setUserAddress(newAddress);
		}

		setFolioNumber(newFolioNumber);
		setMedicines(medicines);
		setNotAvailableNearYou(notAvailableNearYou);
		setPrescriptionPath(prescriptionPath);
	} catch (e) {}
};

const BuyPrescription = (): ReactElement => {
	const { t } = useTranslation('buyPrescription');
	const location = useLocation();
	const params = parse(location.search);
	const [selectedMedicines, setSelectedMedicines] = useState<number[]>([]);
	const [medicines, setMedicines] = useState<PrescribedMedicine[]>([]);
	const [userAddress, setUserAddress] = useState<string>('');
	const [folioNumber, setFolioNumber] = useState<string>('');
	const [prescriptionPath, setPrescriptionPath] = useState<string>('');
	const [notAvailableNearYou, setNotAvailableNearYou] = useState<boolean>(false);
	const [showingQuotedPrescription, setShowingQuotedPrescription] = useState<boolean>(false);
	const [isShowingEditAddressScreen, setIsShowingEditAddressScreen] = useState<boolean>(false);
	const [showingRedirectPage, setShowingRedirectPage] = useState<boolean>(false);
	const [updatedPosition, setUpdatedPosition] = useState<Position>();
	const classes = useStyles();
	const sessionId = (params.sessionId as string) || '';
	const tracking: TrackingLocalStorage | null = useTracking();
	const [verifyPrescription, setVerifyPrescription] = useState<boolean>(false);

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
		const addressObject = JSON.parse(address);
		const newAddress = `${addressObject.street || ''} , ${addressObject.number || ''}, ${
			addressObject.district || ''
		} , ${addressObject.country || ''}`;
		setUpdatedPosition(pos);
		setUserAddress(newAddress);
		setIsShowingEditAddressScreen(false);
		requestPrescription({
			setMedicines,
			setUserAddress,
			setNotAvailableNearYou,
			setFolioNumber,
			setPrescriptionPath,
			sessionId,
			updatedPosition: pos,
			folioNumber,
			savedAddress: userAddress,
		});
	};
	const openEPrescription = () => {
		if (!prescriptionPath.startsWith('http')) {
			createTrackingPatientPrescriptionBlank(tracking?.trackingId);
		}
		window.open(prescriptionPath, '_blank');
	};

	const showRedirectPage = () => {
		if (selectedMedicines.length >= 1) {
			setShowingRedirectPage(true);
		}
	};

	if (!sessionId) {
		redirectToBaseAlivia();
	}

	useEffect(() => {
		requestPrescription({
			setMedicines,
			setUserAddress,
			setNotAvailableNearYou,
			setFolioNumber,
			setPrescriptionPath,
			sessionId,
			updatedPosition,
			folioNumber,
			savedAddress: userAddress,
		}).then(() => {
			setVerifyPrescription(true);
		});
		//eslint-disable-next-line
	}, []);

	if (!verifyPrescription) {
		return <LoadLanding />;
	}

	if (folioNumber?.length < MIN_LENGTH_FOLIO || !prescriptionPath?.startsWith('http')) {
		return <PrescriptionNotFound folioNumber={folioNumber} prescriptionPath={prescriptionPath} />;
	}

	if (showingRedirectPage) {
		return <RedirectToInkafarma medicines={medicines} selectedMedicines={selectedMedicines} />;
	}

	if (isShowingEditAddressScreen) {
		return <AskAddress sessionId={sessionId} submitCallback={onAskAddressSubmit} />;
	}

	if (showingQuotedPrescription && notAvailableNearYou) {
		return <NotAvailableNearYou address={userAddress} showEditAddressScreen={showEditAddressScreen} />;
	}

	if (!showingQuotedPrescription) {
		return (
			<SelectPrescriptionType showQuotedPrescription={showQuotedPrescription} openEPrescription={openEPrescription} />
		);
	}

	return (
		<div className={classes.container}>
			<div>
				<BrandLogo className={classes.brandLogo} />
			</div>
			<Typography className={classes.title} variant="h1">
				{t('buyPrescription.title')}
			</Typography>
			<TitleStock medicines={medicines} />
			<div className={classes.body}>
				<Medicines
					medicines={medicines}
					selectedMedicines={selectedMedicines}
					toggleMedicine={toggleMedicine}
					openEPrescription={openEPrescription}
				/>
				<Divider orientation="vertical" flexItem />
				<CheckoutInformation
					sessionId={sessionId}
					address={userAddress}
					medicines={medicines}
					selectedMedicines={selectedMedicines}
					onAddressUpdate={onAskAddressSubmit}
					openEPrescription={openEPrescription}
					showRedirectPage={showRedirectPage}
				/>
			</div>
		</div>
	);
};

export default BuyPrescription;

import React, { ReactElement, ChangeEvent, useState, useCallback, useEffect } from 'react';
import { PrescribedMedicine } from 'pages/api';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import GoogleMapReact, { Maps } from 'google-map-react';
import clsx from 'clsx';

import { stylesWithTheme, defaultCenter, getUserCurrentPosition } from 'utils';
import { Position } from 'pages/api';
import ElectronicPrescription from './ElectronicPrescription';
import SearchAddress from 'pages/LaboratoryExams/components/SearchAddress';
import { MapInstance, MapsApi, Place, Marker } from 'pages/AskAddress/types';
import { roundToNDecimals } from 'utils';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		[breakpoints.up('lg')]: {
			padding: '0 0 0 60px',
			width: '506px',
		},
	},
	mobileCheckout: {
		backgroundColor: '#EEEDEF',
		margin: '0 -13px 20px',
		padding: '16px 12px 12px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	medicinesCounts: {
		fontStyle: 'italic',
		textAlign: 'center',
		paddingBottom: '18px',
		[breakpoints.up('lg')]: {
			order: '2',
			textAlign: 'left',
			padding: '24px 0',
		},
	},
	addressContainer: {
		[breakpoints.up('lg')]: {
			order: '1',
		},
	},
	addressWrapper: {
		padding: '24px 0',
	},
	addressHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '5px',
		color: palette.info.main,
		[breakpoints.up('lg')]: {
			paddingBottom: '20px',
		},
	},
	addresLabel: {
		color: 'rgba(83,91,108,0.5)',
	},
	editAddress: {
		padding: '0',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none',
		},
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			lineHeight: '20px',
		},
	},
	desktopCheckout: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			order: '3',
		},
	},
	totalAmount: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '17px',
		[breakpoints.up('lg')]: {
			alignItems: 'center',
			paddingBottom: '47px',
		},
	},
	totalLabel: {
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			fontWeight: 'bold',
		},
	},
	totalAmountHelp: {
		color: palette.info.main,
		fontStyle: 'italic',
	},
	amount: {
		fontSize: '15px',
		lineHeight: '20px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
		},
	},
	electronicPrescription: {
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	continueButton: {
		[breakpoints.up('lg')]: {
			marginTop: '32px',
		},
	},
	// form
	addressInput: {
		display: 'none',
		padding: '17px 12px 0 18px',
		width: 'calc(100% - 30px)',
	},
	mapWrapper: {
		height: '206px',
	},
	addressReferenceLabel: {
		fontSize: '15px',
		paddingBottom: '10px',
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
		},
	},
	addressReferenceInput: {
		marginBottom: '18px',
		[breakpoints.up('lg')]: {
			marginBottom: '33px',
		},
	},
	submitButton: {
		marginTop: '18px',
		fontSize: '15px',
		[breakpoints.up('lg')]: {
			marginTop: '0',
			padding: '12.5px 0',
		},
	},
}));

const mapOptionsCreator = (map: Maps) => ({
	fullscreenControl: false,
	zoomControlOptions: {
		position: map.ControlPosition.RIGHT_TOP,
	},
});

const getCurrentPosition = async ({
	mapsApi,
	mapInstance,
	setCurrentPositionMarker,
	setActivePosition,
}: {
	mapsApi: MapsApi | undefined;
	mapInstance: MapInstance | undefined;
	setCurrentPositionMarker: Function;
	setActivePosition: Function;
}) => {
	try {
		if (mapsApi && mapInstance) {
			const userPosition = await getUserCurrentPosition();
			const marker = new mapsApi.Marker({
				position: {
					...userPosition,
				},
				map: mapInstance,
			});

			setCurrentPositionMarker(marker);
			setActivePosition(userPosition);
			mapInstance.setCenter(userPosition);
		}
	} catch (e) {
		if (mapInstance) {
			mapInstance.setCenter(defaultCenter);
		}
	}
};

export interface CheckoutInformationProps {
	medicines: PrescribedMedicine[];
	selectedMedicines: number[];
	address: string;
	onAddressUpdate: (pos: Position, address: string) => void;
	openEPrescription: () => void;
	showRedirectPage: () => void;
}

const CheckoutInformation = ({
	address,
	medicines,
	selectedMedicines,
	onAddressUpdate,
	openEPrescription,
	showRedirectPage,
}: CheckoutInformationProps): ReactElement => {
	const { t } = useTranslation('buyPrescription');
	const classes = useStyles();
	const total = selectedMedicines.reduce((acc, index) => {
		const medicine = medicines[index];
		const total = (medicine.hasStock ? medicine.totalPrice : medicine.alternativeMedicine?.totalPrice) || 0;

		return acc + roundToNDecimals(total, 2);
	}, 0);
	const totalCount = medicines.filter(
		({ isAvailableForECommerce, hasStock, alternativeMedicine }) =>
			isAvailableForECommerce && (hasStock || (!!alternativeMedicine && alternativeMedicine.hasStock)),
	).length;
	// edit address states
	const [isEditAddressShowing, setIsEditAddressShowing] = useState<boolean>(false);
	const [currentPositionMarker, setCurrentPositionMarker] = useState<Marker>();
	const [addressReference, setAddressReference] = useState<string>('');
	const [referenceError, setReferenceError] = useState<string>('');
	const [mapsApi, setMapApi] = useState<MapsApi>();
	const [mapInstance, setMapInstance] = useState<MapInstance>();
	const [humanActivePosition, setHumanActivePosition] = useState<string>('');
	const [hasAddressError, setHasAddressError] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [activePosition, setActivePosition] = useState<Position | null>(null);
	const updateDirectionReference = (e: ChangeEvent<HTMLInputElement>) => {
		setAddressReference(e.target.value);
	};
	const showEditAddress = () => {
		setIsEditAddressShowing(true);
	};
	const hideEditAddress = () => {
		setIsEditAddressShowing(false);
	};
	const updateAddress = () => {
		if (!addressReference) {
			setReferenceError(t('buyPrescription.addressReference.error'));
			return;
		} else {
			setReferenceError('');
		}

		if (!humanActivePosition) {
			setHasAddressError(true);
			// return;
		} else {
			setHasAddressError(false);
		}

		if (activePosition) {
			onAddressUpdate(activePosition, humanActivePosition);
			setIsSubmitting(true);
			hideEditAddress();
			setTimeout(() => {
				setIsSubmitting(false);
			}, 1000);
		}
	};
	const onGoogleApiLoaded = ({ maps, map }: { maps: MapsApi; map: MapInstance }) => {
		const addressInputWrapper = document.querySelector<HTMLElement>('.address-input-wrapper');

		if (addressInputWrapper) {
			map.controls[maps.ControlPosition.TOP_RIGHT].push(addressInputWrapper);
			setTimeout(() => {
				addressInputWrapper.style.display = 'block';
			}, 500);
		}

		setMapApi(maps);
		setMapInstance(map);
	};
	const updatePosition = useCallback(
		(place: Place | null) => {
			if (place && mapInstance && currentPositionMarker) {
				currentPositionMarker.setVisible(false);
				setHumanActivePosition(place.address);
				setActivePosition(place.position);
				currentPositionMarker.setPosition(place.position);
				currentPositionMarker.setVisible(true);
				mapInstance.setCenter(place.position);
				mapInstance.setZoom(17);
			}
		},
		[currentPositionMarker, mapInstance],
	);

	useEffect(() => {
		getCurrentPosition({
			mapsApi,
			mapInstance,
			setCurrentPositionMarker,
			setActivePosition,
		});
	}, [mapInstance, mapsApi]);

	return (
		<div className={classes.container}>
			<div className={classes.mobileCheckout}>
				<div className={classes.totalAmount}>
					<div>
						<Typography component="span">{t('buyPrescription.total.label')}</Typography>{' '}
						<Typography className={classes.totalAmountHelp} component="span">
							{t('buyPrescription.total.helperText')}
						</Typography>
					</div>
					<Typography className={classes.amount} color="primary">
						S./{total.toFixed(2)}
					</Typography>
				</div>
				<Button onClick={showRedirectPage} variant="contained" fullWidth>
					{t('buyPrescription.total.continueWithPayment')}
				</Button>
			</div>
			<Typography className={classes.medicinesCounts} color="primary">
				{t('buyPrescription.medicinesSelected', {
					selectedCount: selectedMedicines.length,
					totalCount,
				})}
			</Typography>
			<div className={classes.addressContainer}>
				<Divider />
				<div className={classes.addressWrapper}>
					<div className={classes.addressHeader}>
						<Typography className={classes.addresLabel}>{t('buyPrescription.address.label')}</Typography>
						{isEditAddressShowing ? (
							<Button className={classes.editAddress} onClick={hideEditAddress}>
								{t('buyPrescription.address.cancelEdit')}
							</Button>
						) : (
							<Button className={classes.editAddress} onClick={showEditAddress}>
								{t('buyPrescription.address.editLabel')}
							</Button>
						)}
					</div>
					{isEditAddressShowing ? (
						<div>
							<SearchAddress
								className={clsx(classes.addressInput, 'address-input-wrapper')}
								defaultValue={humanActivePosition}
								defaultPosition={activePosition}
								mapsApi={mapsApi}
								updatePosition={updatePosition}
								hasError={hasAddressError}
							/>
							<div className={classes.mapWrapper}>
								<GoogleMapReact
									bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY || '', libraries: 'places' }}
									defaultCenter={defaultCenter}
									defaultZoom={17}
									options={mapOptionsCreator}
									yesIWantToUseGoogleMapApiInternals
									onGoogleApiLoaded={onGoogleApiLoaded}
								></GoogleMapReact>
							</div>
							<Typography className={classes.addressReferenceLabel}>
								{t('buyPrescription.addressReference.label')}
							</Typography>
							<TextField
								className={classes.addressReferenceInput}
								value={addressReference}
								onChange={updateDirectionReference}
								name="address-reference"
								placeholder={t('buyPrescription.addressReference.placeholder')}
								variant="outlined"
								error={!!referenceError}
								helperText={referenceError}
								fullWidth
							/>
							<Button
								className={classes.submitButton}
								onClick={updateAddress}
								variant="contained"
								disabled={isSubmitting}
								fullWidth
							>
								{t('buyPrescription.submitAddress')}
							</Button>
						</div>
					) : (
						<Typography className={classes.address}>{address}</Typography>
					)}
				</div>
				<Divider />
			</div>
			<div className={classes.desktopCheckout}>
				<div className={classes.totalAmount}>
					<div>
						<Typography className={classes.totalLabel} component="span">
							{t('buyPrescription.total.label')}
						</Typography>{' '}
						<Typography className={classes.totalAmountHelp} component="span">
							{t('buyPrescription.total.helperText')}
						</Typography>
					</div>
					<Typography className={classes.amount} color="primary">
						S./{total.toFixed(2)}
					</Typography>
				</div>
				<Divider />
				<Button onClick={showRedirectPage} className={classes.continueButton} variant="contained" fullWidth>
					{t('buyPrescription.total.continueWithPayment')}
				</Button>
			</div>
			<div className={classes.electronicPrescription}>
				<ElectronicPrescription openEPrescription={openEPrescription} />
			</div>
		</div>
	);
};

export default CheckoutInformation;

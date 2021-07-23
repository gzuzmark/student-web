import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import clsx from 'clsx';
import GoogleMapReact, { Maps } from 'google-map-react';
import { Departamento, Distrito, Position, postAddress, Provincia } from 'pages/api';
import {
	createTrackingAddressPatientAttempt,
	createTrackingErrorAddress,
	createTrackingErrorAddressReference,
} from 'pages/api/tracking';
import SearchAddress from 'pages/LaboratoryExams/components/SearchAddress';
import { FormattedPlace } from 'pages/LaboratoryExams/components/types';
import useTracking from 'pages/Tracking/useTracking';
import React, { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultCenter, getUserCurrentPosition, stylesWithTheme } from 'utils';
import { MapInstance, MapsApi, Marker, Place } from '../types';
import AddressBenefits from './AddressBenefits';
import DepartamentoSearch from './DepartamentoSearch';
import DistritoSearch from './DistritoSearch';
import ProvinciaSearch from './ProvinciaSearch';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			marginTop: '10px',
			//paddingRight: '68px',
			maxWidth: '951px',
		},
	},
	addressInput: {
		display: 'none',
		padding: '17px 12px 0 18px',
		width: 'calc(100% - 30px)',
	},
	mapWrapper: {
		height: '350px',
		marginBottom: '20px',
	},
	addressReferenceLabel: {
		fontSize: '15px',
		paddingBottom: '10px',
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
		},
	},
	addressAutocomplete: {
		fontSize: '15px',
		paddingBottom: '10px',
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
		},
	},
	addressSearch: {
		fontSize: '15px',
		paddingBottom: '0px',
		[breakpoints.up('xs')]: {
			paddingBottom: '8px',
		},
	},
	locationLabel: {
		fontSize: '15px',
		paddingTop: '5px',
		paddingBottom: '10px',
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
		},
	},
	addressReferenceInput: {
		marginBottom: '10px',
		[breakpoints.up('lg')]: {
			marginBottom: '8px',
		},
	},
	labelErrorSave: {
		color: '#FE6B6F',
		fontSize: '13px',
		textAlign: 'center',
		lineHeight: '18px',
		marginBottom: '8px',
		[breakpoints.down('xs')]: {
			textAlign: 'justify',
		},
	},
	submitButton: {
		fontWeight: 'bold',
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

interface AskAddressFormProps {
	sessionId: string;
	openSuccesModal: () => void;
	submitCallback?: (pos: Position, address: string) => void;
}

const AskAddressForm = ({ sessionId, submitCallback, openSuccesModal }: AskAddressFormProps): ReactElement | null => {
	const { t } = useTranslation('askAddress');
	const [currentPositionMarker, setCurrentPositionMarker] = useState<Marker>();
	const [addressCountry] = useState<string>('Perú');
	const [addressProvince, setAddressProvince] = useState<string>('');
	const [addressDistrict, setAddressDistrict] = useState<string>('');
	const [addressNumber, setAddressNumber] = useState<string>('');
	const [addressReference, setAddressReference] = useState<string>('');
	const [referenceError, setReferenceError] = useState<string>('');
	const [numberError, setNumberError] = useState<string>('');
	const [mapsApi, setMapApi] = useState<MapsApi>();
	const [mapInstance, setMapInstance] = useState<MapInstance>();
	const [humanActivePosition, setHumanActivePosition] = useState<string>('');
	const [hasAddressError, setHasAddressError] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [activePosition, setActivePosition] = useState<Position | null>(null);
	const [hasErrorOnSave, setHasErrorOnSave] = useState<boolean>(false);
	const [departamento, setDepartamento] = useState<Departamento | null>(null);
	const [provincia, setProvincia] = useState<Provincia | null>(null);

	const tracking = useTracking();

	const updateNumberAddress = (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const number = e.target.value;
			setAddressNumber(number);
			if (humanActivePosition != null) {
				const formattedPlace: FormattedPlace = JSON.parse(humanActivePosition);
				if (formattedPlace.street) {
					formattedPlace.number = number;
					setHumanActivePosition(JSON.stringify(formattedPlace));
				}
			}
		} catch (error) {
			console.error(error);
		}
	};
	const updateDirectionReference = (e: ChangeEvent<HTMLInputElement>) => {
		setAddressReference(e.target.value);
	};
	const onSelectDepartament = (value: Departamento | null) => {
		setDepartamento(value);
	};
	const onSelectProvince = (value: Provincia | null) => {
		setProvincia(value);
		const name = value?.name;
		setAddressProvince(name ? name : '');
	};
	const onSelectDistrite = (value: Distrito | null) => {
		const name = value?.name;
		setAddressDistrict(name ? name : '');
	};

	// const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const onSubmit = useCallback(async () => {
		try {
			const data = {
				latitude: String(activePosition?.lat) || '',
				longitude: String(activePosition?.lng) || '',
				address: humanActivePosition,
				reference: addressReference,
			};

			if (!humanActivePosition) {
				setHasAddressError(true);
				const payload = JSON.stringify(data);
				createTrackingErrorAddress(tracking?.trackingId, humanActivePosition, payload);
				return;
			} else {
				setHasAddressError(false);
			}

			if (addressNumber.trim().length === 0) {
				setNumberError('Debe ingresar un número de dirección');
				return;
			} else {
				setNumberError('');
			}

			if (!addressReference) {
				setReferenceError(t('askAddress.addressReference.error'));
				const payload = JSON.stringify(data);
				createTrackingErrorAddressReference(tracking?.trackingId, addressReference, payload);
				return;
			} else {
				setReferenceError('');
			}

			setIsSubmitting(true);
			setHasErrorOnSave(false);

			if (submitCallback) {
				if (activePosition && humanActivePosition) {
					submitCallback(activePosition, humanActivePosition);
				}
				return;
			}

			if (activePosition) {
				await postAddress(sessionId, data);
				openSuccesModal();
			}
		} catch (e) {
			setHasErrorOnSave(true);
			setIsSubmitting(false);
		}
	}, [
		activePosition,
		humanActivePosition,
		addressReference,
		addressNumber,
		submitCallback,
		t,
		tracking,
		sessionId,
		openSuccesModal,
	]);

	const onGoogleApiLoaded = ({ maps, map }: { maps: MapsApi; map: MapInstance }) => {
		const addressInputWrapper = document.querySelector<HTMLElement>('.address-input-wrapper');

		if (addressInputWrapper) {
			map.controls[maps.ControlPosition.TOP_RIGHT].push(addressInputWrapper);
			setTimeout(() => {
				addressInputWrapper.style.display = 'block';
			}, 900);
		}

		setMapApi(maps);
		setMapInstance(map);
	};

	const isValidAddress = (address: FormattedPlace): boolean => {
		return Boolean(address.street && address.district && address.city && address.country);
	};

	const updatePosition = useCallback(
		(place: Place | null) => {
			if (place && mapInstance && currentPositionMarker) {
				currentPositionMarker.setVisible(false);
				const address = place.formattedPlace;
				if (isValidAddress(address)) {
					setHumanActivePosition(
						JSON.stringify({
							...place.formattedPlace,
						}),
					);
				} else {
					const payload = JSON.stringify(place);
					createTrackingAddressPatientAttempt(tracking?.trackingId, place.address, payload);
				}
				setActivePosition(place.position);
				currentPositionMarker.setPosition(place.position);
				currentPositionMarker.setVisible(true);
				mapInstance.setCenter(place.position);
				mapInstance.setZoom(17);
			}
		},
		[currentPositionMarker, mapInstance, tracking],
	);

	useEffect(() => {
		getCurrentPosition({
			mapsApi,
			mapInstance,
			setCurrentPositionMarker,
			setActivePosition,
		});
	}, [mapInstance, mapsApi]);

	const clickPosition = (value: GoogleMapReact.ClickEventValue) => {
		const { lat, lng } = value;
		const position: Position = {
			lat: lat,
			lng: lng,
		};
		if (currentPositionMarker && mapInstance) {
			setActivePosition(position);
			currentPositionMarker.setPosition(position);
			currentPositionMarker.setVisible(true);
		}
	};

	return (
		<div className={classes.form}>
			<Grid container spacing={2} xl={12}>
				<Grid item xs={12} md={6} xl={4}>
					<Typography className={classes.addressReferenceLabel}>{t('askAddress.addressDepartament.label')}</Typography>
					<DepartamentoSearch onChange={onSelectDepartament} />
				</Grid>
				<Grid item xs={12} md={6} xl={4}>
					<Typography className={classes.addressReferenceLabel}>{t('askAddress.addressProvince.label')}</Typography>
					<ProvinciaSearch departament={departamento} onChange={onSelectProvince} />
				</Grid>
				<Grid item xs={12} md={6} xl={4}>
					<Typography className={classes.addressReferenceLabel}>{t('askAddress.addressDistrict.label')}</Typography>
					<DistritoSearch className={classes.addressAutocomplete} province={provincia} onChange={onSelectDistrite} />
				</Grid>
				<Grid item xs={12} md={6} xl={12}>
					<Typography className={classes.addressReferenceLabel}>{t('askAddress.address.label')}</Typography>
					<SearchAddress
						className={classes.addressSearch}
						defaultValue={humanActivePosition}
						defaultPosition={activePosition}
						mapsApi={mapsApi}
						updatePosition={updatePosition}
						hasError={hasAddressError}
						country={addressCountry}
						province={addressProvince}
						district={addressDistrict}
					/>
				</Grid>
				<Grid item xs={12} md={6} xl={6}>
					<Typography className={classes.addressReferenceLabel}>{t('askAddress.addressNumber.label')}</Typography>
					<TextField
						value={addressNumber}
						onChange={updateNumberAddress}
						name="address-district"
						placeholder={t('askAddress.addressNumber.placeholder')}
						variant="outlined"
						fullWidth
						error={!!numberError}
						helperText={numberError}
					/>
				</Grid>
				<Grid item xs={12} md={6} xl={6}>
					<Typography className={classes.addressReferenceLabel}>{t('askAddress.addressReference.label')}</Typography>
					<TextField
						value={addressReference}
						onChange={updateDirectionReference}
						name="address-reference"
						placeholder={t('askAddress.addressReference.placeholder')}
						variant="outlined"
						error={!!referenceError}
						helperText={referenceError}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.locationLabel}>{t('askAddress.addressLocation.label')}</Typography>
					<div className={classes.mapWrapper}>
						<GoogleMapReact
							bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY || '', libraries: 'places' }}
							defaultCenter={defaultCenter}
							defaultZoom={17}
							options={mapOptionsCreator}
							yesIWantToUseGoogleMapApiInternals
							onGoogleApiLoaded={onGoogleApiLoaded}
							onClick={clickPosition}
						></GoogleMapReact>
					</div>
					{false && <AddressBenefits />}
					{hasErrorOnSave && (
						<Grid item xs={12}>
							<Typography className={classes.labelErrorSave}>{t('askAddress.errorOnSave.label')}</Typography>
						</Grid>
					)}
					<Button
						className={classes.submitButton}
						onClick={onSubmit}
						variant="contained"
						disabled={isSubmitting}
						fullWidth
					>
						{t('askAddress.submitAddress')}
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default AskAddressForm;

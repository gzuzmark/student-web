import React, { useCallback, useState, useEffect, ReactElement, ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import GoogleMapReact, { Maps } from 'google-map-react';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils';

import AddressBenefits from './AddressBenefits';
import { Position, postAddress } from 'pages/api';
import { defaultCenter, getUserCurrentPosition } from 'utils';
import SearchAddress from 'pages/LaboratoryExams/components/SearchAddress';

import { MapInstance, MapsApi, Place, Marker } from '../types';
import { FormattedPlace } from 'pages/LaboratoryExams/components/types';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			paddingRight: '68px',
		},
	},
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

interface AskAddressFormProps {
	sessionId: string;
	openSuccesModal: () => void;
	submitCallback?: (pos: Position, address: string) => void;
}

const AskAddressForm = ({ sessionId, submitCallback, openSuccesModal }: AskAddressFormProps): ReactElement | null => {
	const { t } = useTranslation('askAddress');
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
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const onSubmit = useCallback(async () => {
		try {
			if (!addressReference) {
				setReferenceError(t('askAddress.addressReference.error'));
				return;
			} else {
				setReferenceError('');
			}

			if (!humanActivePosition) {
				setReferenceError(t('askAddress.address.error'));
				setHasAddressError(true);
				return;
			} else {
				setHasAddressError(false);
			}

			setIsSubmitting(true);

			if (submitCallback) {
				if (activePosition && humanActivePosition) {
					submitCallback(activePosition, humanActivePosition);
				}
				return;
			}

			if (activePosition) {
				await postAddress(sessionId, {
					latitude: String(activePosition.lat) || '',
					longitude: String(activePosition.lng) || '',
					address: humanActivePosition,
					reference: addressReference,
				});
				openSuccesModal();
			}
		} catch (e) {
			setReferenceError('Hubo un problema al enviar la cita, vuelva a intentarlo');
			setIsSubmitting(false);
		}
	}, [addressReference, humanActivePosition, submitCallback, t, sessionId, activePosition, openSuccesModal]);
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
				}
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
		<div className={classes.form}>
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
			<Typography className={classes.addressReferenceLabel}>{t('askAddress.addressReference.label')}</Typography>
			<TextField
				className={classes.addressReferenceInput}
				value={addressReference}
				onChange={updateDirectionReference}
				name="address-reference"
				placeholder={t('askAddress.addressReference.placeholder')}
				variant="outlined"
				error={!!referenceError}
				helperText={referenceError}
				fullWidth
			/>
			{!isDesktop && <AddressBenefits />}
			<Button className={classes.submitButton} onClick={onSubmit} variant="contained" disabled={isSubmitting} fullWidth>
				{t('askAddress.submitAddress')}
			</Button>
		</div>
	);
};

export default AskAddressForm;

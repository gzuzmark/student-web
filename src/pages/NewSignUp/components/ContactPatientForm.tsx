import React, { useEffect, ReactElement, useCallback, useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField as MaterialTextField } from '@material-ui/core';
import SearchAddress from 'pages/LaboratoryExams/components/SearchAddress';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import GoogleMapReact, { Maps } from 'google-map-react';

import { Position } from 'pages/api';
import clsx from 'clsx';
import { stylesWithTheme } from 'utils/createStyles';
import { MapInstance, MapsApi, Place, Marker, FormattedPlace } from 'pages/AskAddress/types';
import { defaultCenter, getUserCurrentPosition } from 'utils';
import { contactPatientValidationSchema } from './validationSchema';
import { ContactPatientValues, ReducerAction } from '../types';
import { initialContactPatientValues } from '../constants';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '403px',
		},
	},
	addressReferenceLabel: {
		fontSize: '15px',
		paddingBottom: '10px',
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '25px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '27px',
			},
		},
	},
	mapWrapper: {
		height: '206px',
	},
	addressInput: {
		display: 'none',
		padding: '17px 12px 0 18px',
		width: 'calc(100% - 30px)',
	},
	fieldWithHelperText: {
		'& .MuiFormHelperText-root': {
			color: palette.info.main,
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: palette.error.main,
		},
	},
	privacyPolicyWrapper: {
		paddingBottom: '19px',
		[breakpoints.up('lg')]: {
			paddingBottom: '28px',
			marginRight: '-40px',
		},
	},
	legalInformation: {
		fontSize: '13px',
		color: palette.info.main,
	},
	addressReferenceInput: {
		marginBottom: '18px',
		[breakpoints.up('lg')]: {
			marginBottom: '33px',
		},
	},
	privacyPolicyLink: {
		fontSize: '13px',
		cursor: 'pointer',
		textDecoration: 'underline',
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

export interface ContactPatientFormProps {
	contactPatient: ContactPatientValues;
	onChangeStep: (payload: ReducerAction, redirectPath: string) => void;
	openPrivacyPolicy: () => void;
	openTermsAndConditions: () => void;
}

const ContactPatientForm = ({
	contactPatient,
	onChangeStep,
	openPrivacyPolicy,
	openTermsAndConditions,
}: ContactPatientFormProps): ReactElement => {
	const { t } = useTranslation('newSignUp');
	const classes = useStyles();
	const [humanActivePosition, setHumanActivePosition] = useState<string>('');
	const [currentPositionMarker, setCurrentPositionMarker] = useState<Marker>();
	const [activePosition, setActivePosition] = useState<Position | null>(null);
	const [mapsApi, setMapApi] = useState<MapsApi>();
	const [hasAddressError, setHasAddressError] = useState<boolean>(false);
	const [addressReference, setAddressReference] = useState<string>('');
	const [mapInstance, setMapInstance] = useState<MapInstance>();
	const [referenceError, setReferenceError] = useState<string>('');
	const [formattedPlace, setFormattedPlace] = useState<FormattedPlace>({
		name: '',
		district: '',
		country: '',
		city: '',
		number: '',
		street: '',
	});

	const updateDirectionReference = (e: ChangeEvent<HTMLInputElement>) => {
		setAddressReference(e.target.value);
	};

	const onSubmit = useCallback(
		(values: ContactPatientValues) => {
			try {
				if (!addressReference) {
					setReferenceError(t('contactPatient.addressReference.error'));
					return;
				} else {
					setReferenceError('');
				}

				if (!humanActivePosition) {
					setHasAddressError(true);
				} else {
					setHasAddressError(false);
				}

				const formatedValues: ContactPatientValues = {
					...values,
					identification: values.identification.trim(),
					identificationType: values.identificationType,
					email: values.email.trim(),
					address: JSON.stringify({
						...formattedPlace,
						notes: addressReference,
						latitude: activePosition?.lat,
						longitude: activePosition?.lng,
					}),
				};

				onChangeStep({ type: 'COMPLETE_CONTACT_STEP', contactPatient: formatedValues }, '/creacion_cuenta/password');
			} catch (e) {
				console.error(e);
			}
		},
		[activePosition, addressReference, formattedPlace, humanActivePosition, onChangeStep, t],
	);

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

	const updatePosition = useCallback(
		(place: Place | null) => {
			if (place && mapInstance && currentPositionMarker) {
				currentPositionMarker.setVisible(false);
				setHumanActivePosition(place.address);
				setFormattedPlace(place.formattedPlace);
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
		<Formik
			initialValues={contactPatient || initialContactPatientValues}
			onSubmit={onSubmit}
			validationSchema={contactPatientValidationSchema}
		>
			{({ submitForm, isSubmitting, setFieldValue, values }) => (
				<Form className={classes.form}>
					<div>
						<FormControl className={classes.fieldWrapper} fullWidth>
							<Field
								component={TextField}
								label={t('contactPatient.fields.identificationType.label')}
								name="identificationType"
								variant="outlined"
								select
							>
								<MenuItem value={0}>DNI</MenuItem>
								<MenuItem value={1}>CE</MenuItem>
							</Field>
						</FormControl>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="identification"
								label={t('contactPatient.fields.id.label')}
								variant="outlined"
								inputProps={{ maxLength: 11 }}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="phoneNumber"
								type="tel"
								label={t('contactPatient.fields.phoneNumber.label')}
								variant="outlined"
								helperText={t('contactPatient.fields.phoneNumber.helperText')}
								inputProps={{ maxLength: 9 }}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="email"
								label={t('contactPatient.fields.email.label')}
								variant="outlined"
								helperText={t('contactPatient.fields.email.helperText')}
								fullWidth
							/>
						</div>

						<>
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
								{t('contactPatient.addressReference.label')}
							</Typography>
							<MaterialTextField
								className={classes.addressReferenceInput}
								value={addressReference}
								onChange={updateDirectionReference}
								name="address-reference"
								placeholder={t('contactPatient.addressReference.placeholder')}
								variant="outlined"
								error={!!referenceError}
								helperText={referenceError}
								fullWidth
							/>
						</>
					</div>
					<div className={classes.privacyPolicyWrapper}>
						<Typography className={classes.legalInformation} component="span">
							{t('contactPatient.legalInformation.firstSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('contactPatient.legalInformation.privacyPolicyLink')}{' '}
						</Typography>
						<Typography className={classes.legalInformation} component="span">
							{t('contactPatient.legalInformation.secondSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openTermsAndConditions}
						>
							{t('contactPatient.legalInformation.termsAndConditionsLink')}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('contactPatient.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactPatientForm;

import React, { useEffect, useCallback, useState, ChangeEvent } from 'react';
import { TextField } from 'formik-material-ui';

import MaterialTextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './ContactPatientForm.styles';

import { defaultCenter, getUserCurrentPosition } from 'utils';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import GoogleMapReact, { Maps } from 'google-map-react';
import clsx from 'clsx';
import * as yup from 'yup';
import { Position } from 'pages/api';
import { MapInstance, MapsApi, Place, Marker } from 'pages/AskAddress/types';

import SearchAddress from 'pages/LaboratoryExams/components/SearchAddress';

const REQUIRED_FIELD = 'Campo obligatorio';

export interface ContactPatientValues {
	identificationType: string;
	identification: string;
	name: string;
	lastName: string;
	secondSurname: string;
	phoneNumber: string;
	email: string;
	address: string;
	// privacy: boolean;
	isTerm: boolean;
	isClub: boolean;
}

const GreenCheckbox = withStyles({
	root: {
		color: '#1ECD96',
		'&$checked': {
			color: '#1ECD96',
		},
	},
	checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

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

const initialValues: ContactPatientValues = {
	identification: '',
	identificationType: 'DNI',
	name: '',
	lastName: '',
	secondSurname: '',
	phoneNumber: '',
	email: '',
	address: '',
	// privacy: true,
	isTerm: false,
	isClub: false,
};

const validationSchema = yup.object().shape({
	identificationType: yup.string().required(REQUIRED_FIELD),
	identification: yup
		.string()
		.min(8, 'Mínimo 8 caracteres')
		.max(12, 'Máximo 12 caracteres')
		.nullable()
		.required(REQUIRED_FIELD),
	name: yup.string().required(REQUIRED_FIELD),
	lastName: yup.string().required(REQUIRED_FIELD),
	secondSurname: yup.string().required(REQUIRED_FIELD),
	phoneNumber: yup
		.string()
		.min(9, '9 caracteres')
		.max(9, '9 caracteres')
		// eslint-disable-next-line
		// @ts-ignore
		.digits('9 caracteres')
		.required(REQUIRED_FIELD),
	email: yup.string().required(REQUIRED_FIELD).email('Correo inválido'),
	address: yup.string().required(REQUIRED_FIELD),
	// isTerm: yup.boolean().isTrue(),
	isTerm: yup
		.bool()
		.required('Se requiere aceptar los términos y condiciones')
		.oneOf([true], 'Se requiere aceptar los términos y condiciones'),
});

export interface ContactPatientFormProps {
	contactData: ContactPatientValues | undefined;
	onChangeStep: (values: ContactPatientValues, onError?: Function) => void;
	openPrivacyPolicy: () => void;
	openTermsAndConditions: () => void;
	openDataAnalitycs: () => void;
}

const ContactPatientForm = ({
	contactData,
	onChangeStep,
	openPrivacyPolicy,
	openTermsAndConditions,
	openDataAnalitycs,
}: ContactPatientFormProps) => {
	const { t } = useTranslation('clinicalExamination');
	const classes = useStyles();
	const [humanActivePosition, setHumanActivePosition] = useState<string>('');
	const [currentPositionMarker, setCurrentPositionMarker] = useState<Marker>();
	const [activePosition, setActivePosition] = useState<Position | null>(null);
	const [mapsApi, setMapApi] = useState<MapsApi>();
	const [addressReference, setAddressReference] = useState<string>('');
	const [mapInstance, setMapInstance] = useState<MapInstance>();
	// const [formattedPlace, setFormattedPlace] = useState<FormattedPlace>({
	// 	name: '',
	// 	district: '',
	// 	country: '',
	// 	city: '',
	// 	number: '',
	// 	street: '',
	// });
	const updateDirectionReference = (e: ChangeEvent<HTMLInputElement>) => {
		setAddressReference(e.target.value);
	};

	const onSubmit = useCallback(
		(values: ContactPatientValues, { setSubmitting }: { setSubmitting: Function; setFieldError: Function }) => {
			onChangeStep(values);
			setSubmitting(false);
		},
		[onChangeStep],
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
				// setFormattedPlace(place.formattedPlace);
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
		<Formik initialValues={contactData || initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting, values, setFieldValue }) => (
				<Form className={classes.form}>
					<div>
						<FormControl className={classes.fieldWrapper} fullWidth>
							<Field
								component={TextField}
								label={t('contact.fields.idType.label')}
								name="identificationType"
								variant="outlined"
								select
							>
								<MenuItem value={'1'}>DNI</MenuItem>
								<MenuItem value={'2'}>CE</MenuItem>
							</Field>
						</FormControl>

						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="identification"
								label={t('contact.fields.id')}
								type="text"
								variant="outlined"
								inputProps={{ maxLength: 11 }}
								fullWidth
							/>
						</div>

						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="name"
								label={t('aboutme.fields.name.label')}
								variant="outlined"
								inputProps={{ maxLength: 75 }}
								fullWidth
							/>
						</div>

						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="lastName"
								label={t('aboutme.fields.lastName.label')}
								variant="outlined"
								fullWidth
							/>
						</div>

						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="secondSurname"
								label={t('aboutme.fields.secondSurname.label')}
								variant="outlined"
								fullWidth
							/>
						</div>

						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="phoneNumber"
								type="number"
								label={t('contactPatient.fields.phoneNumber.label')}
								variant="outlined"
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
								fullWidth
							/>
						</div>

						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="address"
								label={t('contactPatient.fields.adress.label')}
								variant="outlined"
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
								placeholder={t('contactPatient.addressReference.label')}
								variant="outlined"
								fullWidth
							/>
						</>
					</div>

					<div className={classes.fieldWrapper}>
						<FormControlLabel
							control={
								<>
									<GreenCheckbox
										name="isTerm"
										color="primary"
										onChange={() => setFieldValue('isTerm', !values.isTerm)}
									/>
								</>
							}
							label={
								<>
									<Typography className={classes.legalInformation} component="span">
										{t('contact.legalInformation.firstSection1')}{' '}
									</Typography>
									<Typography
										className={classes.privacyPolicyLink}
										component="span"
										color="primary"
										onClick={openTermsAndConditions}
									>
										{t('contact.legalInformation.termsAndConditionsLink1')}{' '}
									</Typography>
									<Typography className={classes.legalInformation} component="span">
										{t('contact.legalInformation.secondSection1')}{' '}
									</Typography>
									<Typography
										className={classes.privacyPolicyLink}
										component="span"
										color="primary"
										onClick={openPrivacyPolicy}
									>
										{t('contact.legalInformation.privacyPolicyLink1')}{' '}
									</Typography>
								</>
							}
						/>
						<ErrorMessage className={classes.termsConditions} name="isTerm" component="p"></ErrorMessage>
					</div>

					<div className={classes.fieldWrapper}>
						<FormControlLabel
							className={classes.checkbox}
							control={
								<>
									<GreenCheckbox
										name="isClub"
										color="primary"
										onChange={() => setFieldValue('isClub', !values.isClub)}
									/>
								</>
							}
							label={
								<>
									<Typography className={classes.legalInformation} component="span">
										{t('contact.legalInformation.firstSection2')}{' '}
									</Typography>
									<Typography
										className={classes.privacyPolicyLink}
										component="span"
										color="primary"
										onClick={openDataAnalitycs}
									>
										{t('contact.legalInformation.analysisData')}{' '}
									</Typography>
								</>
							}
						/>
					</div>

					<div className={classes.fieldWrapper}>
						<Button
							variant="contained"
							fullWidth
							onClick={submitForm}
							disabled={isSubmitting || values.isTerm === false}
						>
							{t('contactPatient.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactPatientForm;

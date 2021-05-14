import React, { useEffect, ReactElement, useCallback, useState, ChangeEvent } from 'react';
import { TextField } from 'formik-material-ui';

import MaterialTextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './ContactPatientForm.styles';

import { defaultCenter, getUserCurrentPosition } from 'utils';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import GoogleMapReact, { Maps } from 'google-map-react';
import clsx from 'clsx';
import * as yup from 'yup';
import { Position } from 'pages/api';
import { MapInstance, MapsApi, Place, Marker, FormattedPlace } from 'pages/AskAddress/types';

import SearchAddress from 'pages/LaboratoryExams/components/SearchAddress';

const REQUIRED_FIELD = 'Campo obligatorio';

export interface ContactPatientValues {
	identification: string;
	name: string;
	phoneNumber: string;
	email: string;
	address: string;
	privacy: boolean;
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
	name: '',
	phoneNumber: '',
	email: '',
	address: '',
	privacy: true,
};

const validationSchema = yup.object().shape({
	identification: yup
		.string()
		.matches(/^[0-9]*$/, { message: 'Solo números' })
		.required(REQUIRED_FIELD)
		.min(8, 'Mínimo 8 caracteres'),
	name: yup.string().required(REQUIRED_FIELD),
	phoneNumber: yup
		.string()
		.matches(/^[0-9]*$/, { message: 'Solo números' })
		.required(REQUIRED_FIELD)
		.min(9, '9 caracteres'),
	email: yup.string().required(REQUIRED_FIELD).email('Correo inválido'),
	address: yup.string().required(REQUIRED_FIELD),
	privacy: yup.boolean().isTrue(),
});

export interface ContactPatientFormProps {
	contactData: ContactPatientValues | undefined;
	onChangeStep: (values: ContactPatientValues, onError?: Function) => void;
	openPrivacyPolicy: () => void;
}

const ContactPatientForm = ({
	contactData,
	onChangeStep,
	openPrivacyPolicy,
}: ContactPatientFormProps): ReactElement => {
	const { t } = useTranslation('clinicalExamination');
	const classes = useStyles();
	const [humanActivePosition, setHumanActivePosition] = useState<string>('');
	const [currentPositionMarker, setCurrentPositionMarker] = useState<Marker>();
	const [activePosition, setActivePosition] = useState<Position | null>(null);
	const [mapsApi, setMapApi] = useState<MapsApi>();
	const [addressReference, setAddressReference] = useState<string>('');
	const [mapInstance, setMapInstance] = useState<MapInstance>();
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
		(values: ContactPatientValues, { setSubmitting }: { setSubmitting: Function; setFieldError: Function }) => {
			onChangeStep(values);
			setSubmitting(false);
		},
		[onChangeStep],
	);

	const onGoogleApiLoaded = ({ maps, map }: { maps: MapsApi; map: MapInstance }) => {
		const addressInputWrapper = document.querySelector<HTMLElement>('.address-input-wrapper');
		console.log(formattedPlace);
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
		<Formik initialValues={contactData || initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting, isValid, dirty }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="identification"
								label={t('contactPatient.fields.id.label')}
								variant="outlined"
								inputProps={{ maxLength: 12 }}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="name"
								label={t('contactPatient.fields.name.label')}
								variant="outlined"
								inputProps={{ maxLength: 75 }}
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
					<div className={classes.privacyPolicyWrapper}>
						<FormControlLabel className={classes.checkbox} control={<GreenCheckbox name="privacy" />} label="" />
						{/* <Field component={FormikCheckbox} type="checkbox" name="privacy" /> */}
						<Typography
							className={classes.legalInformation}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('contactPatient.legalInformation.privacyPolicyLink')}{' '}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={!(dirty && isValid) || isSubmitting}>
							{t('contactPatient.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactPatientForm;

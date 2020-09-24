import React, { ReactElement, useState, useEffect } from 'react';
import { RightLayout } from 'pages/common';
import GoogleMapReact, { Maps } from 'google-map-react';
import { Button, Theme, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme, usePageTitle } from 'utils';
import { Position, Laboratory, getLaboratories } from 'pages/api';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as SmallMarkerIcon } from 'icons/small_marker.svg';

import Marker from './Marker';
import LaboratoryCard from './LaboratoryCard';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		height: 'calc(100vh - 50px)',
		[breakpoints.up('lg')]: {
			height: 'calc(100vh - 80px)',
		},
		'&&': {
			padding: 0,
			position: 'relative',
		},
	},
	laboratoriesWrapper: {
		width: 'calc(100vw - 24px)',
		overflow: 'scroll',
		position: 'absolute',
		'scrollbar-width': 'none',
		'-ms-overflow-style': 'none',
		'&::-webkit-scrollbar': {
			height: '0',
			width: '0',
		},
		bottom: '12px',
		left: '12px',

		[breakpoints.up('lg')]: {
			width: 'calc(100vw - 515px - 24px)',
			bottom: '24px',
			left: '24px',
		},
	},
	laboratories: {
		display: 'flex',
		width: ({ laboratories }: { laboratories: number }) => `calc(322px * ${laboratories})`,
		[breakpoints.up('lg')]: {
			width: ({ laboratories }: { laboratories: number }) => `calc(341px * ${laboratories})`,
		},
	},
	closeButtonWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			position: 'absolute',
			top: '32px',
			left: '24px',
		},
	},
	closeButton: {
		'&&': {
			boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.24)',
			color: 'grey',
			backgroundColor: 'white',
			borderRadius: '50%',
			minWidth: '40px',
			padding: '10px 0',
		},
	},
	currentPositionWrapper: {
		position: 'absolute',
		zIndex: 2,
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white',
	},
	currentPosition: {
		display: 'flex',
	},
}));

const defaultCenter: Position = {
	lat: -12.0552497,
	lng: -77.0539775,
};
const mapOptionsCreator = (map: Maps) => ({
	fullscreenControl: false,
	zoomControlOptions: {
		position: map.ControlPosition.RIGHT_TOP,
	},
});

const getCurrentPosition = (setGeoCenter: Function, setActivePosition: Function) => {
	const successCurrentPosition = (pos: { coords: { latitude: number; longitude: number } }) => {
		const crd = pos.coords;
		const currentPosition = {
			lat: crd.latitude,
			lng: crd.longitude,
		};

		setGeoCenter(currentPosition);
		setActivePosition(currentPosition);
	};
	const errorCurrentPosition = () => {
		setGeoCenter(defaultCenter);
	};

	navigator.geolocation.getCurrentPosition(successCurrentPosition, errorCurrentPosition, {
		enableHighAccuracy: true,
		timeout: 5000,
	});
};

const requestLaboratories = async (setLaboratories: Function) => {
	const laboratories = await getLaboratories();

	setLaboratories(laboratories);
};

type MapsApi = typeof google.maps;

const LaboratoriesMap = (): ReactElement | null => {
	const [geoCenter, setGeoCenter] = useState<Position | null>(null);
	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
	const [activeMarker, setActiveMarker] = useState<number>(0);
	const [activePosition, setActivePosition] = useState<Position | null>(null);
	const [humanActivePosition, setHumanActivePosition] = useState<string>('');
	const [mapApi, setMapApi] = useState<MapsApi>();
	const history = useHistory();
	const { t } = useTranslation('laboratoriesExams');
	const selectLaboratory = (index: number) => () => {
		if (activeMarker !== index) {
			setActiveMarker(index);
		}
	};
	const classes = useStyles({ laboratories: laboratories.length });
	const closeMap = () => {
		history.push('dashboard/laboratorios');
	};

	usePageTitle('Laboratorios Cercanos');

	useEffect(() => {
		getCurrentPosition(setGeoCenter, setActivePosition);
		requestLaboratories(setLaboratories);
	}, []);
	useEffect(() => {
		if (activePosition && mapApi) {
			const geocoder = new mapApi.Geocoder();
			geocoder.geocode(
				{ location: activePosition },
				(results: google.maps.GeocoderResult[], responseStatus: google.maps.GeocoderStatus) => {
					if (responseStatus === 'OK') {
						if (results[0]) {
							setHumanActivePosition(results[0].formatted_address);
						}
					}
				},
			);
		}
	}, [activePosition, mapApi]);

	if (laboratories.length < 1) {
		return null;
	}

	if (!geoCenter) {
		return null;
	}

	return (
		<RightLayout className={classes.layout}>
			<div className={classes.currentPositionWrapper}>
				<Typography>{t('laboratories.map.closest.title')}</Typography>
				<div className={classes.currentPosition}>
					<SmallMarkerIcon />
					<Typography>{humanActivePosition || 'Av. Schell 325, Miraflores, Lima'}</Typography>
					<Button variant="text">{t('laboratories.map.closest.changePosition')}</Button>
				</div>
			</div>
			<GoogleMapReact
				bootstrapURLKeys={{ key: '' }}
				defaultCenter={geoCenter || defaultCenter}
				defaultZoom={15}
				options={mapOptionsCreator}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ maps }) => setMapApi(maps)}
			>
				{laboratories.map(({ name, pos }, index) => (
					<Marker key={name} {...pos} isActive={activeMarker === index} />
				))}
				{geoCenter ? <Marker {...geoCenter} isUser /> : null}
			</GoogleMapReact>
			<div className={classes.laboratoriesWrapper}>
				<div className={classes.laboratories}>
					{laboratories.map((laboratory, index) => (
						<LaboratoryCard
							key={laboratory.name}
							isActive={activeMarker === index}
							onClick={selectLaboratory(index)}
							{...laboratory}
						/>
					))}
				</div>
			</div>
			<div className={classes.closeButtonWrapper}>
				<Button className={classes.closeButton} variant="contained" onClick={closeMap}>
					<CloseIcon />
				</Button>
			</div>
		</RightLayout>
	);
};

export default LaboratoriesMap;

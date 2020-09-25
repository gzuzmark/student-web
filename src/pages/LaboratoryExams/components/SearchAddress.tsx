import React, { ReactElement, useEffect, useState, useMemo } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash/throttle';

import { Position } from 'pages/api';

import { MapsApi, Place } from './types';

interface SearchAddressProps {
	defaultValue: string;
	defaultPosition: Position | null;
	updatePosition: (place: Place | null) => void;
	mapsApi: MapsApi | undefined;
}

const SearchAddress = ({
	defaultValue,
	defaultPosition,
	updatePosition,
	mapsApi,
}: SearchAddressProps): ReactElement | null => {
	const [inputValue, setInputValue] = useState<string>(defaultValue);
	const [value, setValue] = useState<Place | null>(
		defaultPosition ? { address: defaultValue, position: defaultPosition } : null,
	);
	const [options, setOptions] = useState<Place[]>([]);
	const fetch = useMemo(
		() =>
			throttle((request: { input: string }, callback: (results?: Place[]) => void) => {
				if (mapsApi) {
					const geocoder = new mapsApi.Geocoder();
					geocoder.geocode(
						{ address: request.input },
						(results: google.maps.GeocoderResult[], responseStatus: google.maps.GeocoderStatus) => {
							if (responseStatus === 'OK') {
								callback(
									results.map(({ formatted_address, geometry: { location } }) => ({
										address: formatted_address,
										position: { lat: location.lat(), lng: location.lng() },
									})),
								);
							}
						},
					);
				}
			}, 500),
		[mapsApi],
	);

	useEffect(() => {
		let active = true;

		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch({ input: inputValue }, (results?: Place[]) => {
			if (active) {
				let newOptions = [] as Place[];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [fetch, inputValue, value]);

	return (
		<Autocomplete
			options={options}
			getOptionLabel={(option) => (typeof option === 'string' ? option : option.address)}
			value={value}
			filterSelectedOptions
			fullWidth
			onChange={(_, newValue: Place | null) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
				updatePosition(newValue);
			}}
			onInputChange={(_, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
		/>
	);
};

export default SearchAddress;

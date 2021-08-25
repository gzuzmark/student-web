import React, { ReactElement, useEffect, useState, useMemo } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import throttle from 'lodash/throttle';

import { Position } from 'pages/api';

import { MapsApi, Place, FormattedPlace, AddressComponent, AddressTypesEnum } from './types';
import { useTranslation } from 'react-i18next';

interface SearchAddressProps {
	id?: string;
	className?: string;
	hasError?: boolean;
	defaultValue: string;
	defaultPosition: Position | null;
	updatePosition: (place: Place | null) => void;
	mapsApi: MapsApi | undefined;
	country?: string;
	province?: string;
	district?: string;
	addressNumber?: string;
}

const findAddressItem = (addressComponents: AddressComponent[], key: string): AddressComponent | undefined => {
	return addressComponents.find((item) => item.types.find((type) => type === key));
};

const getFormattedAddress = (addressComponents: AddressComponent[], country: string | undefined): string | null => {
	const street = findAddressItem(addressComponents, AddressTypesEnum.street)?.long_name;
	const districtValue = findAddressItem(addressComponents, AddressTypesEnum.district)?.long_name;
	const cityValue = findAddressItem(addressComponents, AddressTypesEnum.city)?.long_name;
	const countryValue = findAddressItem(addressComponents, AddressTypesEnum.country)?.long_name;
	if (countryValue !== undefined && String(countryValue) !== country) {
		return null;
	}
	if (street === undefined) {
		return null;
	}
	return `${street}, ${districtValue}, ${cityValue}, ${countryValue}`;
};

const getFormattedPlace = (addressComponents: AddressComponent[]): FormattedPlace => {
	const number = findAddressItem(addressComponents, AddressTypesEnum.number);
	const street = findAddressItem(addressComponents, AddressTypesEnum.street);
	const district = findAddressItem(addressComponents, AddressTypesEnum.district);
	const city = findAddressItem(addressComponents, AddressTypesEnum.city);
	const country = findAddressItem(addressComponents, AddressTypesEnum.country);
	const name = findAddressItem(addressComponents, AddressTypesEnum.name);
	return {
		number: number?.long_name || '',
		street: street?.long_name || '',
		district: district?.long_name || '',
		city: city?.long_name || '',
		country: country?.long_name || '',
		name: name?.long_name || 'Dirección delivery',
	};
};

const SearchAddress = ({
	id,
	className,
	defaultValue,
	defaultPosition,
	hasError,
	updatePosition,
	mapsApi,
	country,
	province,
	district,
}: SearchAddressProps): ReactElement | null => {
	const { t } = useTranslation('askAddress');
	const [inputValue, setInputValue] = useState<string>(defaultValue);
	const [value, setValue] = useState<Place | null>(
		defaultPosition
			? {
					address: defaultValue,
					position: defaultPosition,
					formattedPlace: {
						number: '',
						street: '',
						district: '',
						city: '',
						country: '',
						name: '',
					},
			  }
			: null,
	);
	const [options, setOptions] = useState<Place[]>([]);

	const fetch = useMemo(
		() =>
			throttle((request: { input: string }, callback: (results?: Place[]) => void) => {
				if (mapsApi) {
					const geocoder = new mapsApi.Geocoder();

					const search = `${request.input}, ${district}`;

					geocoder.geocode(
						{ address: search, region: `${province}, ${country}` },
						(results: google.maps.GeocoderResult[], responseStatus: google.maps.GeocoderStatus) => {
							if (responseStatus === 'OK') {
								const listResults = results
									.map(({ address_components, geometry: { location } }) => {
										const formatAddress = getFormattedAddress(address_components, country);
										return {
											address: formatAddress || '',
											position: {
												lat: Number.parseFloat(location.lat().toFixed(7)) || location.lat(),
												lng: Number.parseFloat(location.lng().toFixed(7)) || location.lng(),
											},
											formattedPlace: getFormattedPlace(address_components),
										};
									})
									.filter(({ address }) => address !== '');
								callback(listResults);
							}
						},
					);
				}
			}, 500),
		[country, district, mapsApi, province],
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
			id={id}
			className={className}
			options={options}
			getOptionLabel={(option) => (typeof option === 'string' ? option : option.address)}
			filterOptions={(x) => x}
			value={value}
			autoComplete
			noOptionsText={t('askAddress.noOptionsAutocomplete')}
			filterSelectedOptions
			includeInputInList
			onChange={(_, newValue: Place | null) => {
				setValue(newValue);
				updatePosition(newValue);
			}}
			renderInput={(params) => (
				<TextField
					variant="outlined"
					error={hasError}
					{...params}
					placeholder={t('askAddress.address.placeholder')}
					helperText={hasError ? t('askAddress.address.error') : ''}
				/>
			)}
			onInputChange={(_: React.ChangeEvent<{}>, newInputValue: string) => {
				setInputValue(newInputValue);
			}}
			renderOption={(option) => {
				return <Typography>{option.address}</Typography>;
			}}
		/>
	);
};

export default SearchAddress;

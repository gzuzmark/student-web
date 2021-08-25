import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Distrito, getDistritosByProvinciaId, Provincia } from 'pages/api';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DistritoSearchProps {
	className?: string;
	province: Provincia | null;
	onChange?: (value: Distrito | null) => void;
}

const DistritoSearch = ({ className, province, onChange }: DistritoSearchProps): ReactElement => {
	const { t } = useTranslation('askAddress');
	const [listDistrites, setListDistrites] = useState<Distrito[]>([]);
	const [distrite, setDistrite] = useState<Distrito | null>(null);

	const onChangeSelect = (_: ChangeEvent<{}>, newValue: Distrito | null) => {
		setDistrite(newValue);
		if (onChange) {
			onChange(newValue);
		}
	};

	useEffect(() => {
		if (province === null) {
			setListDistrites([]);
		} else {
			const { id } = province;
			setListDistrites(getDistritosByProvinciaId(id));
		}
		setDistrite(null);
	}, [province]);

	return (
		<Autocomplete
			className={className}
			options={listDistrites}
			getOptionLabel={(option) => option.name}
			noOptionsText={t('askAddress.noOptionsAutocomplete')}
			value={distrite}
			autoComplete
			fullWidth
			onChange={onChangeSelect}
			renderInput={(params) => (
				<TextField {...params} placeholder={t('askAddress.addressDistrict.placeholder')} variant="outlined" />
			)}
		/>
	);
};

export default DistritoSearch;

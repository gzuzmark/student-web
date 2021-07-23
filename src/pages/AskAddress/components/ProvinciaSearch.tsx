import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Departamento, getProvinciasByDepartamentoId, Provincia } from 'pages/api';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ProvinciaSearchProps {
	className?: string;
	departament: Departamento | null;
	onChange?: (value: Provincia | null) => void;
}

const ProvinciaSearch = ({ className, departament, onChange }: ProvinciaSearchProps): ReactElement => {
	const { t } = useTranslation('askAddress');
	const refAutocomplete = useRef(null);
	const [listProvinces, setListProvinces] = useState<Provincia[]>([]);
	const [province, setProvince] = useState<Provincia | null>(null);

	const onChangeSelect = (_: ChangeEvent<{}>, newValue: Provincia | null) => {
		setProvince(newValue);
		if (onChange) {
			onChange(newValue);
		}
	};

	useEffect(() => {
		if (departament === null) {
			setListProvinces([]);
		} else {
			const { id } = departament;
			setListProvinces(getProvinciasByDepartamentoId(id));
		}
		setProvince(null);
	}, [departament]);

	return (
		<Autocomplete
			ref={refAutocomplete}
			className={className}
			options={listProvinces}
			getOptionLabel={(option) => option.name}
			noOptionsText={t('askAddress.noOptionsAutocomplete')}
			value={province}
			autoComplete
			fullWidth
			onChange={onChangeSelect}
			renderInput={(params) => (
				<TextField {...params} placeholder={t('askAddress.addressProvince.placeholder')} variant="outlined" />
			)}
		/>
	);
};

export default ProvinciaSearch;

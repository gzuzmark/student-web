import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Departamento, getDepartamentos } from 'pages/api';
import React, { ReactElement, useState } from 'react';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface DepartamentoSearchProps {
	className?: string;
	onChange?: (value: Departamento | null) => void;
}

const DepartamentoSearch = ({ className, onChange }: DepartamentoSearchProps): ReactElement => {
	const { t } = useTranslation('askAddress');
	const [listDepartaments] = useState<Departamento[]>(getDepartamentos());
	const [departament, setDepartament] = useState<Departamento | null>(null);

	const onChangeSelect = (_: ChangeEvent<{}>, newValue: Departamento | null) => {
		setDepartament(newValue);
		if (onChange) {
			onChange(newValue);
		}
	};

	return (
		<Autocomplete
			className={className}
			options={listDepartaments}
			getOptionLabel={(option) => option.name}
			autoComplete
			fullWidth
			value={departament}
			noOptionsText={t('askAddress.noOptionsAutocomplete')}
			onChange={onChangeSelect}
			renderInput={(params) => (
				<TextField {...params} placeholder={t('askAddress.addressDepartament.placeholder')} variant="outlined" />
			)}
		/>
	);
};

export default DepartamentoSearch;

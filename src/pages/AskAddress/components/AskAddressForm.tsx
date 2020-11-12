import React, { useState, ReactElement, ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';

import AddressBenefits from './AddressBenefits';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			paddingRight: '68px',
		},
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

const AskAddressForm = (): ReactElement | null => {
	const { t } = useTranslation('askAddress');
	const [directionReference, setDirectionReference] = useState<string>('');
	const [referenceError, setReferenceError] = useState<string>('');
	const updateDirectionReference = (e: ChangeEvent<HTMLInputElement>) => {
		setDirectionReference(e.target.value);
	};
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const onSubmit = () => {
		if (!directionReference) {
			setReferenceError(t('askAddress.addressReference.error'));
		}
	};

	return (
		<div className={classes.form}>
			<div>Gmap</div>
			<Typography className={classes.addressReferenceLabel}>{t('askAddress.addressReference.label')}</Typography>
			<TextField
				className={classes.addressReferenceInput}
				value={directionReference}
				onChange={updateDirectionReference}
				name="direction-reference"
				placeholder={t('askAddress.addressReference.placeholder')}
				variant="outlined"
				error={!!referenceError}
				helperText={referenceError}
				fullWidth
			/>
			{!isDesktop && <AddressBenefits />}
			<Button className={classes.submitButton} onClick={onSubmit} variant="contained" fullWidth>
				{t('askAddress.submitAddress')}
			</Button>
		</div>
	);
};

export default AskAddressForm;

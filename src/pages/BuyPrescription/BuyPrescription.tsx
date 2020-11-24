import React, { ReactElement, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';

import { getPrescription } from 'pages/api';
import { PrescribedMedicine } from 'pages/api/userPrescription';
import { ReactComponent as BrandLogo } from 'icons/brand.svg';
import { stylesWithTheme } from 'utils';

import Medicines from './components/Medicines';
import CheckoutInformation from './components/CheckoutInformation';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		height: 'calc(100vh - 44px)',
		position: 'relative',
		padding: '44px 13px 0 13px',
		[breakpoints.up('lg')]: {
			height: 'calc(100vh - 70px)',
			padding: '70px 0 0 208px',
		},
	},
	brandLogo: {
		width: '59px',
		height: '18px',
	},
	title: {
		fontWeight: 'bold',
		padding: '0 75px 5px 0',

		[breakpoints.up('lg')]: {
			fontSize: '38px',
			padding: '0 0 15px 0',
		},
	},
	subTitle: {
		textTransform: 'none',
		paddingBottom: '20px',
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '20px',
			lineHeight: '25px',
			paddingBottom: '30px',
		},
	},
	body: {
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
}));

const requestPrescription = async ({
	setMedicines,
	setUserAddress,
}: {
	setMedicines: Function;
	setUserAddress: Function;
}) => {
	try {
		const prescription = await getPrescription();

		setUserAddress(prescription.address);
		setMedicines(prescription.medicines);
	} catch (e) {}
};

const BuyPrescription = (): ReactElement => {
	const { t } = useTranslation('buyPrescription');
	const [selectedMedicines, setSelectedMedicines] = useState<number[]>([]);
	const [medicines, setMedicines] = useState<PrescribedMedicine[]>([]);
	const [userAddress, setUserAddress] = useState<string>('');
	const classes = useStyles();
	const toggleMedicine = (index: number) => () => {
		const positionIndex = selectedMedicines.indexOf(index);
		const alreadySelected = positionIndex > -1;

		let newSelectedMedicines: number[] = [];

		if (alreadySelected) {
			newSelectedMedicines = [...selectedMedicines];

			newSelectedMedicines.splice(positionIndex, 1);
		} else {
			newSelectedMedicines = [...selectedMedicines, index];
		}

		setSelectedMedicines(newSelectedMedicines);
	};

	useEffect(() => {
		requestPrescription({ setMedicines, setUserAddress });
	}, []);

	return (
		<div className={classes.container}>
			<div>
				<BrandLogo className={classes.brandLogo} />
			</div>
			<Typography className={classes.title} variant="h1">
				{t('buyPrescription.title')}
			</Typography>
			<Typography className={classes.subTitle}>{t('buyPrescription.subTitle')}</Typography>
			<div className={classes.body}>
				<Medicines medicines={medicines} selectedMedicines={selectedMedicines} toggleMedicine={toggleMedicine} />
				<Divider orientation="vertical" flexItem />
				<CheckoutInformation address={userAddress} medicines={medicines} selectedMedicines={selectedMedicines} />
			</div>
		</div>
	);
};

export default BuyPrescription;

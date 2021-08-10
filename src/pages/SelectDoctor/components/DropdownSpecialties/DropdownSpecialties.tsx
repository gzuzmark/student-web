import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import DownImage from 'icons/down.png';
import { DEV_IMAGES, isDevelopment, PROD_IMAGES, SpecialtyType } from 'utils/skillImages';
import ModalSpecialties from '../ModalSpecialties/ModalSpecialties';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles(({ breakpoints }: Theme) =>
	createStyles({
		divContainer: {
			display: 'flex',
			height: '48px',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			boxShadow: '0px 1px 4px rgb(103, 111, 143, 0.3)',
			margin: '0px',
			marginBottom: '3px',
		},
		dropdown: {
			display: 'flex',
			alignItems: 'center',
			padding: '0px 80px',
			cursor: 'pointer',
		},
		label: {
			fontFamily: 'Mulish, sans-serif',
			fontStyle: 'Normal',
			fontWeight: 500,
			fontSize: '20px',
			lineHeight: '24px',
			color: '#676F8F',
		},
		image: {
			marginRight: '36px',
			width: '28px',
			height: '28px',
		},
		downUpImage: {
			marginTop: '7px',
			marginLeft: '36px',
			width: '24px',
			height: '24px',
		},
	}),
);

interface DropdownSpecialtiesProps {
	specialityId: string | null | undefined;
	onChange?: (specialityId: string) => void;
}

const DropdownSpecialties = ({ specialityId }: DropdownSpecialtiesProps) => {
	const classes = useStyles();

	const [isOpen, setIsOpen] = useState(false);
	const [speciality, setSpeciality] = useState<SpecialtyType | null | undefined>(null);

	const clickMenu = () => {
		setIsOpen(true);
	};

	const onCloseModal = (skill: SpecialtyType | null) => {
		if (skill !== null) {
			setSpeciality(skill);
		}
		setIsOpen(false);
	};

	useEffect(() => {
		if (specialityId !== null && specialityId !== undefined) {
			const listSpecialties = isDevelopment() ? DEV_IMAGES : PROD_IMAGES;
			const selected: SpecialtyType | undefined = listSpecialties.find(({ id }) => id === specialityId);
			if (selected !== undefined) {
				setSpeciality(selected);
			}
		}
	}, [specialityId]);

	return (
		<div className={classes.divContainer}>
			<div className={classes.dropdown} onClick={clickMenu}>
				<span>
					<img alt="" className={classes.image} src={speciality?.image} />
				</span>
				<span className={classes.label}>{speciality?.label}</span>{' '}
				<span>
					<img alt="" className={classes.downUpImage} src={DownImage} />
				</span>
			</div>
			<ModalSpecialties isOpen={isOpen} defaultSpecialty={speciality} onCloseModal={onCloseModal} />
		</div>
	);
};

export default DropdownSpecialties;

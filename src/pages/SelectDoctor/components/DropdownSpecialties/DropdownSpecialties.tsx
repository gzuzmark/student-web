import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DownImage from 'icons/down.png';
import React, { useEffect, useState } from 'react';
import { DEV_IMAGES, isDevelopment, PROD_IMAGES, SpecialtyType } from 'utils/skillImages';
import ModalSpecialties from '../ModalSpecialties/ModalSpecialties';
import clsx from 'clsx';

const useStyles = makeStyles(({ breakpoints, transitions }: Theme) =>
	createStyles({
		divContainer: {
			// position: 'fixed',
			width: '100%',
			display: 'flex',
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
			margin: '16px 0px',
			cursor: 'pointer',
			[breakpoints.down('md')]: {
				padding: '0px 20px',
			},
		},
		label: {
			fontFamily: 'Mulish, sans-serif',
			fontStyle: 'Normal',
			fontWeight: 500,
			fontSize: '20px',
			lineHeight: '24px',
			color: '#676F8F',
			textAlign: 'center',
		},
		labelOpen: {
			color: '#A3ABCC',
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
			transition: transitions.create(['transform'], {
				duration: transitions.duration.short,
			}),
		},
		dropdownOpen: {
			transform: 'rotate(-180deg)',
		},
		dropdownClosed: {
			transform: 'rotate(0)',
		},
	}),
);

interface DropdownSpecialtiesProps {
	onlyView?: boolean;
	specialityId: string | null | undefined;
	onChange?: (specialityId: string) => void;
	onClick?: () => void; // used only view in header menu
}

const DropdownSpecialties = ({ specialityId, onlyView = false, onClick, onChange }: DropdownSpecialtiesProps) => {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(onlyView);
	const [speciality, setSpeciality] = useState<SpecialtyType | null | undefined>(null);

	const clickMenu = () => {
		if (onlyView && onClick) {
			onClick();
			return;
		}
		setIsOpen(true);
	};

	const onCloseModal = (skill: SpecialtyType | null) => {
		if (skill !== null) {
			setSpeciality(skill);
			if (onChange) {
				onChange(skill.id);
			}
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
					<img alt={speciality?.label} className={classes.image} src={speciality?.image} />
				</span>
				<div className={clsx(classes.label, isOpen && classes.labelOpen)}>{speciality?.label}</div>
				<span>
					<img
						alt=""
						className={clsx(classes.downUpImage, isOpen ? classes.dropdownOpen : classes.dropdownClosed)}
						src={DownImage}
					/>
				</span>
			</div>
			{!onlyView && <ModalSpecialties isOpen={isOpen} defaultSpecialty={speciality} onCloseModal={onCloseModal} />}
		</div>
	);
};

export default DropdownSpecialties;

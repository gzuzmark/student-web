import { Button, Dialog, Grid, Theme, Typography, useMediaQuery } from '@material-ui/core';
import closeIcon from 'icons/close.png';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DEV_IMAGES, isDevelopment, PROD_IMAGES, SpecialtyType } from 'utils/skillImages';
import DropdownSpecialties from '../DropdownSpecialties/DropdownSpecialties';
import SpecialtyCard from '../SpecialtyCard/SpecialtyCard';
import useStyles from './styles';

interface ModalSpecialtiesProps {
	isOpen: boolean;
	onCloseModal: (skill: SpecialtyType | null) => void;
	defaultSpecialty: SpecialtyType | null | undefined;
}

const ModalSpecialties = ({ isOpen, onCloseModal, defaultSpecialty }: ModalSpecialtiesProps) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('md'));
	const history = useHistory();
	const [skills, setSkills] = useState<SpecialtyType[]>([]);
	const [selectedSkill, setSelectedSkill] = useState<SpecialtyType | null>(null);

	const onClose = () => {
		onCloseModal(null);
	};

	const onSelectedSpecialty = (skill: SpecialtyType) => {
		setSelectedSkill(skill);
	};

	const onClickSelected = () => {
		if (selectedSkill) {
			const url = `/seleccionar_doctor?malestar=${selectedSkill.id}`;
			history.push(url);
			onCloseModal(selectedSkill);
		}
	};

	useEffect(() => {
		const listSpecialties = isDevelopment() ? DEV_IMAGES : PROD_IMAGES;
		setSkills(listSpecialties);
	}, []);

	useEffect(() => {
		if (defaultSpecialty) {
			setSelectedSkill(defaultSpecialty);
		}
	}, [defaultSpecialty]);

	return (
		<Dialog
			open={isOpen}
			className={classes.modal}
			onClose={onClose}
			hideBackdrop={false}
			maxWidth={'lg'}
			{...(!isDesktop && { fullScreen: true })}
		>
			{isDesktop ? (
				<span className={classes.close} onClick={onClose}>
					<img alt="close" src={closeIcon} className={classes.closeIcon} />
				</span>
			) : (
				<DropdownSpecialties specialityId={defaultSpecialty?.id} onlyView={true} onClick={() => onClose()} />
			)}
			<div className={classes.card}>
				{isDesktop && <Typography className={classes.cardTitle}>Elige una especialidad</Typography>}
				<div className={classes.container}>
					<Grid container spacing={0}>
						{skills?.map((skill: SpecialtyType, i) => (
							<Grid item xs={6} md={6} lg={3} xl={3} key={i} className={classes.cardItem}>
								<SpecialtyCard
									skill={skill}
									isActive={skill.id === selectedSkill?.id}
									onSelected={onSelectedSpecialty}
								/>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
			<div className={classes.divButton}>
				<Button variant={'contained'} onClick={onClickSelected} fullWidth className={classes.button}>
					Seleccionar
				</Button>
			</div>
		</Dialog>
	);
};

export default ModalSpecialties;

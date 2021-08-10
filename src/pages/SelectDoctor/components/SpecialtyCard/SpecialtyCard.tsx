import React from 'react';
import { SpecialtyType } from 'utils/skillImages';
import useStyles from './styles';
import clsx from 'clsx';

interface SpecialityCardProps {
	skill: SpecialtyType;
	isActive: boolean;
	onSelected: (skill: SpecialtyType) => void;
}

const SpecialtyCard = ({ skill, isActive, onSelected }: SpecialityCardProps) => {
	const classes = useStyles();

	return (
		<div
			className={clsx(classes.container, isActive ? classes.active : classes.inactive)}
			onClick={() => onSelected(skill)}
		>
			<div className={classes.imgDiv}>
				<img alt={skill.label} src={skill.image} className={classes.img} />
			</div>
			<div className={classes.title}>{skill.label}</div>
			<div className={classes.cost}>S/. {skill.cost?.toFixed(2)}</div>
		</div>
	);
};

export default SpecialtyCard;
